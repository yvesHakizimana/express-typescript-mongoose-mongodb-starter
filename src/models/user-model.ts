import {Document, model, Schema} from "mongoose";
import {User} from "@interfaces/user";

const UserModel = model<User & Document>('UserModel', new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}));

export default UserModel;