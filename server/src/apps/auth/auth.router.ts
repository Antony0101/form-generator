import express from "express";
import { SignUpController } from "./auth.controller.js";
import { joiBodyValidation } from "../../lib/middlewares/joi.middleware.js";
import { signupBodyValidation } from "./auth.validation.js";
import { expressWrapper } from "../../lib/wrappers/express.wrapper.js";

const authRouter = express.Router();

authRouter.post(
    "/signup",
    joiBodyValidation(signupBodyValidation),
    expressWrapper(SignUpController),
);

export default authRouter;
