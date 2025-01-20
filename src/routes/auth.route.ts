import {Routes} from "@interfaces/routes-interface";
import {Router} from "express";
import AuthController from "@controllers/auth-controller";
import validationMiddleware from "@middlewares/validation-middleware";
import {CreateUserDto} from "@dtos/users-dto";

export default class AuthRoute implements Routes {
    public path = '/';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp)
        this.router.post(`${this.path}login`, validationMiddleware(CreateUserDto, 'body'), this.authController.logIn)
    }
}