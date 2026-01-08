import React from 'react'

const Footer = () => {
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
            <li><a href="#hero" className="hover:text-yellow-500 transition">Home</a></li>
            <li><a href="#about" className="hover:text-yellow-500 transition">About Us</a></li>
            <li><a href="#services" className="hover:text-yellow-500 transition">Services</a></li>
            <li><a href="#contact" className="hover:text-yellow-500 transition">Contact Support</a></li>
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
              <span>+234 803 123 4567</span>
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
    </footer>
  )
}

export default Footer