import { AutoIncrementID } from "@typegoose/auto-increment";
import {
  prop,
  plugin,
  mongoose,
  getModelForClass,
  Ref,
} from "@typegoose/typegoose";
import { TrueOrFalseResultItems, TrueOrFalseSelectItems } from "./trueOrFalseTest.model";

class SelectItems {
  @prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  selectItems: {
    type: [
      {
        question: String;
        optionItems: [
          {
            option: String;
            weightedScoreItems: [{ resultContent: String; score: Number }];
          }
        ];
      }
    ];
  };
}

class MbtiSelectItems {
  @prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  selectItems: {
    type: [
      {
        question: String;
        optionItems: [
          {
            option: String;
            weightedScoreItems: [{ resultContent: String; score: Number }];
          }
        ];
        radioButtonItems: [{
          key: number;
          id: string;
          who: string;
          content: string
        }]
        radioButtonIndex: string;
      }
    ];
  };
}


class ResultItems {
  @prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  resultItems: { type: [{ resultContent: String; explanationContent: String }] };
}

@plugin(AutoIncrementID, { field: "id", startAt: 1 })
class Personality {
  @prop({ unique: true })
  id: number;

  @prop({ required: true })
  title: string;

  @prop({ required: true })
  subTitle: string;

  @prop({ required: true })
  explain: string;

  @prop({ required: true })
  author: string;

  @prop({ required: true })
  isPublic: boolean;

  @prop({ required: true })
  testType: string;

  @prop({ required: true })
  thumbnailImgUrl: string;

  @prop({ ref: SelectItems })
  selectItems?: Ref<SelectItems>;

  @prop({ ref: ResultItems })
  resultItems?: Ref<ResultItems>;

  @prop({ ref: MbtiSelectItems })
  mbtiSelectItems?: Ref<MbtiSelectItems>;  

  @prop({ ref: TrueOrFalseSelectItems })
  trueOrFalseSelectItems?: Ref<TrueOrFalseSelectItems>;  

  @prop({ ref: TrueOrFalseResultItems })
  trueOrFalseResultItems?: Ref<TrueOrFalseResultItems>;  
}


export const PersonalityModel = getModelForClass(Personality);
export const SelectItemsModel = getModelForClass(SelectItems);
export const ResultItemsModel = getModelForClass(ResultItems);
export const MbtiSelectItemsModel = getModelForClass(MbtiSelectItems);
