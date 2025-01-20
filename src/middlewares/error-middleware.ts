import {HttpException} from "@exceptions/HttpException";
import {NextFunction, Request, Response} from "express";
import {logger} from "@utils/logger";

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try  {
        const statusCode: number = error.status || 500;
        const message = error.message;

        logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, Message:: ${message}`);
        res.status(statusCode).json({message});
    } catch (error) {
        next(error);
    }
}

export default errorMiddleware;