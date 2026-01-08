import React from 'react'
import dorios from '../assets/doris.jpeg'

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-yellow-600 mb-12 text-center">About The Portal</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Side: Writeup */}
          <div className="md:w-1/2 text-gray-600 text-lg leading-relaxed space-y-6">
            <p>
              Welcome to the FUTO School Fees Portal, the official digital payment gateway for the Federal University of Technology Owerri. 
              This platform was conceptualized and developed to bridge the gap between traditional banking methods and modern digital convenience.
            </p>
            <p>
              Our mission is to provide students with a seamless, secure, and efficient way to manage their financial obligations. 
              Whether you are paying acceptance fees, school fees, or other departmental dues, our system ensures that every transaction 
              is processed instantly with real-time verification.
            </p>
            <p>
              We are committed to transparency and accountability. The portal provides a comprehensive dashboard where students can 
              track their payment history, generate receipts, and ensure their financial records are up to date with the university registry.
            </p>
          </div>

          {/* Right Side: Image and Caption */}
          <div className="md:w-1/2 flex flex-col items-center">
            <div className="w-72 h-72 border-4 border-yellow-500 shadow-xl overflow-hidden">
              <img src={dorios} alt="Ogualiri Doris Nkeiru" className="w-full h-full object-cover" />
            </div>
            <p className="mt-4 font-bold text-gray-800 text-lg">Programmed by Ogualiri Doris Nkeiru</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About