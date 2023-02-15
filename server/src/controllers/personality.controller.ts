import express, { Response } from "express";
import {
  setPersonalityItems,
  getAllPersonalityItems,
  getPersonalityItemById,
  getPersonalityTestResultByType,
  getMyPersonalityItems,
  deletePersonalityItems,
} from "../service/personality.service";
import { splitEmail } from "../utils";

export const setPersonality = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const { data } = req.body;

  const personalityItem = {...data, userId: splitEmail(req.user) };

  try {
    await setPersonalityItems(personalityItem);
    return res.status(201).json({ success: true });    
  } catch (error) {
    return res.status(500).send();
  }
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


export const getMyPersonalityTest = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const userId = splitEmail(req.user);
  const data = await getMyPersonalityItems(userId);
  return res.status(200).json({ data: data });
};

export const deletePersonalityTest  = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const id = parseInt(req.params.id);

  try {
    await deletePersonalityItems(id);
    return res.status(200).json({ success: true });  
  } catch (error) {
    return res.status(503).send();
  }
  
};