
const ProductModel=require("../models/ProductModel")
const asynchandler = require("express-async-handler")

exports.createProduct = asynchandler(async (req, res) => {
    const { title, priceBefore, priceAfter, description, image, colors, quantity, category, brand } = req.body
    

    const productResponse = await ProductModel.create({
        title, priceBefore, priceAfter, description, image, colors, quantity, category, brand
    })

    res.status(200).json({
        success: "success",
        product: productResponse
    })
})