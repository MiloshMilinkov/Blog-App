
import { Router } from 'express';
import * as usersController from '../controllers/usersController.js';
import { userRules, validateUser } from '../validators/usersValidator.js';

const router = Router();

router.post('/register', userRules, validateUser, usersController.registerUser);
router.post('/login', usersController.loginUser);
router.post('/logout', usersController.logoutUser);

export default router;
