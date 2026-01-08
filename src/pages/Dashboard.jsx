
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaCreditCard, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { usePaystackPayment } from 'react-paystack';
import html2pdf from 'html2pdf.js';

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    regNo: '',
    department: '',
    faculty: '',
    email: ''
  });
  const [generatedRRR, setGeneratedRRR] = useState(null);
  
  // --- DYNAMIC FEE STATE ---
  const [schoolFeeAmount, setSchoolFeeAmount] = useState(45500); // Default to 45500 to ensure payment always works
  const [paymentHistoryKey, setPaymentHistoryKey] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null); // Track which level is being paid for
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [startPayment, setStartPayment] = useState(false); // Trigger for auto-payment
  const navigate = useNavigate();

  // 1. FETCH CURRENT FEE FROM BACKEND
  useEffect(() => {
    const fetchCurrentFee = async () => {
      try {
        // Updated to your Render backend URL
        const response = await fetch('https://school-fees-backend.onrender.com/api/fees/current');
        if (response.ok) {
          const data = await response.json();
          // Assuming backend returns { amount: 50000 }
          setSchoolFeeAmount(Number(data.amount));
        }
      } catch (err) {
        console.error("Failed to load current school fees from server", err);
        setSchoolFeeAmount(45500); // Fallback to default if server fails
      }
    };
    fetchCurrentFee();
  }, []);

  // --- LEVELS CONFIGURATION ---
  const ACADEMIC_LEVELS = [
    { id: 1, name: 'Year 1', level: '100L', session: '2021/2022' },
    { id: 2, name: 'Year 2', level: '200L', session: '2022/2023' },
    { id: 3, name: 'Year 3', level: '300L', session: '2023/2024' },
    { id: 4, name: 'Year 4', level: '400L', session: '2024/2025' },
    { id: 5, name: 'Year 5', level: '500L', session: '2025/2026' },
  ];

  // --- CALCULATE TOTAL WITH CHARGES ---
  // Formula to pass charges to customer: (Amount + 100) / (1 - 0.015)
  const calculatePayableAmount = (amount) => {
    const numAmount = Number(amount);
    if (!numAmount) return 0;
    const flatFee = numAmount < 2500 ? 0 : 100;
    const percentage = 0.015;
    const total = (numAmount + flatFee) / (1 - percentage);
    return Math.ceil(total);
  };

  const totalPayable = calculatePayableAmount(schoolFeeAmount);
  const transactionCharge = totalPayable - schoolFeeAmount;

  // Paystack Configuration
  const config = {
    reference: generatedRRR,
    email: student?.email || 'student@futo.edu.ng',
    amount: totalPayable * 100, // Converts Total Payable to Kobo
    publicKey: 'pk_live_5f4795138121fbd707356a40a66cdd5de83bc05d', 
  };

  const initializePayment = usePaystackPayment(config);

  // --- UNIVERSAL AUTH LOGIC: BRIDGING MANUAL & GOOGLE ---
  useEffect(() => {
    const checkUserAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          // Using /api/student/profile as it supports Bearer token auth
          // const response = await fetch('https://school-fees-backend.onrender.com/api/student/profile', {
          //   headers: {
          //     'Authorization': `Bearer ${token}`,
          //     'Content-Type': 'application/json'
          //   }
          // });
          const response = await fetch('https://school-fees-backend.onrender.com/api/student/profile', {
           method: 'GET',
          headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json'
          },
           credentials: 'include' // Add this line!
            });
          if (response.ok) {
            const data = await response.json();
            setStudent(data);
            setFormData(data);
            return;
          }
        } catch (err) {
          console.error("Token auth failed", err);
        }
      }

      try {
        const sessionResponse = await fetch('https://school-fees-backend.onrender.com/api/auth/me', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        if (sessionResponse.ok) {
          const sessionData = await sessionResponse.json();
          setStudent(sessionData);
          setFormData(sessionData);
          localStorage.setItem('user', JSON.stringify(sessionData));
          if (sessionData.token) {
            localStorage.setItem('token', sessionData.token);
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Session check failed", error);
        navigate('/login');
      }
    };

    checkUserAuth();
  }, [navigate]);

 // Payment Handlers
//   const onPaystackSuccess = async (reference) => {
//   setIsPaymentLoading(true); // Keep loader active during backend sync

//   try {
//     const paymentData = {
//       regNo: student.regNo,
//       level: selectedLevel?.level || "Unknown",
//       amountPaid: schoolFeeAmount, 
//       reference: reference.reference
//     };

//     const response = await fetch('https://school-fees-backend.onrender.com/api/fees/mark-as-paid', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(paymentData)
//     });

