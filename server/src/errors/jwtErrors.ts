import CustomError from "./customError";


export class JwtExpiredError extends CustomError {
    statusCode: number = 401
    constructor(message: string) {
        super(message);
        this.message = message; 
        Object.setPrototypeOf(this, JwtExpiredError.prototype);
    }
}

export class JwtInvaildError extends CustomError {
    statusCode: number = 400;
    constructor(message: string) {
        super(message);
        this.message = message; 
        Object.setPrototypeOf(this, JwtInvaildError.prototype);
    }
}