import express, { NextFunction } from "express";
import { verifyAccessToken } from "../service/auth.service";


const auth = async(req: express.Request, res: express.Response, next: NextFunction) => {
    
    const accessToken = req.cookies.accessToken;

    try {

        if (!accessToken){
            throw new Error('accessToken 없음');
        }
        const decode = verifyAccessToken(accessToken);
        req.user = decode.email;
        next();

    } catch(error) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(401).send();
    }
};

export default auth;