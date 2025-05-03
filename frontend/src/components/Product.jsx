import React, { useState } from 'react';

const productsData = [
  { id: 1, name: 'Product 1', price: '$10', category: 'Category A' },
  { id: 2, name: 'Product 2', price: '$20', category: 'Category B' },
  { id: 3, name: 'Product 3', price: '$30', category: 'Category A' },
  { id: 4, name: 'Product 4', price: '$40', category: 'Category C' },
  { id: 5, name: 'Product 5', price: '$50', category: 'Category B' },
  { id: 6, name: 'Product 6', price: '$60', category: 'Category A' },
  { id: 7, name: 'Product 7', price: '$70', category: 'Category C' },
];

const productsPerPage = 3;

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(productsData.length / productsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    else if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = productsData.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{product.id}</td>
              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2">{product.price}</td>
              <td className="border border-gray-300 px-4 py-2">{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'}`}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => paginate(idx + 1)}
            className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'}`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
