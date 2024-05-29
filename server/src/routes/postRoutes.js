import express from 'express'
import {
  createPost,
  deletePost,
  getAllPosts,
  getAllPostsCategoryUser,
  getPost,
  getPostsByCategory,
  getPostsByUserName,
  updatePost,
  uploadImage,
} from '@/controllers/postController'
import { verifyToken } from '@/middlewares/verifyToken'
import { upload } from '@/middlewares/multers'

const router = express.Router()
router.put('/:postId', verifyToken, updatePost)
router.delete('/:postId', verifyToken, deletePost)
router.get('/', getAllPosts)
router.get('/:slug', getPost)
router.get('/user/:username', getPostsByUserName)
router.get('/cate/:cateId', getPostsByCategory)
router.post('/create', verifyToken, createPost)
router.post('/upload', upload.single('file'), uploadImage)
router.get('/category/post', verifyToken, getAllPostsCategoryUser)

export default router
