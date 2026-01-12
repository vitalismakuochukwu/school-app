import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import futoBg from '../assets/futo.jpg'

const VerifyEmail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Try to get email from navigation state (passed from Register page), otherwise empty
  const [email, setEmail] = useState(location.state?.email || '')
  const [code, setCode] = useState(new Array(12).fill(''))
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timer, setTimer] = useState(0)
  const inputRefs = useRef([])

  // Handle input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false

    const newCode = [...code]
    newCode[index] = element.value
    setCode(newCode)

    // Focus next input
    if (element.value && index < 11) {
      inputRefs.current[index + 1].focus()
    }
  }

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
        inputRefs.current[index - 1].focus()
      }
    }
  }

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 12).split('')
    if (pastedData.length > 0) {
      const newCode = [...code]
      pastedData.forEach((val, i) => {
        if (i < 12 && !isNaN(val)) newCode[i] = val
      })
      setCode(newCode)
      // Focus the last filled box or the first empty one
      const nextEmptyIndex = newCode.findIndex(val => val === '')
      const focusIndex = nextEmptyIndex === -1 ? 11 : nextEmptyIndex
      inputRefs.current[focusIndex].focus()
    }
  }

  // Handle manual paste button click
  const handlePasteClick = async () => {
    try {
      const text = await navigator.clipboard.readText()
      const pastedData = text.slice(0, 12).split('')
      if (pastedData.length > 0) {
        const newCode = [...code]
        pastedData.forEach((val, i) => {
          if (i < 12 && !isNaN(val)) newCode[i] = val
        })
        setCode(newCode)
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err)
      alert('Unable to access clipboard. Please paste manually using Ctrl+V.')
    }
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    const verificationCode = code.join('')
    if (verificationCode.length !== 12) {
      alert('Please enter the full 12-digit code')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('https://school-fees-backend.onrender.com/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode })
      })

      const data = await response.json()

      if (response.ok) {
        alert('Account activated successfully!')
        navigate('/login')
      } else {
        alert(data.message || 'Verification failed')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Connection error')
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-submit when all fields are filled
  useEffect(() => {
    if (code.every(digit => digit !== '') && !isLoading) {
      handleSubmit()
    }
  }, [code])

  // Countdown timer logic
  useEffect(() => {
    let interval
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  const handleResendCode = async () => {
    if (!email) {
      alert('Please enter your email address to resend the code.')
      return
    }
    setIsResending(true)
    try {
      const response = await fetch('https://school-fees-backend.onrender.com/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await response.json()
      if (response.ok) {
        alert('Verification code resent successfully! Please check your email.')
        setTimer(60)
      } else {
        alert(data.message || 'Failed to resend code')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Connection error')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-600 p-4 relative" style={{ backgroundImage: `url(${futoBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-yellow-500 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-yellow-500">Verify Your Account</h2>
          <p className="text-gray-300 mt-2">Enter the activation code sent to your email</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none placeholder-gray-500" placeholder="student@futo.edu.ng" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-300">Activation Code</label>
              <button 
                type="button" 
                onClick={handlePasteClick}
                className="text-xs text-yellow-500 hover:text-yellow-400 font-medium flex items-center gap-1"
              >
                Paste Code
              </button>
            </div>
            <div className="relative">
              <div className={`grid grid-cols-12 gap-1 ${isLoading ? 'opacity-50' : ''}`}>
                {code.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    ref={el => inputRefs.current[index] = el}
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    onFocus={e => e.target.select()}
                    disabled={isLoading}
                    className="w-full h-12 bg-gray-800 border border-gray-700 text-white rounded-lg text-center text-lg font-bold focus:ring-2 focus:ring-yellow-500 outline-none disabled:bg-gray-700"
                    required={index === 0} // Only first is strictly required for HTML validation, logic handles the rest
                  />
                ))}
              </div>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">Enter the 12-digit code sent to your email</p>
          </div>

          <button disabled={isLoading} type="submit" className="w-full bg-yellow-500 text-gray-900 py-3 rounded-lg font-bold hover:bg-yellow-400 transition">
            {isLoading ? 'Verifying...' : 'Activate Account'}
          </button>

          <div className="text-center mt-4">
            <button 
              type="button" 
              onClick={handleResendCode} 
              disabled={isResending || isLoading || timer > 0}
              className="text-sm text-yellow-500 hover:text-yellow-400 font-medium disabled:opacity-50"
            >
              {isResending ? 'Resending Code...' : timer > 0 ? `Resend in ${timer}s` : 'Resend Verification Code'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VerifyEmail