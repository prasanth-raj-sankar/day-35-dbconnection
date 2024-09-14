import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const mentorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mentorid: {
        type: String,
        default: uuidv4,  // Automatically generate UUID for mentorid
    },
    students: {
        type: Array,
        default: [],
    },
});

export const mentorModel = new model("Mentor", mentorSchema, "mentors");
