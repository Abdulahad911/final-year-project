import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopeContext";

const Advertisement = () => {


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
    //     assets.img1,
    //     assets.img2,
    //     assets.img3,
    //     assets.img4,
    //     assets.img5,
    //     assets.img6
    // ];

    return (
        <div className="w-full sm:aspect-[16/5] aspect-[16/8] overflow-hidden dark:bg-gray-900 dark:text-white rounded-lg -mt-18 sm:mt-4">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                className="w-full h-full"
            >
                {images
                    .flatMap(item => item.images)
                    .slice(0)
                    .map((src, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </SwiperSlide>
                    ))}

            </Swiper>
        </div>
    );
};

export default Advertisement;
