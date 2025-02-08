import React from "react";

function Modal({ isOpen, onClose, children }) {
  return (
    <div
      className={`${
        isOpen ? "fixed inset-0 flex items-center justify-center z-50" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-800 hover:text-gray-900"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
