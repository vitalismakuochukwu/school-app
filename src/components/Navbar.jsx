import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import bg from '../assets/bg.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-yellow-600 text-gray-900 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <img src={bg} alt="FUTO Logo" className="h-12 w-12 object-contain bg-white rounded-full p-1" />
          <div className="text-2xl font-bold tracking-wide">FUTO PAY</div>
        </div>
        <div className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/about" className="hover:text-white transition">About</Link>
          <Link to="/services" className="hover:text-white transition">Services</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
        </div>
        <Link to="/login" className="hidden md:inline-block bg-gray-900 text-yellow-500 px-5 py-2 rounded-full font-bold hover:bg-gray-800 transition shadow-sm">
          Student Portal
        </Link>

        {/* Hamburger Icon */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none text-gray-900">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-yellow-600 px-6 pb-6 pt-2 space-y-4">
          <Link to="/" className="block hover:text-white transition" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="block hover:text-white transition" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/services" className="block hover:text-white transition" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/contact" className="block hover:text-white transition" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/login" className="block w-full text-center bg-gray-900 text-yellow-500 px-5 py-2 rounded-full font-bold hover:bg-gray-800 transition shadow-sm" onClick={() => setIsOpen(false)}>
            Student Portal
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar