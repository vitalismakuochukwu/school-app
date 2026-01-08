import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Pay from './pages/Pay'
import Receipt from './pages/Receipt'
import Register from './components/Register'
import VerifyEmail from './components/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import UpdateFee from './pages/UpdateFee'

function App() {
  useEffect(() => {
  // Wakes up the Render server immediately
  fetch('https://school-fees-backend.onrender.com/api/health')
    .then(() => console.log("Server is warm and ready."))
    .catch(() => console.log("Server is still waking up..."));
}, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/secret-admin-update" element={<UpdateFee />} />
      </Routes>
    </div>
  )
}

export default App