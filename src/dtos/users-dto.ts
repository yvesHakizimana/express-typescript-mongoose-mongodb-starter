import {IsEmail, IsString, IsNotEmpty, MinLength} from 'class-validator'

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    public firstName: string;

    @IsString()
    @IsNotEmpty()
    public lastName: string;

    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password should not be empty.' })
    @MinLength(8, { message: "Password should be at least 8 characters" })
    public password: string;
}

export class AuthenticateUserDto {
    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password should not be empty.' })
    @MinLength(8, { message: "Password should be at least 8 characters" })
    public password: string;
}

