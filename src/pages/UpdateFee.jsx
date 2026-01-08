// import React, { useState, useEffect } from 'react'

// const UpdateFee = () => {
//   const [amount, setAmount] = useState('')
//   const [secretKey, setSecretKey] = useState('')
//   const [showSecret, setShowSecret] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [currentFee, setCurrentFee] = useState(null)

//   useEffect(() => {
//     const fetchCurrentFee = async () => {
//       try {
//         const response = await fetch('https://school-fees-backend.onrender.com/api/fees/current')
//         const data = await response.json()
//         if (response.ok) {
//           setCurrentFee(data.amount)
//         }
//       } catch (error) {
//         console.error('Error fetching current fee:', error)
//       }
//     }
//     fetchCurrentFee()
//   }, [])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       // Updated endpoint to match backend route structure
//       const response = await fetch('https://school-fees-backend.onrender.com/api/admin/update', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ amount: Number(amount), secret: secretKey })
//       })

//       const data = await response.json()

//       if (response.ok) {
//         alert('School Fees updated successfully!')
//         setAmount('')
//         setCurrentFee(Number(amount))
//       } else {
//         alert(data.message || 'Failed to update fee')
//       }
//     } catch (error) {
//       console.error('Error:', error)
//       alert('Connection error')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Update School Fees</h2>
        
//         {currentFee !== null && (
//           <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 flex justify-between items-center">
//             <span className="text-sm font-medium uppercase">Current Fee:</span>
//             <span className="text-2xl font-bold">₦ {currentFee.toLocaleString()}</span>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">New Amount (₦)</label>
//             <input
//               type="number"
//               required
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
//               placeholder="e.g. 45500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Admin Secret Key</label>
//             <div className="relative">
//               <input
//                 type={showSecret ? "text" : "password"}
//                 required
//                 value={secretKey}
//                 onChange={(e) => setSecretKey(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
//                 placeholder="Enter secret key"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowSecret(!showSecret)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
//               >
//                 {showSecret ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
//                 ) : (
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//                 )}
//               </button>
//             </div>
//           </div>
//           <button disabled={isLoading} type="submit" className="w-full bg-yellow-600 text-white py-3 rounded-lg font-bold hover:bg-yellow-700 transition">
//             {isLoading ? 'Updating...' : 'Update Price'}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default UpdateFee

import React, { useState, useEffect } from 'react'

const UpdateFee = () => {
  const [amount, setAmount] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [showSecret, setShowSecret] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentFee, setCurrentFee] = useState(null)

  // 1. Fetch current fee to display in the blue box
  useEffect(() => {
    const fetchCurrentFee = async () => {
      try {
        const response = await fetch('https://school-fees-backend.onrender.com/api/fees/current')
        
        if (!response.ok) throw new Error('Route not found');

        const data = await response.json()
        setCurrentFee(data.amount)
      } catch (error) {
        console.error('Error fetching current fee:', error)
      }
    }
    fetchCurrentFee()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('https://school-fees-backend.onrender.com/api/admin/update-fee', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        // UPDATED: Added level to match your MongoDB requirement
        body: JSON.stringify({ 
          amount: Number(amount), 
          secret: secretKey,
          level: "Year 1" // <--- This fixes the "level is required" error
        })
      })

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we didn't get JSON from the server!");
      }

      const data = await response.json()

      if (response.ok) {
        alert('School Fees updated successfully!')
        
        // AUTOMATIC UI UPDATE: Update the blue box immediately
        setCurrentFee(Number(amount))
        setAmount('')
        setSecretKey('')
      } else {
        alert(data.message || 'Failed to update fee')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Connection error: Make sure your backend files are pushed and secrets are set!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin: Update Fees</h2>
        
        {currentFee !== null && (
          <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 flex justify-between items-center">
            <span className="text-sm font-medium uppercase">Current System Fee:</span>
            <span className="text-2xl font-bold">₦ {currentFee.toLocaleString()}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Amount (₦)</label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              placeholder="e.g. 45500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Secret Key</label>
            <div className="relative">
              <input
                type={showSecret ? "text" : "password"}
                required
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                placeholder="Enter secret key"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showSecret ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button 
            disabled={isLoading} 
            type="submit" 
            className="w-full bg-yellow-600 text-white py-3 rounded-lg font-bold hover:bg-yellow-700 transition disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Update Price'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateFee