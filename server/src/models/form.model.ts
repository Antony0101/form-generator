import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        version: Number,
        questions: [
            {
                text: String,
                type: String,
                validation: String,
                option: [String],
            },
        ],
    },
    {
        timestamps: true,
    },
);

const FormModel = mongoose.model("forms", formSchema);

export default FormModel;
