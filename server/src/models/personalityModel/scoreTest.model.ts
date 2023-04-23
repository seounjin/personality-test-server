import { prop, mongoose, getModelForClass } from "@typegoose/typegoose";


export class ScoreSelectItems {
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
  }[];
}

export class ScoreResultItems {
  @prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @prop({ required: true, type: Array })
  resultItems: {
    resultContent: string;
    explanationContent: string;
    resultImageUrl: string;
  }[];
}

export const ScoreSelectItemsModel = getModelForClass(ScoreSelectItems);
export const ScoreResultItemsModel = getModelForClass(ScoreResultItems);
