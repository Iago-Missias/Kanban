import React, { useState, useEffect } from 'react'

export const AddCardModal = ({ isOpen, onClose, onAdd, isMobile }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (isOpen) {
      setTitle('')
      setDescription('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd(title.trim(), description.trim())
      setTitle('')
      setDescription('')
    }
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div 
        style={isMobile ? styles.modalMobile : styles.modal} 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={styles.title}>📝 Novo Card</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título do card"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            autoFocus
          />
          <textarea
            placeholder="Descrição (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
            rows={isMobile ? 3 : 4}
          />
          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              {isMobile ? '✕' : 'Cancelar'}
            </button>
            <button type="submit" style={styles.addBtn} disabled={!title.trim()}>
              {isMobile ? '✓' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
    backdropFilter: 'blur(4px)'
  },
  modal: {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    width: '450px',
    maxWidth: '95%',
    animation: 'fadeIn 0.3s ease-in-out',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
  },
  modalMobile: {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '400px',
    animation: 'fadeIn 0.3s ease-in-out',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    margin: '20px'
  },
  title: {
    margin: '0 0 20px 0',
    color: '#333',
    fontSize: 'clamp(20px, 3vw, 24px)',
    textAlign: 'center'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: 'clamp(14px, 1.5vw, 16px)',
    marginBottom: '12px',
    transition: 'border-color 0.3s',
    outline: 'none'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: 'clamp(14px, 1.5vw, 16px)',
    resize: 'vertical',
    marginBottom: '20px',
    transition: 'border-color 0.3s',
    outline: 'none',
    fontFamily: 'inherit'
  },
  actions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    flexWrap: 'wrap'
  },
  cancelBtn: {
    padding: '10px 24px',
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: 'clamp(14px, 1.5vw, 16px)',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    flex: '1',
    minWidth: '80px'
  },
  addBtn: {
    padding: '10px 24px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: 'clamp(14px, 1.5vw, 16px)',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    flex: '1',
    minWidth: '80px'
  }
}

// Adicionar a animação fadeIn no CSS global