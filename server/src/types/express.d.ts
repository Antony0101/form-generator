import { Prisma } from "@prisma/client";
import { UserDocument } from "../models/user.model.ts";
declare global {
    namespace Express {
        export interface Request {
            user?: UserDocument;
            token?: {
                userId: string;
                tokenId: string;
                iat: number;
                exp: number;
            };
        }
    }
}
