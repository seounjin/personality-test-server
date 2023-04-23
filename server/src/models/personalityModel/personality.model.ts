import { AutoIncrementID } from "@typegoose/auto-increment";
import {
  prop,
  plugin,
  getModelForClass,
  Ref,
} from "@typegoose/typegoose";
import { MbtiResultItems, MbtiSelectItems } from "./mbtiTest.model";
import { ScoreSelectItems, ScoreResultItems } from "./scoreTest.model";
import { TrueOrFalseResultItems, TrueOrFalseSelectItems } from "./trueOrFalseTest.model";


@plugin(AutoIncrementID, { field: "id", startAt: 1 })
export class Personality {
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

  @prop({ ref: ScoreSelectItems })
  scoreSelectItems?: Ref<ScoreSelectItems>;

  @prop({ ref: ScoreResultItems })
  scoreResultItems?: Ref<ScoreResultItems>;

  @prop({ ref: MbtiSelectItems })
  mbtiSelectItems?: Ref<MbtiSelectItems>;  

  @prop({ ref: MbtiResultItems })
  mbtiResultItems?: Ref<MbtiResultItems>;  

  @prop({ ref: TrueOrFalseSelectItems })
  trueOrFalseSelectItems?: Ref<TrueOrFalseSelectItems>;  

  @prop({ ref: TrueOrFalseResultItems })
  trueOrFalseResultItems?: Ref<TrueOrFalseResultItems>;  
}


export const PersonalityModel = getModelForClass(Personality);
