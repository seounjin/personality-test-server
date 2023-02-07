import { UserModel } from "../models/userModel/user.model";
import {
    mongoose
  } from "@typegoose/typegoose";

interface SetUserItemsReturn {
    emailExistError?: boolean;
    error?: string;
    _id?: mongoose.Schema.Types.ObjectId;
}

export const setUserItems = async(data: {email:string, password: string}): Promise<SetUserItemsReturn> => {
    const { email, password } = data;
  
    try {
        const res = await UserModel.findOne({email: email});
        if(res){
            return Promise.reject({ emailExistError: true, error:'이미 이메일 존재함' });
        }
        const user = new UserModel({ email, password });
        return await user.save();

    } catch (error) {
        return Promise.reject({ emailExistError: false, error });
    }
}