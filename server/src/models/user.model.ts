import mongoose from "mongoose";
import { ExtractDocument, ExtractEntity } from "../utils/mongoHelper.utils.js";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const UserModel = mongoose.model("users", userSchema);
export type UserEntity = ExtractEntity<typeof UserModel>;
export type UserDocument = ExtractDocument<typeof UserModel>;

export default UserModel;
