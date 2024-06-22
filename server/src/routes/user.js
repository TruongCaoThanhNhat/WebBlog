import {
  addPostUserSaved,
  getPostUserSaved,
  removePostUserSaved,
} from '@/controllers/postController'
import {
  addPostUserHistory,
  clearPostUserHistory,
  createUser,
  deleteUserAdmin,
  getAllUsers,
  getHotAuthors,
  getPostUserHistory,
  getProfile,
  getUser,
  getUserInfoById,
  removePostUserHistory,
  updatePassword,
  updateUser,
  updateUserAdmin,
  updateUserEmail,
} from '@/controllers/userCotroller'
import { verifyToken } from '@/middleware/verifyToken'

import express from 'express'
const router = express.Router()

router.get('/all', getAllUsers)
router.get('/info/:userId', getUserInfoById)

router.get('/hot-author', getHotAuthors)
router.get('/profile', verifyToken, getProfile)
router.get('/:username', getUser)
// saved post
router.get('/:userId/saved', verifyToken, getPostUserSaved)
router.post('/:userId/saved', verifyToken, addPostUserSaved)
router.delete('/:userId/saved/:postId', verifyToken, removePostUserSaved)
// history
router.get('/:userId/history', verifyToken, getPostUserHistory)
router.post('/:userId/history', verifyToken, addPostUserHistory)
router.delete('/:userId/history/:postId', verifyToken, removePostUserHistory)
router.delete('/:userId/history/', verifyToken, clearPostUserHistory)
// update user
router.put('/update/', verifyToken, updateUser)
router.put('/update/email', verifyToken, updateUserEmail)
router.put('/change-password', verifyToken, updatePassword)

export default router
