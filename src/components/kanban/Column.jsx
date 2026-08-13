import React from 'react'
import { Card } from './Card'

export const Column = ({ 
  column, 
  cards, 
  onDragOver, 
  onDrop, 
  onDragStart,
  onAddCard,
  onDeleteCard,
  onUpdateCard,
  isMobile
}) => {
  return (
    <div 
      style={styles.column}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div style={styles.header}>
        <h3 style={styles.title}>{column.title}</h3>
        <span style={styles.count}>{cards.length}</span>
      </div>
      
      <div style={styles.cards}>
        {cards.length === 0 ? (
          <div style={styles.emptyState}>
            <p>📭 Nenhum card</p>
            <p style={styles.emptyHint}>Clique em + para adicionar</p>
          </div>
        ) : (
          cards.map(card => (
            <Card
              key={card.id}
              card={card}
              onDragStart={onDragStart}
              onDelete={onDeleteCard}
              onUpdate={onUpdateCard}
              isMobile={isMobile}
            />
          ))
        )}
      </div>

      <button 
        onClick={onAddCard}
        style={styles.addBtn}
        onTouchStart={onAddCard} // Suporte a toque no mobile
      >
        {isMobile ? '➕' : '+ Adicionar Card'}
      </button>
    </div>
  )
}

// ESTILOS RESPONSIVOS DA COLUNA
const styles = {
  column: {
    background: 'white',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee'
  },
  title: {
    fontSize: 'clamp(14px, 2vw, 18px)',
    margin: 0
  },
  count: {
    background: '#e0e0e0',
    padding: '2px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    minWidth: '20px',
    textAlign: 'center'
  },
  cards: {
    flex: 1,
    minHeight: '150px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    paddingBottom: '10px'
  },
  emptyState: {
    textAlign: 'center',
    color: '#999',
    padding: '30px 10px',
    fontSize: '14px'
  },
  emptyHint: {
    fontSize: '12px',
    marginTop: '5px',
    color: '#bbb'
  },
  addBtn: {
    width: '100%',
    padding: '12px',
    marginTop: '10px',
    background: 'transparent',
    border: '2px dashed #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#666',
    transition: 'all 0.3s',
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    fontWeight: 'bold'
  }
}

// MEDIA QUERIES para a coluna
// Adicionar no CSS global ou inline