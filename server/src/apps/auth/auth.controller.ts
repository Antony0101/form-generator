import { Request, Response } from "express";
import { generateApiError } from "../../lib/error/error.class.js";
import { hashPassword, verifyPassword } from "../../utils/hash.utils.js";
import { responseSuccess } from "../../utils/response.utils.js";
import { generateJwt } from "../../utils/jwt.utils.js";
import crypto from "crypto";
import getAuthFromRequest from "../../utils/authHelper.utils.js";
import { ClientSession } from "mongoose";
import UserModel from "../../models/user.model.js";
import AuthModel from "../../models/auth.model.js";

const SignUpController = async (
    req: Request,
    res: Response,
    session: ClientSession,
) => {
    const { email, password, name } = req.body;
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
        throw generateApiError(400, "User already exist");
    }
    const hash = hashPassword(password);
    const tokenId = crypto.randomUUID();
    const user = (await UserModel.create([{ email, name }], { session }))[0];
    await AuthModel.create(
        [{ password: hash, userId: user._id, tokenId: [tokenId] }],
        { session },
    );

    const token = generateJwt({ userId: user.id, tokenId: tokenId });
    return responseSuccess(res, {
        status: 201,
        message: "User created successfully",
        data: { user, token },
    });
};

const SignInController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw generateApiError(400, "email or password is wrong");
    }
    const auth = await AuthModel.findOne({ userId: user._id });
    if (!auth) {
        throw Error("user exist but corresponding auth entry is missing");
    }
    const hash = auth.password;
    const isPasswordMatch = verifyPassword(password, hash || "");
    if (!isPasswordMatch) {
        throw generateApiError(400, "email or password is wrong");
    }
    const tokenId = crypto.randomUUID();
    const token = generateJwt({ userId: user.id, tokenId: tokenId });
    const authTokenIds = auth.tokens;
    if (authTokenIds.length > 10) {
        authTokenIds.shift();
    }
    authTokenIds.push(tokenId);
    auth.tokens = authTokenIds;
    await auth.save();
    return responseSuccess(res, {
        message: "Sign in is successful",
        data: { user, token },
    });
};

const CurrentUserController = async (req: Request, res: Response) => {
    const { user } = getAuthFromRequest(req);
    return responseSuccess(res, {
        message: "Current user fetched successfuly",
        data: user,
    });
};

export { SignUpController, SignInController, CurrentUserController };
