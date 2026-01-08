import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Contact from '../components/Contact'
import Footer from '../components/Footer.jsx'

const LandingPage = () => {
  return (
    <div className="font-sans text-gray-800 flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Contact />
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage