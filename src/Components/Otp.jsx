// import React, { useRef, useState } from "react";
// import axios from "axios";
// import { useContext } from 'react';
// import { UserContext } from '../Contextfile';
// const Otp = () => {
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const inputs = useRef([]);
//   const {userId}=useContext(UserContext);
//   const {registerId}=useContext(UserContext);
//   // console.log(userId,registerId)
//   const handleChange = (element, index) => {
//     if (isNaN(element.value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = element.value;
//     setOtp(newOtp);

//     // Move focus to next input
//     if (element.value && index < 5) {
//       inputs.current[index + 1].focus();
//     }

//     // If OTP is fully entered, submit it
//     if (newOtp.join("").length === 6) {
//       submitOtp(newOtp.join(""));
//     }
//   };

//   const handleKeyDown = (event, index) => {
//     if (event.key === "Backspace" && !otp[index] && index > 0) {
//       inputs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (event) => {
//     const paste = event.clipboardData.getData("text");
//     if (paste.length === 6 && !isNaN(paste)) {
//       setOtp(paste.split(""));
//       inputs.current[5].focus();
//     }
//   };

//   const submitOtp = (otp) => {
//     axios.post("https://api.evalvue.com/verify-otp", { otp })
//       .then((response) => {
//         // console.log(response.data);
//         // Handle response (e.g., navigate to next page, show success message)
//       })
//       .catch((error) => {
//         console.error(error);
//         // Handle error (e.g., show error message)
//       });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[calc(100svh-140px)] bg-zinc-100">
//       <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-bold text-xl">Email Verification</h2>
//           <button className="text-zinc-400 hover:text-zinc-600">
//             <span aria-hidden="true" className='text-3xl'>×</span>
//           </button>
//         </div>
//         <p className="text-sm text-zinc-600 mt-4">
//           Please enter the 6-digit verification code that was sent to your email
//           <span className="text-red-500"> *</span>
//         </p>
//         <div className="flex justify-between gap-2 mt-4" onPaste={handlePaste}>
//           {otp.map((data, index) => (
//             <input
//               key={index}
//               type="text"
//               className="w-full bg-zinc-200 rounded p-2 text-center"
//               maxLength={1}
//               value={data}
//               onChange={(e) => handleChange(e.target, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               ref={(el) => (inputs.current[index] = el)}
//             />
//           ))}
//         </div>
//         <button
//           className="mt-6 bg-primary-100 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full"
//           onClick={() => submitOtp(otp.join(""))}
//         >
//           Continue
//         </button>
//         <p className="text-sm text-center mt-4">
//           Didn't receive an email?
//           <button className="text-primary-100 hover:text-blue-600 font-semibold">
//             RESEND OTP
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Otp;
