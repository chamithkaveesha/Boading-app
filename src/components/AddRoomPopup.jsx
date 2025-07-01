import { useState, useEffect } from "react";
import { createRoom } from "../api/createRoom";
import Modal from "../SubComponents/Modal";

function AddRoomPopup({ isOpen, onClose, onRoomCreated }) {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setRoomName("");
      setError("");
      setTouched(false);
    }
  }, [isOpen]);

  // Validation function
  const validateRoomName = (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return "Room name is required";
    }
    if (trimmedName.length < 2) {
      return "Room name must be at least 2 characters long";
    }
    if (trimmedName.length > 50) {
      return "Room name must be less than 50 characters";
    }
    if (!/^[a-zA-Z0-9\s\-_.]+$/.test(trimmedName)) {
      return "Room name can only contain letters, numbers, spaces, hyphens, underscores, and periods";
    }
    return "";
  };

  const handleRoomNameChange = (e) => {
    const value = e.target.value;
    setRoomName(value);
    
    if (touched) {
      const validationError = validateRoomName(value);
      setError(validationError);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const validationError = validateRoomName(roomName);
    setError(validationError);
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setTouched(true);
    
    const validationError = validateRoomName(roomName);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const newRoom = await createRoom(roomName.trim());
      onRoomCreated(newRoom);
      onClose();
    } catch (error) {
      setError(error?.message || "Failed to create room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleCreateRoom(e);
    }
  };

  const isFormValid = roomName.trim() && !validateRoomName(roomName);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="pt-2">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-black rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Room</h2>
          <p className="text-gray-600 text-sm">Enter a unique name for your new room</p>
        </div>

        <form onSubmit={handleCreateRoom} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="roomName" className="block text-sm font-semibold text-gray-700">
              Room Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="roomName"
                placeholder="e.g., Main Office, Conference Room A"
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                  error && touched
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-green-500 bg-gray-50 focus:bg-white'
                } placeholder-gray-400`}
                value={roomName}
                onChange={handleRoomNameChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                disabled={loading}
                autoFocus
                maxLength={50}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {roomName && !error && touched && (
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            
            {/* Character counter */}
            <div className="flex justify-between items-center text-xs">
              <span className={`transition-colors ${error && touched ? 'text-red-500' : 'text-green-600'}`}>
                {error && touched ? error : 'Enter a descriptive name for your room'}
              </span>
              <span className={`${roomName.length > 40 ? 'text-red-500' : 'text-gray-400'}`}>
                {roomName.length}/50
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 transform hover:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="flex-1 px-6 py-3 bg-green-600   text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Room
                </div>
              )}
            </button>
          </div>

   
          
        </form>
      </div>
    </Modal>
  );
}

export default AddRoomPopup;
