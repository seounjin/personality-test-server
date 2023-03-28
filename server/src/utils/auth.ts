import express,{CookieOptions} from "express";
import dotenv from "dotenv";

dotenv.config();
process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
const secure = process.env.NODE_ENV === 'production' ? true : false;
const sameSite = process.env.NODE_ENV === "production" ? "none" : false;
const domain = process.env.CLIENT_DOMAIN

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: secure,
    sameSite: sameSite,
    domain: process.env.NODE_ENV === 'production' ? domain : undefined
};

  
export const clearCookies =
  (...cookieNames: string[]) =>
  (_: express.Request, res: express.Response) => {
    return cookieNames.forEach((cookieName) =>
      res.clearCookie(cookieName, cookieOptions),
    );
};

