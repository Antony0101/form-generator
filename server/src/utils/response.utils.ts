import { Response } from "express";

type Opt = {
    status?: number;
    message: string;
    data?: any;
    totalCount?: number;
    page?: number;
    limit?: number;
};

function responseSuccess(
    res: Response,
    { status = 200, data = null, totalCount, page, message, limit }: Opt,
) {
    res.status(status).json({
        success: true,
        message,
        totalCount,
        page,
        limit,
        data,
    });
}

export { responseSuccess };
