import React, { useRef, useState, useEffect } from 'react';

const Clock = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const intervalRef = useRef(null);
  const displayRef = useRef(null);

  // Function to start the timer
  const startTimer = () => {
    setIsTimerRunning(true);
    setCountdown(10); // Initialize countdown to 2 minutes (120 seconds)
    console.log('Timer started for 2 minutes');

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
          console.log('Timer ended');
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
        <button className='text-primary-100 font-semibold' onClick={startTimer}>Resend OTP</button>
      )}
    </div>
  );
};

export default Clock;
