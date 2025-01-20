import {model, Schema, Document} from "mongoose";
import {CreateUserDto} from "@dtos/users-dto";
import {User} from "@interfaces/user";

export default class UserRepository {
    static UserModel = model<User & Document>('User', new Schema({
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
    }))

    async addUser(userData: CreateUserDto): Promise<User> {
        //create the new User in our system.
        return UserRepository.UserModel.create(userData)
    }

    // Find the user by email.
    async findUserByEmail(email: string): Promise<User> {
        return UserRepository.UserModel.findOne({email});
    }

    async findAllUsers(): Promise<User[]> {
        return UserRepository.UserModel.find();
    }

    async findUserById(userId: string): Promise<User> {
        return UserRepository.UserModel.findById(userId);
    }

}