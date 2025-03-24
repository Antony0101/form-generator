import { Request, Response } from "express";
import { responseSuccess } from "../../utils/response.utils.js";
import getAuthFromRequest from "../../utils/authHelper.utils.js";
import { generateApiError } from "../../lib/error/error.class.js";
import QuestionTemplateModel from "../../models/questionTemplate.model.js";

const getQuestionsController = async (req: Request, res: Response) => {
    const { page, limit } = req.query as unknown as {
        page: number;
        limit: number;
    };

    const { user } = getAuthFromRequest(req);

    const totalCount = await QuestionTemplateModel.countDocuments({
        userId: user._id,
    });
    const questions = await QuestionTemplateModel.find({ userId: user._id })
        .skip((page - 1) * limit)
        .limit(limit);
    return responseSuccess(res, {
        data: questions,
        message: "fetched questions list successfuly",
        totalCount,
        page,
        limit,
    });
};

const createQuestionController = async (req: Request, res: Response) => {
    const { user } = getAuthFromRequest(req);

    const { text } = req.body as {
        text: string;
    };
    const questionObject = await QuestionTemplateModel.create({
        text,
        userId: user._id,
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
    const { text } = req.body as {
        text: string;
    };

    const questionObject = await QuestionTemplateModel.findOne({
        _id: questionId,
        userId: user._id,
    });

    if (!questionObject) {
        throw generateApiError(404, "invalid question id");
    }

    questionObject.text = text;

    await questionObject.save();

    return responseSuccess(res, {
        data: questionObject,
        message: "updated question successfuly",
    });
};

const deleteQuestionController = async (req: Request, res: Response) => {
    const { user } = getAuthFromRequest(req);

    const { questionId } = req.params;

    const questionObject = await QuestionTemplateModel.findOne({
        _id: questionId,
        userId: user._id,
    });

    if (!questionObject) {
        throw generateApiError(404, "invalid question id");
    }

    await QuestionTemplateModel.deleteOne({
        _id: questionId,
        userId: user._id,
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
