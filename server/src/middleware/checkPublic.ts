import express, { NextFunction } from "express";
import { ForbiddenError, UnauthorizedError } from "../errors/errorhandler";
import { verifyAccessToken } from "../service/auth.service";
import { getPersonalityById } from "../service/personality.service";
import { splitEmail } from "../utils/splitEmail";


const checkPublic = async(req: express.Request, res: express.Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    
    try {
        const personality = await getPersonalityById(id);

        if (!personality.isPublic) {
            const accessToken = req.cookies.accessToken;

            if (!accessToken) {
                throw new UnauthorizedError('해당 테스트 비공개');
            }

            const decode = verifyAccessToken(accessToken);
            const author = splitEmail(decode.email);

            if(personality.author !== author) {
                throw new ForbiddenError('해당 테스트는 접근 할 수 없음');
            }
        }

        next();

    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return res.status(error.statusCode).json({ success: false });
        } else if (error instanceof ForbiddenError) {
            return res.status(error.statusCode).json({ success: false });
        }
        
        return res.status(500).json({ success: false });
    }

}

export default checkPublic;