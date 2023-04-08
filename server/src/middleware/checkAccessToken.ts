import express, { NextFunction } from "express";
import { ForbiddenError, UnauthorizedError } from "../errors/errorhandler";
import { JwtInvaildError } from "../errors/jwtErrors";
import { verifyAccessToken } from "../service/auth.service";
import { findAccessTokenById } from "../service/personality.service";



const checkPublic = async(req: express.Request, res: express.Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const accessToken = req.query.accessToken as string;
   
   
    try {
        if (accessToken) {
            verifyAccessToken(accessToken);
            const tokenData = await findAccessTokenById(id);
            if (!tokenData) throw new UnauthorizedError('해당 테스트 비공개');
            if (accessToken !== tokenData) throw new UnauthorizedError('해당 테스트 비공개');
        }

        next();

    } catch (error) {

        if (error instanceof JwtInvaildError) {
            return res.status(error.statusCode).json({ success: false });
        }
        else if (error instanceof UnauthorizedError) {
            return res.status(error.statusCode).json({ success: false });

        } else if (error instanceof ForbiddenError) {
            return res.status(error.statusCode).json({ success: false });
        }

        return res.status(500).json({ success: false });
    }

}

export default checkPublic;