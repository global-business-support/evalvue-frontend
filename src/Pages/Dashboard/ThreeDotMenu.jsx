import { useState, useEffect, useRef } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";

function ThreeDotMenu({ onEdit, onDelete, organizationId, setTerminated }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null); // Reference to the menu
  const location = useLocation();
  // Function to handle clicks outside the menu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false); // Hide the menu
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isViewEmpPath = location.pathname === `/dashboard/organization/employee/${organizationId}`;
0
  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setShowMenu(!showMenu)} className="w-7  h-7 text-2xl font-bold">
        &#x22EE;
      </button>
      {showMenu && (
        <div className="min-w-[110px] absolute right-0 mt-0 flex-col justify-center items-center border border-gray-200 z-10">
          <button
            onClick={() => { onEdit(); setShowMenu(false); }}
            className="mb-2 block w-full text-green-500 border bg-white border-green-500 sm:px-4 px-2 py-2 sm:text-sm text-[11px]  text-center hover:bg-green-500 hover:text-white"
          >
            <FiEdit className="inline w-4 h-4 mr-2" /> Edit
          </button>
          {isViewEmpPath && (
            <button 
              className="w-full text-red-500 border-red-500 text-center bg-white font-semibold py-2 sm:px-5 px-3 border hover:shadow-sm sm:text-sm text-[11px] hover:bg-red-500 hover:text-white"
              onClick={() => { onDelete(); setShowMenu(false); setTerminated(true) }}
            >
              Terminate
            </button>
          )}

          {/* <button
            onClick={() => { onDelete(); setShowMenu(false); }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-lg"
          >
            <MdOutlineDelete className="inline w-5 h-5 mr-2" />
            Delete
          </button> */}
        </div>
      )}
    </div>
  );
}

export default ThreeDotMenu;
