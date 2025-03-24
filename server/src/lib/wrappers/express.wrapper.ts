import { Request, Response, NextFunction } from "express";
import mongoose, { ClientSession } from "mongoose";

function expressWrapper(
    fn: (req: Request, res: Response, next?: NextFunction) => Promise<void>,
) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await fn(req, res, next);
        } catch (e) {
            next(e);
        }
    };
}

export type ControllerTFunction = (
    req: Request,
    res: Response,
    session: ClientSession,
) => Promise<unknown>;

const expressTWrapper = (fn: ControllerTFunction) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let session: ClientSession = await mongoose.startSession();
            try {
                session.startTransaction();
                await fn(req, res, session);
                await session.commitTransaction();
                session.endSession();
            } catch (err) {
                await session.abortTransaction();
                session.endSession();
                next(err);
            }
        } catch (err) {
            next(err);
        }
    };
};

export { expressWrapper, expressTWrapper };
