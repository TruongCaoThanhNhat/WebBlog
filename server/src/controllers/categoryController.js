import slugify from 'slugify'
import { CategoryModel } from '../models/CategoryModel'
import { createCate, deleteCate, getCategoryByName, updateCate } from '../services/category'
import { v2 as cloudinary } from 'cloudinary'
export const getCategory = async(req, res, next) => {
    try {
        const category = await CategoryModel.findOne({ slug: req.params.slug })
        res.status(200).json({
            status: 'success',
            data: category,
        })
    } catch (error) {
        res.json(error)
    }
}
export const getAllCategories = async(req, res, next) => {
    try {
        const categories = await CategoryModel.find()
        res.status(200).json({
            status: 'success',
            data: { categories },

        })
    } catch (err) {
        res.status(500).json({
            error: err,
        })
    }
}
export const createCategory = async(req, res, next) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({
            error: 'Name is required',
        })
    }
    const categoryExist = await getCategoryByName(name)
    if (categoryExist) {
        return res.status(400).json({
            status: 'error',
            error: 'Category already exists',
        })
    }
    try {
        const category = await createCate(req.body)
        res.status(200).json({
            status: 'OK',
            data: { category },
        })
    } catch (err) {
        res.status(500).json({
            error: err,
        })
    }
}
export const updateCategory = async(req, res, next) => {
    try {
        const { cateId } = req.params

        const data = {...req.body }
        const category = await updateCate(cateId, data)

        // Logic to update slug
        if (category.name) {
            category.slug = slugify(category.name, {
                lower: true,
                strict: true,
            })
        }

        res.status(200).json({
            status: 'OK',
            data: { category },
        })
    } catch (err) {
        next(err)
    }
}
export const deleteCategory = async(req, res, next) => {
    try {
        const { cateId } = req.params
        console.log(cateId)
        const categorry = await deleteCate(cateId)

        res.status(200).json({
            status: 'OK',
            message: 'Category has been delected',
        })
    } catch (err) {
        next(err)
    }
}
export const uploadImage = async(req, res, next) => {
    try {
        const fileStr = req.file
        const { cateId } = req.params
        const uploadResponse = await cloudinary.uploader.upload(fileStr.path, {
            folder: 'thunder/category',
        })
        const img = uploadResponse.url
        const category = await CategoryModel.findByIdAndUpdate(
            cateId, {...req.body, attachment: img }, { new: true, runValidator: true }
        )
        res.status(200).json({
            status: 'OK',
            data: category,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: 'Something went wrong' })
    }
}