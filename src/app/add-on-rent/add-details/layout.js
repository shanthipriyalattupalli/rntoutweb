// app/layout.js
'use client'
import React from 'react';
import MenuItems from '@/Components/submenuadd';
// import '@/styles/Adddetail.css';
import '../../../styles/Adddetail.css';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from '@/app/ScrollToTop';


const Layout = ({ children }) => (
    <>
    <ScrollToTop/>
     <div className="container-para">
                <h1>    Rent Out Your Items & Earn Easily! 🚀</h1>
                <p>List your items for rent and start earning today.</p>
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