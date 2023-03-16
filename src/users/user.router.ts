import * as express from 'express';
import { Roles } from '../core/enum';
import {
    signup,
    signin,
    addUsersToProject,
    addUsersToTask,
    deleteUsersOfProject,
    deleteUsersOfTask,
    getUsers,
    getUser
} from './user.controller';
import { authorization } from '../core/middleware/auth.middleware';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.put('/project', authorization(Roles.ADMIN, Roles.MANAGER), addUsersToProject);
router.post('/task', authorization(Roles.ADMIN, Roles.MANAGER), addUsersToTask);
router.delete('/project', authorization(Roles.ADMIN, Roles.MANAGER), deleteUsersOfProject);
router.delete('/task', authorization(Roles.ADMIN, Roles.MANAGER), deleteUsersOfTask);
router.get('/', getUsers);
router.get('/:id', getUser);

export default router;