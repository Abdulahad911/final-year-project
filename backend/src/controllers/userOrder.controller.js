import userModel from "../models/auth.model.js"
import OrderModel from "../models/userOrder.model.js"



const placeOrderUsingCashOnDelivery = async (req, res) => {
    try {
        const { items, amount, address } = req.body
        const userId = req.user._id

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'cod',
            payments: false,
            date: Date.now()
        }

        const newOrder = new OrderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        return res.status(200).json({ success: true, message: "order Placed" })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

const GetAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find()
        return res.status(200).json({ success: true, orders })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "internal server error " })
    }
}

const userOrdersDetails = async (req, res) => {
    try {
        const userId = req.user._id
        const order = await OrderModel.find({ userId: userId })
        return res.status(200).json({ success: true, order })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

const removeOrderData = async (req, res) => {
    try {
        const { id } = req.body
        await OrderModel.findByIdAndDelete(id)
        return res.json({ success: true, message: "order deleted" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

const AdminUpdateOrderStatus = async (req, res) => {
    try {
        const { orderId, status, note } = req.body

        const updateFields = {};
        if (status) updateFields.status = status;
        if (note) updateFields.note = note;

        await OrderModel.findByIdAndUpdate(orderId, updateFields)
        return res.json({ success: true, message: "Order updated successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

export { placeOrderUsingCashOnDelivery, GetAllOrders, userOrdersDetails, removeOrderData, AdminUpdateOrderStatus }