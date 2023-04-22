import { prop, mongoose, getModelForClass } from "@typegoose/typegoose";



export class ScoreSelectItems {
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

export class ScoreResultItems {
  @prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  resultItems: {
    type: [
      {
        resultContent: String;
        explanationContent: String;
        resultImageUrl?: String;
      },
    ];
  };
}

export const ScoreSelectItemsModel = getModelForClass(ScoreSelectItems);
export const ScoreResultItemsModel = getModelForClass(ScoreResultItems);
