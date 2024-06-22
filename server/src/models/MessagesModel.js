import mongoose from 'mongoose'

var schema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const MessagesModel = mongoose.model('Message', schema)
