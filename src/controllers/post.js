import Post from '../models/post';

export const createPost = async (postFields, author) => {
  const post = new Post();
  post.title = postFields.title;
  post.content = postFields.content;
  post.author = author;

  const savedpost = await post.save();
  if (savedpost) {
    const populated = await savedpost.populate('author').execPopulate();
    return populated;
  }
  throw new Error('Create Post Error');
};

export const getPosts = async () => {
  return Post.find();
};

export const getPost = async (id) => {
  try {
    const post = await Post.findById({ _id: id });
    if (post) {
      const populated = await post.populate('author').execPopulate();
      return populated;
    }
    return post;
  } catch (error) {
    throw new Error(`fetch single post error: ${error}`);
  }
};

export const deletePost = async (id) => {
  try {
    const post = await Post.findByIdAndDelete({ _id: id });
    return post;
  } catch (error) {
    throw new Error(`delete post error: ${error}`);
  }
};
export const updatePost = async (id, postFields) => {
  try {
    const post = await Post.findByIdAndUpdate({ _id: id }, postFields, { new: true });
    return post;
  } catch (error) {
    throw new Error(`update post error: ${error}`);
  }
};
