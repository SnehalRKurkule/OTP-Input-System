import React, { useRef, useEffect } from "react";
import "./App.css";

const OTPInput = ({ value, onChange, index, onBackspace }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (value === "" && index === 0) {
      inputRef.current.focus();
    }
  }, [value, index]);

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, ""); // Allow only digits
    onChange(newValue, index);
    if (newValue && inputRef.current.nextElementSibling) {
      inputRef.current.nextElementSibling.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && !value) {
      onBackspace(index);
    }
  };

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      maxLength="1"
      className="otp-input"
    />
  );
};

export default OTPInput;
