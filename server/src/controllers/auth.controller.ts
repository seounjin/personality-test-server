
import express, { Response } from "express";
import { createAccessToken, findRefreshToken, verifyAccessToken, verifyRefreshToken } from "../service/auth.service";
import dotenv from "dotenv";
dotenv.config();

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
const secure = process.env.NODE_ENV === 'production' ? true : false;

export const userAuth = async(
    req: express.Request,
    res: express.Response
  ): Promise<Response> => {
  
    
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) throw new Error('accessToken 없음')
  
      verifyAccessToken(accessToken);
      return res.status(200).json({ success: true });
  
    } catch (error) {
      return res.status(401).send();
    }
  }
  
  
  export const issueRefreshToken = async(
    req: express.Request,
    res: express.Response
  ): Promise<Response> => {
  
    try {
  
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) throw new Error('refreshToken 없음');
      
      verifyRefreshToken(refreshToken);

      const email = await findRefreshToken(refreshToken);

      if (!email) throw new Error('refreshToken 없음');

      const accessToken = await createAccessToken(email);
        res.cookie('accessToken', accessToken , {
          httpOnly: true,
          secure: secure,
          maxAge: 24 * 60 * 60 * 1000, 
        });
      return res.status(200).json({ success: true });
     
    } catch (error) {
      return res.status(401).send();
    }
  
  }