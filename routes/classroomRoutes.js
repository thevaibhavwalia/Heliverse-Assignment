import express from 'express';
import {
    createClassroom,
    getAllClassrooms,
    getClassroomById,
    updateClassroomById,
    deleteClassroomById
} from '../controllers/classroomController.js';

const router = express.Router();

router.post('/', createClassroom);
router.get('/', getAllClassrooms);
router.get('/:id', getClassroomById);
router.put('/:id', updateClassroomById);
router.delete('/:id', deleteClassroomById);

export default router;
