import { Request, Response } from "express";
import { responseSuccess } from "../../utils/response.utils.js";
import getAuthFromRequest from "../../utils/authHelper.utils.js";
import { generateApiError } from "../../lib/error/error.class.js";
import AnswerTypeTemplatesModel from "../../models/answerTypeTemplates.model.js";

const getAnswerTypeController = async (req: Request, res: Response) => {
    const { page, limit } = req.query as unknown as {
        page: number;
        limit: number;
    };

    const { user } = getAuthFromRequest(req);

    const totalCount = await AnswerTypeTemplatesModel.countDocuments({
        userId: user._id,
    });
    const answersTypes = await AnswerTypeTemplatesModel.find({
        userId: user._id,
    });

    return responseSuccess(res, {
        data: answersTypes,
        message: "fetched answersTypes list successfuly",
        totalCount,
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
        options: string[];
    };

    const answerTypeObject = await AnswerTypeTemplatesModel.create({
        name,
        validations,
        type,
        options,
        userId: user.id,
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
        options: string[];
    };

    const answerType = await AnswerTypeTemplatesModel.findOne({
        _id: answerTypeId,
        userId: user._id,
    });

    if (!answerType) {
        throw generateApiError(404, "answerTypeTemplate not found");
    }

    answerType.name = name;
    answerType.validations = validations;
    answerType.type = type;
    answerType.options = options;
    await answerType.save();

    return responseSuccess(res, {
        data: answerType,
        message: "updated answerType successfuly",
    });
};

const deleteAnswerTypeController = async (req: Request, res: Response) => {
    const { user } = getAuthFromRequest(req);

    const { answerTypeId } = req.params;

    const answersTypes = await AnswerTypeTemplatesModel.findOne({
        _id: answerTypeId,
        userId: user._id,
    });

    if (!answersTypes) {
        throw generateApiError(404, "invalid answerType id");
    }

    await AnswerTypeTemplatesModel.deleteOne({
        _id: answerTypeId,
        userId: user._id,
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
