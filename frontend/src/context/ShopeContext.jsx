import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'



export const ShopContext = createContext();

export const ShopContextProvider = (props) => {

    const BackEndUrl = "http://localhost:9090"
    const [products, setProducts] = useState([])
    const [token, setToken] = useState(localStorage.getItem("AuthUserToken"))


    const CurrencySymbole = "Rs";
    const deliveryFee = 250;
    const navigate = useNavigate()

    // add to cart setup 
    const [cartItems, setCartItems] = useState({})

    const addToCart = async (itemId, size) => {
        let CartData = structuredClone(cartItems)
        if (CartData[itemId]) {
            if (CartData[itemId][size]) {
                CartData[itemId][size] += 1
            } else {
                CartData[itemId][size] = 1
            }
        } else {
            CartData[itemId] = {}
            CartData[itemId][size] = 1
        }
        console.log(CartData)
        setCartItems(CartData)

        try {
            await axios.post(BackEndUrl + '/api/cart/AddToCart', { itemId, size }, { headers: { token } })
        } catch (error) {
            console.log("Error in add to cart function", error);
            toast.error("Error in adding to cart!");
        }
    }

    const GetCartCount = () => {
        let TotalCount = 0
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        TotalCount += cartItems[items][item]
                    }
                } catch (error) {
                    console.log("Error in total cart count function", error)
                }
            }
        }
        return TotalCount;
    }

    const getCartTotalAmount = () => {
        let TotalAmount = 0;
        for (let items in cartItems) {
            let productInfo = products.find((product) => product._id === items)
            for (let item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        TotalAmount += productInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    console.log("Error in total cart Amount function", error.message)
                }
            }
        }
        return TotalAmount
    }

    const UpdateQuantity = async (itemId, size, quantity) => {
        let CartData = structuredClone(cartItems)
        CartData[itemId][size] = quantity;

        setCartItems(CartData)
        if (token) {
            try {
                const response = await axios.post(BackEndUrl + '/api/cart/updateCart', { itemId, size, quantity }, { headers: { token } })
                console.log(response)
            } catch (error) {
                console.log("error in update controller")
                toast.error("SomeThing Went wrong while updating cart try agian!");
            }
        }
    }

    const GetProductData = async (req, res) => {
        try {
            const response = await axios.get(BackEndUrl + '/api/product/list');
            console.log(response)
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error("Error in fetching products !")
            }
        } catch (error) {
            console.log(error)
            toast.error("Error in fetching products !")
        }
    }

    const getAllCartData = async (token) => {
        try {
            const response = await axios.get(BackEndUrl + '/api/cart/GetCartData', {
                headers: { token }
            })
            console.log("Get from database cartData", response)
            if (response.data.success) {
                setCartItems(response.data.cartData)
            } else {
                toast.error("SomeThing's went wrong Login Again")
            }
        } catch (error) {
            console.log("Error in get all cart data function", error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('AuthUserToken')
        setToken('')
        // setCartItems({})
        toast.success("Logout Successfully !")
        setTimeout(() => navigate('/login'), 0)
    }

    useEffect(() => {
        GetProductData()
        getAllCartData(token)
    }, [token])

    useEffect(() => {
        if (!token && localStorage.getItem("AuthUserToken")) {
            setToken(localStorage.getItem("AuthUserToken"))
        }
    }, [])

    const value = {
        products,
        CurrencySymbole,
        token, setToken, BackEndUrl,
        handleLogout,


        // add to cart 
        addToCart,
        GetCartCount,
        cartItems,
        setCartItems,
        UpdateQuantity,
        deliveryFee,
        getCartTotalAmount,
        getAllCartData
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

