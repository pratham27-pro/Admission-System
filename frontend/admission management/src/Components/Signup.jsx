"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import img from "../Images/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signinSuccess} from "../redux/user/userSlice.js";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
  
    const { email, password, username } = formData;
  
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = "Invalid email address.";
    if (!validatePassword(password)) newErrors.password = "Password must be at least 8 characters.";
    if (!username) newErrors.username = "Username is required.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
  
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || ''}/api/auth/signup`
        , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });
  
      if (!res.ok) {
        const errorMessage = await res.text();
        setErrors({ api: errorMessage }); // Save the error message in the state
        setLoading(false);
        return;
      }
  
      const userData = await res.text();
      console.log("The user data is: ", userData); // Read the response as text
  
      if (!userData) {
        alert("No content returned from the API.");
        setLoading(false);
        return;
      }
  
      try {
        const parsedUserData = JSON.parse(userData);
  
        if (!parsedUserData || Object.keys(parsedUserData).length === 0) {
          alert("No user data returned.");
          setLoading(false);
          return;
        }
  
        console.log("User Data:", parsedUserData);
        dispatch(signinSuccess(parsedUserData)); // Dispatch Redux action
        alert("Signup successful!");
        navigate("/"); // Redirect after successful signup
      } catch (error) {
        setLoading(false);
        alert("Failed to parse user data.");
        console.error("Error parsing response:", error);
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred during signup. Please try again.");
      console.error("Signup error:", error);
    }
  };
  

  
  const getPasswordStrength = (password) => {
    if (password.length < 8) return "Weak";
    if (password.length < 12) return "Medium";
    return "Strong";
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-xl shadow-lg p-6 sm:p-10">
        <div>
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="text-center text-sm text-gray-600 mt-2">
            Or{" "}
            <button
              onClick={login}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in to your account
            </button>
          </p>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <input
                id="username"
                type="text"
                placeholder="Username"
                required
                autoComplete="username"
                className={`block w-full px-3 py-2 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                onChange={handleChange}
              />
              <input
                id="email"
                type="email"
                placeholder="Email address"
                required
                autoComplete="email"
                className={`block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                onChange={handleChange}
              />
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  className={`block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Password Strength:{" "}
                <span className="font-semibold text-gray-900">
                  {formData.password ? getPasswordStrength(formData.password) : "N/A"}
                </span>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 flex flex-cols-2 gap-3 justify-center">
              <OAuth />
            </div>
          </div> */}
        </div>
        <div className="hidden lg:block">
          <img src={img} alt="Signup Illustration" className="rounded-xl shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
