import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const PostSchema = new Schema({
  title: { type: String },
  tags: { type: [String] },
  content: { type: String },
  coverUrl: { type: String },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
