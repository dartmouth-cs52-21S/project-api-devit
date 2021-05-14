import Post from '../models/post';

export const createPost = async (postFields) => {
  const post = new Post();
  post.title = postFields.title;
  post.tags = postFields.tags.split(' ');
  post.content = postFields.content;
  post.coverUrl = postFields.coverUrl;
  try {
    const savedpost = await post.save();
    return savedpost;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
};
export const getPosts = async () => {
  return Post.find();
};
export const getPost = async (id) => {
  try {
    const post = await Post.findById({ _id: id });
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
