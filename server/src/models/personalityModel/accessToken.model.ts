import { prop, getModelForClass } from "@typegoose/typegoose";

export class AccessTokenSchema {

  @prop({ required: true })
  id: number

  @prop({ required: true })
  accessToken: string

  @prop({ default: Date.now, expires: '1h' })
  createdAt: Date;
}

export const AccessTokenModel = getModelForClass(AccessTokenSchema);

