const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true
    },
    users: {
        type: [{
            id: String,
            firstname: String,
            lastname: String,
            email: String,
            role: String,
            state: Boolean
        }],
        require: true,
    },
    state: {
        type: String,
        require: false
    },
    color: {
        type: String,
        require: true,
    },
    cards: {
        type: [{
            name: String,
        }],
        require: false
    },
    tasks: {
        type: [{
            description: String,
            users: [{
                id: String,
                name: String,
                email: String,
                role: String
            }],
            endDate: Date,
            comment: String,
            cards: String
        }],
        require: false
    },
});

module.exports = mongoose.model('Project', ProjectSchema);