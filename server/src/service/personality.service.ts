import {
  PersonalityModel,
} from "../models/personalityModel/personality.model";
import { mongoose } from "@typegoose/typegoose";
import {
  MbtiTypeTest,
  Personality,
  ScoreTypeTest,
} from "../models/personalityModel/personality.type";
import { detailPersonalityItemsLookup, getPersonalityItemLookup, getPersonalityItemProject, getPersonalityTestResultFilterCond, getPersonalityTestResultLookup } from "../utils/aggregation";
import { BadParameterException, NotFoundError } from "../errors/errorhandler";
import { TrueOrFalseResultItemsModel, TrueOrFalseSelectItemsModel } from "../models/personalityModel/trueOrFalseTest.model";
import { MbtiResultItemsModel, MbtiSelectItemsModel } from "../models/personalityModel/mbtiTest.model";
import { ScoreSelectItemsModel, ScoreResultItemsModel } from "../models/personalityModel/scoreTest.model";
import { AccessTokenModel } from "../models/personalityModel/accessToken.model";
import jwt from "jsonwebtoken";


export const getAllPersonalityItems = async (): Promise<Personality[]> => {
  try {
    const res = await PersonalityModel.find(
      { isPublic: true },
      { _id: 0, selectItems: 0, resultItems: 0 }
    );

    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPersonalityItemByIdandTestType = async (
  id: number,
  testType: string
) => {

  try {
    const res = await PersonalityModel.aggregate([
      {
        $match: { id: id },
      },
      ...getPersonalityItemLookup(testType),
      ...getPersonalityItemProject(),
    ]);
    
    return res[0];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPersonalityById = async (id: number) => {

  const personality = await PersonalityModel.findOne({ id: id });   
  if (!personality) throw new NotFoundError('id에 해당하는 성향테스트 데이터가 없음');
  return personality;
}

export const getPersonalityTestResultByType = async (
  id: number,
  testType: string,
  result: string
) => {
  try {
    const res = await PersonalityModel.aggregate([
      {
        $match: { id: id },
      },
      ...getPersonalityTestResultLookup(testType),
      {
        $unwind: "$items",
      },
      {
        $project: {
          resultItems: {
            $filter: {
              input: "$items.resultItems",
              cond: {
                $eq: getPersonalityTestResultFilterCond(testType, result),
              },
            },
          },
          _id: 0,
        },
      },
    ]);

    if (!res.length) {
      throw new BadParameterException('id 혹은 type이 일치하지 않음');
    }
    
    return res[0];

  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteScoreTypeTestById = async (id: number) => {
  
  try {

    const res = await PersonalityModel.findOneAndDelete({ id: id });   
    if (!res) return Promise.reject('찾으려는 문서가 없음');

    await Promise.all([
      await ScoreSelectItemsModel.findOneAndDelete({_id: res.scoreSelectItems}),
      await ScoreResultItemsModel.findOneAndDelete({_id: res.scoreResultItems}),
    ]);


  } catch (error) {
    return Promise.reject(error);
  }
}

export const deleteMbtiTypeTestById = async (id: number) => {
  
  try {

    const res = await PersonalityModel.findOneAndDelete({ id: id });   
    if (!res) return Promise.reject('찾으려는 문서가 없음');

    await Promise.all([
      await MbtiSelectItemsModel.findOneAndDelete({_id: res.mbtiSelectItems}),
      await MbtiResultItemsModel.findOneAndDelete({_id: res.mbtiResultItems}),
    ]);


  } catch (error) {
    return Promise.reject(error);
  }

}


export const deleteTrueOrFalseTypeTestById = async (id: number) => {
  
  try {

    const res = await PersonalityModel.findOneAndDelete({ id: id });   
    if (!res) return Promise.reject('찾으려는 문서가 없음');

    await Promise.all([
      await TrueOrFalseSelectItemsModel.findOneAndDelete({_id: res.trueOrFalseSelectItems}),
      await TrueOrFalseResultItemsModel.findOneAndDelete({_id: res.trueOrFalseResultItems}),
    ]);


  } catch (error) {
    return Promise.reject(error);
  }

}

export const getDetailPersonalityItemsByIdAndTestType = async (id: number, testType: string) => {

  try {
    const res = await PersonalityModel.aggregate([
      {
        $match: { id: id },
      },
      ...detailPersonalityItemsLookup(testType),
    ]);

    return res[0];
  } catch (error) {
    return Promise.reject(error);
  }

}

export const updateScoreTypeItemsById = async (
  scoreTypeTestItems: ScoreTypeTest,
  id: number,
) => {
  const {
    basicInformationItem: { title, subTitle, explain, thumbnailImgUrl },
    scoreResultItems,
    scoreSelectItems,
    isPublic,
  } = scoreTypeTestItems;

  try {
    const personality = await PersonalityModel.findOneAndUpdate(
      { id: id },
      {
        $set: {
          title: title,
          subTitle: subTitle,
          explain: explain,
          thumbnailImgUrl: thumbnailImgUrl,
          isPublic: isPublic,
        },
      },
    ).exec();
    if (!personality) return Promise.reject('찾으려는 문서가 없음');

    await ScoreSelectItemsModel.findOneAndUpdate(
      { _id: personality.scoreSelectItems },
      { $set: { selectItems: scoreSelectItems } },
    ).exec();
    await ScoreResultItemsModel.findOneAndUpdate(
      { _id: personality.scoreResultItems },
      { $set: { resultItems: scoreResultItems } },
    ).exec();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateMbtiResultItemsById = async (
  mbtiTypeTestItems: MbtiTypeTest,
  id: number,
) => {
  const {
    basicInformationItem: { title, subTitle, explain, thumbnailImgUrl },
    mbtiResultItems,
    mbtiSelectItems,
    isPublic,
  } = mbtiTypeTestItems;

  try {
    const personality = await PersonalityModel.findOneAndUpdate(
      { id: id },
      {
        $set: {
          title: title,
          subTitle: subTitle,
          explain: explain,
          thumbnailImgUrl: thumbnailImgUrl,
          isPublic: isPublic,
        },
      },
    ).exec();
    if (!personality) return Promise.reject('찾으려는 문서가 없음');

    await MbtiSelectItemsModel.findOneAndUpdate(
      { _id: personality.mbtiSelectItems },
      { $set: { selectItems: mbtiSelectItems } },
    ).exec();
    await MbtiResultItemsModel.findOneAndUpdate(
      { _id: personality.mbtiResultItems },
      { $set: { resultItems: mbtiResultItems } },
    ).exec();
  } catch (error) {
    return Promise.reject(error);
  }
};


export const updateTrueOrFalseTestItemsById = async (
  trueOrFalseTypeTestItems: any,
  id: number,
) => {
  const {
    basicInformationItem: { title, subTitle, explain, thumbnailImgUrl },
    trueOrFalseTestSelectFormItems,
    trueOrFalseTestResultFormItems,
    isPublic,
  } = trueOrFalseTypeTestItems;

  try {
    const personality = await PersonalityModel.findOneAndUpdate(
      { id: id },
      {
        $set: {
          title: title,
          subTitle: subTitle,
          explain: explain,
          thumbnailImgUrl: thumbnailImgUrl,
          isPublic: isPublic,
        },
      },
    ).exec();
    if (!personality) return Promise.reject('찾으려는 문서가 없음');

    await TrueOrFalseSelectItemsModel.findOneAndUpdate(
      { _id: personality.trueOrFalseSelectItems },
      { $set: { selectItems: trueOrFalseTestSelectFormItems } },
    ).exec();

    await TrueOrFalseResultItemsModel.findOneAndUpdate(
      { _id: personality.trueOrFalseResultItems },
      { $set: { resultItems: trueOrFalseTestResultFormItems } },
    ).exec();
    
  } catch (error) {
    return Promise.reject(error);
  }
};


export const updateAuthortoAdmin = async (author: string) => {

  try {
      await PersonalityModel.updateMany({ author: author }, {$set: { author: 'admin', isPublic: false}}).exec();

  } catch (error) {
      return Promise.reject(error)
  }
}


export const saveScoreTypeTest = async (scoreTypeTest: ScoreTypeTest) => {
  try {
    const {
      basicInformationItem: { title, subTitle, explain, thumbnailImgUrl },
      scoreResultItems,
      scoreSelectItems,
      userId,
      isPublic,
      testType,
    } = scoreTypeTest;

    const selectOptionItems = new ScoreSelectItemsModel({
      _id: new mongoose.Types.ObjectId(),
      selectItems: scoreSelectItems,
    });

    const resultItemsModel = new ScoreResultItemsModel({
      _id: new mongoose.Types.ObjectId(),
      resultItems: scoreResultItems,
    });

    const personality = new PersonalityModel({
      title: title,
      subTitle: subTitle,
      explain: explain,
      isPublic: isPublic,
      scoreSelectItems: selectOptionItems._id,
      scoreResultItems: resultItemsModel._id,
      author: userId,
      testType: testType,
      thumbnailImgUrl:thumbnailImgUrl
    });
    
    await Promise.all([
      await resultItemsModel.save(),
      await selectOptionItems.save(),
      await personality.save(),
    ]);
  } catch (error) {
    console.log("에러확인", error)
    return Promise.reject(error);
  }
};


export const saveMbtiTypeTest = async (mbtiTypeTest: MbtiTypeTest) => {
  try {
    const {
      basicInformationItem: { title, subTitle, explain, thumbnailImgUrl },
      mbtiResultItems,
      mbtiSelectItems,
      userId,
      isPublic,
      testType,
    } = mbtiTypeTest;

    const mbtiSelectOptionItems = new MbtiSelectItemsModel({
      _id: new mongoose.Types.ObjectId(),
      selectItems: mbtiSelectItems,
    });

    const resultItems = new MbtiResultItemsModel({
      _id: new mongoose.Types.ObjectId(),
      resultItems: mbtiResultItems,
    });

    const personality = new PersonalityModel({
      title: title,
      subTitle: subTitle,
      explain: explain,
      isPublic: isPublic,
      mbtiSelectItems: mbtiSelectOptionItems._id,
      mbtiResultItems: resultItems._id,
      author: userId,
      testType: testType,
      thumbnailImgUrl: thumbnailImgUrl,
    });
    
    await Promise.all([
      await mbtiSelectOptionItems.save(),
      await resultItems.save(),
      await personality.save(),
    ]);
  } catch (error) {
    return Promise.reject(error);
  }
};


export const saveTrueOrFalseTypeTest = async (trueOrFalseTypeTest: any) => {
  try {
    const {
      basicInformationItem: { title, subTitle, explain, thumbnailImgUrl },
      trueOrFalseTestSelectFormItems,
      trueOrFalseTestResultFormItems,
      userId,
      isPublic,
      testType,
    } = trueOrFalseTypeTest;

    const trueOrFalseSelectItems = new TrueOrFalseSelectItemsModel({
      _id: new mongoose.Types.ObjectId(),
      selectItems: trueOrFalseTestSelectFormItems,
    });

    const trueOrFalseResultItems = new TrueOrFalseResultItemsModel({
      _id: new mongoose.Types.ObjectId(),
      resultItems: trueOrFalseTestResultFormItems,
    });



    const personality = new PersonalityModel({
      title: title,
      subTitle: subTitle,
      explain: explain,
      isPublic: isPublic,
      trueOrFalseSelectItems: trueOrFalseSelectItems._id,
      trueOrFalseResultItems: trueOrFalseResultItems._id,
      author: userId,
      testType: testType,
      thumbnailImgUrl: thumbnailImgUrl,
    });
    
    await Promise.all([
      await trueOrFalseSelectItems.save(),
      await trueOrFalseResultItems.save(),
      await personality.save(),
    ]);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findAccessTokenById = async( id: number ) => {

  try {
    const accesstokenData = await AccessTokenModel.findOne({ id: id });   
    return accesstokenData ? accesstokenData.accessToken : null;

  } catch (error) {
    return Promise.reject(error);
  }
}

export const createAccessToken = (id: number) => {

  const token = jwt.sign(
      { id },
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY ?? '',
      { expiresIn: "1h" }
  );

  return token;
}

export const saveAccessToken = async(id: number, accessToken: string) => {

  try {
    const accessTokenItem = new AccessTokenModel({
      id: id,
      accessToken: accessToken
    });  
    await accessTokenItem.save();
  } catch (error) {
    return Promise.reject(error);
  }
  
}