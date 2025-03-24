import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        tokens: [String],
    },
    {
        timestamps: true,
    },
);

const AuthModel = mongoose.model("auths", authSchema);

export default AuthModel;
