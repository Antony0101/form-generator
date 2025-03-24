import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../../utils/jwt.utils.js";
import { generateApiError } from "../error/error.class.js";
import UserModel from "../../models/user.model.js";

function authMiddleware() {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization?.split("Bearer ")[1];
            if (!token)
                throw generateApiError(
                    401,
                    "bearer token is missing in the authorisation header",
                );
            const tokenDetails = verifyJwt(token) as {
                userId: string;
                tokenId: string;
                iat: number;
                exp: number;
            };
            const user = await UserModel.findOne({ _id: tokenDetails.userId });
            if (!user) {
                throw generateApiError(401, "user not found");
            }
            req.token = tokenDetails;
            req.user = user;
            next();
        } catch (err: any) {
            console.log(err);
            if (err.status) {
                next(err);
            } else {
                next(generateApiError(401, err.message));
            }
        }
    };
}

export { authMiddleware };
