const jwt = require("jsonwebtoken");
require("dotenv/config");
const response = require('./res_format');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.MOT_SECRET_TOKEN);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            res.status(401).json(response(false, "Authentication Failed!"));
        } else {
          next();
        }
    } catch (error) {
        res.status(401).json(response(false, "Authentication error!", error));
    }
};

module.exports = auth;