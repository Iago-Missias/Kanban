import React, { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { Login } from './pages/Login'
import { Kanban } from './pages/Kanban'
import './styles.css'

function App() {
  const { isAuthenticated } = useAuth()
  const [loggedIn, setLoggedIn] = useState(isAuthenticated)

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />
  }

  return <Kanban />
}

export default App