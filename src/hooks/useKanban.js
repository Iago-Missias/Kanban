import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase
const supabaseUrl = 'https://dwldwqtkellwjjjxslth.supabase.co'
const supabaseKey = 'sb_publishable_NeV7rWh3Eh_5xWVFLoyPyg_x8mdsrRH'
const supabase = createClient(supabaseUrl, supabaseKey)

// Colunas fixas
const columns = [
  { id: 'todo', title: '📝 A Fazer' },
  { id: 'doing', title: '🔄 Em Andamento' },
  { id: 'done', title: '✅ Concluído' }
]

export const useKanban = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 🔄 Carregar cards do Supabase
  const loadCards = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .order('id', { ascending: true })
      
      if (error) {
        console.error('❌ Erro ao carregar:', error)
        setError(error.message)
        setCards([])
      } else {
        console.log('✅ Cards carregados:', data?.length || 0, 'cards')
        setCards(data || [])
      }
    } catch (err) {
      console.error('❌ Erro inesperado:', err)
      setError(err.message)
      setCards([])
    }
    
    setLoading(false)
  }

  // Carregar ao iniciar
  useEffect(() => {
    loadCards()
  }, [])

  // ➕ Adicionar card no Supabase
  const addCard = async (columnId, title, description) => {
    if (!title || !title.trim()) {
      console.warn('⚠️ Título vazio, não adicionado')
      return
    }
    
    const newCard = {
      column_id: columnId,
      title: title.trim(),
      description: description?.trim() || ''
    }
    
    try {
      const { data, error } = await supabase
        .from('cards')
        .insert([newCard])
        .select()
      
      if (error) {
        console.error('❌ Erro ao adicionar:', error)
        alert('Erro ao adicionar card: ' + error.message)
        return
      }
      
      console.log('✅ Card adicionado:', data[0])
      setCards(prev => [...prev, data[0]])
    } catch (err) {
      console.error('❌ Erro inesperado:', err)
      alert('Erro ao adicionar card')
    }
  }

  // 🔀 Mover card no Supabase
  const moveCard = async (cardId, fromColumnId, toColumnId) => {
    try {
      const { error } = await supabase
        .from('cards')
        .update({ column_id: toColumnId })
        .eq('id', cardId)
      
      if (error) {
        console.error('❌ Erro ao mover:', error)
        return
      }
      
      setCards(prev => prev.map(card => 
        card.id === cardId ? { ...card, column_id: toColumnId } : card
      ))
    } catch (err) {
      console.error('❌ Erro inesperado:', err)
    }
  }

  // 🗑️ Deletar card no Supabase
  const deleteCard = async (cardId) => {
    try {
      const { error } = await supabase
        .from('cards')
        .delete()
        .eq('id', cardId)
      
      if (error) {
        console.error('❌ Erro ao deletar:', error)
        return
      }
      
      setCards(prev => prev.filter(card => card.id !== cardId))
    } catch (err) {
      console.error('❌ Erro inesperado:', err)
    }
  }

  // ✏️ Atualizar card no Supabase
  const updateCard = async (cardId, updates) => {
    try {
      const { error } = await supabase
        .from('cards')
        .update(updates)
        .eq('id', cardId)
      
      if (error) {
        console.error('❌ Erro ao atualizar:', error)
        return
      }
      
      setCards(prev => prev.map(card => 
        card.id === cardId ? { ...card, ...updates } : card
      ))
    } catch (err) {
      console.error('❌ Erro inesperado:', err)
    }
  }

  return {
    columns,
    cards,
    loading,
    error,
    addCard,
    moveCard,
    deleteCard,
    updateCard,
    loadCards // Para recarregar manualmente se precisar
  }
}