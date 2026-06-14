import React, { useState } from 'react';
import { assets } from '../assets/assets';

const NewsLatterBox = () => {
    const [formData, setFormData] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        if (formData.trim() === "") {
            alert("Please enter a valid email address.");
            return;
        }

        alert(`Welcome! You have successfully subscribed with ${formData}`);
        setFormData("");
    };

    return (
        <div className="w-full p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 bg-green-100 mt-10 rounded-3xl">
            {/* Left Section */}
            <div className="w-full lg:w-1/2">
                <p className="text-gray-900 text-xl sm:text-3xl font-bold opacity-90">
                    Stay home & get your daily needs from our shop
                </p>
                <p className="mt-3 text-sm sm:text-base opacity-70">
                    Start Your Daily Shopping with Nest Mart
                </p>

                <form
                    onSubmit={submitHandler}
                    className="mt-5 flex flex-col sm:flex-row w-full border rounded-md overflow-hidden"
                >
                    <input
                        className="px-3 py-2 text-sm sm:text-base outline-none flex-1"
                        value={formData}
                        onChange={(e) => setFormData(e.target.value)}
                        type="email"
                        placeholder="Enter Email"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-gray-900 text-white px-4 py-2 text-sm sm:text-base hover:bg-gray-800 transition-all"
                    >
                        SUBSCRIBE
                    </button>
                </form>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-[35%] sm:block hidden">
                <img
                    className="w-full h-auto object-contain"
                    src={assets.bgimg}
                    alt="Newsletter Banner"
                />
            </div>
        </div>
    );
};

export default NewsLatterBox;
