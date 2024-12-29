import { Request, Response, NextFunction } from "express";
import { ApiError } from "./error.class.js";

function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (err instanceof ApiError) {
        console.log("Handled Error: ", err.message);
        res.status(err.status).json({
            success: false,
            message: err.message,
            data: null,
        });
        return;
    }
    console.log("Unhandled Error: ", err.message);
    console.log("Error Stack: ", err.stack);
    res.status(500).json({
        success: false,
        message: err.message,
        data: null,
    });
    return;
}

export default errorHandler;
