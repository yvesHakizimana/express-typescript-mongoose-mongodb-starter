import {RequestHandler} from "express";
import {validate, ValidationError} from "class-validator";
import {plainToInstance} from "class-transformer";
import {HttpException} from "@exceptions/HttpException";

/*
* The below method creates the middleware of validating the request before continuing to the specified service.
* Then it is passed into the class Validator like @CreateUserDTO for example, using the validate function of it.
* And if the validation Errors occur, an error array is populated.
* and from those errors, the errors are extracted and constructed
* and then the middleware calls next() with an HttpException containing the message and the statusCode.
* */

const validationMiddleware = (
    type: any,
    value: string | 'body' | 'query' | 'params' = 'body',
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true,
): RequestHandler => {
    return (req, res, next) => {
        validate(plainToInstance(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted })
            .then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                next(new HttpException(400, message));
            } else {
                next();
            }
        });
    };
};

export default validationMiddleware;