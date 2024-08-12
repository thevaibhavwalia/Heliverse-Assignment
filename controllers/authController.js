import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import Classroom from '../models/classroomModel.js';
import { hashing } from '../utils/encrypt.js';


export const register = async (req, res) => {
    try {
        const { name, principalPass,email, password, role,className } = req.body;
        console.log(name,email,password,role);
        const Class=await Classroom.findOne({ name: req.body.className });
        console.log(Class);
        console.log(Class._id);
        const classId=Class._id;
      
        const doc = await User.findOne({ email: 'principal@classroom.com' });
        if (!(hashing.matchPassword(principalPass, doc.password))) {
    
        
            return res.status(403).json({ error: 'Invalid credentials' });
        }
      
        const hashedPassword = hashing.passwordHash(password);

        const user = new User({ name, email, password: hashedPassword, role, class:classId });
        await user.save();
        console.log('new user created');
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email,password);
        const user = await User.findOne({ email });
        const pass=user.password;
        if (!user || !(hashing.matchPassword(password,pass))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
  
        res.status(200).json({user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
