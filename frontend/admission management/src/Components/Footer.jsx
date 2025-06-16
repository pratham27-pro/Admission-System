import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import logo from "../assets/logo.jpg";

function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Logo section */}
          <div className="flex flex-col">
            <img src={logo} alt="Logo" className="w-50 h-32" />
          </div>

          {/* Description section */}
          <div className="flex flex-col">
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Navigation section */}
          <div className="flex flex-col space-y-2">
            <Link to="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-800">
              About us
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">
              Dashboard
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-800">
              Contact us
            </Link>
          </div>

          {/* Contact and Social section */}
          <div className="flex flex-col items-start">
            <p className="text-gray-600 text-sm">Email - upcharya@gmail.com</p>
            <p className="text-gray-600 text-sm mb-4">
              Phone No. - 28786377358
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <FaFacebook size={16} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <FaTwitter size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
