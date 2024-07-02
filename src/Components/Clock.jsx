import React, { useRef, useState, useEffect } from 'react';

const Clock = ({ onOTPSent }) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [countdown, setCountdown] = useState(120); // 2 minutes
  const intervalRef = useRef(null);
  const displayRef = useRef(null);

  // Function to start the timer
  const startTimer = () => {
    setIsTimerRunning(true);
    setCountdown(120); // Initialize countdown to 120 seconds

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
          {countdown === 120 ? 'Send OTP' : 'Resend OTP'}
        </button>
      )}
    </div>
  );
};

export default Clock;
