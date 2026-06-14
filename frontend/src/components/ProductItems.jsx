import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

const ProductItems = ({ id, name, image, price }) => {

    const CurrencySymbole = "Rs"

    return (
        <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
            <div className='overflow-hidden hover:shadow-2xl hover:border-gray-300 rounded-3xl duration-500 hover:border-b-2 backdrop-opacity-50 '>
                <img className='w-full h-64 object-cover hover:scale-110 transition duration-300 ease-in-out' src={image[0]} alt="" />
                <div className='h-32 border-2 border-slate-100 text-black p-5'>
                    <p className='pt-3 pb-1 text-sm'>{name}</p>
                    <p className='text-sm font-medium'>{`${CurrencySymbole} :`}{price}</p>
                </div>
            </div>
        </Link>
    )
}

export default ProductItems