import Joi from "joi";
import { paginationSchema } from "../../utils/commonValidation.utils.js";

export const getFormSchema = Joi.object({
    ...paginationSchema,
});

export const createFormSchema = Joi.object({
    name: Joi.string().required(),
});
