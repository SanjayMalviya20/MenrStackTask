
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { removeProduct } from '../actions/ProductsSlice';
import axios from 'axios';
import getAllproducts from '../hooks/getAllproducts';
import { Link } from 'react-router-dom';

const ShowProducts = ({ price, category, gender, occasion, brand, discount, sortBy }) => {
  getAllproducts();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/v1/products/delete/${id}`);
      toast.success(res.data.message);
      dispatch(removeProduct(id));
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  };

  // Apply filters
  const filteredProducts = products.filter(product => {
    return (
      (gender ? product.gender === gender : true) &&
      (price ? product.price <= price : true) &&
      (category ? product.category === category : true) &&
      (occasion ? product.occasion === occasion : true) &&
      (brand ? product.brands === brand : true) &&
      (discount ? product.discount === Number(discount) : true)
    );
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'price') {
      return a.price - b.price;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className='m-5'>
      <h2 className='text-2xl font-bold mb-4'>Products</h2>

      <table className='w-full table-auto border-collapse border border-gray-300'>
        <thead>
          <tr className='bg-[#1e4686] '>
            <th className='border p-2'>Product ID</th>
            <th className='border p-2'>Name</th>
            <th className='border p-2'>Image</th>
            <th className='border p-2'>Price</th>
            <th className='border p-2'>Description</th>
            <th className='border p-2'>Color</th>
            <th className='border p-2'>Rating</th>
            <th className='border p-2'>Gender</th>
            <th className='border p-2'>Category</th>
            <th className='border p-2'>Brand</th>
            <th className='border p-2'>Occasion</th>
            <th className='border p-2'>Discount</th>
           
            <th className='border p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <tr key={product._id} className='bg-slate-800 text-white'>
                <td className='border p-2'>{product.productid}</td>
                <td className='border p-2'>{product.name}</td>
                <td className='border p-2'>
                  <img
                    className='w-16 rounded'
                    src={`http://localhost:3000/${product.image}`}
                    alt={product.name}
                  />
                </td>
                <td className='border p-2'>₹{product.price}</td>
                <td className='border p-2'>{product.description}</td>
                <td className='border p-2'>{product.color}</td>
                <td className='border p-2'>{product.rating}</td>
                <td className='border p-2'>{product.gender}</td>
                <td className='border p-2'>{product.category}</td>
                <td className='border p-2'>{product.brands}</td>
                <td className='border p-2'>{product.occasion}</td>
                <td className='border p-2'>{product.discount ? `${product.discount}% off` : '--'}</td>
                
                <td className='border p-2'>
                  <div className='flex gap-2'>
                    <Link to={`/editproduct/${product._id}`} className='text-blue-400'>Edit</Link>
                    <button onClick={() => deleteProduct(product._id)} className='text-red-400'>Delete</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14" className='text-center p-4 text-gray-400'>No matching products found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className='flex justify-center items-center gap-4 mt-4'>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className='bg-gray-700 px-4 py-2 rounded text-white disabled:opacity-50'
        >
          Previous
        </button>
        <span className='text-white'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className='bg-blue-600 px-4 py-2 rounded text-white disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShowProducts;
