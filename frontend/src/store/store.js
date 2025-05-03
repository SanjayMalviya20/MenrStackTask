import {configureStore} from "@reduxjs/toolkit"
import productsSlice from "../actions/ProductsSlice";
export const store = configureStore({
    reducer: {
    products: productsSlice
    }
})