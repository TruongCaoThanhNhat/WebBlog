import {
    addPostUserSaved,
    getPostUserSaved,
    removePostUserSaved,
} from '@/controllers/postController'
import {
    addPostUserHistory,
    clearPostUserHistory,
    createUser,
    deleteUser,
    deleteUserAdmin,
    getAllUsers,
    getHotAuthors,
    getPostUserHistory,
    getProfile,
    getUser,
    removePostUserHistory,
    updatePassword,
    updateUser,
    updateUserAdmin,
    updateUserEmail,
} from '@/controllers/userCotroller'
import { verifyToken } from '@/middleware/verifyToken'

import express from 'express'
const router = express.Router()

router.get('/hot-author', getHotAuthors)
router.get('/profile', verifyToken, getProfile)
router.get('/:username', getUser)

router.put('/update/', verifyToken, updateUser)
router.put('/update/email', verifyToken, updateUserEmail)
router.put('/change-password', verifyToken, updatePassword)

//admin user
router.get('/', getAllUsers)
router.put('/:userId', verifyToken, updateUser)
router.delete('/:userId', verifyToken, deleteUser)

export default router