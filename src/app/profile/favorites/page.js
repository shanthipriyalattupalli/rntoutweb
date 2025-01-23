"use client";
// import "@/styles/Favorites.css";
import '../../../styles/Favorites.css';
import Image from "next/image"; // Import Image component
const pro1 = "/Assets/laptop-1.jpg";
const pro2 = "/Assets/laptop-2.jpg";
const pro3 = "/Assets/laptop-3.jpg";
const pro4 = "/Assets/laptop-4.jpg";
const pro5 = "/Assets/laptop-5.jpg";
const hp33 = "/Assets/hp33.png";
const hp34 = "/Assets/hp34.png";
const vector = "/Assets/Vector.png";

export default function Profile({ products }) {
  // const products = [
  //     {
  //         image: pro1,
  //         title: 'Windows i3/8GB 4th/6th Gen - Powered by Soldrit',
  //         price: '₹500',
  //         dates: '26 Sep - 28 Sep',
  //         stock: 4,
  //     },
  //     {
  //         image: pro2,
  //         title: 'Apple Macbook Air 13" 2017 - Powered by Soldrit',
  //         price: '₹500',
  //         dates: '26 Sep - 28 Sep',
  //         stock: 2,
  //     },
  //     {
  //         image: pro3,
  //         title: '40 Core Server On Rental, Hard-Disk: 2 Tb Ssd, Area Of Network',
  //         price: '₹800',
  //         dates: '26 Sep - 28 Sep',
  //         stock: 4,
  //     },
  //     {
  //         image: pro4,
  //         title: '40 Core Server On Rental, Hard-Disk: 2 Tb Ssd, Area Of Network',
  //         price: '₹800',
  //         dates: '26 Sep - 28 Sep',
  //         stock: 4,
  //     },
  //     {
  //         image: pro5,
  //         title: '40 Core Server On Rental, Hard-Disk: 2 Tb Ssd, Area Of Network',
  //         price: '₹800',
  //         dates: '26 Sep - 28 Sep',
  //         stock: 4,
  //     },
  // ];

  return (
    <>
      <div className='item-header'>
        <h2>Favorites</h2>
      </div>
      <div className='products-container'>
        {products?.map((product, index) => (
          <div key={index} className='product-card'>
            <div className='product-image-container'>
              <img
                src={product.image}
                alt={product.title}
                className='product-image'
                layout='fill'
                objectFit='cover'
              />{" "}
              {/* Use Image component */}
              <div className='badge-icon'>
                <img
                  src='/Assets/bookmark.png'
                  alt='Bookmark Icon'
                  className='book'
                  layout='fixed'
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <div className='product-details'>
              <h3 className='product-title'>{product.title}</h3>
              <p className='product-price'>
                {product.price} <span className='pro-span'>/day</span>
              </p>
              <div className='pro-date'>
                <img
                  src='/Assets/hp33.png'
                  alt='Calendar Icon'
                  className='vector1'
                />
                <p className='product-dates m-0'>{product.dates}</p>
              </div>
              <div className='pro-stock'>
                <img
                  src='/Assets/hp34.png'
                  alt='Stock Icon'
                  className='vector1'
                />
                <p className='product-stock m-0'>
                  {product.stock} stock available
                </p>
              </div>
              <div className='pro-last'>
                <img
                  src='/Assets/Vector.png'
                  alt='Cart Icon'
                  className='vector'
                />
                <button className='add-to-cart-btn'>Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
