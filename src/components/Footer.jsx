import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 font-sans">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        
        {/* Column 1: About */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4">FUTO PAY</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            The official digital payment platform for Federal University of Technology Owerri. 
            Secure, fast, and reliable financial services for students.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-yellow-500 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-500 transition">About Us</Link></li>
            <li><Link to="/services" className="hover:text-yellow-500 transition">Services</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-500 transition">Contact Support</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>PMB 1526, Owerri, Imo State</span>
            </li>
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>helpdesk@futo.edu.ng</span>
            </li>
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span>+234 702 613 9914</span>
            </li>
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Mon - Fri: 8am - 4pm</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-12 pt-8 px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Federal University of Technology Owerri. All rights reserved.</p>
        
        <div className="flex space-x-4 mt-4 md:mt-0">
          {/* Facebook Link */}
          <a href="https://facebook.com/your-link" target="_blank" rel="noreferrer" className="bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 transition text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>

          {/* Twitter/X Link */}
          <a href="https://twitter.com/your-link" target="_blank" rel="noreferrer" className="bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 transition text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </a>

          {/* Instagram Link */}
          <a href="https://instagram.com/your-link" target="_blank" rel="noreferrer" className="bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 transition text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>

          {/* WhatsApp Link */}
          <a href="https://wa.me/your-number" target="_blank" rel="noreferrer" className="bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 transition text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          </a>

          {/* Contact/Email Icon */}
          <a href="mailto:helpdesk@futo.edu.ng" className="bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 transition text-white shadow-lg" title="Contact Support">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </a>
        </div>
      </div>

      {/* Floating Message Icon */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Popover Content */}
        {isOpen && (
          <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-yellow-500 w-72 overflow-hidden animate-fade-in-up transform origin-bottom-right">
            <div className="bg-gray-900 p-4 flex justify-between items-center">
              <h3 className="text-yellow-500 font-bold text-lg">Support Center</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm text-gray-600 mb-2">Need assistance? Reach out to us directly.</p>
              
              <a href="mailto:helpdesk@futo.edu.ng" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-yellow-50 border border-gray-100 hover:border-yellow-200 transition group">
                <div className="bg-yellow-100 p-2 rounded-full text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Send Email</p>
                  <p className="text-xs text-gray-500">helpdesk@futo.edu.ng</p>
                </div>
              </a>

              <a href="tel:+2347026139914" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-yellow-50 border border-gray-100 hover:border-yellow-200 transition group">
                <div className="bg-yellow-100 p-2 rounded-full text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Call Support</p>
                  <p className="text-xs text-gray-500">+234 702 613 9914</p>
                </div>
              </a>
            </div>
            <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
              <Link to="/contact" onClick={() => setIsOpen(false)} className="text-xs font-bold text-yellow-600 hover:text-yellow-700 uppercase tracking-wide">
                Open Full Contact Form
              </Link>
            </div>
          </div>
        )}

        <div className="relative group">
          {!isOpen && (
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-yellow-500 text-xs font-bold px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-yellow-500">
              Chat with us
            </span>
          )}
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="relative bg-yellow-500 text-gray-900 p-4 rounded-full shadow-2xl hover:bg-yellow-400 transition transform hover:-translate-y-1 border-2 border-white flex items-center justify-center focus:outline-none"
          >
            {!isOpen && <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75 animate-ping"></span>}
            
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            )}
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer