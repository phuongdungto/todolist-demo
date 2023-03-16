import * as express from 'express';
import { Roles } from '../core/enum';
import {
    createTask,
    updateTask
} from './task.controller';
import { authorization } from '../core/middleware/auth.middleware';

const router = express.Router();

router.post('/', authorization(Roles.ADMIN, Roles.MANAGER, Roles.MENBER), createTask);
router.put('/:id', authorization(Roles.ADMIN, Roles.MANAGER, Roles.MENBER), updateTask);

export default router