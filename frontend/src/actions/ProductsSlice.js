import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        AddnewProduct: (state, action) => {
            state.products.push(action.payload);
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload);
        },
    },
});

export const { setProducts , AddnewProduct, removeProduct} = productsSlice.actions;
export default productsSlice.reducer;