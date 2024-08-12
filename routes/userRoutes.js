import express from 'express';
import { deletePeople, getStudents, getStudentsofClass, getTeachers, getUserById, updateUserById } from '../controllers/userController.js';

const router = express.Router();


router.put('/:id', updateUserById);
router.delete('/:id',deletePeople)
router.get('/teachers', getTeachers);
router.get('/students',getStudents);
router.get('/students/:id',getStudentsofClass);

export default router;
