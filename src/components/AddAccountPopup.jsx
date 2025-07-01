import { useState, useEffect } from "react";
import Modal from "../SubComponents/Modal";

function AddAccountPopup({ isOpen, onClose, onAddAccount, memberName }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setError("");
      setTouched(false);
    }
  }, [isOpen]);

  // Email validation function
  const validateEmail = (email) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return "Email address is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (touched) {
      const validationError = validateEmail(value);
      setError(validationError);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const validationError = validateEmail(email);
    setError(validationError);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await onAddAccount(email.trim());
      setEmail("");
      onClose();
    } catch (error) {
      const errorMessage = error?.message || "Failed to add account. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setTouched(false);
    onClose();
  };

  const isFormValid = email.trim() && !validateEmail(email);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="pt-2">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-black rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Add Account to {memberName}</h2>
          <p className="text-gray-600 text-sm">Enter the email address for the account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="e.g., john.doe@example.com"
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                  error && touched
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-green-500 bg-gray-50 focus:bg-white'
                } placeholder-gray-400`}
                value={email}
                onChange={handleEmailChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                autoFocus
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {email && !error && touched && (
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            
            {/* Error message */}
            <div className="text-xs">
              <span className={`transition-colors ${error && touched ? 'text-red-500' : 'text-green-600'}`}>
                {error && touched ? error : 'Enter a valid email address for the account'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 transform hover:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  Add Account
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddAccountPopup;
