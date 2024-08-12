import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    class:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Classroom'
    },
    role: {
        type: String,
        enum: ['principal', 'teacher', 'student'],
        required: true,
    },
});



const User = mongoose.model('User', UserSchema);

export default User;
