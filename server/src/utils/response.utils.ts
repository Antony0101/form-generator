import { Response } from "express";

type Opt = {
    status?: number;
    message: string;
    data?: any;
    page?: any;
    limit?: any;
};

function responseSuccess(
    res: Response,
    { status = 200, message = "Success", data = null, page, limit }: Opt,
) {
    res.status(status).json({
        success: true,
        message,
        page,
        limit,
        data,
    });
}

export { responseSuccess };
