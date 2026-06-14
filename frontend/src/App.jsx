import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import TopNavbar from './components/TopNavbar'
import BottomNavbar from './components/BottomNavbar'
import Products from './pages/Products'
import Footer from './components/Footer'
import Collections from './pages/Collections'
import Login from './pages/Login'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import CartDrawer from './components/CartDrawer'
// import KeyboardCartNavigation from './components/KeyboardCartNavigation'
import Order from './pages/Order'
import { ToastContainer } from 'react-toastify'


const App = () => {


  const location = useLocation()


  return (
    <div className='px-1 sm:px-[3vw] md:px-[4vw] lg:px-[5vw]'>
      <ToastContainer />
      <TopNavbar />

      {location.pathname !== '/login' && location.pathname !== '/cart' && <BottomNavbar />}
      {/* <KeyboardCartNavigation /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collections />} />
        <Route path="/collection/:category" element={<Collections />} />
        <Route path="/collection/:category/:subCategory" element={<Collections />} />
        <Route path="/collection/:category?/:subCategory?" element={<Collections />} />
        <Route path='/product/:productId' element={<Products />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/cart' element={<Cart />} /> */}
        <Route path='/cart' element={<CartDrawer />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/orders' element={<Order />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App