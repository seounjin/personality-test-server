import { prop, mongoose, getModelForClass } from "@typegoose/typegoose";

export class TrueOrFalseSelectItems {
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
            }
          ];
        }
      ];
    };
}


export class TrueOrFalseResultItems {
    @prop({ required: true })
    _id: mongoose.Schema.Types.ObjectId;
  
    @prop({ required: true })
    resultItems: {
      type: [
        {
          selectedOptionNumber: string;
          resultContent: string;
          explanationContent: string;
          resultImageUrl: String;
          selectedOption: [
            {
              qusetionNumber: number;
              question: string;
              optionId: string;
              option: string;
              optionNumber: number;
            },
          ];
        },
      ];
    };
}

export const TrueOrFalseSelectItemsModel = getModelForClass(TrueOrFalseSelectItems);
export const TrueOrFalseResultItemsModel = getModelForClass(TrueOrFalseResultItems);

  
  