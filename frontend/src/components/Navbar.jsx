import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div className="bg-gray-800 p-4">
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/addproducts"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                AddProducts
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Navbar
