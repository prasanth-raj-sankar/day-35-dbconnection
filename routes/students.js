import express from "express";

import { v4 } from "uuid";

import { studentModel } from "../db-utils/models-students.js";

const studentRouter = express.Router();


/* Get all students (with populated mentor data) */
studentRouter.get('/', async (req, res) => {
    try {
        // Get all students and populate their mentor field with mentor data
        const students = await studentModel.find({});
        res.json(students);
    } catch (err) {
        res.status(400).send(err);
    }
});

/* Create a new student */
studentRouter.post('/', async (req, res) => {
    const { name, email, mentorId } = req.body;  // Get name, email, and optional mentorId from the request body

    const newStudent = new studentModel({
        name: name,
        email: email,
        mentorId: mentorId ? mentorId : null,  // Optional mentor assignment during creation
        studentId: v4()  // Generate a unique studentId
    });

    try {
        const savedStudent = await newStudent.save();  // Save the new student to the database
        res.status(201).send(savedStudent);
    } catch (err) {
        res.status(500).send(err);
    }
});

/* List all students with no mentors assigned */
studentRouter.get('/no-mentors', async (req, res) => {
    try {
        const students = await studentModel.find({ mentorId: null });  // Find all students where mentorId is null
        res.send(students);
    } catch (err) {
        res.status(500).send(err);
    }
});

/* Assign or change mentor for a specific student */
studentRouter.patch('/assign-mentor/:id', async (req, res) => {
    const { id } = req.params;  // Student ID
    const { mentorId } = req.body;  // Mentor ID from the request body

    try {
        const student = await studentModel.findById(id);  // Find student by ID
        if (student) {
            student.mentorId = mentorId;  // Assign or change mentor
            await student.save();  // Save the updated student
            res.send(student);
        } else {
            res.status(404).send({ msg: "Student not found" });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

/* Assign one mentor to a specific student */
studentRouter.patch('/assign-mentor/:studentId', async (req, res) => {
    const { studentId } = req.params;  // Get the student ID from the request params
    const { mentorId } = req.body;     // Expect the mentor ID in the request body

    try {
        const student = await studentModel.findById(studentId);  // Find the student by ID

        if (student) {
            student.mentorId = mentorId;  // Assign the mentor to the student
            await student.save();  // Save the updated student record
            res.status(200).send({ msg: "Mentor assigned successfully", student });
        } else {
            res.status(404).send({ msg: "Student not found" });
        }
    } catch (err) {
        res.status(500).send({ msg: "Error assigning mentor", error: err.message });
    }
});


/* Show all students assigned to a particular mentor */
studentRouter.get('/mentor-students/:id', async (req, res) => {
    const { id } = req.params;  // Mentor ID

    try {
        const students = await studentModel.find({ mentorId: id });  // Find students by mentorId
        res.send(students);
    } catch (err) {
        res.status(500).send(err);
    }
});

/* Delete a student by ID */
studentRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;  // Student ID

    try {
        const deletedStudent = await studentModel.findByIdAndDelete(id);  // Find and delete student by ID
        if (deletedStudent) {
            res.json({ msg: "Student deleted successfully", deletedStudent });
        } else {
            res.status(404).json({ msg: "Student not found" });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

/* Update student details by ID */
studentRouter.put('/:id', async (req, res) => {
    const { id } = req.params;  // Student ID
    const updatedDetails = req.body;  // Updated data from request body

    try {
        const student = await studentModel.findById(id);  // Find student by ID
        if (student) {
            Object.assign(student, updatedDetails);  // Update student details
            await student.save();  // Save the updated student
            res.json({ msg: "Student updated successfully", student });
        } else {
            res.status(404).json({ msg: "Student not found" });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

export default studentRouter;
