
import { Router } from 'express';
import * as usersController from '../controllers/usersController.js';
import { userRules, validateUser } from '../validators/usersValidator.js';

const router = Router();

router.post('/register', userRules, validateUser, usersController.register);
router.post('/login', usersController.login);

export default router;
