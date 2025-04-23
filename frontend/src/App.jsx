import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegistrationForm from './components/RegistrationForm'
import UsersTable from './components/UsersTable'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/users" element={<UsersTable />} />
      </Routes>
    </Router>
  )
}

export default App
