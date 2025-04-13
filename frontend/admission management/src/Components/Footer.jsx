import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-footer py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
              do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link to="/" className="block text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="block text-gray-700 hover:text-primary transition-colors">
              About us
            </Link>
            <Link to="/dashboard" className="block text-gray-700 hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/contact" className="block text-gray-700 hover:text-primary transition-colors">
              Contact us
            </Link>
          </div>

          <div className="text-right">
            <p className="text-gray-700">Email - upcharya@gmail.com</p>
            <p className="text-gray-700 mb-4">Phone No. - 28786377358</p>
            <div className="flex justify-end space-x-4">
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer