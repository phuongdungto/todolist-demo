import * as express from 'express';
import { signup } from './user.controller';

const router = express.Router();

router.post('/signup', signup)

export default router;