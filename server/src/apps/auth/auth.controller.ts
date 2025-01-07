import { Request, Response } from "express";
import { generateApiError } from "../../lib/error/error.class.js";
import prisma from "../../utils/prisma.utils.js";
import { hashPassword, verifyPassword } from "../../utils/hash.utils.js";
import { responseSuccess } from "../../utils/response.utils.js";
import { generateJwt } from "../../utils/jwt.utils.js";
import crypto from "crypto";

const SignUpController = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const isUserExist = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (isUserExist) {
        throw generateApiError(400, "User already exist");
    }
    const hash = hashPassword(password);
    const tokenId = crypto.randomUUID();
    const user = await prisma.$transaction(async (tx) => {
        const userTemp = await tx.user.create({
            data: {
                email,
                name,
            },
        });
        await tx.auth.create({
            data: {
                password: hash,
                user: {
                    connect: {
                        id: userTemp.id,
                    },
                },
                tokenId: [tokenId],
            },
        });
        return userTemp;
    });
    const token = generateJwt({ userId: user.id, tokenId: tokenId });
    return responseSuccess(res, {
        status: 201,
        message: "User created successfully",
        data: { user, token },
    });
};

const SignInController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw generateApiError(400, "email or password is wrong");
    }
    const auth = await prisma.auth.findUnique({
        where: {
            userId: user.id,
        },
    });
    if (!auth) {
        throw Error("user exist but corresponding auth entry is missing");
    }
    const hash = auth.password;
    const isPasswordMatch = verifyPassword(password, hash);
    if (!isPasswordMatch) {
        throw generateApiError(400, "email or password is wrong");
    }
    const tokenId = crypto.randomUUID();
    const token = generateJwt({ userId: user.id, tokenId: tokenId });
    const authTokenIds = auth.tokenId;
    if (authTokenIds.length > 10) {
        authTokenIds.shift();
    }
    authTokenIds.push(tokenId);
    return responseSuccess(res, {
        message: "Sign in is successful",
        data: { user, token },
    });
};

const CurrentUserController = async (req: Request, res: Response) => {
    return responseSuccess(res, {
        message: "Current user fetched successfuly",
        data: null,
    });
};

export { SignUpController, SignInController, CurrentUserController };
