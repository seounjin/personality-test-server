import {
  PersonalityModel,
  SelectItemsModel,
  ResultItemsModel,
  MbtiSelectItemsModel,
} from "../models/personalityModel/personality.model";
import { mongoose } from "@typegoose/typegoose";
import {
  MbtiTypeTest,
  OptionValuesToSelect,
  Personality,
  ResultItem,
  ScoreTypeTest,
} from "../models/personalityModel/personality.type";
import { detailPersonalityItemsLookup } from "../utils/aggregation";

interface BasicInformationItem {
  title: string;
  explain: string;
}

interface PersonalityItem {
  basicInformationItem: BasicInformationItem;
  typeItems: ResultItem[];
  selectItems: OptionValuesToSelect[];
  userId: string;
  isPublic: boolean
  testType: string;
}


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

export const getPersonalityItemById = async (
  id: number
): Promise<PersonalityItem> => {
  try {
    const res = await PersonalityModel.aggregate([
      {
        $match: { id: id },
      },
      {
        $lookup: {
          from: "selectitems",
          let: { selectItemsId: "$selectItems" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$selectItemsId"] } } },
            { $project: { _id: 0 } },
          ],
          as: "items",
        },
      },

      {
        $project: {
          _id: 0,
          id: 1,
          title: 1,
          explain: 1,
          items: 1,
        },
      },
    ]);
    return res[0];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPersonalityById = async (id: number) => {

  const personality = await PersonalityModel.findOne({ id: id });   
  if (!personality) return Promise.reject({ status: 404, error: 'id에 해당하는 성향테스트 데이터가 없음' });
  return personality;
}

export const getPersonalityTestResultByType = async (
  id: number,
  type: string
) => {
  try {
    const res = await PersonalityModel.aggregate([
      {
        $match: { id: id },
      },
      {
        $lookup: {
          from: "resultitems",
          let: { resultItemsId: "$resultItems" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$resultItemsId"],
                },
              },
            },
          ],
          as: "items",
        },
      },
      {
        $unwind: "$items",
      },
      {
        $project: {
          resultItems: {
            $filter: {
              input: "$items.resultItems",
              cond: {
                $eq: ["$$this.typeContent", type],
              },
            },
          },
          _id: 0,
        },
      },
    ]);
    return res[0];
  } catch (error) {
    return Promise.reject(error);
  }
};



export const getMyPersonalityItemsByAuthor = async (author:string): Promise<Personality[]> => {

  try {
    const res = await PersonalityModel.find(
      { author: author },
      { _id: 0, selectItems: 0, resultItems: 0, mbtiSelectItems: 0, isPublic: 0 }
    );

    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteScoreTypeTestById = async (id: number) => {
  
  try {

    const res = await PersonalityModel.findOneAndDelete({ id: id });   
    if (!res) return Promise.reject('찾으려는 문서가 없음');

    await Promise.all([
      await SelectItemsModel.findOneAndDelete({_id: res.selectItems}),
      await ResultItemsModel.findOneAndDelete({_id: res.resultItems}),
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
      await MbtiSelectItemsModel.findOneAndDelete({_id: res.selectItems}),
      await ResultItemsModel.findOneAndDelete({_id: res.resultItems}),
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


export const updateScoreTypeItemsById =  async (scoreTypeTestItems: PersonalityItem, id: number) => {

  const {
    basicInformationItem: { title, explain },
    typeItems,
    selectItems,
    isPublic,
  } = scoreTypeTestItems;

  try {

    const personality = await PersonalityModel.findOneAndUpdate({ id: id }, {$set: { title: title, explain: explain, isPublic: isPublic }}).exec();   
    if (!personality) return Promise.reject('찾으려는 문서가 없음');

    await SelectItemsModel.findOneAndUpdate({ _id: personality.selectItems }, {$set: { selectItems: selectItems}}).exec();   
    await ResultItemsModel.findOneAndUpdate({ _id: personality.resultItems }, {$set: { resultItems: typeItems}}).exec();   
    
  } catch (error) {
    return Promise.reject(error);
  }
}

export const updateMbtiTypeItemsById =  async (mbtiTypeTestItems: MbtiTypeTest, id: number) => {

  const {
    basicInformationItem: { title, explain },
    mbtiTypeItems,
    mbtiSelectItems,
    isPublic,
  } = mbtiTypeTestItems;

  try {

    const personality = await PersonalityModel.findOneAndUpdate({ id: id }, {$set: { title: title, explain: explain, isPublic: isPublic }}).exec();   
    if (!personality) return Promise.reject('찾으려는 문서가 없음');

    await MbtiSelectItemsModel.findOneAndUpdate({ _id: personality.selectItems }, {$set: { selectItems: mbtiSelectItems}}).exec();   
    await ResultItemsModel.findOneAndUpdate({ _id: personality.resultItems }, {$set: { resultItems: mbtiTypeItems}}).exec();   
    
  } catch (error) {
    return Promise.reject(error);
  }
}

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
      basicInformationItem: { title, explain },
      typeItems,
      selectItems,
      userId,
      isPublic,
      testType
    } = scoreTypeTest;

    const selectOptionItems = new SelectItemsModel({
      _id: new mongoose.Types.ObjectId(),
      selectItems: selectItems,
    });

    const resultItems = new ResultItemsModel({
      _id: new mongoose.Types.ObjectId(),
      resultItems: typeItems,
    });

    const personality = new PersonalityModel({
      title: title,
      explain: explain,
      isPublic: isPublic,
      selectItems: selectOptionItems._id,
      resultItems: resultItems._id,
      author: userId,
      testType: testType,
    });
    
    await Promise.all([
      await resultItems.save(),
      await selectOptionItems.save(),
      await personality.save(),
    ]);
  } catch (error) {
    return Promise.reject(error);
  }
};


export const saveMbtiTypeTest = async (mbtiTypeTest: MbtiTypeTest) => {
  try {
    const {
      basicInformationItem: { title, explain },
      mbtiTypeItems,
      mbtiSelectItems,
      userId,
      isPublic,
      testType
    } = mbtiTypeTest;

    const mbtiSelectOptionItems = new MbtiSelectItemsModel({
      _id: new mongoose.Types.ObjectId(),
      selectItems: mbtiSelectItems,
    });

    const resultItems = new ResultItemsModel({
      _id: new mongoose.Types.ObjectId(),
      resultItems: mbtiTypeItems,
    });

    const personality = new PersonalityModel({
      title: title,
      explain: explain,
      isPublic: isPublic,
      mbtiSelectItems: mbtiSelectOptionItems._id,
      resultItems: resultItems._id,
      author: userId,
      testType: testType,
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