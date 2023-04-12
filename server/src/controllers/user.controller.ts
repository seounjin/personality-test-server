import express, { Response } from "express";
import { createAccessToken, createRefreshToken } from "../service/auth.service";
import { deleteRefreshToken, deleteUserInformation, getMyPersonalityItemsByAuthor, saveRefreshToken, setUserInformation, validateUser } from "../service/user.service";
import dotenv from "dotenv";
import { splitEmail } from "../utils/splitEmail";
import { updateAuthortoAdmin } from "../service/personality.service";
import { BadParameterException, ConflictError } from "../errors/errorhandler";
import { clearCookies } from "../utils/auth";
dotenv.config();

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
const secure = process.env.NODE_ENV === 'production' ? true : false;
const sameSite = process.env.NODE_ENV === "production" ? "none" : false;
const domain = process.env.CLIENT_DOMAIN

export const userSignup = async (
  { body }: express.Request,
  res: express.Response
): Promise<Response> => {
  const { data } = body;

  try {
    await setUserInformation(data);
    return res.status(201).json({ success: true });

  } catch (error) {
    if (error instanceof ConflictError){
      return res.status(409).json({ success: false })
    }
    return res.status(500).json({ success: false });
  }

};

export const userLogin = async (
  { body }: express.Request,
  res: express.Response
): Promise<Response> => {
  const { data } = body;

  try {
    const { validate } = await validateUser(data);

    if (validate) {
      
      const accessToken = await createAccessToken(data.email);
      res.cookie('accessToken', accessToken , {
        httpOnly: true,
        secure: secure,
        sameSite: sameSite,
        domain: process.env.NODE_ENV === 'production' ? domain : undefined,
        maxAge: 24 * 60 * 60 * 1000, 
      });

      const refreshToken = await createRefreshToken();
      res.cookie('refreshToken', refreshToken , {
        httpOnly: true,
        secure: secure,
        sameSite: sameSite,
        domain: process.env.NODE_ENV === 'production' ? domain : undefined,
        maxAge: 1000 * 60 * 60 * 24 * 14, 
      });

      await saveRefreshToken(data.email, refreshToken);

      return res.status(200).json({ success: true });
    }

    throw new BadParameterException('아이디 혹은 비밀번호 불일치');

  } catch (error) {
    if (error instanceof BadParameterException){
      return res.status(400).json({ success: false });
    }
    return res.status(500).json({ success: false });
  }

};

export const userLogout = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => { 

  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new Error('refreshToken 없음');
    await deleteRefreshToken(refreshToken);

    clearCookies("accessToken", "refreshToken")(req, res);
    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ success: false });
  }
}


export const userSignout = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => { 

  try {

    const email = req.user;
    await deleteUserInformation(email);

    const author = splitEmail(email);
    await updateAuthortoAdmin(author);

    clearCookies("accessToken", "refreshToken")(req, res);
    return res.status(200).json({ success: true });

  } catch (error) {
   return res.status(500).json({ success: false });

  }
}

export const getUserId = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => { 

  try {
    return res.status(200).json({ success: true, userId: req.user });
  } catch (error) {
   return res.status(500).json({ success: false });

  }
}

export const getMyPersonalityTest = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const userId = splitEmail(req.user);
  try {
    const data = await getMyPersonalityItemsByAuthor(userId);
    return res.status(200).json({ success: true , data });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};
