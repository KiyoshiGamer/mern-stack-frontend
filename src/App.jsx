import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/"
                 element={user ? <Home/> : <Navigate to="/login"/>}>
          </Route>
          <Route path="/signup"
                 element={!user ? <Signup/> : <Navigate to="/"/>}>
          </Route>
          <Route path="/login"
                 element={!user ? <Login/> : <Navigate to="/"/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
