import express from 'express'
import {
  newConversation,
  getConversation,
} from '../controllers/conversationController.js'
import { verifyToken } from '@/middleware/verifyToken.js'

const router = express.Router()
router.post('/', verifyToken, newConversation)
router.get('/:userId', getConversation)

export default router
