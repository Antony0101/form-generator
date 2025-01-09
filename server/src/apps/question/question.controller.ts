import { Request, Response } from "express";
import prisma from "../../utils/prisma.utils.js";
import { responseSuccess } from "../../utils/response.utils.js";
import getAuthFromRequest from "../../utils/authHelper.utils.js";
import { generateApiError } from "../../lib/error/error.class.js";

const getQuestionsController = async (req: Request, res: Response) => {
    const { page, limit } = req.query as unknown as {
        page: number;
        limit: number;
    };

    const { user } = getAuthFromRequest(req);

    const questions = await prisma.questionTemplates.findMany({
        where: {
            userId: user.id,
        },
        skip: (page - 1) * limit,
        take: limit,
    });
    return responseSuccess(res, {
        data: questions,
        message: "fetched questions list successfuly",
        page,
        limit,
    });
};

const createQuestionController = async (req: Request, res: Response) => {
    const { user } = getAuthFromRequest(req);

    const { question } = req.body as {
        question: string;
    };

    const questionObject = await prisma.questionTemplates.create({
        data: {
            question,
            userId: user.id,
        },
    });

    return responseSuccess(res, {
        status: 201,
        data: questionObject,
        message: "created question successfuly",
    });
};

const updateQuestionController = async (req: Request, res: Response) => {
    const { user } = getAuthFromRequest(req);
    const { questionId } = req.params;
    const { question } = req.body as {
        question: string;
    };

    const questionObject = await prisma.questionTemplates.findUnique({
        where: {
            id: Number(questionId),
            userId: user.id,
        },
    });

    if (!questionObject) {
        throw generateApiError(404, "invalid question id");
    }

    await prisma.questionTemplates.update({
        where: {
            id: Number(questionId),
        },
        data: {
            question,
        },
    });

    return responseSuccess(res, {
        data: questionObject,
        message: "updated question successfuly",
    });
};

const deleteQuestionController = async (req: Request, res: Response) => {
    const { user } = getAuthFromRequest(req);

    const { questionId } = req.params;

    const questionObject = await prisma.questionTemplates.findUnique({
        where: {
            id: Number(questionId),
            userId: user.id,
        },
    });

    if (!questionObject) {
        throw generateApiError(404, "invalid question id");
    }

    await prisma.questionTemplates.delete({
        where: {
            id: Number(questionId),
        },
    });

    return responseSuccess(res, {
        data: questionObject,
        message: "deleted question successfuly",
    });
};

export {
    createQuestionController,
    getQuestionsController,
    updateQuestionController,
    deleteQuestionController,
};
