import express from "express";
import {
    SignUpController,
    CurrentUserController,
    SignInController,
} from "./auth.controller.js";
import { joiBodyValidation } from "../../lib/middlewares/joi.middleware.js";
import { signupBodyValidation } from "./auth.validation.js";
import { expressWrapper } from "../../lib/wrappers/express.wrapper.js";
import { authMiddleware } from "../../lib/middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post(
    "/signup",
    joiBodyValidation(signupBodyValidation),
    expressWrapper(SignUpController),
);

authRouter.get("/me", authMiddleware(), expressWrapper(CurrentUserController));

export default authRouter;
