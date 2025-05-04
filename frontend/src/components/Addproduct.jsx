import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AddnewProduct, setProducts } from '../actions/ProductsSlice';

const AddProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    productid: '',
    color: '',
    rating: '',
    gender: '',
    category: '',
    brands: '',
    occasion: '',
    discount: '',
  });

  const [image, setimage] = useState(null);

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setimage(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.description || !product.gender || !product.productid || !product.color || !product.rating || !product.category || !product.brands || !product.occasion) {
      toast.error("Please fill all the fields");
      return;
    }
    // API call here 
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('productid', product.productid);
    formData.append('color', product.color);
    formData.append('rating', product.rating);
    formData.append('gender', product.gender);
    formData.append('category', product.category);
    formData.append('brands', product.brands);
    formData.append('discount', product.discount);
    formData.append('occasion', product.occasion);
    formData.append('image', image);
    axios.defaults.withCredentials = true;
    const productData = await fetch("http://localhost:3000/v1/products/create", {
      method: "POST",
      body: formData,
    });
    const data = await productData.json();
    if (data) {
      dispatch(AddnewProduct(data.product));
      toast.success("Product Added successfully");
    }

    setProduct({
      name: '',
      price: '',
      description: '',
      productid: '',
      color: '',
      rating: '',
      gender: '',
      category: '',
      brands: '',
      occasion: '',
      discount: '',
    });
    setimage(
      null
    )

  };

  return (
    <div className="flex flex-col text-black">
      <h1 className="text-2xl m-3 text-white">Add Product details</h1>
      <form

        action=""
        encType="multipart/form-data"
        className="flex flex-col items-start m-3"
        onSubmit={handleSubmit}
      >
        <div className="mb-3 flex items-center gap-2">
          <label className="block text-sm font-medium text-white" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="border border-black"
          />
        </div>
        <div className="mb-3 flex items-center gap-2">
          <label className="block text-sm font-medium text-white" htmlFor="price">
            Product Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="border border-black"
          />
        </div>
        <div className="mb-3 flex gap-2 items-end">
          <label className="block text-sm font-medium text-white" htmlFor="description">
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="border border-black"
          />
        </div>
        <div className="mb-3 flex gap-2 items-center">
          <label className="block text-sm font-medium text-white" htmlFor="image">
            Product Image
          </label>
          <input
            className='text-white'
            type="file"
            id="image"
            name="image"
            value={product.image}
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-3  flex items-center gap-2">
          <label className="block text-sm font-medium text-white" htmlFor="productid">
            Product ID
          </label>
          <input
            type="text"
            id="productid"
            name="productid"
            value={product.productid}
            onChange={handleInputChange}
            className="border border-black"
          />
        </div>
        <div className="mb-3 flex items-center gap-2">
          <label className="block text-sm font-medium text-white" htmlFor="discount">
            Product Discount
          </label>
          <select
            id="discount"
            name="discount"
            value={product.discount}
            onChange={handleInputChange}
            className="border text-md  border-black text-black"
          >
            <option value="">Select Discount</option>
            <option value="0">0%</option>
            <option value="5">5%</option>
            <option value="10">10%</option>
            <option value="20">20%</option>
            <option value="40">40%</option>
            <option value="50">50%</option>
            <option value="60">60%</option>
          </select>
        </div>
        <div className="mb-3 flex gap-2">
          <label className="block text-sm font-medium text-white" htmlFor="color">
            Product Color
          </label>
          <div className='flex gap-2'>
            <input type="text" value={product.color} readOnly />
            <input
              type="color"
              id="color"
              name="color"
              onChange={handleInputChange}
              className="border border-black"
            />
          </div>
        </div>
        <div className="mb-3 flex gap-2 items-center">
          <label className="block text-sm font-medium text-white" htmlFor="rating">
            Product Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={product.rating}
            onChange={handleInputChange}
            className="border border-black"
          />
        </div>
        <div className="mb-3 flex items-center gap-3">
          <label className="block text-sm font-medium text-white" htmlFor="gender">
            Product Gender
          </label>
          <div className='flex gap-1 items-center justify-center'>
            <label className='text-white' htmlFor=""> male</label>
            <input
              type="radio"
              id="gender"
              name="gender"
              value={"male"}
              onChange={handleInputChange}
              className="border border-black"
            />
            <label className='text-white' htmlFor="">female</label>
            <input
              type="radio"
              id="gender"
              name="gender"
              value={"female"}
              onChange={handleInputChange}
              className="border border-black"

            />
            <label htmlFor="" className='text-white'>other</label>
            <input
              type="radio"
              id="gender"
              name="gender"
              value={"other"}
              onChange={handleInputChange}
              className="border border-black"
            />
          </div>

        </div>
        <div className="mb-3 flex gap-2 items-center">
          <label className="block text-sm font-medium text-white" htmlFor="category">
            Product Category
          </label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="border border-black text-black"
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
            <option value="shoes">Shoes</option>
            <option value="toys and games">Toys and Games</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-3 flex gap-2 items-center">
          <label className="block text-sm font-medium text-white" htmlFor="brands">
            Product Brand
          </label>
          <select
            id="brands"
            name="brands"
            value={product.brands}
            onChange={handleInputChange}
            className="border border-black text-black"
          >
            <option value="">Select Brand</option>
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

        <div className="mb-3 flex gap-2 items-center">
          <label className="block text-sm font-medium text-white" htmlFor="occasion">
            Product Occasion
          </label>
          <select
            id="occasion"
            name="occasion"
            value={product.occasion}
            onChange={handleInputChange}
            className="border border-black text-black"
          >
            <option value="">Select Occasion</option>
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

        <button
          type="submit"
          className="bg-black duration-200 hover:bg-[#1a1b5c] text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct
