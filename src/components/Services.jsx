import React from 'react'
import futoBg from '../assets/futo.jpg'

const Services = () => {
  return (
    <div className="bg-yellow-600 min-h-screen">
      {/* Page Title Banner */}
      <div className="relative pt-32 pb-16 px-6 text-center" style={{ backgroundImage: `url(${futoBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Our Services</h1>
          <p className="text-yellow-500 text-lg font-medium">Comprehensive digital payment solutions</p>
        </div>
      </div>

      <section id="services" className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Comprehensive Fee Payments", 
              desc: "Handle all your academic financial obligations in one place. From tuition and acceptance fees to specific departmental or faculty dues, our platform provides a unified payment experience. We accept all major local and international debit cards." 
            },
            { 
              title: "Instant Receipt Generation", 
              desc: "Eliminate delays and paperwork. As soon as your transaction is confirmed, a digitally signed, official university receipt is generated. You can download, print, or access it anytime from your dashboard for clearance or personal records." 
            },
            { 
              title: "Transaction History", 
              desc: "Maintain complete control over your financial records. Your personal dashboard includes a detailed and searchable log of every payment you've ever made through the portal. Filter by academic session, semester, or payment type with ease." 
            },
            { 
              title: "Secure Gateway", 
              desc: "Your security is our highest priority. The portal is built on a PCI-DSS compliant gateway, utilizing end-to-end encryption and advanced fraud detection systems to ensure that your card details and personal information are always protected." 
            },
            { 
              title: "Real-time Verification", 
              desc: "Experience immediate peace of mind. Every successful payment is instantly communicated to the University's Bursary and Registry departments, ensuring your student profile is updated in real-time. This prevents any delays in registration or course enrollment." 
            },
            { 
              title: "24/7 Support Access", 
              desc: "Encountering an issue? Our dedicated ICT support team is available to assist you with any payment-related challenges. Whether it's a failed transaction or a query about the portal, help is just an email or a phone call away." 
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-900 p-8 rounded-xl shadow-sm border-t-4 border-yellow-400 hover:shadow-md transition hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-3 text-yellow-500">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}

export default Services