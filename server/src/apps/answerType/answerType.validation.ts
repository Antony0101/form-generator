import Joi from "joi";
import { paginationSchema } from "../../utils/commonValidation.utils.js";

export const getAnswerTypeSchema = Joi.object({
    ...paginationSchema,
});

export const createUpdateAnswerTypeSchema = Joi.object({
    name: Joi.string().required(),
    validations: Joi.string().required(),
    type: Joi.string().required(),
    options: Joi.string().required(),
});
