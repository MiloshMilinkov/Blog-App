
import { Router } from 'express';
import * as postsController from '../controllers/postsController.js';
import { postRules, validatePost } from '../validators/postsValidator.js';

const router = Router();

router.get('/', postsController.listPosts);

router.get('/:id', postsController.findPostById);

router.post('/', postRules, validatePost, postsController.createPost);

router.delete('/:id', postsController.deletePostById);

router.patch('/:id', postRules, validatePost, postsController.patchPostbyId);

export default router;
