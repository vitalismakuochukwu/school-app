import React from 'react'
import { Link } from 'react-router-dom'

const Receipt = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="bg-white p-10 rounded shadow-lg max-w-2xl w-full h-fit">
        <div className="text-center border-b pb-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">FUTO PAYMENT RECEIPT</h1>
          <p className="text-sm text-gray-500">Federal University of Technology Owerri</p>
        </div>
        
        <div className="grid grid-cols-2 gap-y-4 text-sm mb-8">
          <div className="text-gray-600">Reference:</div>
          <div className="font-mono font-bold">FUTO-PAY-882930</div>
          
          <div className="text-gray-600">Date:</div>
          <div className="font-bold">Jan 01, 2026</div>
          
          <div className="text-gray-600">Student Name:</div>
          <div className="font-bold">Chinedu Okeke</div>
          
          <div className="text-gray-600">Reg Number:</div>
          <div className="font-bold">2021/123456</div>
          
          <div className="text-gray-600">Payment For:</div>
          <div className="font-bold">School Fees</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded mb-8 flex justify-between items-center">
          <span className="font-bold text-gray-700">Amount Paid:</span>
          <span className="font-bold text-xl text-green-600">₦ 45,800.00</span>
        </div>
        
        <div className="flex gap-4 print:hidden">
          <button onClick={() => window.print()} className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Print Receipt
          </button>
          <Link to="/dashboard" className="flex-1 bg-gray-200 text-gray-800 py-2 rounded text-center hover:bg-gray-300">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Receipt