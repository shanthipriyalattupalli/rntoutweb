import React from 'react';
import '../../styles/Terms.css';


const termsData = [
    {
      title: "Definitions",
      points: [
        `"Platform" refers to our online rental website rntout.com and associated services.`,
        `"User" or "You" refers to any individual or entity using our Platform.`,
        `"Product(s)" refers to the items available for rent from our own inventory.`,
        `"Renter" refers to a User renting a Product.`,
        `"Owner" refers to the Platform as the owner of the listed Products.`
      ]
    },
    {
      title: "Registration and Account",
      points: [
        `To use our services, you must create an account on the Platform.`,
        `You are responsible for maintaining the confidentiality of your account information and passwords.`,
        `You must be at least 18 years old to register and use our Platform.`
      ]
    },
    {
      title: "Product Rental",
      points: [
        `The Platform provides Products for rent from its own inventory, subject to availability.`,
        `The rental duration, pricing, and other specifics will be displayed on the Platform for each Product.`,
        `The rental period starts from the moment the Product is delivered to the Renter and ends when it is returned to the Platform.`
      ]
    },
    {
      title: "Booking and Payments",
      points: [
        `Renters can book Products through the Platform's reservation system.`,
        `Payment shall be made at the time of booking through the payment methods available on the Platform.`,
        `The Platform may charge service fees and applicable taxes as per prevailing laws.`
      ]
    },
    {
      title: "Delivery and Return",
      points: [
        `The Platform will facilitate the delivery of the rented Products to the Renter's specified location.`,
        `The Renter agrees to return the Product in the same condition it was received, with normal wear and tear excepted, by the agreed return date.`
      ]
    },
    {
      title: "Liability and Damage",
      points: [
        `The Renter is liable for any damage, loss, or theft of the Product during the rental period.`,
        `The Renter agrees to use the Product responsibly and for its intended purpose.`,
        `The Platform reserves the right to charge the Renter for any repair or replacement costs resulting from damages beyond normal wear and tear.`
      ]
    },
    {
      title: "Cancellations and Refunds",
      points: [
        `Cancellation policies and refund eligibility will be provided on the Platform for each Product.`,
        `Refunds, if applicable, will be processed according to the specified cancellation policy.`
      ]
    },
    {
      title: "Prohibited Activities",
      points: [
        `Users shall not engage in any illegal, fraudulent, or harmful activities on the Platform.`,
        `Users shall not manipulate prices, ratings, or reviews, or engage in any activity that may compromise the integrity of the Platform.`
      ]
    },
    {
      title: "Intellectual Property",
      points: [
        `The content and materials on the Platform, including but not limited to logos, text, images, and software, are the intellectual property of the Platform and protected by applicable laws.`
      ]
    },
    {
      title: "Modification of Terms",
      points: [
        `We may update or modify these Terms from time to time. The revised Terms will be posted on the Platform, and your continued use constitutes acceptance of the updated Terms.`
      ]
    },
    {
      title: "Termination",
      points: [
        `We reserve the right to suspend or terminate your account and access to the Platform if you violate these Terms or engage in any unauthorized or harmful activities.`
      ]
    },
    {
      title: "Governing Law",
      points: [
        `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, India.`
      ]
    }
  ];
export default function Terms() {
    return (
        <div className="px-20 flex flex-col gap-5 pt-10 mx-auto">
          <h1 className='text-[16px] font-bold'>Welcome to rntout</h1>
          <span>Welcome to our online rental platform rntout.com, headquartered in Bangalore, India. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing and using our website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our services.</span>
        {termsData.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-[14px] font-bold mb-2">{section.title}</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {section.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
}
