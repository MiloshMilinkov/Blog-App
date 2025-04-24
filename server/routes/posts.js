
import { Router } from 'express';
import * as postsController from '../controllers/postsController.js';

const router = Router();

router.get('/', postsController.listPosts);

router.get('/:id', postsController.findPostById);

router.post('/', postsController.createPost);

router.delete('/:id', postsController.deletePostById);

export default router;
