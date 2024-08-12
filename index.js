import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import classroomRoutes from './routes/classroomRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors'
import dotenv from 'dotenv';
import { getTeachers } from './controllers/userController.js';




const app = express();
const corsOptions = {
  origin: 'https://heliverse-frontend-blue.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204 
};


app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); //
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();


app.use('/api/auth', authRoutes);
app.use('/api/classrooms', classroomRoutes);
// app.use('api/users/teachers',getTeachers);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}
).then(()=>{
    app.listen(8000,()=>{
        console.log(`DB connected at PORT 8000`);
    })

}).catch((err)=>{
    console.log('error while connecting to db',err);
})





