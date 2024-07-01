import React, { useRef, useState, useEffect } from 'react';

const Clock = ({ onOTPSent }) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [hasSentOTP, setHasSentOTP] = useState(false);
  const intervalRef = useRef(null);
  const displayRef = useRef(null);

  // Function to start the timer
  const startTimer = () => {
    setIsTimerRunning(true);
    setHasSentOTP(true);
    setCountdown(10); // Initialize countdown to 10 seconds

    // Call the function passed from the parent component
    if (onOTPSent) {
      onOTPSent();
    }

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start a new interval
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        const newCountdown = prev - 1;
        if (newCountdown <= 0) {
          clearInterval(intervalRef.current);
          setIsTimerRunning(false);
          return 0;
        }
        return newCountdown;
      });
    }, 1000);
  };

  // Clean up the interval on component unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.textContent = `${countdown} seconds`;
    }
  }, [countdown]);

  return (
    <div>
      {isTimerRunning ? (
        <p className='text-primary-100 font-semibold' ref={displayRef}>{countdown} seconds</p>
      ) : (
        <button className='text-primary-100 font-semibold' onClick={startTimer}>
          {hasSentOTP ? 'Resend OTP' : 'Send OTP'}
        </button>
      )}
    </div>
  );
};

export default Clock;
