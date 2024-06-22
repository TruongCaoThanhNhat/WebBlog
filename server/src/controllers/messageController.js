import { ConversationModel } from '@/models/ConversationModel'
import { MessagesModel } from '@/models/MessagesModel'
import { getReceiverSocketId, io } from '@/socket/socket'

export const createMessage = async (req, res) => {
  try {
    const { message } = req.body
    const { id: receiverId } = req.params
    const { userId } = req.user
    const senderId = userId
    // tìm conversation giữa 2 người
    let conversation = await ConversationModel.findOne({
      members: { $all: [senderId, receiverId] },
    })
    // nếu không tìm thấy conversation thì tạo mới
    if (!conversation) {
      conversation = await ConversationModel.create({
        members: [senderId, receiverId],
      })
    }
    // tạo message mới
    const newMessage = new MessagesModel({
      senderId,
      receiverId,
      message,
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id)
    }

    // await conversation.save();
    // await newMessage.save();

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()])

    // SOCKET IO FUNCTIONALITY WILL GO HERE
    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    res.status(201).json({
      status: 'success',
      data: newMessage,
    })
  } catch (error) {
    console.log('Error in sendMessage controller: ', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getMessages = async (req, res) => {
  try {
    // userToChatId la id cua user ma minh muon chat
    const { id: userToChatId } = req.params
    const { userId } = req.user
    const senderId = userId

    const conversation = await ConversationModel.findOne({
      members: { $all: [senderId, userToChatId] },
    }).populate('messages') // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([])

    const messages = conversation.messages

    res.status(200).json({
      status: 'success',
      messages,
    })
  } catch (error) {
    console.log('Error in getMessages controller: ', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
