import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Pay from './pages/Pay'
import Receipt from './pages/Receipt'
import Register from './components/Register'
import VerifyEmail from './components/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import UpdateFee from './pages/UpdateFee'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'

function App() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
  // Wakes up the Render server immediately
  fetch('https://school-fees-backend.onrender.com/api/health')
    .then(() => console.log("Server is warm and ready."))
    .catch(() => console.log("Server is still waking up..."));
}, []);
  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Navbar />}
      
      <div className="flex-grow">
      <Routes>
        <Route path="/" element={
            <>
              <Hero />
              <About />
              <Services />
              <Contact />
            </>
          } />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/secret-admin-update" element={<UpdateFee />} />
        <Route path="*" element={<div className="flex items-center justify-center min-h-screen pt-32 text-xl font-bold text-gray-600">404 - Page Not Found</div>} />
      </Routes>
      </div>
      {!isDashboard && <Footer />}
    </div>
  )
}

export default App