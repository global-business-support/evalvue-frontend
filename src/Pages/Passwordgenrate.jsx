import React, { useContext, useState } from 'react';
import newpassimg from '../assets/images/newpassword-removebg-preview.png';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../Contextfile';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Tittle from '../Tittle';

function Passwordgenrate() {
  Tittle("Password generate - Evalvue")
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { userId } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please check your password.');
      return;
    }

    setError('');
    const payload = { password: newPassword, user_id: userId };

    try {
      const response = await fetch('https://api.evalvue.com/update/password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      if (data.password_updated_successFull) {
        setSuccess(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Failed to reset password. Please try again.');
      console.log(error);
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-100">
      {!success ? (
        <div className="shadow-md rounded-lg p-6 bg-zinc-200 max-w-md w-full mb-8">
          <div className="flex justify-center mb-4">
            <img src={newpassimg} alt="Logo" className="h-48 w-48" />
          </div>
          <h2 className="text-center text-2xl font-semibold mb-6">Reset your password</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label htmlFor="new-password" className="block text-zinc-800 mb-2">
                New Password
              </label>
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="new-password"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Enter a new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-0 mt-8 pr-3 flex items-center cursor-pointer"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? <FaEyeSlash className="text-logo-100"/> : <FaEye className="text-logo-100"/>}
              </div>
            </div>
            <div className="mb-6 relative top-0">
              <label htmlFor="confirm-password" className="block mb-2">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-0 mt-8 pr-3 flex justify-center items-center cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash className="text-logo-100" /> : <FaEye className="text-logo-100" />}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary-100 text-white p-2 rounded-lg hover:primary-100 focus:outline-none focus:ring-2 ring-primary-100"
            >
              Reset Password
            </button>
          </form>
        </div>
      ) : (
        <div className="shadow-md rounded-lg p-6 max-w-md w-full bg-zinc-200">
          <div className="flex justify-center mb-4">
            <img src="https://placehold.co/100x50" alt="Logo" />
          </div>
          <h2 className="text-center text-2xl font-semibold mb-4">Successful password reset!</h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mb-6">
            You can now use your new password to login to your account 🎉
          </p>
          <NavLink to="/login">
            <button className="w-full bg-primary-100 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100">
              Login
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Passwordgenrate;
