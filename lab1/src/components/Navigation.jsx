import React from 'react'
import { Link } from 'react-router-dom'

function Navigation({ user, logout }) {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">Simple Chat</Link>
          
          <div className="flex space-x-4 items-center">
            <Link to="/about" className="hover:text-blue-200">About</Link>
            
            {user ? (
              <>
                <Link to="/chat" className="hover:text-blue-200">Chat</Link>
                <Link to="/profile" className="hover:text-blue-200">Profile</Link>
                <span className="text-sm">Welcome, {user.name}</span>
                <button 
                  onClick={logout}
                  className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200">Login</Link>
                <Link to="/register" className="hover:text-blue-200">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 