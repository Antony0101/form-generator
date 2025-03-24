import mongoose, { mongo } from "mongoose";

const formSubmissionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        formId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "forms",
            required: true,
        },
        version: Number,
        questions: [
            {
                text: String,
                type: String,
                validations: String,
                options: [String],
                answer: String,
            },
        ],
    },
    {
        timestamps: true,
    },
);

const FormSubmissionModel = mongoose.model(
    "form_submissions",
    formSubmissionSchema,
);

export default FormSubmissionModel;
