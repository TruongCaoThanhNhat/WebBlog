import { CategoryModel } from '../models/CategoryModel'

export const createCate = async (data) => {
  const category = await CategoryModel.create(data)
  if (!category) throw new Error('Cannot create category')
  return category
}
export const getCategoryByName = async (cateName) => {
  const category = await CategoryModel.findOne({ name: cateName })
  // if (!category) throw new Error('Category not found')
  return category
}
export const updateCate = async (cateId, data) => {
    const category = await CategoryModel.findByIdAndUpdate(cateId, data, {
        new: true,
        runValidators: true,
    })
    if (!category) throw new Error('Cannot update category')
    return category
}
export const deleteCate = async (cateId) => {
    const category = await CategoryModel.findByIdAndDelete(cateId)
    if (!category) throw new Error('Cannot delete category')
    return category
}