import React, { useRef, useEffect } from "react";
import "./App.css";

const OTPInput = ({ value, onChange, index, onBackspace }) => {
  // Reference to the current input element
  const inputRef = useRef(null);

  useEffect(() => {
    // Automatically focus the first input when the value is empty
    if (value === "" && index === 0) {
      inputRef.current.focus();
    }
  }, [value, index]);

  // Handles changes in the input field
  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, ""); // Allow only digits
    onChange(newValue, index); // Trigger the onChange function to update the OTP state

    // Automatically move to the next input field if a digit is entered
    if (newValue && inputRef.current.nextElementSibling) {
      inputRef.current.nextElementSibling.focus();
    }
  };

  // Handles the backspace key to delete the previous value
  const handleKeyDown = (e) => {
    // If the user presses Backspace when the input is empty, move focus to the previous input
    if (e.key === "Backspace" && !value) {
      onBackspace(index);
    }
  };

  return (
    <input
      ref={inputRef} // Set the ref to the input element for managing focus
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown} // Handle keydown events for backspace
      maxLength="1" // Limit the input to a single character
      className="otp-input"
    />
  );
};

export default OTPInput;
