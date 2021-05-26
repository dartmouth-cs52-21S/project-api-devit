/* eslint-disable object-curly-newline */
import { Router } from 'express';
import * as Project from '../controllers/project';
import * as User from '../controllers/user';
import { requireSignin } from '../services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our project devit api!' });
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
  .post(
    // requireAuth,
    async (req, res) => {
      try {
        const result = await Project.createProject(req.body, req.user);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error });
      }
    },
  );

router.route('/projects/:id')
  .get(async (req, res) => {
    try {
      const result = await Project.getProject(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .put(
    // requireAuth,
    async (req, res) => {
      try {
        const result = await Project.updateProject(req.params.id, req.body);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error });
      }
    },
  )
  .delete(
    // requireAuth,
    async (req, res) => {
      try {
        const result = await Project.deleteProject(req.params.id);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error });
      }
    },
  );

// Updated
router.post('/signup', async (req, res) => {
  try {
    const receivedUser = req.body;
    const { token, user: { id, email, firstName, lastName, location, picture, bio, roles, skills, badges, projects } } = await User.signup(receivedUser);
    res.json({ token, user: { id, email, firstName, lastName, location, picture, bio, roles, skills, badges, projects } });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

// Updated
router.post('/signin', requireSignin, async (req, res) => {
  try {
    const { token, user: { id, email, firstName, lastName, location, picture, bio, roles, skills, badges, projects } } = await User.signin(req.user);
    res.json({ token, user: { id, email, firstName, lastName, location, picture, bio, roles, skills, badges, projects } });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.route('/users/')
  .get(async (req, res) => {
    try {
      const result = await User.getAllUsers();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/users/:id')
  .get(async (req, res) => {
    try {
      const result = await User.getUserById(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .put(async (req, res) => {
    try {
      const result = await User.updateUser(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await User.deleteUser(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default router;
