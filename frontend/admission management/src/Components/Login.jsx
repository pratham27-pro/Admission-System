"use client"
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import img from "../Images/logo.jpg"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signinFailure, signinStart, signinSuccess } from '../redux/user/userSlice.js';

function Login() {
    const [formData, setFormData] = useState({});
    
    const handleChange = (e) => {
      setFormData({...formData, [e.target.id]: e.target.value});
    };
  
    const [showPassword, setShowPassword] = useState(false);
    const {loading} = useSelector((state) => state.user)
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    function signup() {
        navigate("/signup");
    }
  
    const validateEmail = (email) => {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(String(email).toLowerCase());
    };
  
    const validatePassword = (password) => {
      return password.length >= 8;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Extract form values from formData
      const { email, password } = formData;
    
      // Validate inputs
      const newErrors = {};
      if (!validateEmail(email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!validatePassword(password)) {
        newErrors.password = 'Password must be at least 8 characters long';
      }
    
      if (Object.keys(newErrors).length > 0) {
        // If validation fails, handle errors
        console.error("Validation failed:", newErrors);
        return;
      }
    
      try {
        dispatch(signinStart()); // Start the loading state
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL || ''}/api/auth/signin`
          , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    
        if (!res.ok) {
          try {
            // Attempt to parse the error response as JSON
            const errorData = await res.json();
            console.error("Login failed:", errorData);
    
            // Dispatch failure with the error message
            dispatch(signinFailure(errorData.message || "Login failed"));
            
            // Alert the user
            alert(`Login failed: ${errorData.message || "Unknown error"}`);
          } catch (jsonError) {
            // If parsing JSON fails, fallback to a generic error
            console.error("Login failed, unable to parse error response:", jsonError);
            dispatch(signinFailure("Login failed, invalid response from server"));
            alert("Login failed: Server returned an invalid response.");
          }
          return;
        }
    
        // Parse response JSON
        const data = await res.json();
        console.log("Login successful:", data);
    
        // Dispatch signinSuccess with user data
        dispatch(signinSuccess(data));
    
        alert("Login successful!");
        navigate("/");
    
      } catch (error) {
        // Handle fetch or other runtime errors
        console.error("An error occurred during login:", error);
        dispatch(signinFailure(error.message || "An error occurred"));
        alert("An error occurred during login. Please try again.");
      }
    };
    
    
  
    // const getPasswordStrength = (password) => {
    //   if (password.length < 8) return 'Weak';
    //   if (password.length < 12) return 'Medium';
    //   return 'Strong';
    // };
  
    return (
     <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-xl shadow-lg p-6 sm:p-10">
          
          <div>
            <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
                Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <button
                onClick={signup}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create your account
              </button>
            </p>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
              
                <div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border
                      border-gray-300
                    placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Email address"
                    onChange={handleChange}
                  />
                </div>
                      
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border
                      border-gray-300
                       placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-sm leading-5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? "Loading..." : "Sign In"}
                </button>
              </div>
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
              <div className="mt-6 flex flex-cols-2 gap-3 justify-center ">
                  <OAuth/>
              </div>
            </div> */}
          </div>
      
          <div className="hidden lg:block">
            <img src={img} alt="Sign Up Illustration" className="w-full h-auto rounded-xl shadow-lg" />
          </div>
        </div>
      </div>
    );
  };


export default Login;