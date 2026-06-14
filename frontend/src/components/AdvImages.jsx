import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopeContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const AdvImages = () => {

  const [images, setImages] = useState([])
  const { BackEndUrl } = useContext(ShopContext)

  const GetImages = async (req, res) => {
    try {
      const response = await axios.get(BackEndUrl + '/api/adv/get');
      console.log("adv images", response)
      if (response.data.success) {
        setImages(response.data.data)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    GetImages()
  }, [])

  // const images = [
  //   assets.simg1,
  //   assets.simg2,
  //   assets.simg3,
  //   assets.simg4
  // ]

  const flateImages = images.flatMap(item => item.images).slice(0, 4)

  return (
    <div className='w-full px-2 sm:px-4 md:px-6'>
      <div className='mt-5 flex overflow-x-auto gap-4 sm:grid sm:grid-cols-3 md:grid-cols-4 sm:overflow-visible'>
        {flateImages.map((src, index) => (
          <div
            key={`${index}`}
            className='min-w-[250px] sm:min-w-0 h-[150px] sm:h-auto flex-shrink-0 sm:flex-shrink hover:shadow-2xl overflow-hidden rounded-3xl transition duration-300'
          >
            <img
              src={src}
              alt={`advertisement image ${index + 1}`}
              className='w-full h-full object-cover hover:scale-110 transition duration-300'
            />
          </div>
        ))
        }

      </div>
    </div>
  )
}

export default AdvImages
