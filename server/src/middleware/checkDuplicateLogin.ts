import express, { NextFunction } from "express";
import { NotFoundError, UnauthorizedError } from "../errors/errorhandler";
import { findUserInformationByEmail } from "../service/user.service";


const checkDuplicateLogin = async(req: express.Request, res: express.Response, next: NextFunction) => {
    
    const { email } = req.body.data;
    try {
        
        const data = await findUserInformationByEmail(email);

        if (!data) {
            throw new NotFoundError('존재하는 아이디가 없음');
        } else {
            if (data.refreshToken) {
                throw new UnauthorizedError('이미 로그인중인 아이디');
            }
        }

        next();

    } catch (error) {
        if (error instanceof NotFoundError){
            return res.status(error.statusCode).send();
        } else if (error instanceof UnauthorizedError) {
            return res.status(error.statusCode).send();
        }
        return res.status(500).send();
    }

}

export default checkDuplicateLogin;