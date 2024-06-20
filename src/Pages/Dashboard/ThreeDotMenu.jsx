import { useState, useEffect, useRef } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

function ThreeDotMenu({ onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null); // Reference to the menu

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

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setShowMenu(!showMenu)} className="w-7  h-7 text-2xl font-bold">
        &#x22EE;
      </button>
      {showMenu && (
        <div className="absolute right-0 mt-0 w-44 flex-col justify-center items-center gap-5 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <button
            onClick={() => { onEdit(); setShowMenu(false); }}
            className="block w-full text-green-500 border rounded border-green-500 px-4 py-2 text-sm  text-center hover:bg-gray-100 hover:rounded-lg"
          >
            <FiEdit className="inline w-4 h-4 mr-2" /> Edit
          </button>
          {/* <button className="  text-red-500 border-red-500 text-center font-semibold py-2 sm:px-5 px-3 rounded border hover:shadow-sm sm:text-sm text-[11px]">
                      Terminate
                    </button> */}

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
