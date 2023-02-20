import express, { NextFunction } from "express";
import { verifyAccessToken } from "../service/auth.service";
import { getPersonalityById } from "../service/personality.service";
import { splitEmail } from "../utils";

interface CustomError  {
    status: number;
    error: string;
}

const customError = ({status, error}: CustomError) => {
    return { status, error }
}

const checkPublic = async(req: express.Request, res: express.Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    
    try {
        const personality = await getPersonalityById(id);

        if (!personality.isPublic) {
            const accessToken = req.cookies.accessToken;

            if (!accessToken){
                throw customError({ status: 401, error: '해당 테스트 비공개'});
            }

            const decode = verifyAccessToken(accessToken);
            const author = splitEmail(decode.email);

            if(personality.author !== author) {
                throw customError({ status: 401, error: '해당 테스트 비공개'});
            }
        }

        next();

    } catch (error: unknown) {
        const err = error as CustomError;
        return res.status(err.status).send();
    }

}

export default checkPublic;