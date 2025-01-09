import { Request } from "express";

function getAuthFromRequest(req: Request) {
    const user = req.user;
    const token = req.token;
    if (!user || !token) {
        throw Error("This controller requires auth middleware.");
    }
    return { user, token };
}

export default getAuthFromRequest;
