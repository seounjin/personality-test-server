import CustomError from "./customError";



export class BadRequestError extends CustomError {
    statusCode: number = 400;
    constructor(message: string) {
        super(message);
        this.message = message; 
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export class UnauthorizedError extends CustomError {
    statusCode: number = 401;
    constructor(message: string) {
        super(message);
        this.message = message; 
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}



export class ForbiddenError extends CustomError {
    statusCode: number = 403;
    constructor(message: string) {
        super(message);
        this.message = message; 
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}


export class NotFoundError extends CustomError {
    statusCode: number = 404;
    constructor(message: string) {
        super(message);
        this.message = message; 
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}


export class BadParameterException extends CustomError {
    statusCode: number = 400;
    constructor(message: string) {
        super(message);
        this.message = message; 
        Object.setPrototypeOf(this, BadParameterException.prototype);
    }
}


export class ConflictError extends CustomError {
    statusCode: number = 409;
    constructor(message: string) {
        super(message);
        this.message = message; 
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}

