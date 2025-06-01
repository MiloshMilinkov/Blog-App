
import { Router } from 'express';
import * as usersController from '../controllers/usersController.js';
import { userRules, validateUser } from '../validators/usersValidator.js';
import * as authenticate from '../middleware/authenticate.js'

const router = Router();

router.post('/register', userRules, validateUser, usersController.registerUser);
router.post('/login', usersController.loginUser);
router.post('/logout', usersController.logoutUser);
router.get('/whoAmI', authenticate.authenticate, usersController.getCurrentUser)
export default router;
