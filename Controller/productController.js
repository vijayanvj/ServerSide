const ProductModel = require('../Model/productModel');

//Get Products API - /api/v1/products
exports.getProducts = async (req, res, next) => {
    try {
        const { keyword, page = 1, limit = 4 } = req.query;
        let query = {};

        if (keyword) {
            const isNumber = !isNaN(parseFloat(keyword));

            if (isNumber) {
                query.$or = [
                    { price: { $lte: parseFloat(keyword) } },
                    { name: { $regex: keyword, $options: "i" } }
                ];
            } else {
                query.name = { $regex: keyword, $options: "i" };
            }
        }

        const totalProducts = await ProductModel.countDocuments(query); // Count total products
        const products = await ProductModel.find(query)
            .limit(parseInt(limit)) // Limit products per page
            .skip((parseInt(page) - 1) * parseInt(limit)); // Skip for pagination

        res.json({
            success: true,
            totalProducts,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalProducts / parseInt(limit)),
            products
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};



//Get Single Product API - /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        res.json({
            success: true,
            product
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Unable to get Product with that ID'
        })
    }
}