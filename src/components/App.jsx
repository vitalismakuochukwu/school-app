import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Hero from './Hero'
import About from './About'
import Services from './Services'
import Contact from './Contact'
import Login from '../pages/Login'
import Register from './Register'
import VerifyEmail from './VerifyEmail'
import Dashboard from '../pages/Dashboard'
import UpdateFee from '../pages/UpdateFee'

const App = () => {
  const location = useLocation()
  // Hide Navbar and Footer on Dashboard route to prevent duplication with Sidebar
  const isDashboard = location.pathname.startsWith('/dashboard')

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Navbar />}
      
      <div className="flex-grow">
        <Routes>
          {/* Home Page: Displays all landing page sections */}
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Services />
              <Contact />
            </>
          } />

          {/* Individual Pages: Display only the specific section content */}
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* Authentication & Application Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/update-fee" element={<UpdateFee />} />
          <Route path="*" element={<div className="flex items-center justify-center min-h-screen pt-32 text-xl font-bold text-gray-600">404 - Page Not Found</div>} />
        </Routes>
      </div>

      {!isDashboard && <Footer />}
    </div>
  )
}

export default App