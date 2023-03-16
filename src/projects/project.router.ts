import * as express from 'express';
import { Roles } from '../core/enum';
import {
    createProject,
    updateProject,
    getProjects,
    getProject
} from './project.controller';
import { authorization } from '../core/middleware/auth.middleware';

const router = express.Router();

router.post('/', authorization(Roles.ADMIN, Roles.MANAGER), createProject);
router.put('/:id', authorization(Roles.ADMIN, Roles.MANAGER), updateProject);
router.get('/', getProjects);
router.get('/:id', getProject)

export default router;