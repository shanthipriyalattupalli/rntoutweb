import React, { useState } from 'react'
import '@/styles/AddressSidebar.css';

const edit = '/Assets/editicon.svg'

const AddressSidebar = ({ isOpen, onClose, onAddressSelect }) => {
    const [isAddAddress, setIsAddAddress] = useState(false);


    if (!isOpen) return null;

    const handleAddAddress = () => {
        setIsAddAddress(true);
    }

    const Address = [
        { name: "Rohan Johnson", mobile: "+91 1234 56789", address: "C/14, Vijay Apts, Old Agra Road, Naupada,next To Aradhana, Thane (w), Mumbai, Maharashtra, India - 400602" },
        { name: "Rohan", mobile: "+91 1234 56789", address: "C/14, Vijay Apts, Old Agra Road, Naupada,next To Aradhana, Thane (w), Mumbai, Maharashtra, India - 400602" },
        { name: "Johnson", mobile: "+91 1234 56789", address: "C/14, Vijay Apts, Old Agra Road, Naupada,next To Aradhana, Thane (w), Mumbai, Maharashtra, India - 400602" },
    ]


    return (
        <div className="sidebar-overlay" onClick={onClose}>
            <div className="sidebar" onClick={(e) => e.stopPropagation()}>
                {isAddAddress ? <div className="sidebar-header">
                    <h2>Add New Address</h2>
                    <button onClick={onClose} className="close-button">
                        &times;
                    </button>
                </div> : <div className="sidebar-header">
                    <h2>RntOut Insurance</h2>
                    <button onClick={onClose} className="close-button">
                        &times;
                    </button>
                </div>}
                {isAddAddress ? <div className='address-form'>
                    <div className='form-select'>
                        <span>Home</span>
                        <span>Work</span>
                        <span>Hotel</span>
                    </div>
                    <input type="text" placeholder="Receiver’s name" className='text-input' />
                    <input type="text" placeholder="Receiver’s contact number" className='text-input' />
                    <input type="text" placeholder="Flat/ House no/ Floor / Building" className='text-input' />
                    <input type="text" placeholder="Area / Sector / Locality" className='text-input' />
                    <input type="text" placeholder="Nearby Landmark(Optional)" className='text-input' />

                </div> : (Address.map((address, index) => (
                    <div
                        key={index}
                        className="container address-card"
                        onClick={() => {
                            onAddressSelect(address); // Update selected address
                            onClose(); // Close sidebar
                        }}
                    >
                        <div className="delivery-content">
                            <div className="delivery-context">
                                <h5 className="delivery-to">DELIVERS TO</h5>
                                <span>Home</span>
                            </div>
                            <div className="address-edit">
                                <img src={edit} alt="edit" />
                            </div>
                        </div>
                        <div className="address-context">
                            <h4>{address.name}</h4>
                            <p>
                                |
                            </p>
                            <p>{address.mobile}</p>
                        </div>
                        <div>
                            <p>{address.address}</p>
                        </div>
                    </div>
                )))}
                <button className="address-button" onClick={handleAddAddress}>Add New Address</button>
            </div>
        </div>
    )
}

export default AddressSidebar