const Joi = require("@hapi/joi");

const addProjectController = data => {
    const schema = Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(),
        users: Joi.array().required(),
        state: Joi.string().required(),
        color: Joi.string()
    });
    return schema.validate(data);
};

const updateProjectController = data => {
    const schema = Joi.object({
        name: Joi.string(),
        type: Joi.string(),
        users: Joi.array(),
        state: Joi.string(),
        color: Joi.string(),
        cards: Joi.array(),
        tasks: Joi.array(),
    });
    return schema.validate(data);
};

const updateAddProjectController = data => {
    const schema = Joi.object({
        users: {
            id: Joi.string(),
            firstname: Joi.string(),
            lastname: Joi.string(),
            email: Joi.string(),
            role: Joi.string(),
            state: Joi.boolean()
        },
        cards: {
            name: Joi.string().required()
        },
        tasks: {
            description: Joi.string(),
            users: Joi.array().items({
                id: Joi.string(),
                name: Joi.string(),
                email: Joi.string(),
                role: Joi.string()
            }),
            endDate: Joi.date(),
            comment: Joi.string(),
            cards: Joi.string().required(),
        },
    });
    return schema.validate(data);
};

module.exports.addProjectController = addProjectController;
module.exports.updateProjectController = updateProjectController;
module.exports.updateAddProjectController = updateAddProjectController;