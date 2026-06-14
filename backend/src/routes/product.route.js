import express from 'express'
import AdminMiddleware from '../middleware/admin.middleware.js'
import upload from '../middleware/multer.js'

import { addProducts, ListProducts, RemoveProducts, updateProducts } 
from '../controllers/product.controller.js'



const ProductsRoutes = express.Router()

ProductsRoutes.post('/add', AdminMiddleware, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
]), addProducts)

ProductsRoutes.post('/update', AdminMiddleware, upload.fields([
    { name: 'image1' },
    { name: 'image2' },
    { name: 'image3' },
    { name: 'image4' },
]), updateProducts)

ProductsRoutes.post('/remove' , AdminMiddleware , RemoveProducts);
ProductsRoutes.get('/list' , ListProducts);

export default ProductsRoutes