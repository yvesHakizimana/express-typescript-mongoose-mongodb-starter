import {RegisterUserDto} from "@dtos/users-dto";
import {User} from "@interfaces/user";
import UserModel from "@models/user-model";

export default class UserRepository {

    async addUser(userData: RegisterUserDto): Promise<User> {
        //create the new User in our system.
        return UserModel.create(userData)
    }

    // Find the user by email.
    async findUserByEmail(email: string): Promise<User> {
        return UserModel.findOne({email});
    }

    async findAllUsers(): Promise<User[]> {
        return UserModel.find();
    }

    async findUserById(userId: string): Promise<User> {
        return UserModel.findById(userId);
    }

}