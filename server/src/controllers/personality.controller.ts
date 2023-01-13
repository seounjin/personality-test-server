import express, { Response } from "express";
import {
  setPersonalityItems,
  getAllPersonalityItems,
  getPersonalityItemById,
  getPersonalityTestResultByType,
} from "../service/personality.service";

export const setPersonality = async (
  { body }: express.Request,
  res: express.Response
): Promise<Response> => {
  const { data } = body;
  await setPersonalityItems(data);
  return res.status(201).json({ success: true });
};

export const getPersonality = async (
  _req: express.Request,
  res: express.Response
): Promise<Response> => {
  const data = await getAllPersonalityItems();
  return res.status(200).json({ data: data });
};

export const getPersonalityItem = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const data = await getPersonalityItemById(id);
  return res.status(200).json({ data: data });
};

export const getPersonalityTestResult = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const type = req.params.type;
  const data = await getPersonalityTestResultByType(id, type);
  return res.status(200).json({ data });
};
