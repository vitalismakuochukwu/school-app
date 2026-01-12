import React from 'react'
import { Link } from 'react-router-dom'
import futoBg from '../assets/futo.jpg'

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative py-32 px-6 text-center bg-yellow-600"
      style={{ 
        backgroundImage: `url(${futoBg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <style>
          {`
            @keyframes fadeInDown {
              0% { opacity: 0; transform: translateY(-20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .animate-futo {
              animation: fadeInDown 1.2s ease-out forwards;
            }
          `}
        </style>
        <h1 className="animate-futo text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg uppercase tracking-wide">
          Federal University of Technology Owerri
        </h1>
        <p className="text-xl md:text-2xl text-yellow-100 mb-10 font-medium drop-shadow-md">
          Seamless School Fees Payment | The Official Digital Payment Platform
        </p>
        <Link to="/login" className="bg-gray-900 text-yellow-500 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-800 transition transform hover:-translate-y-1 border-2 border-yellow-500">
          Pay Fees Now
        </Link>
      </div>
    </section>
  )
}

export default Hero