import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Not Found",
        data: null,
    });
};

export default notFound;
