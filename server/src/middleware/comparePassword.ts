import express, { NextFunction } from "express";
import { UserModel } from "../models/userModel/user.model";


const comparePassword = async(req: express.Request, res: express.Response, next: NextFunction) => {
    
    const { password } = req.body.data;
    const email = req.user;
    try {
        if (!password) throw new Error('비밀번호 없음');

        const user = await UserModel.findOne({ email: email }).populate("password");
        if (!user) throw new Error('유저 정보 없음');

        const dbPassword = user["password"];
        const res  = await UserModel.comparePassword(password, dbPassword);
        if (!res) throw new Error('유저 정보 없음');
        
        next();

    } catch(error) {
        return res.status(400).json({ success: false });
    }
};

export default comparePassword;