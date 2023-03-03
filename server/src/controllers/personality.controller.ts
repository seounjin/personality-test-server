import express, { Response } from "express";
import {
  getAllPersonalityItems,
  getPersonalityItemById,
  getPersonalityTestResultByType,
  getMyPersonalityItemsByAuthor,
  getDetailPersonalityItemsByIdAndTestType,
  updateScoreTypeItemsById,
  saveScoreTypeTest,
  saveMbtiTypeTest,
  updateMbtiTypeItemsById,
  deleteScoreTypeTestById,
  deleteMbtiTypeTestById,
} from "../service/personality.service";
import { splitEmail } from "../utils/splitEmail";


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
  try {
    const data = await getPersonalityTestResultByType(id, type);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

export const getMyPersonalityTest = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const userId = splitEmail(req.user);
  try {
    const data = await getMyPersonalityItemsByAuthor(userId);
    return res.status(200).json({ success: true , data: data, user: req.user });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

export const deleteScoreTypeTest  = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const id = parseInt(req.params.id);

  try {
    await deleteScoreTypeTestById(id);
    return res.status(200).json({ success: true });  
  } catch (error) {
    return res.status(500).json({ success: false });  
  }
};

export const deleteMbtiTypeTest  = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const id = parseInt(req.params.id);

  try {
    await deleteMbtiTypeTestById(id);
    return res.status(200).json({ success: true });  
  } catch (error) {
    return res.status(500).json({ success: false });  
  }
};


export const getDetailPersonalityItems  = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const type = req.params.type;
  
  try {
    const data = await getDetailPersonalityItemsByIdAndTestType(id, type);
    return res.status(200).json({ success: true, data });  
  } catch (error) {
    return res.status(500).json({ success: false });  
  }
};

export const updateScoreTestType   = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const { data } = req.body;

  const personalityItem = {...data, userId: splitEmail(req.user) };

  const id = parseInt(req.params.id);

  try {
    await updateScoreTypeItemsById(personalityItem, id);
    return res.status(200).json({ success: true });  
  } catch (error) {
    return res.status(500).json({ success: false });  
  }
};

export const updateMbtiTestType   = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const { data } = req.body;

  const personalityItem = {...data, userId: splitEmail(req.user) };

  const id = parseInt(req.params.id);

  try {
    await updateMbtiTypeItemsById(personalityItem, id);
    return res.status(200).json({ success: true });  
  } catch (error) {
    return res.status(500).json({ success: false });  
  }
};

export const setScoreTypeTest = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const { data } = req.body;

  const scoreTypeTest = {...data, userId: splitEmail(req.user) };

  try {
    await saveScoreTypeTest(scoreTypeTest);
    return res.status(201).json({ success: true });    
  } catch (error) {
    return res.status(500).json({ success: false }); 
  }
};

export const setMbtiTypeTest = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const { data } = req.body;

  const mbtiTypeTest = {...data, userId: splitEmail(req.user) };

  try {
    await saveMbtiTypeTest(mbtiTypeTest);
    return res.status(201).json({ success: true });    
  } catch (error) {
    return res.status(500).json({ success: false }); 
  }
};