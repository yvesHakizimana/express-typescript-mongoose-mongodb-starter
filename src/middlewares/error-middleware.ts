import {HttpException} from "@exceptions/HttpException";
import {NextFunction, Request} from "express";

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try  {
        const statusCode = error.status || 500;
        const message = error.message;


    }
}