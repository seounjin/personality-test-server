import express, { NextFunction } from "express";
import { JwtExpiredError, JwtInvaildError, JwtNotFound } from "../errors/jwtErrors";
import { verifyAccessToken } from "../service/auth.service";


const auth = async(req: express.Request, res: express.Response, next: NextFunction) => {
    
    const accessToken = req.cookies.accessToken;

    try {
        if (!accessToken){
            throw new JwtNotFound('accessToken 없음');
        }
        const decode = verifyAccessToken(accessToken);
        req.user = decode.email;
        next();

    } catch(error) {
               
        if (error instanceof JwtExpiredError) {
            return res.status(error.statusCode).json({ success: false });

        } else if (error instanceof JwtInvaildError) {
            return res.status(error.statusCode).json({ success: false });

        } else if (error instanceof JwtNotFound) {
            return res.status(error.statusCode).json({ success: false }); 
        }
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(500).send();
    }
};

export default auth;