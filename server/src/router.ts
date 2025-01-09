import express from "express";
import authRouter from "./apps/auth/auth.router.js";
import questionRouter from "./apps/question/question.router.js";
import answerTypeRouter from "./apps/answerType/answerType.router.js";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/questions", questionRouter);
indexRouter.use("/answerTypes", answerTypeRouter);

export default indexRouter;
