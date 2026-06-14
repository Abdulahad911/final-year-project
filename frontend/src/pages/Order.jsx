import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopeContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Order = () => {

    const [orderData, setOrderData] = useState([])
    const { BackEndUrl, token } = useContext(ShopContext)
    const CurrencySymbole = 'Rs'

    const loadOrderData = async () => {
        try {
            if (!token) return

            const response = await axios.get(BackEndUrl + '/api/payment/userOrders', { headers: { token } })
            console.log("user order data",response)
            if (response.data.success) {
                let OrderDataArray = []
                response.data.order.forEach((order) => {
                    order.items.forEach((item) => {
                        item['status'] = order.status,
                            item['paymentMethod'] = order.paymentMethod,
                            item['payment'] = order.payment,
                            item['date'] = order.date,
                            item['orderId'] = order._id,
                            item['note'] = order.note
                        OrderDataArray.push(item)
                    })
                })
                OrderDataArray.reverse()
                console.log("Order Data which i get from response", OrderDataArray)
                setOrderData(OrderDataArray)
            }
        } catch (error) {

        }
    }


    useEffect(() => {
        loadOrderData()
    }, [token])


    return (
        <div className=''>

            <p className='text-3xl'>My <span className='text-2xl text-red-800'>Order</span></p>
            {orderData.map((item, index) => (
                <div key={index} className='py-4 border-b border-t flex flex-col sm:flex-row text-gray-700 md:items-center md:justify-between gap-4 mt-8'>

                    <div className='flex items-start gap-6 text-sm'>

                        <img onClick={() => navigate('/collection')} className='w-16 md:w-20 cursor-pointer' src={item.image[0]} alt="" />

                        <div>
                            <p className='sm:text-base font-medium'>{item.name}</p>
                            <div className='flex items-center gap-3 mt-1 text-gray-600'>
                                <p className='text-lg'>{CurrencySymbole}: {item.price}</p>
                                <p className='text-black'>Quantity: x{item.quantity}</p>
                                <p className='text-black'>Category : {item.category}</p>
                            </div>
                            <p className='mt-1'>Date : <span>{new Date(item.date).toDateString()}</span></p>
                            <p className='mt-1'>PaymentMethod : <span>{item.paymentMethod}</span></p>
                             <p className='sm:text-lg text-base font-semibold mt-4 max-w-full p-2 border border-gray-300'>{item.note}</p>

                        </div>
                    </div>
 
                    <div className='md:w-1/2 flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <p className='min-w-2 h-2 rounded bg-green-600'></p>
                            <p className='text-sm md:text-base'>{item.status}</p>
                    </div>




                        {/* <button
                        className='text-sm border px-5 py-3 font-medium cursor-pointer'
                    >
                        Cancle Order
                    </button> */}

                        <button onClick={loadOrderData} className='text-sm border px-5 py-3 font-medium cursor-pointer'>Track Order</button>

                    </div>
                </div>
            ))}
        </div>

    )
}

export default Order