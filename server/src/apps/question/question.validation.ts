import Joi from "joi";
import { paginationSchema } from "../../utils/commonValidation.utils.js";

export const getQuestionsSchema = Joi.object({
    ...paginationSchema,
});

export const createUpdateQuestionSchema = Joi.object({
    question: Joi.string().min(3).required(),
});
