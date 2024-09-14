import express from "express";

// import mongoose from "mongoose";
import { v4 } from "uuid";

import { mentorModel } from "../db-utils/models-mentor.js";

const mentorRouter = express.Router();


//get
mentorRouter.get("/", async (req, res) => {
  // get the posts from DB using postmodel
  const mentor = await mentorModel.find({});

  res.json(mentor);
});

/* create mentor */
mentorRouter.post("/", async (req, res) => {
    const { name, email, students } = req.body;

    // Properly define the new mentor using the mentorModel
    const newMentor = new mentorModel({
        name: name,
        email: email,
        students: students || [],  // Default to an empty array if no students are provided
        id: v4(),
    });

    try {
        // Save the new mentor to the database
        const savedMentor = await newMentor.save();
        res.status(201).json(savedMentor);
    } catch (err) {
        res.status(500).json({ msg: "Error creating mentor", error: err.message });
    }
});

/* get mentor based on ID */
mentorRouter.get("/get-mentor/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const mentor = await mentorModel.findById(id);

        if (mentor) {
            res.status(200).json(mentor);
        } else {
            res.status(404).json({ msg: "Mentor not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: "Error fetching mentor", error: err.message });
    }
});

  

//delete


mentorRouter.delete("/", async (req, res) => {
    const { id } = req.query;

    try {
        // Find and delete the mentor by ID
        const mentor = await mentorModel.findByIdAndDelete(id);

        if (mentor) {
            res.status(200).json({ msg: "Mentor deleted successfully" });
        } else {
            res.status(404).json({ msg: "Mentor not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: "Error deleting mentor", error: err.message });
    }
});



mentorRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updateDetails = req.body;

    try {
        // Find and update the mentor by ID
        const mentor = await mentorModel.findByIdAndUpdate(id, updateDetails, { new: true });

        if (mentor) {
            res.status(200).json({ msg: "Mentor updated successfully", mentor });
        } else {
            res.status(404).json({ msg: "Mentor not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: "Error updating mentor", error: err.message });
    }
});

export default mentorRouter;
