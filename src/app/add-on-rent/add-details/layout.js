// app/layout.js
'use client'
import React from 'react';
import MenuItems from '@/Components/submenuadd';
import '@/styles/Adddetail.css';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = ({ children }) => (
    <>
     <div className="container-para">
                <h1> Go ahead and pick the subcategories! 🚀</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
    <div className="product-form-page">
        <MenuItems />
        {children}        
    </div>
    {/* <button onClick={handlePublish} className="publish-button">
    Publish Product
    <ToastContainer/>
</button> */}
    </>
);

export default Layout;
const handlePublish = () => {
    toast.success("Product Published!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};