import { Request, Response } from "express";
import { generateApiError } from "../../lib/error/error.class.js";
import prisma from "../../utils/prisma.utils.js";
import { hashPassword } from "../../utils/hash.utils.js";
import { responseSuccess } from "../../utils/response.utils.js";
import { generateJwt } from "../../utils/jwt.utils.js";

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
    const user = await prisma.$transaction(async (tx) => {
        const userTemp = await tx.user.create({
            data: {
                email,
                name,
            },
        });
        const h = await tx.auth.create({
            data: {
                password: hash,
                user: {
                    connect: {
                        id: userTemp.id,
                    },
                },
            },
        });
        return userTemp;
    });
    const token = generateJwt({ userId: user.id, tokenId: user.id });
    return responseSuccess(res, {
        status: 201,
        message: "User created successfully",
        data: { user, token },
    });
};

export { SignUpController };
