
import { Router } from 'express';
import * as usersController from '../controllers/usersController.js';

const router = Router();

router.post('/', usersController.register);

export default router;
