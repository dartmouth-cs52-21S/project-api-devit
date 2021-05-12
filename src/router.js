import { Router } from 'express';
import * as Posts from './controllers/post';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

router.route('/posts')
  .get(Posts.getPosts)
  .post(Posts.createPost);

router.route('/posts/:id')
  .get(Posts.getPost)
  .put(Posts.updatePost)
  .delete(Posts.deletePost);

export default router;
