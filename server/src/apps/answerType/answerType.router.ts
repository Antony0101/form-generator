import {
    createAnswerTypeController,
    deleteAnswerTypeController,
    getAnswerTypeController,
    updateAnswerTypeController,
} from "./answerType.controller.js";
import {
    getAnswerTypeSchema,
    createUpdateAnswerTypeSchema,
} from "./answerType.validation.js";

import { authMiddleware } from "../../lib/middlewares/auth.middleware.js";
import {
    joiBodyValidation,
    joiQueryValidation,
} from "../../lib/middlewares/joi.middleware.js";
import express from "express";
import { expressWrapper } from "../../lib/wrappers/express.wrapper.js";

const answerTypeRouter = express.Router();

answerTypeRouter.get(
    "/",
    joiQueryValidation(getAnswerTypeSchema),
    authMiddleware(),
    expressWrapper(getAnswerTypeController),
);

answerTypeRouter.post(
    "/",
    joiBodyValidation(createUpdateAnswerTypeSchema),
    authMiddleware(),
    expressWrapper(createAnswerTypeController),
);

answerTypeRouter.put(
    "/:answerTypeId",
    joiBodyValidation(createUpdateAnswerTypeSchema),
    authMiddleware(),
    expressWrapper(updateAnswerTypeController),
);

answerTypeRouter.delete(
    "/:answerTypeId",
    authMiddleware(),
    expressWrapper(deleteAnswerTypeController),
);

export default answerTypeRouter;
