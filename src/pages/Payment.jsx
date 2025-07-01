import { useEffect, useState } from 'react';
import { useGlobalState } from "../context/GlobalState";
import { useCurrency } from "../context/CurrencyContext";
import { fetchRoomUsers} from '../api/Dashboard';
import { createPayment } from '../api/payment';
import { getOwner } from '../api/user';
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastProvider";

function Payment() {
    const { currency } = useCurrency();
    const { showSuccess, showError, showWarning } = useToast();
    
    const [payer, setPayer] = useState(null);
    const [recipients, setRecipients] = useState([]);
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
            showError("Failed to load user information. Please refresh the page and try again.");
          }
        };
      
        fetchOwner();
      }, []);


    useEffect(() => {
      if (!room || !room.id) {
        showWarning("No room selected. Redirecting to dashboard...");
        navigate('/dashboardAdmin');  // Redirect user if room is not available
        return;
      }
      const getRoomUsers = async () => {
          try {
            const users = await fetchRoomUsers(room.id);
            setRoomUsers(users);
          } catch (error) {
            showError("Failed to load room members. Please refresh the page and try again.");
            setError("Failed to fetch room users. Please try again.");
          }
        };
      
        getRoomUsers();
      }, []);
      
    const handleSetRecipients = (user) => {
        if (recipients.some(recipient => recipient.id === user.id)) {
            setRecipients(recipients.filter((recipient) => recipient.id !== user.id));
        } else {
            setRecipients([...recipients, user]);
        }
        // Clear validation error when user makes a selection
        if (validationErrors.recipients) {
            setValidationErrors(prev => ({...prev, recipients: ''}));
        }
    };

    const validateInputs = () => {
        const errors = {};
        
        if (!payer) {
            errors.payer = 'Please select a payer';
        }
        
        if (recipients.length === 0) {
            errors.recipients = 'Please select at least one recipient';
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
            isRepayment: false,
            payerId: payer.id,
            recipientIds: recipients.map((recipient) => recipient.id),
            description: description.trim(),
        };

        try {
            await createPayment(paymentData);
            setShowSuccessPopup(true);
            // Reset form
            setPayer(null);
            setRecipients([]);
            setTotalValue('');
            setDescription('');
            setValidationErrors({});
            
            // Auto-hide success popup and navigate to home after 3 seconds
            setTimeout(() => {
                setShowSuccessPopup(false);
                navigate('/dashboardAdmin');
            }, 3000);
        } catch (err) {
            setError(err.message || "Failed to create payment");
        } finally {
            setLoading(false);
        }
    };

    // Add keyboard event handler for Enter key
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter' && !loading) {
                event.preventDefault();
                handlePaymentSubmit();
            }
        };

        // Add event listener
        document.addEventListener('keydown', handleKeyPress);

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [loading, payer, recipients, totalValue, description, room]);

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
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
                            <p className="text-gray-600">Your payment has been created successfully.</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full max-w-4xl">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-black to-green-700 px-4 sm:px-8 py-4 sm:py-6">
                        <h2 className="text-xl sm:text-3xl font-bold text-white text-center">Create Payment</h2>
                        <p className="text-green-100 text-center mt-2 text-sm sm:text-base">
                            Room: {room ? room.name : 'Loading...'}
                        </p>
                    </div>

                    <div className="p-4 sm:p-8 space-y-4 sm:space-y-8">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
                                {error}
                            </div>
                        )}

                        {/* Payer Section */}
                        <section className="space-y-2 sm:space-y-4">
                            <div className="flex items-center space-x-2">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Select Payer</h3>
                                <span className="text-red-500">*</span>
                            </div>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                                {roomUsers.map((user, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`p-2 sm:p-4 rounded-xl border-2 transition-all duration-200 text-xs sm:text-sm font-medium cursor-pointer ${
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
                                <p className="text-red-500 text-xs sm:text-sm">{validationErrors.payer}</p>
                            )}
                        </section>

                        {/* Recipients Section */}
                        <section className="space-y-2 sm:space-y-4">
                            <div className="flex items-center space-x-2">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Select Recipients</h3>
                                <span className="text-red-500">*</span>
                                <span className="text-xs sm:text-sm text-gray-500">({recipients.length} selected)</span>
                            </div>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                                {roomUsers.map((user, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`p-2 sm:p-4 rounded-xl border-2 transition-all duration-200 text-xs sm:text-sm font-medium cursor-pointer ${
                                            recipients.some(recipient => recipient.id === user.id)
                                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-600 shadow-lg transform scale-105' 
                                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50'
                                        }`}
                                        onClick={() => handleSetRecipients(user)}
                                    >
                                        {user.name}
                                    </button>
                                ))}
                            </div>
                            {validationErrors.recipients && (
                                <p className="text-red-500 text-xs sm:text-sm">{validationErrors.recipients}</p>
                            )}
                        </section>

                        {/* Description Section */}
                        <section className="space-y-2 sm:space-y-4">
                            <div className="flex items-center space-x-2">
                                <label className="text-lg sm:text-xl font-semibold text-gray-800">Description</label>
                                <span className="text-red-500">*</span>
                            </div>
                            <textarea
                                placeholder="Enter payment description (e.g., groceries, rent, utilities...)"
                                className={`w-full p-3 sm:p-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none resize-none text-sm sm:text-base ${
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
                                <p className="text-red-500 text-xs sm:text-sm">{validationErrors.description}</p>
                            )}
                        </section>

                        {/* Total Value Section */}
                        <section className="space-y-2 sm:space-y-4">
                            <div className="flex items-center space-x-2">
                                <label className="text-lg sm:text-xl font-semibold text-gray-800">Total Amount</label>
                                <span className="text-red-500">*</span>
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-sm sm:text-base">
                                    {currency}
                                </span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className={`w-full pl-12 sm:pl-16 pr-3 sm:pr-4 py-3 sm:py-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none text-base sm:text-lg font-medium ${
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
                                <p className="text-red-500 text-xs sm:text-sm">{validationErrors.totalValue}</p>
                            )}
                        </section>

                        {/* Submit Button */}
                        <div className="pt-4 sm:pt-6">
                            <button
                                type="button"
                                className="w-full bg-gradient-to-r from-black to-green-700 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-gray-800 hover:to-green-800 transform hover:scale-[1.02] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg cursor-pointer"
                                onClick={handlePaymentSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 sm:h-6 sm:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing Payment...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                        Create Payment
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

export default Payment;
