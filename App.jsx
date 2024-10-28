import React from "react";
import OTPLogin from "./otplogin";
import "./App.css";
import lockIcon from "./assets/lock.png";

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <div className="title">
          <img src={lockIcon} alt="Lock Icon" className="lock-icon" />
        </div>
        <h1>Verification Code</h1>
        <p>Please Enter Verification code sent on your mobile</p>
        <OTPLogin />
      </div>
    </div>
  );
}

export default App;
