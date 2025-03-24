import mongoose from "mongoose";

const questionTemplateSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const QuestionTemplateModel = mongoose.model(
    "question_templates",
    questionTemplateSchema,
);

export default QuestionTemplateModel;
