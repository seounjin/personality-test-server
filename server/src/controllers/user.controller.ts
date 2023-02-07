import express, { Response } from "express";
import { setUserItems } from "../service/user.service";

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
    await setUserItems(data);
    return res.status(201).json({ success: true });

  } catch (err: unknown) {
    const error = err as UserSignupError;
    return error.emailExistError ? res.status(409).send() : res.status(500).send();
  }

};