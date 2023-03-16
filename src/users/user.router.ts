import * as express from 'express';
import {
    signup,
    signin,
    addUsersToProject
} from './user.controller';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.put('/project', addUsersToProject);

export default router;