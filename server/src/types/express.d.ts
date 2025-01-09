import { Prisma } from "@prisma/client";
declare global {
    namespace Express {
        export interface Request {
            user?: Prisma.UserGetPayload<{
                select: {
                    email: true;
                    id: true;
                    name: true;
                    createdAt: true;
                    updatedAt: true;
                };
            }>;
            token?: {
                userId: string;
                tokenId: string;
                iat: number;
                exp: number;
            };
        }
    }
}
