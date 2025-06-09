import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import About from './pages/About'
import Chat from './pages/Chat'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('currentUser', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation user={user} logout={logout} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={
              user ? <Navigate to="/chat" /> : <Login onLogin={login} />
            } />
            <Route path="/register" element={
              user ? <Navigate to="/chat" /> : <Register onLogin={login} />
            } />
            <Route path="/profile" element={
              user ? <Profile user={user} /> : <Navigate to="/login" />
            } />
            <Route path="/about" element={<About />} />
            <Route path="/chat" element={
              user ? <Chat user={user} /> : <Navigate to="/login" />
            } />
            <Route path="/" element={<Navigate to="/about" />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App 