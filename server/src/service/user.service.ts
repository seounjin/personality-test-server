import { UserModel } from "../models/userModel/user.model";
import {
    mongoose
  } from "@typegoose/typegoose";

interface UserInformation {
    email: string;
    password: string;
}

interface SetUserItemsReturn {
    emailExistError?: boolean;
    errorMessage?: string;
    _id?: mongoose.Schema.Types.ObjectId;
}

export const setUserInformation = async(data: UserInformation): Promise<SetUserItemsReturn> => {
    const { email, password } = data;
  
    try {
        const res = await UserModel.findOne({ email: email });
        if(res){
            return Promise.reject({ emailExistError: true, errorMessage:'이미 이메일 존재함' });
        }
        const user = new UserModel({ email, password });
        return await user.save();

    } catch (error) {
        return Promise.reject({ emailExistError: false, error });
    }
}


interface ValidateUserReturn {
    validate: boolean;
    errorMessage?: string;
}


export const validateUser = async (data: UserInformation):Promise<ValidateUserReturn> => {
    const { email, password } = data;

    try {
        const user = await UserModel.findOne({ email: email }).populate("password");
        if (user){
            const dbPassword = user["password"];
            const res = await UserModel.comparePassword(password, dbPassword);
            if (res) {
                return { validate: true };
            }
            return { validate: false, errorMessage:'비밀번호가 일치하지 않음' };
        }
        return { validate: false, errorMessage:'이매알이 존재하지 않음' };

    } catch (error) {
        return Promise.reject(error);
    }
}