import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export const metadata = {
  title: "Contact RNT Out: Get in Touch for Quality Rentals in Hyderabad",
  description: "Reach out to RNT Out for any inquiries about our rental services. We're here to help with furniture, laptops, vehicles, and more. Contact us today!",
};

export default function Contact() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-8 sm:mb-12">
                    Contact Us
                </h2>
                
                {/* Contact Information */}
                <div className="mb-8 sm:mb-12 bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center">
                        Get in Touch
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
                        <div className="text-center p-4">
                            <div className="flex justify-center mb-3">
                                <FaPhone className="text-2xl sm:text-3xl text-gray-600" />
                            </div>
                            <h4 className="text-base sm:text-lg font-medium text-gray-700 mb-2">Phone</h4>
                            <p className="text-sm sm:text-base text-gray-600">+91 98765 43210</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="flex justify-center mb-3">
                                <FaEnvelope className="text-2xl sm:text-3xl text-gray-600" />
                            </div>
                            <h4 className="text-base sm:text-lg font-medium text-gray-700 mb-2">Email</h4>
                            <p className="text-sm sm:text-base text-gray-600 break-all">info@rentout.com</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="flex justify-center mb-3">
                                <FaMapMarkerAlt className="text-2xl sm:text-3xl text-gray-600" />
                            </div>
                            <h4 className="text-base sm:text-lg font-medium text-gray-700 mb-2">Address</h4>
                            <p className="text-sm sm:text-base text-gray-600">Hyderabad, Telangana</p>
                        </div>
                        <div className="text-center p-4">
                            <h4 className="text-base sm:text-lg font-medium text-gray-700 mb-4">Follow Us</h4>
                            <div className="flex justify-center gap-3 sm:gap-4">
                                <a href="#" className="bg-red-600 text-white p-2 sm:p-3 rounded-full hover:bg-red-700 transition-colors">
                                    <FaFacebookF className="text-base sm:text-lg" />
                                </a>
                                <a href="#" className="bg-red-600 text-white p-2 sm:p-3 rounded-full hover:bg-red-700 transition-colors">
                                    <FaInstagram className="text-base sm:text-lg" />
                                </a>
                                <a href="#" className="bg-red-600 text-white p-2 sm:p-3 rounded-full hover:bg-red-700 transition-colors">
                                    <FaTwitter className="text-base sm:text-lg" />
                                </a>
                                <a href="#" className="bg-red-600 text-white p-2 sm:p-3 rounded-full hover:bg-red-700 transition-colors">
                                    <FaLinkedinIn className="text-base sm:text-lg" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center">
                        Send Us a Message
                    </h3>
                    <form className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Name *
                                </label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    required 
                                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    required 
                                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                Subject *
                            </label>
                            <input 
                                type="text" 
                                id="subject" 
                                name="subject" 
                                required 
                                className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm sm:text-base"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                Message *
                            </label>
                            <textarea 
                                id="message" 
                                name="message" 
                                rows="5" 
                                required
                                className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-vertical text-sm sm:text-base"
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button 
                                type="submit" 
                                className="bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-medium hover:bg-red-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}