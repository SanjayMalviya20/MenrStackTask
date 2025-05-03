import React, { useState } from 'react';
import ShowProducts from './ShowProducts';

const Filter = () => {
  const [sortBy, setSortBy] = useState('');
  const [price, setPrice] = useState(0); // Initialized price with a number
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [occasion, setOccasion] = useState('');
  const [brand, setBrand] = useState('');
  const [discount, setDiscount] = useState('');

  console.log({
    sortBy,
    price,
    category,
    gender,
    occasion,
    brand,
    discount
  });

  return (
    <>
      <div className='bg-white bg-opacity-10 p-6 rounded lg:w-[50%]'>
        {/* Sort By */}
        <div className='mb-4 flex items-center gap-2'>
          <label>Sort By:</label>
          <select className='text-black p-2 rounded-md' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Select...</option>
            <option value="price">Price(Low to High)</option>
            <option value="name">Name</option>
            <option value="createdAt">CreateAt(New to Old)</option>
            <option value="rating">Rating(High to Low)</option>
          </select>
        </div>

        {/* Price Range */}
        <div className='mb-4 flex items-baseline justify-center flex-col'>
          <label>Price: ₹{price}</label>
          <input type="range" min={0} max={3000} value={price} onChange={(e) => setPrice(e.target.value)} className='mx-2 rounded-md' />
        </div>

        {/* Category */}
        <div className='mb-4 flex gap-2 items-center'>
          <label>Category:</label>
          <select className='text-black p-2 rounded-md' value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select...</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
            <option value="shoes">Shoes</option>
            <option value="toys and games">Toys and Games</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Gender Options */}
        <div className='mb-4'>
          <span>Select Gender:</span>
          <div className='flex gap-4'>
            <label><input type="radio" value="male" checked={gender === 'male'} onChange={() => setGender('male')} /> Male</label>
            <label><input type="radio" value="female" checked={gender === 'female'} onChange={() => setGender('female')} /> Female</label>
            <label><input type="radio" value="other" checked={gender === 'other'} onChange={() => setGender('other')} /> Other</label>
            <label><input type="radio" value="unisex" checked={gender === ''} onChange={() => setGender('')} /> none</label>
          </div>
        </div>

        {/* Occasion */}
        <div className='mb-4 flex gap-2 items-center'>
          <label>Occasion:</label>
          <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className='text-black p-2 rounded-md'>
            <option value="">Select...</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="sport">Sport</option>
            <option value="birthday">Birthday</option>
            <option value="wedding">Wedding</option>
            <option value="holiday">Holiday</option>
            <option value="photography">Photography</option>
            <option value="play">Play</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Brand */}
        <div className='mb-4 flex gap-2 items-center'>
          <label>Filter By Brand:</label>
          <select className='text-black p-2 rounded-md' value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">Select...</option>
            <option value="nike">Nike</option>
            <option value="adidas">Adidas</option>
            <option value="puma">Puma</option>
            <option value="reebok">Reebok</option>
            <option value="alive">Alive</option>
            <option value="gucci">Gucci</option>
            <option value="crocs">Crocs</option>
            <option value="cannon">Cannon</option>
            <option value="fila">Fila</option>
            <option value="ktm">KTM</option>
            <option value="sony">Sony</option>
            <option value="apple">Apple</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Filter by discount */}
        <div className='mb-4 flex gap-2 items-center'>
          <label>Filter By Discount:</label>
          <select className='text-black p-2 rounded-md' value={discount} onChange={(e) => setDiscount(e.target.value)}>
            <option value="">Select...</option>
            <option value="5">5%</option>
            <option value="10">10%</option>
            <option value="20">20%</option>
            <option value="30">30%</option>
            <option value="40">40%</option>
            <option value="50">50%</option>
            <option value="60">60%</option>
          </select>
        </div>
      </div>

      {/* Show Products with filters */}
      <ShowProducts 
        
        price={price} 
        category={category} 
        gender={gender} 
        occasion={occasion} 
        brand={brand} 
        discount={discount} 
        sortBy={sortBy} 
      />
    </>
  );
};

export default Filter;
