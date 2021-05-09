require("dotenv/config");
const jwt = require("jsonwebtoken");
const User = require("./users/model.user");

const userId = token => {
    const decodedToken = jwt.verify(token, process.env.MOT_SECRET_TOKEN);
    return decodedToken.userId;
};

const  getUser = async token => {
    const id = userId(token);
    return await User.findById(id);
};

module.exports.getUser = getUser;