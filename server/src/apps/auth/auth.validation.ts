import Joi from "joi";

export const signupBodyValidation = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
});

export const signinBodyValidation = Joi.object({
    email: Joi.string(),
    password: Joi.string(),
});
