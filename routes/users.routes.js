import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/users.controller.js';
import { validate } from '../middleware/validate.js';
import { createUserSchema, updateUserSchema } from '../validators/user.validator.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', validate(createUserSchema), create);
router.put('/:id', validate(updateUserSchema), update);
router.delete('/:id', remove);

export default router;
