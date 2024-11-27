'use client'
import React, { useState } from 'react';
import "@/styles/Address.css";
import { FaEllipsisV } from 'react-icons/fa';

const initialAddresses = [
    {
        id: 1,
        type: "Home",
        name: "Rohan Johnson",
        phone: "+91 1234 56789",
        address: "C/14, Vijay Apts, Old Agra Road, Naupada,next To Aradhana, Thane (w), Mumbai, Maharashtra, India - 400602"
    },
    {
        id: 2,
        type: "Office",
        name: "Rohan Johnson",
        phone: "+91 1234 56789",
        address: "C/14, Vijay Apts, Old Agra Road, Naupada,next To Aradhana, Thane (w), Mumbai, Maharashtra, India - 400602"
    }
];

export default function ManageAddresses ()  {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [newAddress, setNewAddress] = useState({
        type: "",
        name: "",
        phone: "+91  ",
        address: ""
    });
    const [showForm, setShowForm] = useState(false);

    const handleAddAddress = () => {
        setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
        setNewAddress({ type: "", name: "", phone: "", address: "" });
        setShowForm(false);
    };

    const handleDeleteAddress = (id) => {
        setAddresses(addresses.filter((address) => address.id !== id));
    };

    return (
        <>
                    <h2 className='item-header' >Manage Addresses</h2>

        <div className="manage-addresses-container">
            {addresses.map((address) => (
                <div key={address.id} className="address-item">
                    <div className="address-header">
                        <span className="delivers-to">DELIVERS TO</span> 
                        <span className="address-type">{address.type}</span>
                        <FaEllipsisV className="options-icon" onClick={() => handleDeleteAddress(address.id)} />
                    </div>
                    <div className="address-details">
                        <h3>{address.name} <span>{address.phone}</span></h3>
                        <p>{address.address}</p>
                    </div>
                </div>
            ))}
            <button className="add-address-button" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Add Address"}
            </button>
            {showForm && (
                <div className="add-address-form">
                    <input
                        type="text"
                        placeholder="Type (e.g., Home, Office)"
                        value={newAddress.type}
                        onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    />
                    <textarea
                        placeholder="Address"
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    />
                    <button onClick={handleAddAddress}>Save Address</button>
                </div>
            )}
        </div>
        </>
    );
};

