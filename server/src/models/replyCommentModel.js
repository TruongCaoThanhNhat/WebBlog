import mongoose from 'mongoose'
import slugify from 'slugify'

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
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
    },
  },
  {
    timestamps: true,
  }
)
schema.pre('validate', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true })
  }
  next()
})
export const replyCommentModel = mongoose.model('replyComment', schema)
