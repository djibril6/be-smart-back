require("dotenv/config");
const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let salt = '';
bcrypt.genSalt(10)
.then(out => {
    salt = out;
});

const auth = require("../middleware_auth");
const User = require('./model.user');
const { 
    addUserController, 
    updateUserController, 
    authUserController, 
    selfUpdateController,
} = require('./contoller.user');
const response = require('../res_format');
const { DEFAULT_PASSWD } = require('../config');

const { getUser } = require("../global_function");

// All users
Router.get("/get/all", auth, async (req, res) => {
    try {
        const result = await User.find();
        if (result) {
            res.status(201).json(response(true, "All Uers", result));
        } else {
            res.status(200).json(response(false, "No Users", result));
        }
    } catch (error) {
        res.status(200).json(response(false, "Error occurred", error));
    }
});

// Get one User
Router.get("/get/one/:id", auth, async (req, res) => {
    try {
        const result = await User.findById(req.params.id);
        if (result) {
            res.status(200).json(response(true, "The User", result));
        } else {
            res.status(200).json(response(false, "Can't found this user", result));
        }
    } catch (error) {
        res.status(200).json(response(false, "Error occurred", error));
    }
});
Router.get("/get/email/:email", auth, async (req, res) => {
    try {
        const result = await User.findOne({email: req.params.email});
        if (result) {
            res.status(200).json(response(true, "The User", result));
        } else {
            res.status(200).json(response(false, "Can't found this user", result));
        }
    } catch (error) {
        res.status(200).json(response(false, "Error occurred", error));
    }
});

// Add User
Router.post("/add", auth, async (req, res) => {
    const result = addUserController(req.body);
    if (result.error) return res.status(400).json(response(false, 'There are Errors in your request', result.error.details));

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(DEFAULT_PASSWD, salt);
    const data = req.body;
    data.pass = hashedPass;

    // Store admin user
    const user = await getUser(req.headers.authorization.split(' ')[1]);
    data.createBy = {
        id: user._id,
        name: user.firstname + " " + user.lastname 
    };

    try {
        const UserAdded = await User.create(data);
        res.status(201).json(response(true, "User created", UserAdded));
    } catch (error) {
        if (error.errors.email.kind === 'unique') {
            res.status(200).json(response(false, "User with this email already exist!", error));
        } else {
            res.status(400).json(response(false, "An error occurred", error));
        }
    }
});

// Authentication
Router.post('/auth', async (req, res) => {
    const result = authUserController(req.body);
    if (result.error) res.status(400).json(response(false, "There are Errors in your request", result.error.details));

    try {
        let theUser = await User.findOne({email: req.body.email});

        if (theUser && theUser.state) {
            const test = await bcrypt.compare(req.body.pass, theUser.pass);
            if (test) {
                return res.status(200).json(response(true, "Connected", theUser, jwt.sign(
                    { userId: theUser._id },
                    process.env.MOT_SECRET_TOKEN,
                    { expiresIn: '24h' })));
            } else {
                return res.status(200).json(response(false, "Email or password incorrects!"));
            }
        } else {
            // let theUser = await User.findOne({email: 'doe@mail.com'});
            // if (!theUser) {
            //     const hashedPass = await bcrypt.hash('besmart@1234', salt);
            //     await User.create({firstname: 'John', lastname: 'Doe', email: 'doe@mail.com', pass: hashedPass, role: 'ADMIN', sate: true, createBy: {}});

            //     theUser = await User.findOne({email: 'doe@mail.com'});
            //     return res.status(200).json(response(true, "Connected", theUser, jwt.sign(
            //         { userId: theUser._id },
            //         process.env.MOT_SECRET_TOKEN,
            //         { expiresIn: '24h' })));
            // }
            return res.status(200).json(response(false, "Email or password incorrects!"));
        }
    } catch (error) {
        return res.status(200).json(response(false, "An error occurred", error));
    }
});

// Update user
Router.patch("/update/:id", auth, async (req, res) => {
    const result = updateUserController(req.body);
    if (result.error) return res.status(400).json(response(false, 'There are Errors in your request', result.error.details));

    try {
        const result = await User.updateOne({_id: req.params.id}, req.body);
        res.status(201).json(response(true, "Updated", result));
    } catch (error) {
        res.status(400).json(response(false, "An error occurred", error));
    }
});

// Update my account
Router.patch("/update-account/:id", auth, async (req, res) => {
    const result = selfUpdateController(req.body);
    if (result.error) return res.status(400).json(response(false, 'There are Errors in your request', result.error.details));

    const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], 
        process.env.MOT_SECRET_TOKEN);
    const userID = decodedToken.userId;

    if (userID == req.params.id) {
        try {
            if (!req.body.newPass || req.body.newPass === '') {

            } else {
                // Hacher mot de passe 
                // const salt = await bcrypt.genSalt(10);
                const hashedPass = await bcrypt.hash(req.body.newPass, salt);
                
                data.pass = hashedPass;
            }
            const result = await User.updateOne({_id: req.params.id}, data);
            res.status(201).json(response(true, "Updated", result));
        } catch (error) {
            if (error.errors.email.kind === 'unique') {
                res.status(200).json(response(false, "User with this email already exist!", error));
            } else {
                res.status(400).json(response(false, "An error occurred", error));
            }
        }
    } else {
        res.status(200).json(response(false, "Incorrects values"));
    }
});

// Delete User
Router.delete("/:id", auth, async (req, res) => {
    try {
        const result = await User.deleteOne({_id: req.params.id});
        res.status(200).json(response(true, "Deleted", result));
    } catch (error) {
        res.status(400).json(response(false, "An error occurred", error));
    }
});

module.exports = Router;