import { useEffect, useState } from 'react';
import { useGlobalState } from "../context/GlobalState";
import { useCurrency } from "../context/CurrencyContext";
import { fetchRoomUsers} from '../api/Dashboard';
import { createPayment } from '../api/payment';
import { getOwner } from '../api/user';
import { useNavigate } from "react-router-dom";

function RePayment() {
    const { currency } = useCurrency();

    
    const [payer, setPayer] = useState(null);
    const [payee, setPayee] = useState(null);
    const [totalValue, setTotalValue] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [roomUsers, setRoomUsers] = useState([]);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const { room, setRoom } = useGlobalState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOwner = async () => {
          try {
            const owner = await getOwner();
            setPayer(owner);
          } catch (error) {
            console.error("Failed to fetch room users", error);
          }
        };
      
        fetchOwner();
      }, []);


    useEffect(() => {
      if (!room || !room.id) {
        console.warn("Room is not available, redirecting...");
        navigate('/dashboardAdmin');  // Redirect user if room is not available
        return;
      }
      const getRoomUsers = async () => {
          try {
            const users = await fetchRoomUsers(room.id);
            setRoomUsers(users);
          } catch (error) {
            console.error("Failed to fetch room users", error);
            setError("Failed to fetch room users. Please try again.");
          }
        };
      
        getRoomUsers();
      }, []);
      
    const validateInputs = () => {
        const errors = {};
        
        if (!payer) {
            errors.payer = 'Please select a payer';
        }
        
        if (!payee) {
            errors.payee = 'Please select a payee';
        }
        
        if (payer && payee && payer.id === payee.id) {
            errors.payee = 'Payer and payee cannot be the same person';
        }
        
        if (!totalValue || totalValue <= 0) {
            errors.totalValue = 'Please enter a valid amount greater than 0';
        }
        
        if (!description.trim()) {
            errors.description = 'Please enter a description';
        }
        
        if (description.trim().length < 3) {
            errors.description = 'Description must be at least 3 characters long';
        }
        
        return errors;
    };

    
    const handlePaymentSubmit = async () => {
        const errors = validateInputs();
        setValidationErrors(errors);
        
        if (Object.keys(errors).length > 0) {
            setError("Please fix the validation errors below.");
            return;
        }

        setLoading(true);
        setError('');

        const paymentData = {
            roomId: room.id,
            totalAmount: parseFloat(totalValue),
            isRepayment: true,
            payerId: payer.id,
            recipientIds: [payee.id],
            description: description.trim(),
        };

        try {
            await createPayment(paymentData);
            setShowSuccessPopup(true);
            // Reset form
            setPayer(null);
            setPayee(null);
            setTotalValue('');
            setDescription('');
            setValidationErrors({});
            
            // Auto-hide success popup and navigate to home after 3 seconds
            setTimeout(() => {
                setShowSuccessPopup(false);
                navigate('/dashboardAdmin');
            }, 3000);
        } catch (err) {
            setError(err.message || "Failed to create re-payment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center p-4">
            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 transform animate-pulse">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Re-Payment Successful!</h3>
                            <p className="text-gray-600">Your re-payment has been created successfully.</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full max-w-4xl">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-black to-green-700 px-8 py-6">
                        <h2 className="text-3xl font-bold text-white text-center">Create Re-Payment</h2>
                        <p className="text-green-100 text-center mt-2">
                            Room: {room ? room.name : 'Loading...'}
                        </p>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Payer Section */}
                        <section className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <h3 className="text-xl font-semibold text-gray-800">Select Payer</h3>
                                <span className="text-red-500">*</span>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {roomUsers.map((user, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                                            payer && payer.id === user.id 
                                                ? 'bg-gradient-to-r from-black to-green-700 text-white border-green-700 shadow-lg transform scale-105' 
                                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50'
                                        }`}
                                        onClick={() => {
                                            setPayer(user);
                                            if (validationErrors.payer) {
                                                setValidationErrors(prev => ({...prev, payer: ''}));
                                            }
                                        }}
                                    >
                                        {user.name}
                                    </button>
                                ))}
                            </div>
                            {validationErrors.payer && (
                                <p className="text-red-500 text-sm">{validationErrors.payer}</p>
                            )}
                        </section>

                        {/* Payee Section */}
                        <section className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <h3 className="text-xl font-semibold text-gray-800">Select Payee</h3>
                                <span className="text-red-500">*</span>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {roomUsers.map((user, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                                            payee && payee.id === user.id
                                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-600 shadow-lg transform scale-105' 
                                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50'
                                        }`}
                                        onClick={() => {
                                            setPayee(user);
                                            if (validationErrors.payee) {
                                                setValidationErrors(prev => ({...prev, payee: ''}));
                                            }
                                        }}
                                    >
                                        {user.name}
                                    </button>
                                ))}
                            </div>
                            {validationErrors.payee && (
                                <p className="text-red-500 text-sm">{validationErrors.payee}</p>
                            )}
                        </section>

                        {/* Description Section */}
                        <section className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <label className="text-xl font-semibold text-gray-800">Description</label>
                                <span className="text-red-500">*</span>
                            </div>
                            <textarea
                                placeholder="Enter re-payment description (e.g., returning money for groceries, settling debt...)"
                                className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none resize-none ${
                                    validationErrors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                }`}
                                rows="3"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    if (validationErrors.description) {
                                        setValidationErrors(prev => ({...prev, description: ''}));
                                    }
                                }}
                            />
                            {validationErrors.description && (
                                <p className="text-red-500 text-sm">{validationErrors.description}</p>
                            )}
                        </section>

                        {/* Total Value Section */}
                        <section className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <label className="text-xl font-semibold text-gray-800">Total Amount</label>
                                <span className="text-red-500">*</span>
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                    {currency}
                                </span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className={`w-full pl-16 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none text-lg font-medium ${
                                        validationErrors.totalValue ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    }`}
                                    value={totalValue}
                                    onChange={(e) => {
                                        setTotalValue(e.target.value);
                                        if (validationErrors.totalValue) {
                                            setValidationErrors(prev => ({...prev, totalValue: ''}));
                                        }
                                    }}
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            {validationErrors.totalValue && (
                                <p className="text-red-500 text-sm">{validationErrors.totalValue}</p>
                            )}
                        </section>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="button"
                                className="w-full bg-gradient-to-r from-black to-green-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-gray-800 hover:to-green-800 transform hover:scale-[1.02] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                                onClick={handlePaymentSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing Re-Payment...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                        </svg>
                                        Create Re-Payment
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RePayment;
