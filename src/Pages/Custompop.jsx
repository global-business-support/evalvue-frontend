import React from 'react'
import { createPortal } from 'react-dom';



const Custompop = ({ visible, title, message, onClose }) => {

     function onClose(){
          onClose();
     }

  if (!visible) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-80 text-center">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Custompop;

