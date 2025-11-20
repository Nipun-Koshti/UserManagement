import React from 'react'
import Dashboard from './Pages/Dashboard'
import UserProfile from './Pages/UserProfile'
import { Route, Routes } from 'react-router-dom'
import CreateUser from './Pages/CreateUser'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/user/:id" element={<UserProfile />} />
      <Route path="/create" element={<CreateUser />} />
      
    </Routes>
    
  )
}

export default App