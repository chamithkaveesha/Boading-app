import { useNavigate } from "react-router-dom";
import Modal from "../SubComponents/Modal";

function SelectTransactionPopup({ isOpen, onClose }) {

    const navigate = useNavigate();
    const handlePayment = () => {
        navigate("payment");
        onClose();
    }
    const handleRePayment = () => {
        navigate("repayment");
        onClose();
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="pt-2">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-black rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Transaction Method</h2>
          <p className="text-gray-600 text-sm">Choose your preferred transaction type</p>
        </div>

        {/* Transaction Buttons */}
        <div className="space-y-4 mb-6">
          <button 
            onClick={handlePayment} 
            className="w-full px-6 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>New Payment</span>
          </button>
          
          <button 
            onClick={handleRePayment} 
            className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Re-Payment</span>
          </button>
        </div>

        {/* Cancel Button */}
        <div className="pt-4">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 transform hover:scale-[0.98] cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default SelectTransactionPopup;
