import { useState, useEffect, useRef } from "react";
import LogoutButton from "./LogoutButton";

function UserDetails() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null); // Reference to the menu
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const isLogin = localStorage.getItem("isLogin");
  // Function to handle clicks outside the menu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false); // Hide the menu
    }
  };
  
  useEffect(()=>{
    if(isLogin){
        setUserEmail(localStorage.getItem("email"));
        setUserName(userEmail?userEmail[0]?.toUpperCase():"");}
        console.log(userEmail)
  });

  useEffect(() => {
    // Add event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative z-50" ref={menuRef}>
      <button onClick={() => setShowMenu(!showMenu)}>
        <div>
          <div className="w-10 h-10 rounded-full bg-orange-800 flex justify-center items-center">
            <span className="text-lg text-white">{userName}</span>
          </div>
        </div>
      </button>
      {showMenu && (
        <div  className="absolute w-72 h-56  bg-gray-900 rounded-xl right-0 mt-0 flex-col justify-center items-center">
            <div>
                <div>
                <div className="w-full h-12 rounded-t-xl bg-[#1F467E]">
                </div>
                    <div className="w-14 h-14 border-[3px] border-gray-900 mx-auto mt-[-25px] rounded-full bg-orange-800 flex justify-center items-center">
                        <span className="text-2xl text-white">{userName}</span>
                    </div>
                </div>
                    <h1 className="pt-4 text-center text-white underline underline-offset-4">{userEmail}</h1>
                <div className="mt-8 flex justify-center">
                    <LogoutButton className="text-white" />
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
