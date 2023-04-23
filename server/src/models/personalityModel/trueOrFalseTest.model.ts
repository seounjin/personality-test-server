import { prop, mongoose, getModelForClass } from "@typegoose/typegoose";

export class TrueOrFalseSelectItems {
  @prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @prop({ required: true, type: Array })
  selectItems: {
    question: string;
    optionItems: {
      option: string;
    }[];
  }[];
}


export class TrueOrFalseResultItems {
  @prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @prop({ required: true, type: Array })
  resultItems: {
    selectedOptionNumber: string;
    resultContent: string;
    explanationContent: string;
    resultImageUrl: string;
    selectedOption: {
      questionNumber: number;
      question: string;
      optionId: string;
      option: string;
      optionNumber: number;
    }[];
  }[];
}

export const TrueOrFalseSelectItemsModel = getModelForClass(TrueOrFalseSelectItems);
export const TrueOrFalseResultItemsModel = getModelForClass(TrueOrFalseResultItems);

  
  