import express, { Response } from "express";
import { BadParameterException, BadRequestError } from "../errors/errorhandler";
import {
  getAllPersonalityItems,
  getPersonalityItemByIdandTestType,
  getPersonalityTestResultByType,
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
  findAccessTokenById,
  createAccessToken,
  saveAccessToken,
  resetThumbnailImageById,
  resetScoreResultImageById,
  resetMbtiResultImageById,
  resetTrueOrFalseResultImageById,
} from "../service/personality.service";
import addImageUrlsToResultItems from "../utils/addImageUrlsToResultItems";
import { uploadImageFile } from "../utils/imageUpload";
import { parseMbtiTestRequestBody, parseScoreTestRequestBody, parseTrueOrFalseTestRequestBody } from "../utils/parseRequestBody";
import { parseTestItems } from "../utils/parseTestItems";
import { processUploadedFiles } from "../utils/processUploadedFiles";
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
  const testType = req.params.testType;
  const result = req.params.result;
  try {
    const data = await getPersonalityTestResultByType(id, testType, result);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    if (error instanceof BadParameterException) {
      return res.status(400).json({ success: false });
    }
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


    const {
      parsedBasicInformationItem,
      parsedScoreResultItems,
      parsedScoreSelectItems,
      parsedIsPublic,
      parsedTestType,
  } = parseScoreTestRequestBody(req.body);

  const id = parseInt(req.params.id);


  try {
    const { thumbnailFile, resultImgFile } = processUploadedFiles(req);

    const scoreTypeTest = {
      basicInformationItem: {
        ...parsedBasicInformationItem,
        thumbnailImgUrl:
          thumbnailFile?.location || parsedBasicInformationItem.thumbnailImgUrl
      }, 
      scoreResultItems: addImageUrlsToResultItems(parsedScoreResultItems, resultImgFile),
      scoreSelectItems: parsedScoreSelectItems,
      isPublic: parsedIsPublic,
      testType: parsedTestType,
      userId: splitEmail(req.user),
    };

    await updateScoreTypeItemsById(scoreTypeTest, id);

    return res.status(200).json({ success: true });  

  } catch (error) {
    return res.status(500).json({ success: false });  
  }
};

export const updateMbtiTestType = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const {
    parsedBasicInformationItem,
    parsedMbtiResultItems,
    parsedMbtiSelectItems,
    parsedIsPublic,
    parsedTestType,
  } = parseMbtiTestRequestBody(req.body);

  const id = parseInt(req.params.id);

  try {
    const { thumbnailFile, resultImgFile } = processUploadedFiles(req);

    const mbtiTypeTest = {
      basicInformationItem: {
        ...parsedBasicInformationItem,
        thumbnailImgUrl:
          thumbnailFile?.location || parsedBasicInformationItem.thumbnailImgUrl
      }, 
      mbtiResultItems: addImageUrlsToResultItems(parsedMbtiResultItems, resultImgFile),
      mbtiSelectItems: parsedMbtiSelectItems,
      isPublic: parsedIsPublic,
      testType: parsedTestType,
      userId: splitEmail(req.user),
    };
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
  const {
    parsedBasicInformationItem,
    parsedTrueOrFalseResultItems,
    parsedTrueOrFalseSelectItems,
    parsedIsPublic,
    parsedTestType,
  } = parseTrueOrFalseTestRequestBody(req.body);
  const id = parseInt(req.params.id);

  try {
    const { thumbnailFile, resultImgFile } = processUploadedFiles(req);

    const trueOrFalseTypeTest = {
      basicInformationItem: {
        ...parsedBasicInformationItem,
        thumbnailImgUrl:
          thumbnailFile?.location || parsedBasicInformationItem.thumbnailImgUrl
      }, 
      trueOrFalseTestResultFormItems: addImageUrlsToResultItems(parsedTrueOrFalseResultItems, resultImgFile),
      trueOrFalseTestSelectFormItems: parsedTrueOrFalseSelectItems,
      isPublic: parsedIsPublic,
      testType: parsedTestType,
      userId: splitEmail(req.user),
    };

    await updateTrueOrFalseTestItemsById(trueOrFalseTypeTest, id);
    return res.status(200).json({ success: true });  
  } catch (error) {
    return res.status(500).json({ success: false });  
  }
};

