import express from 'express';
import {authenticate} from '../middlewares/AuthMiddleware';

const router = express.Router();
router.use(authenticate);

router.post('/find-times', async (req, res) => {
  res.json({
    data: 'foo',
  });
});

export default router;
