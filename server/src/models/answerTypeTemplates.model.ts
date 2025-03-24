import mongoose from "mongoose";

const answerTypeTemplates = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        validations: String,
        type: String,
        options: [String],
        formId: Number,
    },
    {
        timestamps: true,
    },
);

const AnswerTypeTemplatesModel = mongoose.model(
    "answer_type_templates",
    answerTypeTemplates,
);

export default AnswerTypeTemplatesModel;
