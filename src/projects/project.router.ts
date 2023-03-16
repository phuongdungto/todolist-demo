import * as express from 'express';
import { Roles } from '../core/enum';
import {
    createProject,
    updateProject
} from './project.controller';
import { authorization } from '../core/middleware/auth.middleware';

const router = express.Router();

router.post('/', authorization(Roles.ADMIN, Roles.MANAGER), createProject);
router.put('/:id', authorization(Roles.ADMIN, Roles.MANAGER), updateProject);

export default router;