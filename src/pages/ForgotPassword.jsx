import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    setError('')

    try {
      const response = await fetch('https://school-fees-backend.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Password reset link sent to your email.')
        setEmail('')
      } else {
        setError(data.message || 'Failed to send reset link')
      }
    } catch (err) {
      setError('Connection error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Forgot Password</h2>
        <p className="text-gray-600 mb-6 text-center">Enter your email address and we'll send you a link to reset your password.</p>
        
        {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">{message}</div>}
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" 
              placeholder="student@futo.edu.ng" 
            />
          </div>

          <button disabled={isLoading} type="submit" className="w-full bg-yellow-600 text-white py-3 rounded-lg font-bold hover:bg-yellow-700 transition">
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link to="/login" className="text-yellow-600 hover:text-yellow-700 font-medium text-sm">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword