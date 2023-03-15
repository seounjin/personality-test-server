import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const parseJson = (imageDataToJsonStringfy:string) => JSON.parse(imageDataToJsonStringfy);

const getFileType = (imgData:string) => imgData.substring("data:image/".length, imgData.indexOf(";base64"));

const getBase64Data = (imgData:string) => imgData.split('base64,')[1];

const writeImageFile = async(base64Data: string, fileType: string) => {

    const fileName = "imgfile" + Date.now() + '.' + fileType;
    const filePath = path.join(__dirname ,"../public/images" , fileName);
    const writeFile = promisify(fs.writeFile);
    await writeFile(filePath, base64Data, { encoding: 'base64' });
    return fileName;
}

export const uploadImageFile = async(imageDataToJsonStringfy: string) => {

    try {
        const imgData = parseJson(imageDataToJsonStringfy);
        const fileType = getFileType(imgData.imageData);
        const base64Data = getBase64Data(imgData.imageData);
        return await writeImageFile(base64Data, fileType);
    } catch (error) {
        throw new Error();
    }
}
