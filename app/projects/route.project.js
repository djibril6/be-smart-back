const express = require("express");
const Router = express.Router();

const Project = require('./model.project');
const { 
    addProjectController, 
    updateProjectController,
    updateAddProjectController
} = require('./contoller.project');
const response = require('../res_format');


// All Projects
Router.get("/get/all", async (req, res) => {
    try {
        const result = await Project.find();
        if (result) {
            res.status(201).json(response(true, "All Project", result));
        } else {
            res.status(200).json(response(false, "No Projects", result));
        }
    } catch (error) {
        res.status(200).json(response(false, "Error occurred", error));
    }
});

// Find with criteria
Router.get("/get/key/:key", async (req, res) => {
    try {
        const result = await Patient.find({ $or: [
            {name: { $regex: "^"+ req.params.key + "", $options: 'mi' }},
            {name: { $regex: ""+ req.params.key + "$", $options: 'mi' }}, 
            // {email: { $regex: "^"+ req.params.key + "", $options: 'mi' }},
            // {email: { $regex: ""+ req.params.key + "$", $options: 'mi' }}, 
        ]}).limit(10);
        if (result) {
            res.status(201).json(response(true, "All Project", result));
        } else {
            res.status(200).json(response(false, "No Projects", result));
        }
    } catch (error) {
        res.status(200).json(response(false, "Error occurred", error));
    }
});

// Get one Project
Router.get("/get/one/:id", async (req, res) => {
    try {
        const result = await Project.findById(req.params.id);
        if (result) {
            res.status(200).json(response(true, "The Project", result));
        } else {
            res.status(200).json(response(false, "Can't found this Project", result));
        }
    } catch (error) {
        res.status(200).json(response(false, "Error occurred", error));
    }
});

// Add Project
Router.post("/add",  async (req, res) => {
    const result = addProjectController(req.body);
    if (result.error) return res.status(400).json(response(false, 'There are Errors in your request', result.error.details));

    try {
        const ProjectAdded = await Project.create(req.body);
        res.status(201).json(response(true, "Project created", ProjectAdded));
    } catch (error) {
        res.status(400).json(response(false, "An error occurred", error));
    }
});

// Update Project
Router.patch("/update/:id",  async (req, res) => {
    const result = updateProjectController(req.body);
    if (result.error) return res.status(400).json(response(false, 'There are Errors in your request', result.error.details));

    try {
        const result = await Project.updateOne({_id: req.params.id}, req.body);
        res.status(201).json(response(true, "Updated", result));
    } catch (error) {
        res.status(400).json(response(false, "An error occurred", error));
    }
});

Router.patch("/update/cards/:id",  async (req, res) => {
    // const result = updateProjectController(req.body);
    // if (result.error) return res.status(400).json(response(false, 'There are Errors in your request', result.error.details));

    try {
        const result = await Project.updateOne(
            { _id: req.params.id, cards: req.body.old },
            { $set: { "cards.$" : req.body.new } }
        );
        res.status(201).json(response(true, "Updated", result));
    } catch (error) {
        res.status(400).json(response(false, "An error occurred", error));
    }
});

Router.patch("/update/tasks/:id",  async (req, res) => {
    // const result = updateProjectController(req.body);
    // if (result.error) return res.status(400).json(response(false, 'There are Errors in your request', result.error.details));

    try {
        const result = await Project.updateOne(
            { _id: req.params.id, tasks: req.body.old },
            { $set: { "tasks.$" : req.body.new } }
        );
        res.status(201).json(response(true, "Updated", result));
    } catch (error) {
        res.status(400).json(response(false, "An error occurred", error));
    }
});

// Add elements
Router.patch("/update/add/:id",  async (req, res) => {
    const result = updateAddProjectController(req.body);
    if (result.error) return res.status(400).json(response(false, 'There are Errors in your request', result.error.details));

    try {
        const result = await Project.updateOne({_id: req.params.id}, { $push: req.body });
        res.status(201).json(response(true, "Updated", result));
    } catch (error) {
        res.status(400).json(response(false, "An error occurred", error));
    }
});

// Delete Project
Router.delete("/:id",  async (req, res) => {
    try {
        const result = await Project.deleteOne({_id: req.params.id});
        res.status(200).json(response(true, "Deleted", result));
    } catch (error) {
        res.status(400).json(response(false, "An error occurred", error));
    }
});
Router.patch("/delete/user/:id", async (req, res) => {

    try {
        const result = await Project.updateOne(
            { _id: req.params.id }, 
            { $pull: { users: req.body } }
        );
        console.log(req.body)
        res.status(201).json(response(true, "Deleted", result));
    } catch (error) {
        res.status(400).json(response(false, "An error occurred", error));
    }
});

module.exports = Router;