import React, { useState, useEffect } from 'react'
import { useKanban } from '../hooks/useKanban'
import { Column } from '../components/kanban/Column'
import { AddCardModal } from '../components/kanban/AddCardModal'
import { useAuth } from '../hooks/useAuth'

export const Kanban = () => {
  const { columns, cards, addCard, moveCard, deleteCard, updateCard } = useKanban()
  const { logout } = useAuth()
  const [selectedColumn, setSelectedColumn] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [draggedCard, setDraggedCard] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Detectar mudança de tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleDragStart = (e, card) => {
    setDraggedCard(card)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, columnId) => {
    e.preventDefault()
    if (draggedCard && draggedCard.column_id !== columnId) {
      moveCard(draggedCard.id, draggedCard.column_id, columnId)
    }
    setDraggedCard(null)
  }

  const handleLogout = () => {
    logout()
    window.location.reload()
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>📋 Meu Kanban</h1>
        <div style={styles.headerActions}>
          <span style={styles.cardCount}>
            {cards.length} cards
          </span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Sair
          </button>
        </div>
      </header>

      <div style={styles.board}>
        {columns.map(column => (
          <Column
            key={column.id}
            column={column}
            cards={cards.filter(c => c.column_id === column.id)}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            onAddCard={() => {
              setSelectedColumn(column.id)
              setIsModalOpen(true)
            }}
            onDeleteCard={deleteCard}
            onUpdateCard={updateCard}
            isMobile={isMobile}
          />
        ))}
      </div>

      <AddCardModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedColumn(null)
        }}
        onAdd={(title, description) => {
          addCard(selectedColumn, title, description)
          setIsModalOpen(false)
          setSelectedColumn(null)
        }}
        isMobile={isMobile}
      />
    </div>
  )
}

// ESTILOS RESPONSIVOS
const styles = {
  container: {
    minHeight: '100vh',
    background: '#f4f5f7',
    padding: '20px',
    paddingBottom: '80px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '0 10px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  title: {
    fontSize: 'clamp(20px, 4vw, 32px)',
    color: '#333'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  cardCount: {
    background: '#e0e0e0',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555'
  },
  logoutBtn: {
    padding: '8px 20px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    minWidth: '50px'
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    maxWidth: '1400px',
    margin: '0 auto'
  }
}