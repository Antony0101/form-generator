import jwt from "jsonwebtoken";
import env from "./env.utils.js";

const generateJwt = (payload: { userId: string; tokenId: string }) => {
    return jwt.sign(payload, env.jwtSecret, { expiresIn: "1d" });
};

const verifyJwt = (token: string) => {
    return jwt.verify(token, env.jwtSecret);
};

export { generateJwt, verifyJwt };
