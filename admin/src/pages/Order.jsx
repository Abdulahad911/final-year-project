import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'


const Order = ({ token }) => {
  const BackEndUrl = "http://localhost:9090"
  const [orders, setOrders] = useState([])
  const [notes, setNotes] = useState({});


  const handleNoteChange = (orderId, value) => {
    setNotes(prev => ({
      ...prev,
      [orderId]: value
    }));
  };

  const fetchOrdersData = async () => {
    if (!token) {
      console.error("No token provided unAutorized user")
      return
    }
    try {
      const response = await axios.get(BackEndUrl + '/api/payment/get', { headers: { token } })
      // console.log(response.data)
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message || "Something went wrong")
      }

    } catch (error) {
      toast.error(error.response?.data.message || "Something went wrong")
    }
  }

  const statusHandler = async (event, orderId, optionalNote = "") => {
    const status = event?.target?.value;

    try {
      const response = await axios.post(BackEndUrl + '/api/payment/status', {
        orderId,
        ...(status && { status }),
        ...(optionalNote && { note: optionalNote })
      }, {
        headers: { token }
      });

      if (response.data.success) {
        await fetchOrdersData();
        toast.success("Order updated successfully");
        setNotes("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating order");
    }
  };


  const deleteOrderData = async (id) => {
    const response = await axios.post(BackEndUrl + '/api/payment/remove', { id }, { headers: { token } })
    if (response.data.success) {
      toast.success(response.data.message)
      await fetchAllOrders()
    }
  }


  useEffect(() => {
    fetchOrdersData()
  }, [token])


  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md">

      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
        <h1 className="text-2xl font-semibold text-gray-800">Order Details</h1>
        <button
          onClick={() => window.location.reload()}
          className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
        >
          Refresh
        </button>
      </div>

      <div className="space-y-6">
        {
          orders.map((order, index) => (
            <div
              key={index}
              className='relative grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[1fr] lg:grid-cols-[2fr_1fr_1fr_1fr] gap-4 border border-gray-400 p-4 sm:p-6 text-sm md:text-base text-gray-700 rounded-lg bg-gray-50 shadow'
            >

              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <p key={index}>
                    {item.name} x {item.quantity} x <span className="font-semibold">{item.size}</span>
                  </p>
                ))}

                <p className='text-lg text-red-500 font-semibold mt-2'>User Details</p>
                <div>
                  <p>{order.address.firstName + " " + order.address.lastName}</p>
                  <p>Street No: {order.address.street}</p>
                  <p>{`${order.address.detaileAddress}, ${order.address.city}, ${order.address.zipCode}`}</p>
                  <p>House No: {order.address.Houseno}</p>
                  <p>{order.address.phone}</p>
                  <p>{order.address.email}</p>
                </div>

                <div className='flex flex-col sm:flex-row gap-2 mt-2'>
                  <input
                    value={notes[order._id] || ""}
                    onChange={(e) => handleNoteChange(order._id, e.target.value)}
                    className='flex-1 px-3 py-2 border rounded-md'
                    type="text"
                    placeholder='Type message for customer'
                    required
                  />
                  <button
                    onClick={() => statusHandler(null, order._id, notes[order._id] || "")}
                    className='bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800'
                  >
                    Send
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Date: {new Date(order.date).toDateString()}</p>
                <p className="font-semibold text-rose-900">Total Amount: {order.amount}</p>
              </div>

              <div className="flex items-end justify-end">
                <button
                  onClick={() => deleteOrderData(order._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hide"
                >
                  Delete
                </button>
              </div>

              <div className='flex items-start justify-start'>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className='w-full p-2 border border-gray-600 rounded-md hide'
                >
                  <option value="order placed">Order Placed</option>
                  <option value="packing">Packing</option>
                  <option value="shipped">Shipped</option>
                  <option value="out of delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Failed">Failed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Processing">Processing</option>
                  <option value="Refunded">Refunded</option>
                  <option value="Pending Payment">Pending Payment</option>
                  <option value="Payment Confirmed">Payment Confirmed</option>
                  <option value="Returned">Returned</option>
                  <option value="out of stock">Out of Stock</option>
                </select>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )

}

export default Order