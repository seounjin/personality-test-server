import express, { Response } from "express";
import { createAccessToken, createRefreshToken } from "../service/auth.service";
import { saveRefreshToken, setUserInformation, validateUser } from "../service/user.service";
import dotenv from "dotenv";
dotenv.config();

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
const secure = process.env.NODE_ENV === 'production' ? true : false;

interface UserSignupError {
  emailExistError: boolean,
  error: string
}

export const userSignup = async (
  { body }: express.Request,
  res: express.Response
): Promise<Response> => {
  const { data } = body;

  try {
    await setUserInformation(data);
    return res.status(201).json({ success: true });

  } catch (err: unknown) {
    const error = err as UserSignupError;
    return error.emailExistError ? res.status(409).send() : res.status(500).send();
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
        maxAge: 24 * 60 * 60 * 1000, 
      });

      const refreshToken = await createRefreshToken();
      res.cookie('refreshToken', refreshToken , {
        httpOnly: true,
        secure: secure,
        maxAge: 1000 * 60 * 60 * 24 * 14, 
      });

      await saveRefreshToken(data.email, refreshToken);

      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ success: false });

  } catch (error) {
    return res.status(500).send();
  }

};
