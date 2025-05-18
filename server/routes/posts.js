
import { Router } from 'express';
import * as postsController from '../controllers/postsController.js';
import { postRules, postTitleRules, validatePost, validatePostTitle } from '../validators/postsValidator.js';
import * as authenticate from '../middleware/authenticate.js'

const router = Router();

router.get('/', postsController.listPosts);

router.get('/title/:title', postTitleRules, validatePostTitle, postsController.findPostByTitle);

router.get('/:id', postsController.findPostById);

router.post('/', authenticate.authenticate, postRules, validatePost, postsController.createPost);

router.delete('/:id', postsController.deletePostById);



//router.patch('/:id', authenticate.authenticate, postRules, validatePost, postsController.patchPostbyId);
router.patch('/:id', postRules, validatePost, postsController.patchPostbyId);
export default router;
