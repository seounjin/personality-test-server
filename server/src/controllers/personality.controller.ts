import express, { Response } from "express";
import { BadParameterException, BadRequestError } from "../errors/errorhandler";
import {
  getAllPersonalityItems,
  getPersonalityItemByIdandTestType,
  getPersonalityTestResultByType,
  getMyPersonalityItemsByAuthor,
  getDetailPersonalityItemsByIdAndTestType,
  updateScoreTypeItemsById,
  saveScoreTypeTest,
  saveMbtiTypeTest,
  updateMbtiResultItemsById,
  deleteScoreTypeTestById,
  deleteMbtiTypeTestById,
  saveTrueOrFalseTypeTest,
  deleteTrueOrFalseTypeTestById,
  updateTrueOrFalseTestItemsById,
} from "../service/personality.service";
import { uploadImageFile } from "../utils/imageUpload";
import { parseTestItems } from "../utils/parseTestItems";
import { splitEmail } from "../utils/splitEmail";

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';


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
  const testType = req.query.test;

  try {
    if (typeof testType !== "string") {
      throw new BadRequestError("testType string 타입이 아님");
    }

    const data = await getPersonalityItemByIdandTestType(id, testType);

    return res.status(200).json({ success: true, data: data });

  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(error.statusCode).json({ success: false });
  }
    return res.status(500).json({ success: false });
  }
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
    if (error instanceof BadParameterException) {
      return res.status(400).json({ success: false });
    }
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
    return res.status(200).json({ success: true , data, user: req.user });
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

export const deleteTrueOrFalseTypeTest  = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const id = parseInt(req.params.id);

  try {
    await deleteTrueOrFalseTypeTestById(id);
    
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
  
  try {
    const filename = data.isChangeImage
    ? await uploadImageFile(data.basicInformationItem.imageData)
    : data.thumbnailImgUrl;
    
    const scoreTypeTest = parseTestItems(data, splitEmail(req.user), filename);
    const id = parseInt(req.params.id);

    await updateScoreTypeItemsById(scoreTypeTest, id);
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


  try {
    const filename = data.isChangeImage
    ? await uploadImageFile(data.basicInformationItem.imageData)
    : data.thumbnailImgUrl;

  const mbtiTypeTest = parseTestItems(data, splitEmail(req.user), filename);

  const id = parseInt(req.params.id);
    await updateMbtiResultItemsById(mbtiTypeTest, id);
    return res.status(200).json({ success: true });  
  } catch (error) {
    return res.status(500).json({ success: false });  
  }
};


export const updateTrueOrFalseTestType   = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const { data } = req.body;


  try {
    const filename = data.isChangeImage
    ? await uploadImageFile(data.basicInformationItem.imageData)
    : data.thumbnailImgUrl;

  const trueOrFalseTypeTest = parseTestItems(data, splitEmail(req.user), filename);

  const id = parseInt(req.params.id);
    await updateTrueOrFalseTestItemsById(trueOrFalseTypeTest, id);
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

  try {
    const filename = data.isChangeImage
    ? await uploadImageFile(data.basicInformationItem.imageData)
    : data.thumbnailImgUrl;

    const scoreTypeTest = parseTestItems(data, splitEmail(req.user), filename);
    
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


  try {

    const filename = data.isChangeImage
    ? await uploadImageFile(data.basicInformationItem.imageData)
    : data.thumbnailImgUrl;

    const mbtiTypeTest = parseTestItems(data, splitEmail(req.user), filename);

    await saveMbtiTypeTest(mbtiTypeTest);
    return res.status(201).json({ success: true });    
  } catch (error) {
    return res.status(500).json({ success: false }); 
  }
};

export const setTrueOrFalseTypeTest = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const { data } = req.body;


  try {

    const filename = data.isChangeImage
    ? await uploadImageFile(data.basicInformationItem.imageData)
    : data.thumbnailImgUrl;

    const trueOrFalseTypeTest = parseTestItems(data, splitEmail(req.user), filename);
    
    await saveTrueOrFalseTypeTest(trueOrFalseTypeTest);

    return res.status(201).json({ success: true });    
  } catch (error) {
    return res.status(500).json({ success: false }); 
  }
};

