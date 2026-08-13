import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const result = login(email, password)
    
    if (result.success) {
      onLogin()
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📋 Meu Kanban</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          {error && <div style={styles.error}>{error}</div>}
          <button 
            type="submit" 
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  },
  card: {
    background: 'white',
    padding: 'clamp(30px, 5vw, 50px)',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px',
    animation: 'fadeIn 0.5s ease-in-out'
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
    fontSize: 'clamp(24px, 4vw, 32px)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: 'clamp(12px, 2vw, 16px)',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: 'clamp(14px, 1.5vw, 16px)',
    transition: 'all 0.3s',
    outline: 'none',
    width: '100%',
    backgroundColor: '#f8f9fa'
  },
  button: {
    padding: 'clamp(12px, 2vw, 16px)',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: 'clamp(16px, 2vw, 18px)',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    width: '100%',
    marginTop: '5px'
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none'
  },
  error: {
    color: '#f44336',
    fontSize: 'clamp(13px, 1.5vw, 14px)',
    textAlign: 'center',
    background: '#ffebee',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ffcdd2'
  }
}