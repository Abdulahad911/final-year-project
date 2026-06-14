import express from 'express'
import { advertisementService, getAdvertisementImages, removeAdvertisementImages, UpdateAdvertisementImages } from '../controllers/advertisement.controller.js'
import AdminMiddleware from '../middleware/admin.middleware.js'
import upload from '../middleware/multer.js'

const SideadvRoutes = express.Router()

SideadvRoutes.post('/AddToSide', AdminMiddleware, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
]), advertisementService)
SideadvRoutes.get('/GetForSide', getAdvertisementImages)
SideadvRoutes.post('/RemoveSideAdv', AdminMiddleware, removeAdvertisementImages)
SideadvRoutes.post('/updateForSide', AdminMiddleware, upload.fields([
    { name: 'image1' },
    { name: 'image2' },
    { name: 'image3' },
    { name: 'image4' },
]), UpdateAdvertisementImages)


export { SideadvRoutes }