import { Request, Response } from "express";
import prisma from "../../utils/prisma.utils.js";
import { responseSuccess } from "../../utils/response.utils.js";
import getAuthFromRequest from "../../utils/authHelper.utils.js";
import { generateApiError } from "../../lib/error/error.class.js";

const getAnswerTypeController = async (req: Request, res: Response) => {
    const { page, limit } = req.query as unknown as {
        page: number;
        limit: number;
    };

    const { user } = getAuthFromRequest(req);

    const answersTypes = await prisma.answerTypeTemplates.findMany({
        where: {
            userId: user.id,
        },
        skip: (page - 1) * limit,
        take: limit,
    });
    return responseSuccess(res, {
        data: answersTypes,
        message: "fetched answersTypes list successfuly",
        page,
        limit,
    });
};

const createAnswerTypeController = async (req: Request, res: Response) => {
    const { user } = getAuthFromRequest(req);

    const { name, validations, type, options } = req.body as {
        name: string;
        validations: string;
        type: string;
        options: string;
    };

    const answerTypeObject = await prisma.answerTypeTemplates.create({
        data: {
            name,
            validations,
            type,
            options,
            userId: user.id,
        },
    });

    return responseSuccess(res, {
        status: 201,
        data: answerTypeObject,
        message: "created answerType successfuly",
    });
};

const updateAnswerTypeController = async (req: Request, res: Response) => {
    const { user } = getAuthFromRequest(req);
    const { answerTypeId } = req.params;

    const { name, validations, type, options } = req.body as {
        name: string;
        validations: string;
        type: string;
        options: string;
    };

    const answerType = await prisma.answerTypeTemplates.findUnique({
        where: {
            id: Number(answerTypeId),
            userId: user.id,
        },
    });

    if (!answerType) {
        throw generateApiError(404, "invalid question id");
    }

    const answerTypeUpdate = await prisma.answerTypeTemplates.update({
        where: {
            id: Number(answerTypeId),
        },
        data: {
            name,
            validations,
            type,
            options,
        },
    });

    return responseSuccess(res, {
        data: answerTypeUpdate,
        message: "updated answerType successfuly",
    });
};

const deleteAnswerTypeController = async (req: Request, res: Response) => {
    const { user } = getAuthFromRequest(req);

    const { answerTypeId } = req.params;

    const answersTypes = await prisma.answerTypeTemplates.findUnique({
        where: {
            id: Number(answerTypeId),
            userId: user.id,
        },
    });

    if (!answersTypes) {
        throw generateApiError(404, "invalid answerType id");
    }

    await prisma.answerTypeTemplates.delete({
        where: {
            id: Number(answerTypeId),
        },
    });

    return responseSuccess(res, {
        data: answersTypes,
        message: "deleted answersTypes successfuly",
    });
};

export {
    createAnswerTypeController,
    updateAnswerTypeController,
    getAnswerTypeController,
    deleteAnswerTypeController,
};
