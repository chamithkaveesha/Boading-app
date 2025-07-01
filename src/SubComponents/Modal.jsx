import React, { useEffect } from "react";

function Modal({ isOpen, onClose, children }) {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl z-10 w-full max-w-md mx-auto transform transition-all duration-300 scale-100 animate-in fade-in zoom-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-all duration-200 transform hover:scale-110 hover:rotate-90"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
