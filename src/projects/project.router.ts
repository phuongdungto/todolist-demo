import * as express from 'express';
import {
    createProject,
    updateProject
} from './project.controller';

const router = express.Router();

router.post('/', createProject);
router.put('/:id', updateProject);

export default router;