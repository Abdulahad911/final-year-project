import { useEffect, useState } from "react";
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import { ToastContainer } from 'react-toastify';
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import Addadv from "./pages/Addadv";
import Listadv from "./pages/Listadv";


function App() {

  const [token, setToken] = useState(localStorage.getItem("AdminToken") ? localStorage.getItem("AdminToken") : "")



  useEffect(() => {
    localStorage.setItem("AdminToken", token)
  }, [token])

  return (
    <div className="min-h-screen bg-gray-300">
      <ToastContainer />
      {
        token === ""
          ? <Login setToken={setToken} />
          : <>
            <Navbar setToken={setToken} />

            <hr />

            <div className="flex w-full">
              <Sidebar />

              <div className="w-[90%] mx-auto ml-[max(5vw , 25px)] my-8 text-gray text-base">
                <Routes>
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/order" element={<Order token={token} />} />
                  <Route path="/addadv" element={<Addadv token={token} />} />
                  <Route path="/listadv" element={<Listadv token={token} />} />
                </Routes>
              </div>

            </div>
          </>
      }
    </div>
  )
}

export default App
