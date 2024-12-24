"use client"

import React from 'react';


const Newsletter = () => {
  return (
    <div className="bg-black py-12 px-4">
      <div className="md:flex md:justify-between">
        {/* Newsletter Subscription Section */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h3 className="text-xl font-bold text-white mb-4">Stay in the loop with our newsletter!</h3>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="absolute top-1/2 right-3 transform -translate-y-1/2 text-red-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Subscribe to our newsletter and unlock a world of exclusive benefits. Be the first to know about our
            latest products, special promotions, and exciting updates. Join our community of like-minded individuals
            who share a passion for.
          </p>
          <div className="flex items-center mt-4">
            <img
              src="https://www.codefacts.in/images/logo/logo-2.png"
              alt="CodeFacts Logo"
              className="w-6 h-6 mr-2"
            />
            <span className="text-gray-400 text-sm">Developed by: CODEFACTS</span>
          </div>
        </div>

        {/* Links Section */}
        <div className="md:w-2/3 flex justify-between ml-8">
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Product</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>Employee database</li>
              <li>Payroll</li>
              <li>Absences</li>
              <li>Time tracking</li>
              <li>Shift planner</li>
              <li>Recruiting</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Information</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>FAQ</li>
              <li>Blog</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Company</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>About us</li>
              <li>Careers</li>
              <li>Contact us</li>
              <li>Lift Media</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="w-full items-center">
        <img
          src="https://www.rntout.com/assets/img/logo.png"
          alt="rntout logo"
          className="w-24 h-auto"
        />
      </div>

      {/* Footer Links */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-12">
        <div className="text-gray-400 text-sm mt-4 md:mt-0">© 2025 All rights reserved</div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white">Terms</a>
          <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
          <a href="#" className="text-gray-400 hover:text-white">Cookies</a>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
              alt="Facebook icon"
              className="w-6 h-6"
            />
          </a>
          <a href="#">
            <img
              src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-twitter-circle-512.png"
              alt="Twitter icon"
              className="w-6 h-6"
            />
          </a>
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
              alt="Instagram icon"
              className="w-6 h-6"
            />
          </a>
          <a href="#">
            <img
              src="https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png"
              alt="YouTube icon"
              className="w-6 h-6"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
