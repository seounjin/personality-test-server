import { Request } from 'express';

type ProcessedFiles = {
  thumbnailFile: Express.MulterS3.File | undefined;
  resultImgFile: Express.MulterS3.File[];
};

export const processUploadedFiles = (req: Request): ProcessedFiles => {
  let uploadedFiles: Express.MulterS3.File[] = [];
  let thumbnailFile: Express.MulterS3.File | undefined;
  let resultImgFile: Express.MulterS3.File[] = [];

  if (req.files) {
    uploadedFiles = req.files as Express.MulterS3.File[];
    thumbnailFile = uploadedFiles.find((file) => file.key.includes('thumbnail'));
    resultImgFile = uploadedFiles.filter(
      (file: Express.MulterS3.File) => file.key.split('/')[0] === 'result',
    );
  }

  return { thumbnailFile, resultImgFile };
};