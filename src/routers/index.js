import { Router } from 'express';
import * as Project from '../controllers/project';
import * as User from '../controllers/user';
import { requireAuth, requireSignin } from '../services/passport';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});


router.route('/projects')
  .get(async (req, res) => {
    try {
      const result = await Project.getProjects();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .post(requireAuth, async (req, res) => {
    try {
      const result = await Project.createProject(req.body, req.user);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/projects/:id')
  .get(async (req, res) => {
    try {
      const result = await Project.getProject(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .put(requireAuth, async (req, res) => {
    try {
      const result = await Project.updateProject(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .delete(requireAuth, async (req, res) => {
    try {
      const result = await Project.deleteProject(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.post('/signin', requireSignin, async (req, res) => {
  try {
    const token = User.signin(req.user);
    res.json({ token, email: req.user.email, author: req.user.author });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});


router.post('/signup', async (req, res) => {
  try {
    const token = await User.signup(req.body);
    res.json({ token, email: req.body.email, author: req.body.author });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

export default router;
