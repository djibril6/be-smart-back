const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    pass: {
        type: String,
        require: false
    },
    role: {
        type: String,
        require: true,
    },
    state: {
        type: Boolean,
        require: true,
        default: true
    },
    loginError: {
        type: Number,
        require: false,
        default: 0
    },
    createBy: {
        type: {id: String, name: String},
        require: true
    }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);