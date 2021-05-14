import { Router } from 'express';
import * as Posts from './controllers/post';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});


router.route('/posts')
  .get(async (req, res) => {
    try {
      const result = await Posts.getPosts();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .post(async (req, res) => {
    try {
      const result = await Posts.createPost(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/posts/:id')
  .get(async (req, res) => {
    try {
      const result = await Posts.getPost(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .put(async (req, res) => {
    try {
      const result = await Posts.updatePost(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await Posts.deletePost(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default router;
