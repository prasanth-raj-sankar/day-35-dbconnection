import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    studentId: {
        type: String,
        default: uuidv4,  // Automatically generate UUID for studentId
    },
    mentorId: {
        type: String,  // This will store the mentor's ID if the student is assigned to a mentor
        default: null,
    },
});

export const studentModel = new model("Student", studentSchema, "students");
