import UserRepository from "@/repositories/user-repository";
import {CreateUserDto} from "@dtos/users-dto";
import {isEmpty} from "@utils/is-empty";
import {HttpException} from "@exceptions/HttpException";
import {hash, compare} from "bcrypt";
import {User} from "@interfaces/user";
import {DataStoredInToken, TokenData} from "@interfaces/auth";
import {ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY} from "@config";
import {sign} from "jsonwebtoken";

export default class AuthService {
    private userRepository: UserRepository

    public async signup(userData: CreateUserDto): Promise<User> {
        if(isEmpty(userData)) throw new HttpException(400, 'Userdata is empty')

        const foundUser = await this.userRepository.findUserByEmail(userData.email);
        if(foundUser) throw new HttpException(409, `The email ${userData.email} is already in use`)

        const hashedPassword = await hash(userData.password, 10)
        return this.userRepository.addUser({...userData, password: hashedPassword})
    }

    async login(userData: CreateUserDto): Promise<TokenData>{
        if(isEmpty(userData)) throw new HttpException(400, 'Userdata is empty.')

        const foundUser = await this.userRepository.findUserByEmail(userData.email);
        if(!foundUser) throw new HttpException(409, 'Invalid email or password.')

        const isPasswordMatching = await compare(userData.password, foundUser.password)
        if(!isPasswordMatching) throw new HttpException(409, 'Invalid email or password.')

        // Generate both the access and refresh token for further usage.
        return {
            access_token: this.generateAccessToken(foundUser),
            refresh_token: this.generateRefreshToken(foundUser),
        }

    }

    private generateRefreshToken(user: User): string {
        return this.createToken(user, true);
    }

    private generateAccessToken(user: User): string {
        return this.createToken(user, false);
    }

    private createToken(user: User, isRefresh: boolean): string{
        const dataStoredInToken: DataStoredInToken  = { _id: user._id}
        const secretKey = isRefresh ? REFRESH_TOKEN_SECRET_KEY : ACCESS_TOKEN_SECRET_KEY
        const expiresIn = 1000 * 60 * 60 * 24

        return sign(dataStoredInToken, secretKey, {expiresIn})
    }
}