import { useState, useEffect } from "react";
import { useGlobalState } from "../context/GlobalState";
import { getPaymentsByRoomId } from "../api/payment";
import { fetchRoomUsers } from "../api/Dashboard";

function TransactionLog() {
  const { room } = useGlobalState();
  const [payments, setPayments] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadMembers = async () => {
      if (room) {
        try {
          const membersData = await fetchRoomUsers(room.id);
          setMembers(membersData);
        } catch (error) {
          console.error("Error fetching members:", error);
        }
      }
    };
    loadMembers();
  }, [room]);

  useEffect(() => {
    const loadPayments = async () => {
      if (room) {
        setLoading(true);
        setError(null);
        try {
          const paymentsData = await getPaymentsByRoomId(room.id, currentPage, itemsPerPage);
          
          // Handle different API response formats
          if (paymentsData.content) {
            // Paginated response
            setPayments(paymentsData.content);
            setTotalPages(paymentsData.totalPages || 1);
          } else if (Array.isArray(paymentsData)) {
            // Array response
            setPayments(paymentsData);
            setTotalPages(Math.ceil(paymentsData.length / itemsPerPage) || 1);
          } else {
            // Single object or other format
            setPayments([]);
            setTotalPages(1);
          }

        } catch (error) {
          console.error("Error fetching payments:", error);
          setError("Failed to load transaction data");
          setPayments([]);
          setTotalPages(1);
        } finally {
          setLoading(false);
        }
      }
    };
    loadPayments();
  }, [room, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getMemberName = (userId) => {
    const member = members.find(m => m.id === userId);
    return member?.name || 'Unknown';
  };

  const getRecipients = (payment) => {
    if (payment.recipients && payment.recipients.length > 0) {
      return payment.recipients.map(recipient => getMemberName(recipient.userId)).join(', ');
    }
    return 'All members';
  };

  if (!room) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <div className="text-xl font-semibold mb-2">No Room Selected</div>
          <div>Please select a room to view transaction history</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col p-6">
      {/* Header */}
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Transaction Log</h1>
        <p className="text-gray-600">Complete transaction history for {room.name}</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-green-700 to-black p-4 flex-shrink-0">
          <h2 className="text-xl font-bold text-white">Transaction History</h2>
          <p className="text-green-100 text-sm">Page {currentPage + 1} of {totalPages || 1}</p>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64 text-red-500">
              <div className="text-center">
                <div className="text-4xl mb-2">⚠️</div>
                <div>{error}</div>
              </div>
            </div>
          ) : (
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-800 text-white">
                <tr>
                  <th className="p-4 text-left font-semibold">Date</th>
                  <th className="p-4 text-left font-semibold">Time</th>
                  <th className="p-4 text-left font-semibold">Payer</th>
                  <th className="p-4 text-left font-semibold">Recipients</th>
                  <th className="p-4 text-left font-semibold">Description</th>
                  <th className="p-4 text-left font-semibold">Amount</th>
                  <th className="p-4 text-left font-semibold">Type</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? payments.map((payment, index) => (
                  <tr key={payment.paymentId || index} className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-4">
                      <div className="font-medium text-gray-800">
                        {new Date(payment.paymentTimestamp).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-600">
                        {new Date(payment.paymentTimestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-800">
                        {getMemberName(payment.fromUserId)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-700 max-w-xs truncate" title={getRecipients(payment)}>
                        {getRecipients(payment)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-700 max-w-xs truncate" title={payment.description || 'No description'}>
                        {payment.description || 'No description'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-green-600">
                        ${payment.amount}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        payment.isRepayment 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {payment.isRepayment ? 'Repayment' : 'Payment'}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="p-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <div className="text-6xl mb-4">💳</div>
                        <div className="text-xl font-semibold mb-2">No Transactions Found</div>
                        <div>No payment records available for this room</div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing page {currentPage + 1} of {totalPages || 1}
              {payments.length > 0 && (
                <span className="ml-2">
                  ({payments.length} transactions on this page)
                </span>
              )}
              <div className="text-xs text-gray-500 mt-1">
                Debug: Page {currentPage}, Total {totalPages}, Has Previous: {currentPage > 0 ? 'Yes' : 'No'}, Has Next: {currentPage < totalPages - 1 ? 'Yes' : 'No'}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-600 text-white hover:bg-gray-700 transform hover:scale-105'
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1 || totalPages === 0}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage >= totalPages - 1 || totalPages === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionLog;