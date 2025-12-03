import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import Home from './components/Home'

export default function App(){
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('tm_user')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  function handleLogin(username){
    const u = { name: username }
    setUser(u)
    sessionStorage.setItem('tm_user', JSON.stringify(u))
  }

  function handleLogout(){
    setUser(null)
    sessionStorage.removeItem('tm_user')
  }

  return user ? <Home user={user} onLogout={handleLogout}/> : <Login onLogin={handleLogin}/>
}
