// // 
// import React, { useState, useEffect } from 'react'
// import { Link, useNavigate, useLocation } from 'react-router-dom'

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false)
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [isLoading, setIsLoading] = useState(false)

//   // 1. Check if user just logged in via Google
//   // Note: For sessions, the backend sets a cookie. We usually hit a /me endpoint 
//   // to verify the session, but for now, we'll assume a successful redirect to /dashboard works.
  
//   const handleLogin = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     try {
//       const response = await fetch('https://school-fees-backend.onrender.com/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       })
      
//       const data = await response.json()
      
//       if (response.ok) {
//         localStorage.setItem('token', data.token) // For manual login
//         localStorage.setItem('user', JSON.stringify(data.user))
//         navigate('/dashboard')
//       } else {
//         alert(data.message || 'Login failed')
//         setIsLoading(false)
//       }
//     } catch (error) {
//       console.error('Login Error:', error)
//       alert('An error occurred. Please check your connection.')
//       setIsLoading(false)
//     }
//   }

//   const handleGoogleLogin = () => {
//     setIsLoading(true);
//     // Direct link to backend - Google handles the rest
//     window.location.href = 'https://school-fees-backend.onrender.com/auth/google';
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-yellow-500">
//         <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Student Login</h2>
//         <p className="text-center text-gray-500 mb-8">Access your portal to pay fees</p>
        
//         <form className="space-y-6" onSubmit={handleLogin}>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Email Address</label>
//             <input 
//               type="email" 
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="student@futo.edu.ng"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             />
//           </div>
          
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Password</label>
//             <div className="relative">
//               <input 
//                 type={showPassword ? "text" : "password"} 
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//           </div>
          
//           <button type="submit" disabled={isLoading} className={`w-full flex justify-center items-center bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition shadow-md ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}>
//             {isLoading ? "Loading..." : 'Login'}
//           </button>
//         </form>
        
//         <div className="mt-6">
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">Or continue with</span>
//             </div>
//           </div>

//           <button onClick={handleGoogleLogin} className="mt-6 w-full flex justify-center items-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-yellow-50 hover:border-yellow-500 hover:text-yellow-700 transition shadow-sm">
//             <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
//             Sign in with Google
//           </button>
//         </div>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600 mb-2">
//             Don't have an account? <Link to="/register" className="text-yellow-600 hover:underline font-medium">Register</Link>
//           </p>
//           <Link to="/" className="text-yellow-600 hover:underline text-sm">Back to Home</Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  // 1. Manual Login (Email/Password)
  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('https://school-fees-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('token', data.token) 
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard')
      } else {
        alert(data.message || 'Login failed')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Login Error:', error)
      alert('An error occurred. Please check your connection.')
      setIsLoading(false)
    }
  }

  // 2. SEAMLESS GOOGLE LOGIN (The part you wanted updated)
  const handleGoogleLogin = () => {
    setIsLoading(true);
    // This sends the user to your backend, which then kicks them to Google account selector
    // After they pick an email, the backend redirects them automatically to /dashboard
    window.location.href = "https://school-fees-backend.onrender.com/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-yellow-500">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Student Login</h2>
        <p className="text-center text-gray-500 mb-8">Access your portal to pay fees</p>
        
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@futo.edu.ng"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          
          <button type="submit" disabled={isLoading} className={`w-full flex justify-center items-center bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition shadow-md ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}>
            {isLoading ? "Loading..." : 'Login'}
          </button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* UPDATED GOOGLE BUTTON */}
          <button 
            type="button"
            onClick={handleGoogleLogin} 
            disabled={isLoading}
            className="mt-6 w-full flex justify-center items-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-yellow-50 hover:border-yellow-500 hover:text-yellow-700 transition shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            {isLoading ? "Redirecting..." : "Sign in with Google"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Don't have an account? <Link to="/register" className="text-yellow-600 hover:underline font-medium">Register</Link>
          </p>
          <Link to="/" className="text-yellow-600 hover:underline text-sm">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default Login