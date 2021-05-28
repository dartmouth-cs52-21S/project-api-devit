import mongoose, { Schema } from 'mongoose';

const ChatMessageSchema = new Schema({
  body: String,
  // projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  projectId: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  isDeleted: Boolean,
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

const ChatMessageModel = mongoose.model('ChatMessages', ChatMessageSchema);

export default ChatMessageModel;
