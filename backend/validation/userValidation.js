const Joi = require('joi');

const validationRegister = (data) => {
    const schema = Joi.object({
        userName: Joi.string().min(6).required(),
        email: Joi.string().min(8).required().email(),
        password: Joi.string().min(8).required(),
        DOB: Joi.date().required(),
        FName: Joi.string().required(),
        LName: Joi.string().required()
    });
    return schema.validate(data);
}

module.exports.validationRegister = validationRegister;