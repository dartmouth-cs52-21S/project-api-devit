/* eslint-disable object-curly-newline */
import { Router } from 'express';
import * as Project from '../controllers/project';
import * as User from '../controllers/user';
import * as ChatMessage from '../controllers/chatMessage';
import { requireSignin } from '../services/passport';
import signS3 from '../services/s3';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our project devit api!' });
});

router.route('/projects')
  .get(async (req, res) => {
    try {
      console.log('here');
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

router.post('/reauth', async (req, res) => {
  try {
    console.log('req.body.token:', req.body.token);
    const { token, user } = await User.reauthenticateUser(req.body.token);
    console.log('user:', user);
    res.json({ token, user });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const receivedUser = req.body;
    const { token, user: { id, email, firstName, lastName, location, picture, bio, roles, skills, badges, projects } } = await User.signup(receivedUser);
    res.json({ token, user: { id, email, firstName, lastName, location, picture, bio, roles, skills, badges, projects } });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

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
      const user = await User.updateUser(req.params.id, req.body);
      res.json({ user });
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

router.get('/sign-s3', signS3);

router.route('/chat-messages/:projectId')
  .get(async (req, res) => {
    try {
      const chatMessages = await ChatMessage.getChatMessages(req.params.projectId);
      res.json(chatMessages);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .post(async (req, res) => {
    try {
      const chatMessage = await ChatMessage.createChatMessage(req.body.message);
      res.json(chatMessage);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .put(async (req, res) => {
    try {
      const updatedChatMessage = await ChatMessage.updateChatMessage(req.body.messageId, req.body);
      res.json(updatedChatMessage);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .delete(async (req, res) => {
    try {
      const updatedChatMessage = await ChatMessage.deleteChatMessage(req.body.messageId);
      res.json(updatedChatMessage);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
export default router;
