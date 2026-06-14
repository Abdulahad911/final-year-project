import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

import { GridLoader } from 'react-spinners'
import ListAdv from './Listadv'


const AddAdv = ({ token }) => {

  const BackEndUrl = "http://localhost:9090"

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {

      const formData = new FormData()

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)


      const response = await axios.post(BackEndUrl + '/api/adv/add', formData, {
        headers: { token }
      })
      console.log(response)
      if (response.data.success) {
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit} className='border-b-2 flex flex-col items-center justify-center'>

        <h1 className='text-md font-extrabold border-b-2 w-full'>Banner Advertisement </h1>
        <div className='flex flex-wrap gap-4 mt-5 items-center justify-center w-full'>
          <label htmlFor="image1">
            <img className='w-20 h-20 object-contain' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
          </label>

          <label htmlFor="image2">
            <img className='w-20 h-20 object-contain' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
          </label>

          <label htmlFor="image3">
            <img className='w-20 h-20 object-contain' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
          </label>

          <label htmlFor="image4">
            <img className='w-20 h-20 object-contain' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>
        </div>

        {
          loading ? (
            <>
              <div className="mt-5">
                <GridLoader color="#000" size={30} />
              </div>
            </>
          ) : (
            <div className='flex gap-2'>
              <button
                className='mt-10 mb-5 px-8 py-3 bg-gray-900 text-white font-extrabold rounded-sm w-full sm:w-auto text-center cursor-pointer hover:bg-rose-900'
                type='submit'
              >
                Submit
              </button>

              <button
                type='button'
                className='mt-10 mb-5 px-8 py-3 bg-gray-900 text-white font-extrabold rounded-sm w-full sm:w-auto text-center cursor-pointer hover:bg-rose-900'
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>

            </div>
          )
        }


      </form>
      {/* <div className='mt-10'>
        <ListAdv/>
      </div> */}
    </>

  )
}

export default AddAdv