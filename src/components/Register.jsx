// 
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import futoBg from '../assets/futo.jpg'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    regNo: '',
    department: '',
    faculty: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('https://school-fees-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Registration Successful! Please check your email for the verification code.')
        navigate('/verify-email', { state: { email: formData.email } })
      } else {
        alert(data.message || 'Registration failed')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please check your connection.')
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    setIsLoading(true);
    window.location.href = 'https://school-fees-backend.onrender.com/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-600 py-12 px-4 relative" style={{ backgroundImage: `url(${futoBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="max-w-md w-full space-y-8 bg-gray-900 p-10 rounded-xl shadow-lg border border-yellow-500 relative z-10">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-yellow-500">Create Account</h2>
          <p className="mt-2 text-center text-sm text-gray-300">Register as a FUTO student</p>
        </div>
        
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {/* Form Fields */}
          {['fullName', 'regNo', 'department', 'faculty', 'email'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-300 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                name={field}
                type={field === 'email' ? 'email' : 'text'}
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-500"
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <div className="relative mt-1">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="block w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-500"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-yellow-500 hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-500"
          >
            {isLoading ? "Processing..." : 'Register'}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-gray-900 text-gray-400">Or</span></div>
          </div>

          <button type="button" onClick={handleGoogleLogin} className="w-full flex justify-center items-center gap-3 bg-gray-800 border border-gray-600 text-white font-medium py-2 rounded-lg hover:bg-gray-700">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" className="w-5 h-5" />
            Sign up with Google
          </button>

          <p className="text-center text-sm text-gray-400">
            Already have an account? <Link to="/login" className="text-yellow-500 font-medium hover:text-yellow-400">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register