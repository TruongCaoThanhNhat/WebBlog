import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    voteCount: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    reply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'replyComment',
    },
  },
  {
    timestamps: true,
  }
)

export const CommentsModel = mongoose.model('Comments', schema)
