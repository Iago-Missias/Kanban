import { useState, useEffect } from 'react'

const CREDENTIALS = {
  email: 'admin@kanban.com',
  password: '123456'
}

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
      const userData = { email, name: 'Usuário' }
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      return { success: true }
    }
    return { success: false, error: 'Email ou senha incorretos' }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return { 
    user, 
    loading, 
    login, 
    logout, 
    isAuthenticated: !!user 
  }
}