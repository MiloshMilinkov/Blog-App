
import { Router } from 'express';
import * as postsController from '../controllers/postsController.js';
import {
  postRules,
  validatePost,
  searchRules,
  validateSearch
} from '../validators/postsValidator.js';
import * as authenticate from '../middleware/authenticate.js'

const router = Router();

router.get('/', searchRules, validateSearch, postsController.listPosts);

router.get('/:id', postsController.findPostById);

router.post('/', authenticate.authenticate, postRules, validatePost, postsController.createPost);

router.delete('/:id', postsController.deletePostById);

//router.patch('/:id', authenticate.authenticate, postRules, validatePost, postsController.patchPostbyId);
router.patch('/:id', postRules, validatePost, postsController.patchPostbyId);
export default router;