//     if (response.ok) {
//       // Success! The page will reload and the new payment will show
//       window.location.reload(); 
//     } else {
//       setIsPaymentLoading(false);
//       const result = await response.json();
//       alert(`Error: ${result.message}`);
//     }
//   } catch (error) {
//     setIsPaymentLoading(false);
//     alert("Connection lost. Please keep your reference: " + reference.reference);
//   }
// };
const onPaystackSuccess = async (reference) => {
  // 1. Show the "Verifying" green screen
  setIsPaymentLoading(true); 

  try {
    // 2. Prepare the data to send to the backend
    const paymentData = {
      regNo: student.regNo, // Taken from your profile
      level: selectedLevel?.level, // e.g., "100L"
      amountPaid: schoolFeeAmount, 
      reference: reference.reference // The code Paystack just gave you
    };

    // 3. The FETCH call (The Bridge)
    const response = await fetch('https://school-fees-backend.onrender.com/api/fees/mark-as-paid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });

    // 4. Check if the server said "OK"
    if (response.ok) {
      // Reload the page so the "Paid" badge and Receipt appear
      window.location.reload(); 
    } else {
      const errorData = await response.json();
      alert("Server Error: " + errorData.message);
    }
  } catch (error) {
    // This runs if the internet fails or the server is down
    console.error("Connection failed:", error);
    alert("Connection lost, but your payment was successful. Please refresh the page manually.");
  } finally {
    // 5. ALWAYS remove the loading screen, even if there was an error
    setIsPaymentLoading(false);
  }
};
  // --- AUTO-TRIGGER PAYMENT EFFECT ---
  // This watches for the startPayment flag and opens Paystack automatically
  useEffect(() => {
    if (startPayment && generatedRRR && totalPayable > 0) {
      console.log("Initializing Paystack with:", { generatedRRR, totalPayable });
      initializePayment(
        (reference) => { 
          setIsPaymentLoading(false); 
          onPaystackSuccess(reference); 
        },
        () => { 
          setIsPaymentLoading(false); 
          setGeneratedRRR(null); // Reset on cancel so user can try again
          alert("Transaction Cancelled"); 
        }
      );
      setStartPayment(false);
    } else if (startPayment && totalPayable <= 0) {
      alert("Error: Invalid payment amount. Please refresh the page.");
      setIsPaymentLoading(false);
      setStartPayment(false);
    }
  }, [startPayment, generatedRRR, initializePayment, totalPayable]);

  const handleGenerateRRR = () => {
    const rrr = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    setGeneratedRRR(rrr);
  };

  // Handle initiating payment for a specific level
  const initiateLevelPayment = (levelObj) => {
    setSelectedLevel(levelObj);
    handleGenerateRRR();
    setIsPaymentLoading(true); // Show loading immediately
    setStartPayment(true);     // Trigger the useEffect to open Paystack
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('receipt-container');
    const opt = {
      margin: 10,
      filename: `FUTO_Receipt_${receiptDetails?.reference}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://school-fees-backend.onrender.com/api/student/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const data = await response.json();
        setStudent(data.student || { ...student, ...formData });
        setIsEditing(false);
        alert('Profile updated!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      alert('Error updating profile.');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'https://school-fees-backend.onrender.com/logout';
  };

  // Helper to check if a level is paid
  const isLevelPaid = (levelCode) => {
    // Assuming student.paymentHistory exists or we check against a fetched history list
    return student?.payments?.some(payment => payment.level === levelCode || payment.session === levelCode);
  };

  return (
    <div className="font-sans text-gray-800 min-h-screen bg-gray-50 flex">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #receipt-container, #receipt-container * { visibility: visible; }
          #receipt-container { position: absolute; left: 0; top: 0; width: 100%; min-height: 100vh; margin: 0; padding: 0; box-shadow: none; z-index: 9999; background: white; }
          .no-print { display: none !important; }
        }
      `}</style>
      {/* Sidebar */}
      <aside className={`w-64 bg-green-800 text-white fixed inset-y-0 left-0 flex flex-col shadow-lg transition-transform duration-300 z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-5 text-center bg-green-900 border-b border-green-700 flex justify-between items-center md:block">
          <h2 className="text-xl font-bold">FUTO PAY</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white"><FaTimes /></button>
        </div>

        <div className="p-4 border-b border-green-700 text-center">
          <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center text-green-800 font-bold text-2xl">
            {student?.fullName?.charAt(0) || 'S'}
          </div>
          <p className="text-sm font-semibold truncate">{student?.fullName || 'Student'}</p>
        </div>

        <ul className="list-none p-0 m-0 flex-1 overflow-y-auto">
          <li>
            <button onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }} className={`w-full flex items-center py-4 px-5 ${activeTab === 'dashboard' ? 'bg-yellow-400 text-green-900 font-semibold' : 'text-green-100 hover:bg-green-700'}`}>
              <FaTachometerAlt className="mr-3" /> Dashboard
            </button>
          </li>
          <li>
            <button onClick={() => { setActiveTab('profile'); setIsSidebarOpen(false); }} className={`w-full flex items-center py-4 px-5 ${activeTab === 'profile' ? 'bg-yellow-400 text-green-900 font-semibold' : 'text-green-100 hover:bg-green-700'}`}>
              <FaUsers className="mr-3" /> Profile
            </button>
          </li>
          <li>
            <button onClick={() => { setActiveTab('fees'); setIsSidebarOpen(false); }} className={`w-full flex items-center py-4 px-5 ${activeTab === 'fees' ? 'bg-yellow-400 text-green-900 font-semibold' : 'text-green-100 hover:bg-green-700'}`}>
              <FaCreditCard className="mr-3" /> School Fees
            </button>
          </li>
        </ul>

        <div className="p-4 border-t border-green-700">
          <button onClick={handleSignOut} className="w-full flex items-center py-2 px-3 text-green-100 hover:bg-green-700 rounded transition">
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        {/* Mobile Header */}
        <div className="md:hidden bg-green-800 text-white p-4 flex justify-between items-center shadow-md">
          <span className="font-bold text-lg">FUTO PAY</span>
          <button onClick={() => setIsSidebarOpen(true)}><FaBars className="text-xl" /></button>
        </div>

        <main className="p-6 flex-grow">
          <div className="max-w-7xl mx-auto w-full">
            {/* --- PROFILE INCOMPLETE ALERT --- */}
            {student && (!student.regNo || student.regNo.includes("NOT_SET")) && activeTab !== 'profile' && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 shadow-sm rounded-r-lg">
              <div className="flex items-center">
                <div className="py-1"><FaUsers className="text-yellow-500 text-2xl mr-4" /></div>
                <div>
                  <p className="font-bold text-yellow-800">Action Required: Complete Your Profile</p>
                  <p className="text-sm text-yellow-700">
                    To enable fee payments, please set your Registration Number in the{' '}
                    <button onClick={() => setActiveTab('profile')} className="underline font-bold hover:text-yellow-900">
                      Profile Tab
                    </button>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Welcome, {student?.fullName?.split(' ')[0] || 'Student'}!</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="text-blue-800 font-bold mb-1">Current Session</h3>
                  <p className="text-2xl font-bold text-blue-600">2025/2026</p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                  <h3 className="text-green-800 font-bold mb-1">Semester</h3>
                  <p className="text-2xl font-bold text-green-600">Harmattan</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                  <h3 className="text-purple-800 font-bold mb-1">Total Fees Paid</h3>
                  <p className="text-2xl font-bold text-purple-600">₦{(student?.payments?.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && student && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200">
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reg Number</label>
                      <input type="text" name="regNo" value={formData.regNo} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-yellow-600 transition">Save Changes</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Full Name</p>
                    <p className="text-lg font-medium text-gray-900">{student.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Reg Number</p>
                    <p className="text-lg font-medium text-gray-900">{student.regNo && !student.regNo.includes("NOT_SET") ? student.regNo : <span className="text-red-500 italic">Not Set</span>}</p>
                  </div>
                </div>
              )}
            </div>
          )}

         {/* Fees Tab */}
{activeTab === 'fees' && (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6">School Fees Payment</h2>
      {isPaymentLoading && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-green-900/80 backdrop-blur-sm text-white">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-bold">Verifying Transaction...</h2>
          <p className="text-green-100">Please do not refresh or close this page.</p>
        </div>
      )}
      <div className="grid gap-4">
        {ACADEMIC_LEVELS.map((lvl) => {
          // Check if this specific level is already paid
          const paid = isLevelPaid(lvl.level);
          const isSelected = selectedLevel?.id === lvl.id;
          const isLoadingThis = isSelected && isPaymentLoading;

          return (
            <div key={lvl.id} className={`flex flex-col md:flex-row justify-between md:items-center p-4 border rounded-xl transition gap-4 ${paid ? 'bg-gray-50 border-green-100' : 'hover:shadow-md bg-white border-gray-100'}`}>
              <div className="w-full md:w-auto">
                <h3 className={`font-bold text-lg ${paid ? 'text-gray-500' : 'text-gray-800'}`}>
                  {lvl.name} ({lvl.level})
                </h3>
                <p className="text-gray-500 text-sm">Session: {lvl.session}</p>
                {paid && (
                  <span className="mt-2 inline-block text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                    VERIFIED IN RECORDS
                  </span>
                )}
              </div>

              <div className="w-full md:w-auto">
                <button 
                  // Logic: Disable if already paid OR if another payment is loading
                  disabled={paid || isPaymentLoading}
                  onClick={() => initiateLevelPayment(lvl)} 
                  className={`w-full md:w-auto px-6 py-2 rounded-lg font-medium transition flex items-center justify-center min-w-[140px] ${
                    paid 
                      ? "bg-gray-400 cursor-not-allowed text-white" 
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  }`}
                >
                  {isLoadingThis ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    paid ? "Already Paid" : "Pay Now"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    
    {/* Payment Records Table Section */}
    {student && (
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Payment Records (Evidence)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold sticky top-0 z-10">
              <tr>
                <th className="p-4 whitespace-nowrap">Year/Level</th>
                <th className="p-4 whitespace-nowrap">Reference</th>
                <th className="p-4 whitespace-nowrap">Amount</th>
                <th className="p-4 whitespace-nowrap">Status</th>
                <th className="p-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {student?.payments?.length > 0 ? (
                student.payments.map((p, index) => (
                  <tr key={index} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4 font-bold whitespace-nowrap">{p.level}</td>
                    <td className="p-4 text-sm text-gray-500 font-mono whitespace-nowrap">{p.reference}</td>
                    <td className="p-4 font-bold whitespace-nowrap">₦{Number(p.amount).toLocaleString()}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold">SUCCESSFUL</span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <button 
                        onClick={() => { 
                          const amt = Number(p.amount);
                          const total = calculatePayableAmount(amt);
                          const charges = total - amt;
                          setReceiptDetails({ 
                            ...p, 
                            date: new Date(p.date || Date.now()).toLocaleDateString(),
                            baseAmount: amt,
                            charges: charges,
                            amount: total
                          }); 
                          setShowReceipt(true); 
                        }} 
                        className="text-blue-600 hover:text-blue-800 underline font-medium text-sm"
                      >
                        Get Receipt
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-gray-400 italic">
                    No payments found in school records.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
)}
          </div>

          {/* SUCCESS RECEIPT MODAL */}
          {showReceipt && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
              <div id="receipt-container" className="bg-white p-8 rounded-xl max-w-2xl w-full shadow-2xl relative border-t-8 border-green-800">
                <div className="text-center border-b-2 border-gray-100 pb-6 mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-green-900">FEDERAL UNIVERSITY OF TECHNOLOGY OWERRI</h1>
                  <p className="text-gray-600 font-bold mt-1 tracking-widest text-sm">OFFICE OF THE BURSAR</p>
                  <div className="mt-4 inline-block border-b-2 border-green-800 pb-1">
                    <h2 className="text-xl font-bold uppercase">School Fees Receipt</h2>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-8">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Student Name</p>
                    <p className="font-bold text-lg">{student?.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Reg Number</p>
                    <p className="font-bold text-lg">{student?.regNo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Department</p>
                    <p className="font-bold text-lg">{student?.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Faculty</p>
                    <p className="font-bold text-lg">{student?.faculty || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Session</p>
                    <p className="font-bold text-lg">{receiptDetails?.session}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Date Paid</p>
                    <p className="font-bold text-lg">{receiptDetails?.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Transaction Reference (RRR)</p>
                    <p className="font-mono font-bold text-lg tracking-wider">{receiptDetails?.reference}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Payment Breakdown</p>
                    <p className="text-sm text-gray-600">Fee: ₦{receiptDetails?.baseAmount?.toLocaleString()} + Chg: ₦{receiptDetails?.charges?.toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border border-green-100 flex flex-col md:flex-row justify-between items-center mb-8">
                  <span className="font-bold text-green-800 text-sm uppercase tracking-wider mb-2 md:mb-0">Total Amount Paid</span>
                  <span className="font-bold text-3xl text-green-800">₦ {receiptDetails?.amount?.toLocaleString()}.00</span>
                </div>

                <div className="text-center mt-8 no-print flex flex-col md:flex-row gap-4 justify-center">
                  <button onClick={() => window.print()} className="bg-green-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-800 shadow-lg transition flex items-center justify-center">
                    <span className="mr-2">🖨️</span> Print Receipt
                  </button>
                  <button onClick={handleDownloadPDF} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg transition flex items-center justify-center">
                    <span className="mr-2">⬇️</span> Download PDF
                  </button>
                  <button onClick={() => setShowReceipt(false)} className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-300 transition w-full md:w-auto">
                    Close
                  </button>
                </div>
                
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
                  <span className="text-9xl font-bold -rotate-45 whitespace-nowrap">FUTO PAID</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;