import React, { useState } from 'react'

const Contact = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="contact" className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-yellow-600 mb-6">Need Help?</h2>
        
        {!showForm ? (
          <>
            <p className="text-gray-600 mb-8">
              Our ICT support team is available to assist you with any payment issues or technical difficulties.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setShowForm(true)}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition"
              >
                Contact Support
              </button>
            </div>
          </>
        ) : (
          <div className="text-left bg-gray-50 p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in-up">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Side: Contact Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-4">Contact Details</h3>
                  <div className="space-y-3">
                    <p className="text-gray-600"><strong>Email:</strong> helpdesk@futo.edu.ng</p>
                    <p className="text-gray-600"><strong>Phone:</strong> +234 803 123 4567</p>
                    <p className="text-gray-600"><strong>Office:</strong> ICT Centre, FUTO Main Campus</p>
                  </div>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> If you are reporting a failed transaction, please include your RRR number and Transaction Reference.
                  </p>
                </div>
              </div>

              {/* Right Side: Form */}
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                  <input type="text" placeholder="Reg Number (Optional)" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                <textarea placeholder="How can we help you?" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 h-32"></textarea>
                
                <div className="flex gap-4">
                  <button className="flex-1 bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition">
                    Send Message
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition"
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
  )
}

export default Contact