import React, { useEffect, useState } from 'react'
import Cart from '../pages/Cart'
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsOpen(true), 10);
    }, []);

    // const handleClose = () => {
    //     setIsOpen(false);
    //     setTimeout(() => {
    //         navigate(-1);
    //     }, 300);
    // };


    return (
        <div className=" overflow-y-auto inset-0 z-50 bg-opacity-40 flex justify-end">
            {/* Slide-in panel */}
            <div
                className={`w-full sm:w-[90%] md:w-[70%] lg:w-[50%] h-full bg-white shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Close Button */}
                <div className="flex justify-end p-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-700 hover:text-red-600 text-3xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                {/* Cart Page */}
                <Cart />
            </div>

            {/* <div
                className="absolute inset-0"
                onClick={handleClose}
            /> */}


        </div>
    )
}

export default CartDrawer