import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signin.css";
import logo from "../logo.png";

function EmailInput() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Determine the page type based on the URL
  const isVerification = location.pathname.includes("email-verification");
  const isForgotPassword = location.pathname.includes("forgot-password");

  const handleInput = async () => {
    setError(""); // Reset errors

    if (!input.trim()) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      console.log("Entered Email:", input);
      let apiEndpoint = "";

      if (isVerification) {
        apiEndpoint = "http://localhost:3000/auth/sendotp";
      } else if (isForgotPassword) {
        apiEndpoint = "http://localhost:3000/auth/forget";
      }

      if (!apiEndpoint) {
        throw new Error("Invalid request type");
      }

      // Use "input" key in request body to match backend expectation
      const requestBody = { input: input };

      const response = await axios.post(apiEndpoint, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("OTP Sent Successfully:", response.data);

      // Store email in localStorage for persistence
      localStorage.setItem("inputForOtp", input);

      // Corrected navigate function
      navigate(
        `/otp?input=${encodeURIComponent(input)}&from=${
          isForgotPassword ? "forgot-password" : "email-verification"
        }`
      );
    } catch (err) {
      console.error("Error sending OTP:", err);
      const errorMessage = err.response?.data?.message || "Failed to send OTP";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logintop">
        <img className="noaclogo" src={logo} alt="Logo" />
        <h1>{isForgotPassword ? "Forget Password" : "Email Verification"}</h1>
        <h5>Please Enter Your Email</h5>
      </div>
      <div className="inputs">
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          name="email"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="loginbutton">
        <button onClick={handleInput} disabled={loading}>
          {loading ? "Sending..." : "Send Code"}
        </button>
      </div>
    </div>
  );
}

export default EmailInput;
