import React from 'react'
import dorios from '../assets/cvc.jpeg'
import futoBg from '../assets/futo.jpg'

const About = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Page Title Banner */}
      <div className="relative pt-32 pb-16 px-6 text-center" style={{ backgroundImage: `url(${futoBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">About Us</h1>
          <p className="text-yellow-500 text-lg font-medium">Learn more about our mission and vision</p>
        </div>
      </div>

      <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4">A New Era of Digital Payments at FUTO</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            The FUTO Pay portal is more than just a payment system; it's a commitment to progress, efficiency, and student convenience. 
            Developed to modernize financial transactions within the university, this platform bridges the gap between traditional methods and the digital age.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side: Core Principles */}
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="bg-yellow-500/10 p-3 rounded-full text-yellow-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></div>
              <div>
                <h3 className="text-xl font-bold text-white">Uncompromising Security</h3>
                <p className="text-gray-400 mt-1">With PCI-DSS compliance and end-to-end encryption, your financial data is protected by industry-leading security standards. Pay with confidence.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-yellow-500/10 p-3 rounded-full text-yellow-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>
              <div>
                <h3 className="text-xl font-bold text-white">Streamlined Efficiency</h3>
                <p className="text-gray-400 mt-1">Forget long queues and manual processes. Our portal offers instant payment confirmation, automatic receipt generation, and real-time updates to your student profile.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-yellow-500/10 p-3 rounded-full text-yellow-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
              <div>
                <h3 className="text-xl font-bold text-white">Dedicated Support</h3>
                <p className="text-gray-400 mt-1">Our support team is always on standby to assist with any transaction issues, ensuring a smooth and hassle-free experience from start to finish.</p>
              </div>
            </div>
          </div>

          {/* Right Side: Image and Caption */}
          <div className="flex flex-col items-center text-center">
            <div className="w-72 h-72 md:w-80 md:h-80 border-4 border-yellow-500 shadow-2xl overflow-hidden rounded-lg">
              <img src={dorios} alt="Ogualiri Doris Nkeiru" className="w-full h-full object-cover" />
            </div>
            <h4 className="mt-6 font-bold text-yellow-500 text-xl">Programmed by STEPHEN CHIBUIKE JOEL</h4>
            <p className="text-gray-400 text-sm mt-1">A commitment to advancing FUTO's digital infrastructure.</p>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default About