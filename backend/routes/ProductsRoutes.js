import express from "express";
import { CreateProduct, deleteProduct, GetAllProducts, updateProduct } from "../controllers/ProductController.js";
const router = express.Router();

router.post("/create", CreateProduct);
router.get("/getall", GetAllProducts);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);

export default router;