"use client"

import React from 'react';
import '../../../styles/Privacypolicy.css';

export default function Privacypolicy() {
    return (
        <div className='policy-container'>
            <h2 className='item-header'>Privacy Policy</h2>

            <div className='policy-section'>
                <div className='policy-title'>
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to our rental platform. We are committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, and protect your data when you rent products through our platform.
                    </p>
                </div>

                <div className='policy-title'>
                    <h2>2. Information We Collect</h2>
                    <p>
                        When you use our platform to book products for rent, we collect personal information such as your name, contact number, email address, and payment details. We also collect rental preferences including duration (daily, weekly, monthly) and product types.
                    </p>
                </div>

                <div className='policy-title'>
                    <h2>3. How We Use Your Information</h2>
                    <p>
                        Your information is used to process bookings, facilitate payments, provide customer support, send rental confirmations and reminders, and improve our services. We may also use your data to notify you about special offers and updates if you opt-in.
                    </p>
                </div>

                <div className='policy-title'>
                    <h2>4. Sharing of Information</h2>
                    <p>
                        We do not sell or rent your personal data. However, we may share your information with trusted third-party service providers for payment processing, identity verification, or logistics. All third parties are obligated to keep your information secure.
                    </p>
                </div>

                <div className='policy-title'>
                    <h2>5. Data Security</h2>
                    <p>
                        We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure.
                    </p>
                </div>

                <div className='policy-title'>
                    <h2>6. Your Rights</h2>
                    <p>
                        You have the right to access, update, or delete your personal information at any time. You may also opt out of receiving promotional communications from us.
                    </p>
                </div>

                <div className='policy-title'>
                    <h2>7. Changes to This Policy</h2>
                    <p>
                        We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page and, if significant, will be communicated via email or notification on our platform.
                    </p>
                </div>

                <div className='policy-title'>
                    <h2>8. Contact Us</h2>
                    <p>
                        If you have any questions about our privacy practices or this policy, feel free to contact our support team via the contact page.
                    </p>
                </div>
            </div>
        </div>
    );
}
