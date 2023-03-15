import * as express from 'express';
import {
    signup,
    signin
} from './user.controller';

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin);

export default router;