import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../../utils/jwt.utils.js";
import { generateApiError } from "../error/error.class.js";

function authMiddleware() {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization?.split("Bearer ")[1];
            console.log(req.headers.authorization);
            if (!token)
                throw generateApiError(
                    401,
                    "bearer token is missing in the authorisation header",
                );
            const tokenDetails = verifyJwt(token) as {
                userId: string;
                tokenId: string;
            };
            console.log("sample,", tokenDetails);
        } catch (err) {
            console.log(err);
        } finally {
            next();
        }
    };
}

export { authMiddleware };
