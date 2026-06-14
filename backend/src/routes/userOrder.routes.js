import express from 'express'
import { GetAllOrders, placeOrderUsingCashOnDelivery, removeOrderData, userOrdersDetails, AdminUpdateOrderStatus } from '../controllers/userOrder.controller.js'
import UserMiddleware from '../middleware/userAuth.Middleware.js'
import AdminMiddleware from '../middleware/admin.middleware.js'

const OrderRoutes = express.Router()


OrderRoutes.post('/cod', UserMiddleware, placeOrderUsingCashOnDelivery)
OrderRoutes.get('/userOrders', UserMiddleware, userOrdersDetails)

OrderRoutes.get('/get', AdminMiddleware, GetAllOrders)
// OrderRoutes.post('/orderStatus', AdminMiddleware, UpdateOrderStatus)
OrderRoutes.post('/status', AdminMiddleware, AdminUpdateOrderStatus)
OrderRoutes.post('/remove', AdminMiddleware, removeOrderData)





export default OrderRoutes

