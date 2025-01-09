import {
    createQuestionController,
    deleteQuestionController,
    getQuestionsController,
    updateQuestionController,
} from "./question.controller.js";

import {
    createUpdateQuestionSchema,
    getQuestionsSchema,
} from "./question.validation.js";

import {
    joiBodyValidation,
    joiQueryValidation,
} from "../../lib/middlewares/joi.middleware.js";

import { authMiddleware } from "../../lib/middlewares/auth.middleware.js";

import express from "express";
import { expressWrapper } from "../../lib/wrappers/express.wrapper.js";

const questionRouter = express.Router();

questionRouter.get(
    "/",
    joiQueryValidation(getQuestionsSchema),
    authMiddleware(),
    expressWrapper(getQuestionsController),
);

questionRouter.post(
    "/",
    joiBodyValidation(createUpdateQuestionSchema),
    authMiddleware(),
    expressWrapper(createQuestionController),
);

questionRouter.put(
    "/:questionId",
    joiBodyValidation(createUpdateQuestionSchema),
    authMiddleware(),
    expressWrapper(updateQuestionController),
);

questionRouter.delete(
    "/:questionId",
    authMiddleware(),
    expressWrapper(deleteQuestionController),
);

export default questionRouter;
