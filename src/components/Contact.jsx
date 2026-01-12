import React, { useState } from 'react'
import futoBg from '../assets/futo.jpg'

const Contact = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-yellow-600 min-h-screen">
      {/* Page Title Banner */}
      <div className="relative pt-32 pb-16 px-6 text-center" style={{ backgroundImage: `url(${futoBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Contact Support</h1>
          <p className="text-yellow-500 text-lg font-medium">We are here to help you</p>
        </div>
      </div>

      <section id="contact" className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help?</h2>
        <p className="text-gray-900 font-medium mb-12 max-w-2xl mx-auto">
          Before reaching out, check our quick solutions to common questions. If you still need help, our support team is ready to assist.
        </p>

        {/* FAQ Section */}
        <div className="text-left space-y-4 mb-12">
          <div className="bg-gray-900/10 p-4 rounded-lg">
            <h4 className="font-bold text-gray-900">What if my payment fails but I was debited?</h4>
            <p className="text-sm text-gray-800 mt-1">Do not panic. Most failed but debited transactions are automatically reversed by the bank within 24 hours. If the reversal doesn't happen, contact our support with your Transaction Reference, RRR, and Reg Number.</p>
          </div>
          <div className="bg-gray-900/10 p-4 rounded-lg">
            <h4 className="font-bold text-gray-900">Where can I find my payment reference (RRR)?</h4>
            <p className="text-sm text-gray-800 mt-1">Your Remita Retrieval Reference (RRR) is generated and displayed on the payment page before you are redirected to the payment gateway. It is also included in the payment receipt sent to your email after a successful transaction.</p>
          </div>
          <div className="bg-gray-900/10 p-4 rounded-lg">
            <h4 className="font-bold text-gray-900">Can I pay for a previous academic session?</h4>
            <p className="text-sm text-gray-800 mt-1">The portal is primarily for current session fees. To pay for outstanding fees from previous sessions, you may need to visit the University Bursary department for special guidance and a unique payment invoice.</p>
          </div>
        </div>
        
        {!showForm ? (
          <>
            <div className="w-full h-px bg-gray-900/20 my-10"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
            <p className="text-gray-900 font-medium mb-8 max-w-xl mx-auto">
              Our ICT support team is available to assist you with any payment issues or technical difficulties. Click the button below to open the contact form.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setShowForm(true)}
                className="bg-gray-900 text-yellow-500 px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition shadow-lg flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                Contact Support
              </button>
            </div>
          </>
        ) : (
          <div className="text-left bg-gray-900 p-6 md:p-8 rounded-xl shadow-2xl border border-yellow-500 animate-fade-in-up">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Left Side: Contact Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-yellow-500 text-lg mb-4">Contact Details</h3>
                  <div className="space-y-3">
                    <p className="text-gray-300"><strong>Email:</strong> <a href="mailto:helpdesk@futo.edu.ng" className="hover:underline">helpdesk@futo.edu.ng</a></p>
                    <p className="text-gray-300"><strong>Phone:</strong> +234 702 613 9914</p>
                    <p className="text-gray-300"><strong>Office:</strong> ICT Centre, FUTO Main Campus</p>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-yellow-600/30">
                  <p className="text-yellow-500 text-sm">
                    <strong>Note:</strong> If you are reporting a failed transaction, please include your RRR number and Transaction Reference.
                  </p>
                </div>
              </div>

              {/* Right Side: Form */}
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500" />
                  <input type="text" placeholder="Reg Number (Optional)" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500" />
                <textarea placeholder="How can we help you?" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 h-32 placeholder-gray-500"></textarea>
                
                <div className="flex gap-4">
                  <button className="flex-1 bg-yellow-600 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-500 transition flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    Send Message
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 border border-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
    </div>
  )
}

export default Contact