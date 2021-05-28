/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import { Router } from 'express';
import axios from 'axios';
import { Octokit } from 'octokit';
import * as Project from '../controllers/project';
import * as User from '../controllers/user';
import { requireSignin } from '../services/passport';
import signS3 from '../services/s3';
import { getCommits } from '../services/github-api';

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
    const { token, user } = await User.signup(receivedUser);
    console.log('index', user);
    res.json({ token, user });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

// Updated
router.post('/signin', requireSignin, async (req, res) => {
  try {
    const { token, user: { id, email, firstName, lastName, projects } } = await User.signin(req.user);
    res.json({ token, user: { id, email, firstName, lastName, projects } });
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

const clientId = '2f76511b1287f2f146d5'; // For localhost:9090
// const clientId = 'e5f801cce65a947f0981'; // For https://devit-21s.netlify.app/
// eslint-disable-next-line no-unused-vars
const clientSecret = '2dd43db94a7fac2c51e824531a7c30f9bbf315bf';

router.route('https://api.github.com/repos/ScottGibbons00/cover/commits')
  .get(async (req, res) => {
    res.json(res);
  });

router.route('/github-test')
  .get(async (req, res) => {
    try {
      console.log('here');
      const commits = await getCommits();
      console.log('commits', commits);
      res.json(commits);
    } catch (error) {
      res.status(500).json({ error });
    }
    // try {
    //   const octokit = new Octokit({ auth: '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' });
    //   const owner = 'dartmouth-cs52-21S';
    //   const repo = 'project-devit';
    //   const commits = await octokit.request(
    //     'GET /repos/{owner}/{repo}/git/commits', { owner, repo },
    //   );
    //   res.json(commits);
    // } catch (error) {
    //   res.status(500).json({ error });
    // }
  });


router.get('/github', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
});


// router.get('/oauth-callback', (req, res) => {
//   const body = {
//     client_id: clientId,
//     client_secret: clientSecret,
//     code: req.query.code,
//   };
//   const opts = { headers: { accept: 'application/json' } };
//   axios.post('https://github.com/login/oauth/access_token', body, opts)
//     .then((res) => { return res.data.access_token; })
//     .then((_token) => {
//       const token = _token;
//       console.log('My token:', token);

//         .then(() => {
//           res.json(data);
//         });
//     })
//     .catch((err) => { return res.status(500).json({ message: err.message }); });
// });

router.get('/sign-s3', signS3);

export default router;
