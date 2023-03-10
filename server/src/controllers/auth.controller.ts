
import express, { Response } from "express";
import { createAccessToken, findRefreshToken, verifyAccessToken, verifyRefreshToken } from "../service/auth.service";
import dotenv from "dotenv";
import { JwtExpiredError, JwtInvaildError } from "../errors/jwtErrors";
dotenv.config();

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
const secure = process.env.NODE_ENV === 'production' ? true : false;

export const userAuth = async(
    req: express.Request,
    res: express.Response
  ): Promise<Response> => {
  
    
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) throw new Error('accessToken 없음');
      

      verifyAccessToken(accessToken);
      return res.status(200).json({ success: true });
  
    } catch (error) {

      if (error instanceof JwtExpiredError) {
        return res.status(error.statusCode).json({ success: false });
        
      } else if (error instanceof JwtInvaildError) {
        return res.status(error.statusCode).json({ success: false });
      }

      return res.status(500).send();
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
      if (error instanceof JwtExpiredError) {
        return res.status(error.statusCode).send();
      } else if (error instanceof JwtInvaildError) {
        return res.clearCookie("accessToken")
                  .clearCookie("refreshTooken")
                  .status(error.statusCode).send();
      }

      return res.status(500).send();
    }
  
}