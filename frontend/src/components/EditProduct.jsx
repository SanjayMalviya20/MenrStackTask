import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from "react-router-dom";
const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [imageFile, setImageFile] = useState(null);

  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Fashion', label: 'Fashion' },
    { value: 'Toys and Games', label: 'Toys and Games' },
    { value: 'Home and Kitchen', label: 'Home and Kitchen' },
    { value: 'Beauty and Personal Care', label: 'Beauty and Personal Care' },
    { value: 'Sports and Outdoors', label: 'Sports and Outdoors' },
  ];

  const brands = [
    { value: '', label: 'Select Brand' },
    { value: 'Nike', label: 'Nike' },
    { value: 'Adidas', label: 'Adidas' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Samsung', label: 'Samsung' },
    { value: 'Cannon', label: 'Cannon' },
    { value: 'Sony', label: 'Sony' },
    { value: 'Puma', label: 'Puma' },
    { value: 'Reebok', label: 'Reebok' },
    { value: 'Under Armour', label: 'Under Armour' },
    { value: 'Jockey', label: 'Jockey' },
    { value: "Vans", label: "Vans" },
    { value: 'New Balance', label: 'New Balance' },
    { value: 'other', label: 'Other' },
  ];

  const occasions = [
    { value: '', label: 'Select Occasion' },
    { value: 'birthday', label: 'Birthday' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'holiday', label: 'Holiday' },
    { value: "casual", label: "Casual" },
    { value: 'photography', label: 'Photography' },
    { value: 'other', label: 'Other' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      formData.append('occasion', product.occasion);
      formData.append('discount', product.discount);
      formData.append('image', imageFile);

      const productData = await fetch(`http://localhost:3000/v1/products/update/${id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await productData.json();
      toast.success('Product Updated Successfully');
      navigate('/');

    } catch (error) {
      toast.error(error?.message);

    }
  };

  return (
    <div className="max-w-md p-4">
      <h2 className="text-2xl font-extrabold text-white mb-6">Edit Product</h2>
      <form encType='multipart/form-data' onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-white font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-400"
            placeholder="Enter product name"
          />
        </div>
        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-white font-semibold mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-400"
            placeholder="Enter price"
            min="0"
            step="0.01"
          />
        </div>
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-white font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-400 resize-none"
            placeholder="Enter product description"
          />
        </div>
        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-white font-semibold mb-1">
            Product Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full "
          />
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="mt-2 h-28 object-contain rounded border border-gray-400"
            />
          )}
        </div>
        {/* Product ID */}
        <div>
          <label htmlFor="productid" className="block text-white font-semibold mb-1">
            Product ID
          </label>
          <input
            type="text"
            id="productid"
            name="productid"
            value={product.productid}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-400"
            placeholder="Enter product ID"
          />
        </div>
        {/* Color */}
        <div>
          <label htmlFor="color" className="block text-white font-semibold mb-1">
            Color
          </label>
          <input
            readOnly
            type="text"
            id="color"
            value={product.color}
            className="w-full px-3 py-2 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-400"
            placeholder="Enter color"
          />
          <input onChange={handleInputChange} name="color" type="color" className='w-10 h-10 mt-2 rounded-md ' />
        </div>
        {/* Rating */}
        <div>
          <label htmlFor="rating" className="block text-white font-semibold mb-1">
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={product.rating}
            onChange={handleInputChange}
            min="0"
            max="10"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-400"
            placeholder="Rate from 0 to 10"
          />
        </div>
        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-white font-semibold mb-1">
            Gender
          </label>
          <div className='flex gap-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor=""> male</label>
              <input
                type="radio"
                id="gender"
                name="gender"
                value={"male"}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-400"
                placeholder="Enter gender"
              />
            </div>

            <div className='flex items-center gap-2'>
              <label htmlFor=""> female</label>
              <input
                type="radio"
                id="gender"
                name="gender"
                value={"female"}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-400"
                placeholder="Enter gender"
              />
              <div className='flex items-center gap-2'>
                <label htmlFor=""> other</label>
                <input
                  type="radio"
                  id="gender"
                  name="gender"
                  value={"other"}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-400"
                  placeholder="Enter gender"
                />
              </div>
            </div>
          </div>

        </div>
        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-white font-semibold mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            {categories.map(({ value, label }) => (
              <option key={value} value={value} className="text-black">
                {label}
              </option>
            ))}
          </select>
        </div>
        {/* Brands */}
        <div>
          <label htmlFor="brands" className="block text-white font-semibold mb-1">
            Brands
          </label>
          <select
            id="brands"
            name="brands"
            value={product.brands}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            {brands.map(({ value, label }) => (
              <option key={value} value={value} className="text-black">
                {label}
              </option>
            ))}
          </select>
        </div>
        {/* Occasion */}
        <div>
          <label htmlFor="occasion" className="block text-white font-semibold mb-1">
            Occasion
          </label>
          <select
            id="occasion"
            name="occasion"
            value={product.occasion}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            {occasions.map(({ value, label }) => (
              <option key={value} value={value} className="text-black">
                {label}
              </option>
            ))}
          </select>
        </div>
        {/* Discount */}
        <div>
          <label htmlFor="discount" className="block text-white font-semibold mb-1">
            Discount (%)
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={product.discount}
            onChange={handleInputChange}
            min="0"
            max="100"
            step="1"
            className="w-full px-3 py-2 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-400"
            placeholder="Enter discount percentage"
          />
        </div>
        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-2 bg-indigo-700 text-white font-bold py-2 rounded-md hover:bg-indigo-800 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;