export const setMbtiTypeTest = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {

  const {
    parsedBasicInformationItem,
    parsedMbtiResultItems,
    parsedMbtiSelectItems,
    parsedIsPublic,
    parsedTestType,
  } = parseMbtiTestRequestBody(req.body);

  try {
    const { thumbnailFile, resultImgFile } = processUploadedFiles(req);

    const mbtiTypeTest = {
      basicInformationItem: {
        ...parsedBasicInformationItem,
        thumbnailImgUrl:
          thumbnailFile?.location || parsedBasicInformationItem.thumbnailImgUrl
      }, 
      mbtiResultItems: addImageUrlsToResultItems(parsedMbtiResultItems, resultImgFile),
      mbtiSelectItems: parsedMbtiSelectItems,
      isPublic: parsedIsPublic,
      testType: parsedTestType,
      userId: splitEmail(req.user),
    };
   
    console.log("mbtiTypeTest", mbtiTypeTest)
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

  const {
    parsedBasicInformationItem,
    parsedTrueOrFalseResultItems,
    parsedTrueOrFalseSelectItems,
    parsedIsPublic,
    parsedTestType,
  } = parseTrueOrFalseTestRequestBody(req.body);

  try {
    const { thumbnailFile, resultImgFile } = processUploadedFiles(req);

    const trueOrFalseTypeTest = {
      basicInformationItem: {
        ...parsedBasicInformationItem,
        thumbnailImgUrl:
          thumbnailFile?.location || parsedBasicInformationItem.thumbnailImgUrl
      }, 
      trueOrFalseTestResultFormItems: addImageUrlsToResultItems(parsedTrueOrFalseResultItems, resultImgFile),
      trueOrFalseTestSelectFormItems: parsedTrueOrFalseSelectItems,
      isPublic: parsedIsPublic,
      testType: parsedTestType,
      userId: splitEmail(req.user),
    };

    await saveTrueOrFalseTypeTest(trueOrFalseTypeTest);

    return res.status(201).json({ success: true });    
  } catch (error) {
    return res.status(500).json({ success: false }); 
  }
};


export const getAccessToken = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {

  const id = parseInt(req.params.id);

  try {
    const accessToken = await findAccessTokenById(id)

    if (accessToken) {
      return res.status(201).json({ success: true, accessToken: accessToken});    
    }

    const newAccessToken = await createAccessToken(id);

    await saveAccessToken(id, newAccessToken);

    return res.status(201).json({ success: true, accessToken: newAccessToken });    
  } catch (error) {
    return res.status(500).json({ success: false }); 
  }
};



export const setScoreTypeTest = async (
  req: express.Request,
  res: express.Response,
): Promise<Response> => {
    const {
      parsedBasicInformationItem,
      parsedScoreResultItems,
      parsedScoreSelectItems,
      parsedIsPublic,
      parsedTestType,
  } = parseScoreTestRequestBody(req.body);

  
  try {
    const { thumbnailFile, resultImgFile } = processUploadedFiles(req);

    const scoreTypeTest = {
      basicInformationItem: {
        ...parsedBasicInformationItem,
        thumbnailImgUrl:
          thumbnailFile?.location || parsedBasicInformationItem.thumbnailImgUrl
      }, 
      scoreResultItems: addImageUrlsToResultItems(parsedScoreResultItems, resultImgFile),
      scoreSelectItems: parsedScoreSelectItems,
      isPublic: parsedIsPublic,
      testType: parsedTestType,
      userId: splitEmail(req.user),
    };

    await saveScoreTypeTest(scoreTypeTest);

    return res.status(201).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

export const deleteThumbnailImage = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {

  const id = parseInt(req.params.id);
  
  try {
    await resetThumbnailImageById(id);
    return res.status(201).json({ success: true });    
  } catch (error) {
    return res.status(500).json({ success: false }); 
  }
};

export const deleteScoreResultImage = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const { index } = req.query;
  const id = parseInt(req.params.id);
  try {
    await resetScoreResultImageById(id, parseInt(index as string));
    return res.status(201).json({ success: true });    
  } catch (error) {
    return res.status(500).json({ success: false }); 
  }
};

export const deleteMbtiResultImage = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const { index } = req.query;
  const id = parseInt(req.params.id);
  try {
    await resetMbtiResultImageById(id, parseInt(index as string));
    return res.status(201).json({ success: true });    
  } catch (error) {
    return res.status(500).json({ success: false }); 
  }
};

export const deleteTrueOrFalseResultImage = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  const { index } = req.query;
  const id = parseInt(req.params.id);
  try {
    await resetTrueOrFalseResultImageById(id, parseInt(index as string));
    return res.status(201).json({ success: true });    
  } catch (error) {
    return res.status(500).json({ success: false }); 
  }
};