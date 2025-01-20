import AuthService from "@services/auth-service";
import {NextFunction, Request, Response} from "express";

class AuthController {
    private authService: AuthService

    async signUp(req: Request, res: Response, next: NextFunction){
        try {
            const userData = req.body
            const userSaved = await this.authService.signup(userData)

            res.status(201).json({
                data: userSaved,
                message: 'Sign up went successfully'
            })
        } catch (error) {
            next(error)
        }
    }

    async logIn(req: Request, res: Response, next: NextFunction){
        try {
            const userData = req.body
            const tokenData = await this.authService.login(userData)

            res.status(200).json({
                data: tokenData,
                message: 'Sign in went successfully'
            })
        } catch (error){
            next(error)
        }
    }
}

export default AuthController