
import './App.css'
import { ToastContainer } from 'react-toastify';
// import ProductList from './components/Product';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Addproduct from './components/Addproduct';
import Products from './components/Home';
import EditProduct from './components/EditProduct';
function App() {


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/addproducts" element={<Addproduct />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
        </Routes>
      </Router>
      <ToastContainer position='top-center' theme='colored'/>
    </> 
  )
}

export default App
