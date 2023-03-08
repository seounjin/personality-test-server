import express, { NextFunction } from "express";
import { BadParameterException } from "../errors/errorhandler";
import { UserModel } from "../models/userModel/user.model";


const comparePassword = async(req: express.Request, res: express.Response, next: NextFunction) => {
    
    const { password } = req.body.data;
    const email = req.user;
    try {
        if (!password) throw new BadParameterException('비밀번호 없음');

        const user = await UserModel.findOne({ email: email }).populate("password");
        if (!user) throw new BadParameterException('유저 정보 없음');

        const dbPassword = user["password"];
        const res  = await UserModel.comparePassword(password, dbPassword);
        if (!res) throw new BadParameterException('비밀번호 불일치');
        
        next();

    } catch(error) {
        if (error instanceof BadParameterException) {
            return res.status(400).json({ success: false });
        }
        return res.status(500).json({ success: false });
    }
};

export default comparePassword;