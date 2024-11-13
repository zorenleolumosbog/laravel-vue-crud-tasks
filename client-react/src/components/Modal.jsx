import React from 'react';

const Modal = ({ onCloseModalButton, form }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        {/* Header section with close button */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          {onCloseModalButton}
        </div>
        
        {/* Form content section */}
        {form}
      </div>
    </div>
  );
}

export default Modal;