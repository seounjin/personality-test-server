import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import bcrypt from 'bcrypt';


@pre<User>('save', async function (next) {

  let password = this.password;
  if (this.isModified(password)) {
    return next();
  }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    this.password = hash;
    return next();

})


class User {

  public static async comparePassword(password: string, dbPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, dbPassword);
}

  @prop({ unique: true, required: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({})
  refreshToken: string;
}



export const UserModel = getModelForClass(User);
