import express from 'express';
import UserMiddleware from '../middleware/userAuth.Middleware.js';
import { addtoCart, GetUserCart, UpdateCart } from '../controllers/userCart.controller.js';

const userCartRoutes = express.Router();

userCartRoutes.post('/AddToCart',UserMiddleware,addtoCart)
userCartRoutes.get('/GetCartData',UserMiddleware,GetUserCart)
userCartRoutes.post('/updateCart',UserMiddleware,UpdateCart)

export default userCartRoutes;
