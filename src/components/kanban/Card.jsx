import React, { useState } from 'react'

export const Card = ({ card, onDragStart, onDelete, onUpdate, isMobile }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description || '')
  const [showActions, setShowActions] = useState(false)

  const handleSave = () => {
    onUpdate(card.id, { title, description })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div style={styles.editCard}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.editInput}
          placeholder="Título"
          autoFocus
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.editTextarea}
          placeholder="Descrição"
          rows={2}
        />
        <div style={styles.editActions}>
          <button onClick={handleSave} style={styles.saveBtn}>Salvar</button>
          <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>Cancelar</button>
        </div>
      </div>
    )
  }

  return (
    <div
      draggable={!isMobile} // Desativa drag no mobile
      onDragStart={(e) => onDragStart(e, card)}
      style={styles.card}
      onTouchStart={() => isMobile && setShowActions(!showActions)}
    >
      <div style={styles.cardContent}>
        <h4 style={styles.cardTitle}>{card.title}</h4>
        {card.description && <p style={styles.cardDesc}>{card.description}</p>}
      </div>
      
      <div style={styles.actions}>
        {isMobile && showActions && (
          <div style={styles.mobileActions}>
            <button onClick={() => setIsEditing(true)} style={styles.editBtn}>✏️</button>
            <button onClick={() => onDelete(card.id)} style={styles.deleteBtn}>🗑️</button>
          </div>
        )}
        {!isMobile && (
          <>
            <button onClick={() => setIsEditing(true)} style={styles.editBtn}>✏️</button>
            <button onClick={() => onDelete(card.id)} style={styles.deleteBtn}>🗑️</button>
          </>
        )}
      </div>
    </div>
  )
}

// ESTILOS RESPONSIVOS DO CARD
const styles = {
  card: {
    background: '#fff',
    padding: '12px',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'grab',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    transition: 'all 0.3s',
    border: '1px solid #f0f0f0',
    position: 'relative',
    minHeight: '50px'
  },
  cardContent: {
    flex: 1,
    marginRight: '8px'
  },
  cardTitle: {
    margin: '0 0 4px 0',
    fontSize: 'clamp(13px, 1.5vw, 15px)',
    color: '#333',
    wordBreak: 'break-word'
  },
  cardDesc: {
    margin: 0,
    fontSize: 'clamp(11px, 1.2vw, 13px)',
    color: '#666',
    wordBreak: 'break-word'
  },
  actions: {
    display: 'flex',
    gap: '4px',
    flexShrink: 0
  },
  mobileActions: {
    display: 'flex',
    gap: '4px',
    position: 'absolute',
    right: '8px',
    top: '8px',
    background: 'white',
    padding: '4px',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
  },
  editBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 'clamp(14px, 1.5vw, 16px)',
    padding: '4px 6px',
    borderRadius: '4px',
    transition: 'background 0.3s'
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 'clamp(14px, 1.5vw, 16px)',
    padding: '4px 6px',
    borderRadius: '4px',
    transition: 'background 0.3s'
  },
  editCard: {
    background: '#fff',
    padding: '12px',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #4CAF50'
  },
  editInput: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '8px',
    fontSize: 'clamp(13px, 1.5vw, 14px)'
  },
  editTextarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '8px',
    fontSize: 'clamp(13px, 1.5vw, 14px)',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  editActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  saveBtn: {
    padding: '6px 16px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: 'clamp(12px, 1.2vw, 14px)',
    flex: '1',
    minWidth: '60px'
  },
  cancelBtn: {
    padding: '6px 16px',
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: 'clamp(12px, 1.2vw, 14px)',
    flex: '1',
    minWidth: '60px'
  }
}

// MEDIA QUERIES para o card
// Adicionar no CSS global