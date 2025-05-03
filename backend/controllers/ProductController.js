import ProductModel from "../models/ProductSchema.js";

export const CreateProduct = async (req, res) => {
    try {

        const { name, price, description, productid, color, rating, gender, category, brands, occasion, discount } = req.body;
        if (!name || !price || !description || !productid || !color || !rating || !gender || !category || !brands || !occasion ||!discount) {
            return res.status(400).json({ error: 'Please fill all the fields' });
        }
        const product = await ProductModel.create({
            name,
            price,
            description,
            image: req.file ? req.file.filename : "",
            productid,
            color,
            rating,
            gender,
            category,
            brands,
            occasion,
            discount
        });
        return res.status(200).json({
            message: 'Product created successfully',
            product: product
        });
    }
    catch (err) {
        console.error('Error creating product:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const GetAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        return res.status(200).json({
            message: 'All products retrieved successfully',
            products: products
        });
    }
    catch (err) {
        console.error('Error retrieving products:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (err) {
        console.error('Error deleting product:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const updateProduct = async (req, res) => {
    try {
        // Find the product by ID
        const updatedProduct = await ProductModel.findById(req.params.id);

        // Check if the product exists
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update the product fields
        if (req.body.name) updatedProduct.name = req.body.name;
        if (req.body.price) updatedProduct.price = req.body.price;
        if (req.body.description) updatedProduct.description = req.body.description;
        if (req.file) updatedProduct.image = req.file.filename;
        if (req.body.category) updatedProduct.category = req.body.category;
        if (req.body.rating) updatedProduct.rating = req.body.rating;
        if (req.body.productid) updatedProduct.productid = req.body.productid;
        if (req.body.color) updatedProduct.color = req.body.color;
        if (req.body.gender) updatedProduct.gender = req.body.gender;
        if (req.body.brands) updatedProduct.brands = req.body.brands;
        if (req.body.occasion) updatedProduct.occasion = req.body.occasion;
        if (req.body.discount) updatedProduct.discount = req.body.discount;

        // Save the updated product
        await updatedProduct.save();

        // Return a success response
        return res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
        // Log the error and return a server error response
        console.error('Error updating product:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
