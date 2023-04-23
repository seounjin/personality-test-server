import { S3Client, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { IMAGE_DOMAIN } from '../const';

const s3Config = new S3Client({
    region: process.env.AWS_REGION,
    credentials:{
       accessKeyId: process.env.AWS_S3_IMAGE_ACCESS_KEY_ID || '',
       secretAccessKey: process.env.AWS_S3_IMAGE_SECRET_ACCESS_KEY || ''
   }
 })


export const deleteImagesFromS3 = async (imagePaths: Array<string>) => {
    try {
        
      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Delete: {
          Objects: imagePaths.map((path) => ({ Key: path })),
        },
      };
  
      const deleteResult = await s3Config.send(new DeleteObjectsCommand(deleteParams));
      return deleteResult;
    } catch (error) {
      console.error("s3 이미지 삭제 실패", error);
      throw error;
    }
};

export const parseS3Url = (s3Url: string): {bucketName: string, imagePath: string} => {
    const regex = /^https:\/\/(.+?)\..+?\/(.+)$/;
    const match = s3Url.match(regex);

    if (!match) {
      return {
        bucketName: '',
        imagePath: '',
      };
    }
   
    return {
      bucketName: match[1],
      imagePath: match[2],
    };
};
    
export const isValidS3ImageUrl = (imgSrc: string) => {
  return imgSrc.startsWith(IMAGE_DOMAIN);
};
