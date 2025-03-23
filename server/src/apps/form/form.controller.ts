import getAuthFromRequest from "../../utils/authHelper.utils.js";
import prisma from "../../utils/prisma.utils.js";
import { Request, Response } from "express";

const createFormController = async (req: Request, res: Response) => {
    const { user } = getAuthFromRequest(req);
};
