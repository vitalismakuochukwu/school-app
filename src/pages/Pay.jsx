import React from 'react'
import { Link } from 'react-router-dom'

const Pay = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Confirm Payment</h2>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Type:</span>
            <span className="font-bold">School Fees (2025/2026)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-bold text-xl">₦ 45,500.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Transaction Charge:</span>
            <span className="font-bold">₦ 300.00</span>
          </div>
          <div className="flex justify-between border-t pt-4">
            <span className="text-gray-800 font-bold">Total:</span>
            <span className="font-bold text-2xl text-green-600">₦ 45,800.00</span>
          </div>
        </div>

        <Link to="/receipt" className="block w-full text-center bg-green-600 text-white font-bold py-4 rounded-lg hover:bg-green-700 transition shadow-lg mb-4">
          Proceed to Payment Gateway
        </Link>
        
        <Link to="/dashboard" className="block text-center text-gray-500 hover:text-gray-700">
          Cancel
        </Link>
      </div>
    </div>
  )
}

export default Pay