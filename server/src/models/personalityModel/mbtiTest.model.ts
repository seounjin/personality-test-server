import { prop, mongoose, getModelForClass } from "@typegoose/typegoose";

export class MbtiResultItems {
  @prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @prop({ required: true, type: Array })
  resultItems: {
    mbtiType: string;
    resultContent: string;
    explanationContent: string;
    resultImageUrl: string;
  }[];
}

export class MbtiSelectItems {
  @prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @prop({ required: true, type: Array })
  selectItems: {
    question: string;
    optionItems: {
      option: string;
      weightedScoreItems: {
        resultContent: string;
        score: number;
      }[];
    }[];
    radioButtonItems: {
      key: number;
      id: string;
      who: string;
      content: string;
    }[];
    radioButtonIndex: string;
  }[];
}


export const MbtiSelectItemsModel = getModelForClass(MbtiSelectItems);
export const MbtiResultItemsModel = getModelForClass(MbtiResultItems);
