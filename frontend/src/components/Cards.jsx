import React from 'react'
import { assets } from '../assets/assets'

const Cards = () => {
    return (
        <div className='w-full overflow-x-auto sm:overflow-visible'>
            <div className='flex gap-4 mt-5 min-w-[700px] sm:min-w-full lg:grid lg:grid-cols-5 lg:gap-4'>
                
                <div className='flex items-center gap-4 bg-gray-100 p-5 rounded-lg min-w-[250px]'>
                    <img className='w-12 transition duration-100 transform hover:-translate-y-1' src={assets.cimg1} alt="" />
                    <div>
                        <h1 className='text-lg text-gray-800 font-bold'>Best prices & offers</h1>
                        <p className='text-sm'>Orders $50 or more</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 bg-gray-100 p-5 rounded-lg min-w-[250px]'>
                    <img className='w-12 transition duration-100 transform hover:-translate-y-1' src={assets.cimg2} alt="" />
                    <div>
                        <h1 className='text-lg text-gray-800 font-bold'>Free delivery</h1>
                        <p className='text-sm'>Orders $50 or more</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 bg-gray-100 p-5 rounded-lg min-w-[250px]'>
                    <img className='w-12 transition duration-100 transform hover:-translate-y-1' src={assets.cimg3} alt="" />
                    <div>
                        <h1 className='text-lg text-gray-800 font-bold'>Great daily deal</h1>
                        <p className='text-sm'>Orders $50 or more</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 bg-gray-100 p-5 rounded-lg min-w-[250px]'>
                    <img className='w-12 transition duration-100 transform hover:-translate-y-1' src={assets.cimg4} alt="" />
                    <div>
                        <h1 className='text-lg text-gray-800 font-bold'>Wide assortment</h1>
                        <p className='text-sm'>Orders $50 or more</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 bg-gray-100 p-5 rounded-lg min-w-[250px]'>
                    <img className='w-12 transition duration-100 transform hover:-translate-y-1' src={assets.cimg5} alt="" />
                    <div>
                        <h1 className='text-lg text-gray-800 font-bold'>Easy returns</h1>
                        <p className='text-sm'>Orders $50 or more</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Cards
