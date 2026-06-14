import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopeContext'



const CartTotal = () => {

    const {deliveryFee, CurrencySymbole, getCartTotalAmount, } = useContext(ShopContext)

    return (
        <div className='w-full'>

            <div className='text-2xl dark:text-white'>
                <p>Cart Total </p>
            </div>

            <div className='flex flex-col gap-2 text-lg'>
                <div className='flex justify-between '>
                    <p>SubTotal</p>
                    <p>{CurrencySymbole} {getCartTotalAmount()}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{CurrencySymbole} {deliveryFee}.00</p>
                </div>
                <hr />
                <div className='flex justify-between font-bold'>
                    <p>Total</p>
                    <p>{CurrencySymbole} {getCartTotalAmount() === 0 ? 0 : getCartTotalAmount() + deliveryFee}.00</p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal