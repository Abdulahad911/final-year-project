import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/product.model.js';

const addProducts = async (req, res) => {
    try {
        const { name, description, price, category, subcategory, sizes, featureProducts, deliveryFee } = req.body;


        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)
        let ImageUrl = await Promise.all(
            images.map(async (item) => {
                try {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                    console.log("clodinary uploaded image url: ", result.secure_url)
                    return result.secure_url
                } catch (err) {
                    console.error("Cloudinary upload error:", err)
                    return null
                }
            })
        )

        const productData = {
            name,
            description,
            category,
            subcategory,
            price: Number(price),
            featureProducts: featureProducts === 'true' ? true : false,
            deliveryFee: Number(deliveryFee),
            sizes: JSON.parse(sizes),
            image: ImageUrl,
            date: Date.now()
        }

        console.log(productData)

        const products = new productModel(productData)
        await products.save()

        // console.log(name, description, price, category, subcategory, sizes, bestSeller)
        // console.log(image1, image2, image3, image4)
        // console.log(images)
        // console.log(ImageUrl)

        return res.json({ success: true, message: "prodcut add successfully" })

    } catch (error) {
        console.log("error in add products", error.message)
        return res.json({ success: false, message: "internal server error" })
    }
}

const updateProducts = async (req, res) => {
    try {
        const {id, name, description, price, category, subcategory, sizes, featureProducts, deliveryFee } = req.body;

        const product = await productModel.findById(id);
         if (!product) {
            return res.json({ success: false, message: "product not found" })
        }

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let updatedImageUrl = product.image

        if (images.length > 0) {
            // remove old images from cloudinary
            await Promise.all(
                updatedImageUrl.map(async (item) => {
                    let result = await cloudinary.uploader.destroy(item.split('/').pop().split('.')[0])
                    console.log("product remove", result)
                    return result
                })
            )

            // add new images to cloudinary
            updatedImageUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                    console.log("product add", result)
                    return result.secure_url
                })
            )
        }

        // 3. Update product
        product.name = name;
        product.description = description;
        product.price = Number(price);
        product.category = category;
        product.subcategory = subcategory;
        product.sizes = JSON.parse(sizes);
        product.featureProducts = featureProducts === 'true';
        product.deliveryFee = Number(deliveryFee);
        product.image = updatedImageUrl;
        product.date = Date.now();


        await product.save()
        return res.json({ success: true, message: "product updated successfully", product })


    } catch (error) {
        console.log("error in update products", error.message)
        return res.json({ success: false, message: "internal server error" })
    }
}

const RemoveProducts = async (req, res) => {
    try {
        const productId = req.body.id;

        if (!productId) {
            return res.status(404).json({success:false,message:"Product not found"})
        }

        await productModel.findByIdAndDelete(productId)

        return res.json({ success: true, message: "product removed" })
    } catch (error) {
        console.log("error in remove products", error.message)
        return res.json({ success: false, message: "internal server error" })
    }
}

const ListProducts = async (_, res) => {
    try {
        const products = await productModel.find()
        if (products.length === 0) {
            return res.status(200).json([])
        }
        return res.json({ success: true, products })
    } catch (error) {
        console.log("error in list products", error.message)
        return res.json({ success: false, message: "internal server error" })
    }
}
    

export { addProducts , updateProducts , RemoveProducts , ListProducts}