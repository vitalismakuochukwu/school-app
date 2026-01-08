import React, { useState, useEffect } from 'react';

const PaymentHistory = ({ regNo }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://school-fees-backend.onrender.com/api/student/payments/${regNo}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPayments(data);
      } catch (e) {
        console.error("Could not fetch payment history:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [regNo]);

  if (loading) return <div className="text-center">Loading payment history...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="font-semibold text-gray-700 mb-4">Payment History</h3>
      {payments.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-sm font-medium text-gray-600 p-2">Session</th>
              <th className="text-sm font-medium text-gray-600 p-2">Amount Paid</th>
              <th className="text-sm font-medium text-gray-600 p-2">Reference</th>
              <th className="text-sm font-medium text-gray-600 p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2">{payment.session}</td>
                <td className="p-2">₦{payment.amountPaid.toLocaleString()}</td>
                <td className="p-2">{payment.reference}</td>
                <td className="p-2">{new Date(payment.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-gray-500">No payment history available.</div>
      )}
    </div>
  );
};

export default PaymentHistory;