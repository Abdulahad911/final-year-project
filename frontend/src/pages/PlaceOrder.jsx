import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopeContext'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import axios from 'axios'


const PlaceOrder = () => {

  const [method, setmethod] = useState("cod")
  const { token, cartItems, setCartItems, products, getCartTotalAmount, deliveryFee, BackEndUrl } = useContext(ShopContext)
  const navigate = useNavigate()

  const [formData, setformData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    houseNo: '',
    zipCode: '',
    detaileAddress: '',
    phone: '',
    landmark: '',
    province: ''
  })
  console.log(formData)

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setformData(data => ({ ...data, [name]: value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      console.log("this is order item", orderItems)

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartTotalAmount() + deliveryFee
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(BackEndUrl + '/api/payment/cod', orderData, { headers: { token } });
          console.log(response)
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
            console.log(response)
          }
          break;

        default:
          break;
      }


    } catch (error) {

    }

  }

  return (
    <form onSubmit={submitHandler} className='flex flex-col justify-around sm:flex-row gap-4 pt-4 sm:pt-14 min-h-[80vh]' >
      <div className='flex flex-col w-full gap-4 sm:w-[480px]'>

        <div>
          <p className='text-2xl font-semibold'>Order Information</p>
        </div>

        {/* --------------left side------------------ */}

        <div className='flex gap-3'>
          <input onChange={onChangeHandler} value={formData.firstName} name='firstName' type="text" placeholder='Enter Your FirstName' className='border border-gray-700 px-3 py-2 w-full' required />
          <input onChange={onChangeHandler} value={formData.lastName} name='lastName' type="text" placeholder='Enter Your LastName' className='border border-gray-700 px-3 py-2 w-full' required />
        </div>

        <input onChange={onChangeHandler} value={formData.email} name='email' type="text" placeholder='Enter Email Address' className='border border-gray-700 px-3 py-2 w-full' required />
        <input onChange={onChangeHandler} value={formData.street} name='street' type="text" placeholder='Enter Street No' className='border border-gray-700 px-3 py-2 w-full' required />

        <div className='flex gap-3'>
          <input onChange={onChangeHandler} value={formData.city} name='city' type="text" placeholder='Enter City Name' className='border border-gray-700 px-3 py-2 w-full' required />
          <input onChange={onChangeHandler} value={formData.houseNo} name='houseNo' type="text" placeholder='Enter Your houseNo' className='border border-gray-700 px-3 py-2 w-full' required />
        </div>

        <div className='flex gap-3'>
          <input onChange={onChangeHandler} value={formData.zipCode} name='zipCode' type="number" placeholder='Enter Zip Code' className='border border-gray-700 px-3 py-2 w-full' required />
          <input onChange={onChangeHandler} value={formData.detaileAddress} name='detaileAddress' type="text" placeholder='Enter Complete Address' className='border border-gray-700 px-3 py-2 w-full' required />
        </div>

        <div className='flex gap-3'>
          <input onChange={onChangeHandler} value={formData.phone} name='phone' type="number" placeholder='Enter Phone no' className='border border-gray-700 px-3 py-2 w-full' required />
          <input onChange={onChangeHandler} value={formData.landmark} name='landmark' type="text" placeholder='landmar (optional)' className='border border-gray-700 px-3 py-2 w-full' />
        </div>

        <label htmlFor="province">province:</label>
        <select className='border border-gray-700 px-3 py-2 w-full' name="province" id="province" value={formData.province} onChange={(e) => setformData({ ...formData, province: e.target.value })} required>
          <option value="" disabled>Select Area</option>
          <option value="Punjab">Punjab</option>
          <option value="Sindh">Sindh</option>
          <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
          <option value="Balochistan">Balochistan</option>
          <option value="Islamabad Capital">Islamabad Capital</option>
          <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
          <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir</option>
        </select>



        {/* --------------left side End------------------ */}
      </div>

      {/*--------------------------- right side--------------------- */}
      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <p className='text-2xl font-semibold'>Payment Method</p>

          <div className='flex flex-col lg:flex-row'>
            {/* <button>
              <div onClick={() => setmethod("stripe")} className='flex items-center gap-3 cursor-pointer p-4 px-3'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-700" : ""}`}></p>
                <img className='h-7 mx-3' src={assets.stripe_logo} alt="" />
              </div>
            </button>

            <button>
              <div onClick={() => setmethod("easypaisa")} className='flex items-center gap-3 cursor-pointer p-4 px-3'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "easypaisa" ? "bg-green-700" : ""}`}></p>
                <img className='h-7 mx-3 bg-transparent invert' src={assets.easypaisaicon} alt="" />
              </div>
            </button> */}

            <div onClick={() => setmethod("cod")} className='flex items-center gap-3 cursor-pointer p-4 px-3'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-700" : ""}`}></p>
              <p className='text-gray-700 font-bold text-xl mx-3'>Cash on Delivery</p>
            </div>
          </div>
        </div>


        <button type='submit' className='bg-black text-white w-full py-3 cursor-pointer font-medium'>Place Order</button>

        {/*--------------------------- right side End--------------------- */}

      </div>
    </form>
  )
}

export default PlaceOrder