import {
  PersonalityModel,
  SelectItemsModel,
  ResultItemsModel,
} from "../models/personalityModel/personality.model";
import { mongoose } from "@typegoose/typegoose";
import {
  OptionValuesToSelect,
  Personality,
  ResultItem,
} from "../models/personalityModel/personality.type";

interface BasicInformationItem {
  title: string;
  explain: string;
}

interface PersonalityItem {
  basicInformationItem: BasicInformationItem;
  typeItems: ResultItem[];
  selectItems: OptionValuesToSelect[];
  userId: string;
}

export const setPersonalityItems = async (personalityItem: PersonalityItem) => {
  try {

    const {
      basicInformationItem: { title, explain },
      typeItems,
      selectItems,
      userId,
    } = personalityItem;

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
      selectItems: selectOptionItems._id,
      resultItems: resultItems._id,
      author: userId,
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

export const getAllPersonalityItems = async (): Promise<Personality[]> => {
  try {
    const res = await PersonalityModel.find(
      {},
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

export const getPersonalityTestResultByType = async (
  id: number,
  type: string
) => {
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
};



export const getMyPersonalityItems = async (author:string): Promise<Personality[]> => {

  try {
    const res = await PersonalityModel.find(
      {author: author},
      { _id: 0, selectItems: 0, resultItems: 0 }
    );

    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePersonalityItems = async (id: number) => {
  
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

export const getDetailPersonalityItemsById = async (id: number) => {
  
  try {

    const personality = await PersonalityModel.findOne({ id: id });   
    if (!personality) return Promise.reject('찾으려는 문서가 없음');

    const selectItems = await SelectItemsModel.findOne({ _id: personality.selectItems }, {_id:0});   
    const resultItems = await ResultItemsModel.findOne({ _id: personality.resultItems }, {_id:0});   
    
    return { basicInformationItems: { title: personality.title, explain: personality.explain }, selectItems,  resultItems}
  } catch (error) {
    return Promise.reject(error);
  }

}


export const updatePersonalityItemsById =  async (personalityItem: PersonalityItem, id: number) => {

  const {
    basicInformationItem: { title, explain },
    typeItems,
    selectItems,
  } = personalityItem;

  try {

    const personality = await PersonalityModel.findOneAndUpdate({ id: id }, {$set: { title: title, explain: explain}}).exec();   
    if (!personality) return Promise.reject('찾으려는 문서가 없음');

    await SelectItemsModel.findOneAndUpdate({ _id: personality.selectItems }, {$set: { selectItems: selectItems}}).exec();   
    await ResultItemsModel.findOneAndUpdate({ _id: personality.resultItems }, {$set: { resultItems: typeItems}}).exec();   
    
  } catch (error) {
    return Promise.reject(error);
  }

}

export const updateAuthortoAdmin = async (author: string) => {

  try {
      await PersonalityModel.updateMany({ author: author }, {$set: { author: 'admin', public: false}}).exec();

  } catch (error) {
      return Promise.reject(error)
  }
}