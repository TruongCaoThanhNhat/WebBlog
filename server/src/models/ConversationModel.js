import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ConversationModel = mongoose.model('Conversation', schema);
