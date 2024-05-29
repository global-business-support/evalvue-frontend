import { useContext, useEffect, useState } from 'react';
import { IsverifiedContext } from '../Isverified';
import { UserContext } from '../Contextfile';
import { useLocation, useNavigate } from 'react-router-dom';

function Passwordotp(props) {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { userId, setUserId } = useContext(UserContext);
  const location = useLocation();
  const state = location.state;
  console.log(state.isForget)
  let user_id = userId;

  console.log('UserId from context:', userId); // Debugging userId
  useEffect(() => {
    if (isOtpVerified && state.isForget) {
      navigate('/passgenerate');
    }
  }, [isOtpVerified, state.isForget, navigate]);


  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.evalvue.com/shoot/otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log('Response from email submit:', data);

      if (data.otp_send_successfull) {
        setIsEmailSent(true);
        setUserId(data.user_id);
        console.log('Set userId:', data.user_id); // Log after setting userId
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Failed to send email. Please try again.');
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (element, index, event) => {
    if (event.key === 'Backspace') {
      if (element.previousSibling && !element.value) {
        element.previousSibling.focus();
      }
      setOtp([...otp.map((d, idx) => (idx === index ? '' : d))]);
    }
  };

  const handleOtpSubmit = async () => {
    const otpCode = otp.join('');
    console.log('Submitting OTP:', otpCode); // Log OTP code
    console.log('UserId before OTP submit:', user_id); // Log userId before submit

    try {
      const response = await fetch('https://api.evalvue.com/verify/otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user_id, otp_number: otpCode, email }),
      });

      const data = await response.json();
      console.log('Response from OTP submit:', data);

      if (response.ok) {
        if (data.otp_verified_successfull) {
          setIsOtpVerified(true);
        } else if (data.otp_is_expired) {
          setError('OTP is expired. Please request a new one.');
        } else {
          setError(data.error || 'OTP verification failed. Please try again.');
        }
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Failed to verify OTP. Please try again.');
    }
  };

  const handleResendOtp = () => {
    setIsEmailSent(false);
    setOtp(new Array(6).fill(''));
    setError('');
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-zinc-100 rounded-lg shadow-lg p-8 max-w-lg w-full">
          {!isEmailSent ? (
            <>
              <h2 className="text-center text-2xl font-semibold mb-6">Send Verification Email</h2>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <form onSubmit={handleEmailSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-100 text-white p-2 rounded-lg hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-100"
                >
                  Send OTP
                </button>
              </form>
            </>
          ) : isOtpVerified ? (
            
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Email Verification Successful</h2>
              <p className="text-zinc-600 mb-4">Your email has been successfully verified. You can now log in.</p>
              <button
                className="bg-primary-100 text-white p-2 rounded-lg hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-100"
                onClick={() => navigate('/login')}
              >
                Go to Login
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-xl">OTP Verification <span className='text-[red]'>*</span> </h2>
                <button className="text-zinc-400 hover:text-zinc-600">
                  <span aria-hidden="true" className='text-3xl'>×</span>
                </button>
              </div>
              <p className="text-sm text-zinc-600 mt-4">
                Please enter the 6-digit reset password OTP that was sent to your email
                <span className="text-red-500"> *</span>
              </p>
              <div className="flex justify-between gap-2 mt-4">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    className="w-full bg-zinc-200 rounded p-2 text-center"
                    maxLength={1}
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onKeyDown={e => handleKeyDown(e.target, index, e)}
                    onFocus={e => e.target.select()}
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
              <button
                className="mt-6 bg-primary-100 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full"
                onClick={handleOtpSubmit}
              >
                Continue
              </button>
              <p className="text-sm text-center mt-4">
                Didn't receive an email?
                <button className="text-primary-100 hover:text-blue-600 font-semibold" onClick={handleResendOtp}>
                  RESEND OTP
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Passwordotp;
