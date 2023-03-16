import { UserModel } from "../models/userModel/user.model";
import {
    mongoose
  } from "@typegoose/typegoose";
import { ConflictError } from "../errors/errorhandler";

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
    const res = await UserModel.findOne({ email: email });
    if(res) {
        throw new ConflictError('이미 이메일이 존재함');
    }
    const user = new UserModel({ email, password });
    return await user.save();
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

export const saveRefreshToken = async (email: string, token: string) => {

    try {
        await UserModel.findOneAndUpdate({ email: email}, { refreshToken: token }).exec();
    } catch (error) {
        return Promise.reject(error);
    }

} 

export const deleteRefreshToken = async (token: string) => {

    try {
        await UserModel.findOneAndUpdate({ refreshToken: token}, { refreshToken: '' }).exec();
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteUserInformation = async (email: string) => {

    try {
        await UserModel.findOneAndDelete({ email: email});
    } catch (error) {
        return Promise.reject(error);
    }

}

interface UserItem {
    email: string;
    password: string;
    refreshToken: string;
}

export const findUserInformationByEmail = async (email: string): Promise<UserItem | null> => {

    try {
        return await UserModel.findOne({ email: email });
    } catch (error) {
        return Promise.reject(error);
    }
}
