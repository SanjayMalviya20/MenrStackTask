import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    image: {
        type: String,
        required: true
    },
   productid:{
       type: String,
    //    required: true
   },
   color:{
       type: String,
    //    required: true
   },
   rating:{
       type: Number,
       required: true
   },
   gender:{
       type: String,
       required: true
   },
   category: {
       type: String,
       required: true
   },
   brands:{
       type: String,
       required: true
   },
   occasion:{
       type: String,
       required: true
   },
   discount: {
       type: Number,
       required: true
   }
  
 
})

const ProductModel = mongoose.model("Product", ProductSchema)

export default ProductModel
    