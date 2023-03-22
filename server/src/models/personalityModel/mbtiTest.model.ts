import { prop, mongoose, getModelForClass } from "@typegoose/typegoose";


export class MbtiResultItems {
    @prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  resultItems: { type: [{ resultContent: String; explanationContent: String }] };
}



export class MbtiSelectItems {
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
  
  
  export const MbtiSelectItemsModel = getModelForClass(MbtiSelectItems);
  export const MbtiResultItemsModel = getModelForClass(MbtiResultItems);
