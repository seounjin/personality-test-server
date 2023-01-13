import {
  PersonalityModel,
  SelectItemsModel,
  ResultItemsModel,
} from "../models/personality.model";
import { mongoose } from "@typegoose/typegoose";
import {
  OptionValuesToSelect,
  Personality,
  ResultItem,
} from "../models/personality.type";

interface BasicInformationItem {
  title: string;
  explain: string;
}

interface PersonalityItem {
  basicInformationItem: BasicInformationItem;
  typeItems: ResultItem[];
  selectItems: OptionValuesToSelect[];
}

export const setPersonalityItems = async (personalityItem: PersonalityItem) => {
  const {
    basicInformationItem: { title, explain },
    typeItems,
    selectItems,
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
  });

  try {
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
