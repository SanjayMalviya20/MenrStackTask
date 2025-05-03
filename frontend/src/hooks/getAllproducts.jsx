import axios from 'axios'
import React, { useEffect,  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setProducts } from '../actions/ProductsSlice'

const getAllproducts = () => {
const dispatch = useDispatch()
 useEffect(() => {
     const fetchData = async () => {
         try {
            const res = await axios.get('http://localhost:3000/v1/products/getall');
            dispatch(setProducts(res.data.products))
         } catch (error) {
             toast.error(error)       
         }
     }
     fetchData()
 },[])
}

export default getAllproducts
