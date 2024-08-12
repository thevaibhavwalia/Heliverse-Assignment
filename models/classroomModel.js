import mongoose from 'mongoose';

const ClassroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    days: {
        type: [String],
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], 
    },
    teacher: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    students: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    }],
});

const Classroom = mongoose.model('Classroom', ClassroomSchema);

export default Classroom;
