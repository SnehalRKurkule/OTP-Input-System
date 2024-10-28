import React, { useState, useEffect } from "react";
import OTPInput from "./otpInput";
import "./App.css";

const OTPLogin = () => {
  // State to manage the OTP input values (array of 4 empty strings)
  const [otp, setOtp] = useState(["", "", "", ""]);

  // State for the countdown timer, initially set to 30 seconds
  const [timer, setTimer] = useState(30);

  // State to indicate if the form is in a submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to manage error status for wrong OTP entries
  const [error, setError] = useState(false);

  // Effect to start a countdown timer when the timer changes
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => setTimer((prev) => prev - 1), 1000); // Decrease the timer every second
      return () => clearInterval(intervalId); // Clean up the interval on component unmount or when timer changes
    }
  }, [timer]);

  // Function to handle input changes in each OTP box
  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // If all four digits are entered, trigger the submit function
    if (newOtp.join("").length === 4) {
      handleSubmit();
    }
  };

  // Function to handle backspace key press to focus the previous input
  const handleBackspace = (index) => {
    if (index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = ""; // Clear the previous input value
      setOtp(newOtp);
    }
  };

  // Function to handle OTP submission
  const handleSubmit = () => {
    setIsSubmitting(true);

    // Replace '1234' with your actual OTP verification logic
    if (otp.join("") === "1234") {
      setError(false); // No error if OTP is correct
      alert("OTP Verified Successfully!");
      setOtp(["", "", "", ""]);
      setTimer(30); // Reset the timer to 30 seconds for the next submission
    } else {
      setError(true); // Set error state for incorrect OTP
      setTimeout(() => setError(false), 300); // Remove error effect after a short shake animation
    }

    setIsSubmitting(false); // End the submitting state
  };

  return (
    <div className="otp-form">
      {/* Container for OTP input fields, with a 'shake' class if there's an error */}
      <div className={`otp-container ${error ? "shake" : ""}`}>
        {otp.map((value, index) => (
          <OTPInput
            key={index}
            value={value}
            onChange={handleChange}
            index={index}
            onBackspace={handleBackspace}
          />
        ))}
      </div>

      {/* Verify button, disabled if OTP is incomplete, timer is zero, or the form is submitting */}
      <button
        onClick={handleSubmit}
        disabled={otp.join("").length < 4 || isSubmitting || timer === 0}
      >
        Verify
      </button>

      {/* Display a message with the timer or a button to resend OTP when the timer reaches 0 */}
      {timer > 0 ? (
        <p>Resend OTP in {timer} seconds</p>
      ) : (
        <button onClick={() => setTimer(30)} className="resend-button">
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default OTPLogin;
