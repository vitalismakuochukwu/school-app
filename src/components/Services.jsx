import React from 'react'

const Services = () => {
  return (
    <section id="services" className="py-20 px-6 bg-yellow-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-yellow-600 mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Tuition & Dues Payment", 
              desc: "Pay your acceptance fees, school fees, and departmental dues seamlessly using our integrated payment gateway. We support all major debit cards." 
            },
            { 
              title: "Instant Receipt Generation", 
              desc: "No more waiting in lines. Generate and print your official payment receipts immediately after a successful transaction for your personal records." 
            },
            { 
              title: "Transaction History", 
              desc: "Keep track of your finances with a comprehensive log of all your past payments. Filter by session, semester, or payment type easily." 
            },
            { 
              title: "Secure Gateway", 
              desc: "Your security is our priority. Our platform uses end-to-end encryption and is PCI-DSS compliant to ensure your financial data remains safe." 
            },
            { 
              title: "Real-time Verification", 
              desc: "Payments made on this portal are automatically verified with the University Bursary Department, updating your student profile instantly." 
            },
            { 
              title: "24/7 Support Access", 
              desc: "Encountering an issue? Our dedicated ICT support team is available around the clock to assist you with any payment-related challenges." 
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-yellow-400 hover:shadow-md transition hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services