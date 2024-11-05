import { Router } from 'express';
import rolesController from '../Controllers/roles.controller.js';

const router = Router();

router.get('/', rolesController.getRoles);
router.get('/:id', rolesController.getRole);
router.post('/', rolesController.createRole);
router.put('/:id', rolesController.updateRole);
router.delete('/:id', rolesController.deleteRole);

export default router;