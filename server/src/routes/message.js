import express from 'express'
import { createMessage, getMessages } from '@/controllers/messageController'
import { verifyToken } from '@/middleware/verifyToken'

const router = express.Router()

router.post('/send/:id',verifyToken, createMessage)
router.get('/:id',verifyToken, getMessages)

export default router
