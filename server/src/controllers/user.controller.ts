import express, { Response } from "express";
import { setUserInformation, validateUser } from "../service/user.service";

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
      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ success: false });

  } catch (err) {
    return res.status(500).send();
  }

};