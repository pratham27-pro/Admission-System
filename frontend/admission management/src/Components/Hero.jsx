import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

function Hero() {
  return (
    <div className="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-satoshi mb-8">
            Tackle The Problem Of Complex
            <br />
            <span className="text-orange-400">Admission Process</span>{" "}
            Seamlessly
          </h1>
          <Link
            to="/admission"
            className="inline-block bg-orange-400 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-orange-500 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
