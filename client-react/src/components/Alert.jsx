import React from 'react';

function Alert({ isShowAlertMessage, alertMessage, onCloseAlert }) {
    if (!isShowAlertMessage) return null;

    return (
        <div className="absolute top-4 right-4 gap-3 z-50 flex items-center p-4 rounded-lg bg-green-100 text-green-700 shadow-lg transition duration-500 transform opacity-100">
            <span className="flex-grow">
                <strong className="mr-1">Success!</strong>{alertMessage}
            </span>
            <button onClick={onCloseAlert} type="button" className="text-green-700 hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
    );
}

export default Alert;