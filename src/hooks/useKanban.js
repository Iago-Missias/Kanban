import { useState, useEffect } from 'react'

const INITIAL_DATA = {
  columns: [
    { id: 'todo', title: '📝 A Fazer' },
    { id: 'doing', title: '🔄 Em Andamento' },
    { id: 'done', title: '✅ Concluído' }
  ],
  cards: [
    { id: 1, columnId: 'todo', title: 'Criar projeto', description: 'Iniciar o projeto Kanban' },
    { id: 2, columnId: 'doing', title: 'Configurar estrutura', description: 'Organizar pastas' },
    { id: 3, columnId: 'done', title: 'Planejar', description: 'Definir escopo' }
  ]
}

export const useKanban = () => {
  const [columns, setColumns] = useState([])
  const [cards, setCards] = useState([])
  const [nextId, setNextId] = useState(4)

  useEffect(() => {
    const savedData = localStorage.getItem('kanbanData')
    if (savedData) {
      const data = JSON.parse(savedData)
      setColumns(data.columns)
      setCards(data.cards)
      setNextId(data.nextId || 4)
    } else {
      setColumns(INITIAL_DATA.columns)
      setCards(INITIAL_DATA.cards)
    }
  }, [])

  useEffect(() => {
    if (columns.length > 0 || cards.length > 0) {
      localStorage.setItem('kanbanData', JSON.stringify({ columns, cards, nextId }))
    }
  }, [columns, cards, nextId])

  const addCard = (columnId, title, description) => {
    const newCard = {
      id: nextId,
      columnId,
      title,
      description: description || ''
    }
    setCards([...cards, newCard])
    setNextId(nextId + 1)
  }

  const moveCard = (cardId, fromColumnId, toColumnId) => {
    setCards(cards.map(card => 
      card.id === cardId ? { ...card, columnId: toColumnId } : card
    ))
  }

  const deleteCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId))
  }

  const updateCard = (cardId, updates) => {
    setCards(cards.map(card => 
      card.id === cardId ? { ...card, ...updates } : card
    ))
  }

  return {
    columns,
    cards,
    addCard,
    moveCard,
    deleteCard,
    updateCard
  }
}