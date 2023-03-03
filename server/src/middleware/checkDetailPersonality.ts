import express, { NextFunction } from "express";
import { getPersonalityById } from "../service/personality.service";
import { splitEmail } from "../utils/splitEmail";



export const checkMyDetailPersonality = async (req: express.Request, res: express.Response, next: NextFunction) => {
    
    try {
        const id = parseInt(req.params.id);
        const email = req.user;
        const author = splitEmail(email);
        const personality = await getPersonalityById(id);

        if(personality.author !== author) {
            throw new Error('접근할 수 없는 페이지');
        }
        next();

    } catch (error) {
        return res.status(403).json({ success: false });
    }
}

export default checkMyDetailPersonality;