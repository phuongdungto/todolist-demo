import * as express from 'express';
import { Roles } from '../core/enum';
import {
    createTask,
    updateTask,
    getTasks,
    getTask
} from './task.controller';
import { authorization } from '../core/middleware/auth.middleware';

const router = express.Router();

router.post('/', authorization(Roles.ADMIN, Roles.MANAGER), createTask);
router.put('/:id', authorization(Roles.ADMIN, Roles.MANAGER, Roles.MENBER), updateTask);
router.get('/', getTasks);
router.get('/:id', getTask);

export default router