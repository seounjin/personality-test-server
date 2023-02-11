import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { mongoose } from "@typegoose/typegoose";
import { UserModel } from "../models/userModel/user.model";
dotenv.config();

export const createAccessToken = (email: string):string => {

    const token = jwt.sign(
        { email },
        process.env.JWT_ACCESS_TOKEN_SECRET_KEY ?? '',
        { expiresIn: "1h" }
    );

    return token;
}

export const createRefreshToken = (): string => {

    const token = jwt.sign(
        { },
        process.env.JWT_REFRESH_TOKEN_SECRET_KEY  ?? '',
        { expiresIn: "2 weeks" }
    );

    return token;
}


export const verifyAccessToken = (accessToken: string): JwtPayload  => {

    try {
        return <JwtPayload>jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET_KEY ?? '');     
    } catch (error) {
        throw new Error(`${error}`);
    }
}

export const verifyRefreshToken = (refreshToken: string): JwtPayload => {
    try {
        return <JwtPayload>jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET_KEY ?? '');     
    } catch (error) {
        throw new Error(`${error}`);
    }
   
}

export interface UserDoc extends mongoose.Document {
    email: string;
}

export const findRefreshToken = async(refreshToken: string):Promise<string | null> => {
  
    try {
        const user: UserDoc | null = await UserModel.findOne({ refreshToken: refreshToken }, { email: 1, _id: 0 });
        return user ? user.email : null;

    } catch (error) {
        return Promise.reject(error);
    }
}