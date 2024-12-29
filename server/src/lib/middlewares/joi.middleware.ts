import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { generateApiError } from "../error/error.class.js";

function joiBodyValidation(schema: Joi.ObjectSchema | Joi.ArraySchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            throw generateApiError(400, error.message);
        }
        req.body = value;
        next();
    };
}

function joiQueryValidation(schema: Joi.ObjectSchema | Joi.ArraySchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.query);
        if (error) {
            throw generateApiError(400, error.message);
        }
        req.query = value;
        next();
    };
}

export { joiBodyValidation, joiQueryValidation };
