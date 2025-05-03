// import React, { useEffect, useMemo, useState } from 'react';
// // import getAllproducts from '../hooks/getAllproducts';
// import { useDispatch, useSelector } from 'react-redux';
// import { useTable, usePagination } from 'react-table';
// import { toast } from 'react-toastify';
// import { removeProduct,  } from '../actions/ProductsSlice';
// import axios from 'axios';
// import getAllproducts from '../hooks/getAllproducts';
// import { Link } from 'react-router-dom';

// const ShowProducts = ({ price, category, gender, occasion, brand, discount }) => {
//   getAllproducts();
//   const dispatch = useDispatch();
//   const products = useSelector(state => state.products.products);
//   console.log(products)

//   //delete product api hete 
//   const deleteProduct = async (id) => {
//     try {
//       const res = await axios.delete(`http://localhost:3000/v1/products/delete/${id}`);
//       dispatch(removeProduct(id));
//       toast.success(res.data.message);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   const columns = React.useMemo(() => [
//     {
//       Header: 'Product ID',
//       accessor: 'productid',
//     },
//     {
//       Header: 'Name',
//       accessor: 'name',
//     },
//     {
//       Header: 'Image',
//       accessor: 'image',
//       Cell: ({ value }) => <img className='w-20 rounded-md' src={`http://localhost:3000/${value}`} alt="Product Image" />,
//     },
//     {
//       Header: 'Price',
//       accessor: 'price',
//       Cell: ({ value }) => `₹${value}`,
//     },
//     {
//       Header: 'Description',
//       accessor: 'description',
//     },
//     {
//       Header: 'Color',
//       accessor: 'color',
//     },
//     {
//       Header: 'Rating',
//       accessor: 'rating',
//     },
//     {
//       Header: 'Gender',
//       accessor: 'gender',
//     },
//     {
//       Header: 'Category',
//       accessor: 'category',
//     },
//     {
//       Header: 'Brands',
//       accessor: 'brands',
//     },
//     {
//       Header: 'Occasion',
//       accessor: 'occasion',
//     },
//     {
//       Header: 'Discount',
//       accessor: 'discount',
//       Cell: ({ value }) =>
//         `${value ? value + "% off" : `--`}`,
//     },
//     {
//       Header: 'Actions',
//       accessor: 'actions',
//       Cell: ({ row }) => (
//         <div className='flex gap-2'>
//           <Link to={`/editproduct/${row.original._id}`}>Edit</Link>
//           <button onClick={() => deleteProduct(row.original._id)}>Delete</button>
//         </div>
//       ),
//     },
//   ], []);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     page,
//     canPreviousPage,
//     canNextPage,
//     previousPage,
//     nextPage,
//     setPageSize,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data: products,
//       initialState: { pageSize: 4 },
//     },
//     usePagination
//   );

//   return (
//     <div className='m-3'>
//       <table {...getTableProps()} style={{ border: 'solid 1px gray' }}>
//         <thead >
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
//               {headerGroup.headers.map(column => (
//                 <th
//                   {...column.getHeaderProps()}
//                   key={column.id}
//                   style={{
//                     borderBottom: 'solid 3px gray',
//                     backgroundColor: '#a1a2ff',
//                     color: 'black',
//                     fontWeight: 'bold',
//                     padding: '13px',
//                   }}
//                 >
//                   {column.render('Header')}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map(row => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()} key={row.id}>
//                 {row.cells.map(cell => (
//                   <td
//                     {...cell.getCellProps()}
//                     key={cell.column.id}
//                     style={{
//                       backgroundColor: 'rgb(12 46 58)',
//                       padding: '12px',
//                       border: 'solid 1px gray',
//                     }}
//                   >
//                     {cell.render('Cell')}

//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div className="pagination flex gap-3 items-center justify-center" style={{ padding: '10px' }}>
//         <button className='bg-[#222e42] p-3 rounded-md' onClick={() => previousPage()} disabled={!canPreviousPage}>
//           Previous
//         </button>
//         <span>
//           Page{' '}
//           <strong>
//             {pageIndex + 1} of {Math.ceil(rows.length / pageSize)}
//           </strong>
//         </span>
//         <button className='bg-[#3b82f6] p-3 rounded-md' onClick={() => nextPage()} disabled={!canNextPage}>
//           Next
//         </button>
//         <select
//           className='bg-white text-black rounded-md'
//           value={pageSize}
//           onChange={e => setPageSize(Number(e.target.value))}
//         >
//           {[4, 10, 20, 30, 40, 50].map(pageSize => (
//             <option className='text-black' key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { removeProduct } from '../actions/ProductsSlice';
import axios from 'axios';
import getAllproducts from '../hooks/getAllproducts';
import { Link } from 'react-router-dom';

const ShowProducts = ({ price, category, gender, occasion, brand, discount, sortBy }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  getAllproducts();

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/v1/products/delete/${id}`);
      dispatch(removeProduct(id));
      toast.success(res.data.message);
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
