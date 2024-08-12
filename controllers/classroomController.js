import { compareSync } from 'bcrypt';
import Classroom from '../models/classroomModel.js';
import User from '../models/userModel.js';

export const createClassroom = async (req, res) => {
    try {
        const { name, teacher, startTime, endTime, days, students } = req.body;

        console.log(name, teacher, startTime, endTime, days, students);

    
        const teacherDoc = await User.findOne({ name: teacher });
        console.log(teacherDoc);
        if (!teacherDoc) {
            return res.status(404).json({ error: `Teacher with name ${teacherName} not found` });
        }

    
        const studentsDoc = await User.find({ name: { $in: students } });
        if (studentsDoc.length !== students.length) {
            return res.status(404).json({ error: `Some students not found` });
        }

    
        const classroom = new Classroom({
            name,
            startTime,
            endTime,
            days,
            teacher: teacherDoc._id,
            students: studentsDoc.map(student => student._id),
        });
        
        await classroom.save();
        res.status(201).json(classroom);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const getAllClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find().populate('teachers').populate('students');
        res.status(200).json(classrooms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const getClassroomById = async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id).populate('teachers').populate('students');
        if (!classroom) {
            return res.status(404).json({ error: 'Classroom not found' });
        }
        res.status(200).json(classroom);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const updateClassroomById = async (req, res) => {
    try {
        const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!classroom) {
            return res.status(404).json({ error: 'Classroom not found' });
        }
        res.status(200).json(classroom);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const deleteClassroomById = async (req, res) => {
    try {
        const classroom = await Classroom.findByIdAndDelete(req.params.id);
        if (!classroom) {
            return res.status(404).json({ error: 'Classroom not found' });
        }
        res.status(200).json({ message: 'Classroom deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
