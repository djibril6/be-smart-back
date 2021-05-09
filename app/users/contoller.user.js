const Joi = require("@hapi/joi");

const addUserController = data => {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required(),
        role: Joi.string().required(),
        pass: Joi.forbidden(),
        state: Joi.boolean().default(true)
    });
    return schema.validate(data);
};

const updateUserController = data => {
    const schema = Joi.object({
        firstname: Joi.string(),
        lastname: Joi.string(),
        email: Joi.string(),
        role: Joi.string(),
        newPass: Joi.string(),
        state: Joi.boolean()
    });
    return schema.validate(data);
};

const authUserController = data => {
    const schema = Joi.object({
        email: Joi.string().required(),
        pass: Joi.string().required()
    });
    return schema.validate(data);
};

const selfUpdateController = data => {
    const schema = Joi.object({
        firstname: Joi.string(),
        lastname: Joi.string(),
        email: Joi.string(),
        role: Joi.forbidden(),
        pass: Joi.string(),
        state: Joi.forbidden()
    });
    return schema.validate(data);
};

module.exports.addUserController = addUserController;
module.exports.updateUserController = updateUserController;
module.exports.authUserController = authUserController;
module.exports.selfUpdateController = selfUpdateController;