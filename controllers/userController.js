import User from '../models/userModel.js';
import Classroom from '../models/classroomModel.js'
export const getTeachers = async (req, res) => {
    try {
        console.log('Fetching teachers...');
        const teachers = await User.find({ role: 'teacher' }).populate('class')

        res.status(200).json({ data: teachers });
    } catch (error) {
        console.error('Error fetching teachers:', error.message);
        res.status(400).json({ error: error.message });
    }
};

export const getStudents = async (req, res) => {
    try {
        console.log('Fetching students...');
        const students = await User.find({ role: 'student' }).populate('class');

        res.status(200).json({ data: students });
    } catch (error) {
        console.error('Error fetching students:', error.message);
        res.status(400).json({ error: error.message });
    }
};

export const getStudentsofClass = async (req, res) => {
    try {
        const classroom=req.params.id;
        console.log(classroom);
        const students = await User.find({ role: 'student',class:classroom }).populate('class');
        console.log(students);
        res.status(200).json({data:students});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const updateUserById = async (req, res) => {
    try {
        console.log('req body is',req.body);
    
        const classroom = await Classroom.findOne({ name: req.body.class });
        console.log('classid is',classroom._id);
        const classId = classroom ? classroom._id : null;
    

        // Create a new update object based on req.body excluding classId
        const updateData = { ...req.body };

      // Add the classId to updateData if classroom was found
        if (classId) {
            updateData.class = classId;
        }

        // Perform the update operation
        const user = await User.findByIdAndUpdate(req.params.id,updateData, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const deletePeople= async(req,res)=>{
    try{
        const id=req.params.id;
        const result = await User.findByIdAndDelete(id);
        console.log('deleted successfully',result);

    }
    catch(err){
        res.status(400).json({err});
    }

}
