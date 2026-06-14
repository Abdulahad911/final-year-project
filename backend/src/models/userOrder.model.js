import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default: 'order placed' },
    paymentMethod: { type: String, required: true },
    date: { type: Number, required: true },
    note: { type: String , default: 'Thank you! Your order will be delivered within 2 days.' }
}, { timestamps: true });

const OrderModel = mongoose.models.Order || mongoose.model('UserOrder', OrderSchema);

export default OrderModel;