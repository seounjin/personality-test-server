import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';

const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];

const s3Config = new S3Client({
    region: process.env.AWS_REGION,
    credentials:{
       accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
   }
 })

const imageUploader = multer({
    storage: multerS3({
        s3: s3Config,
        bucket: process.env.AWS_BUCKET_NAME || '',
        acl: 'public-read',
        key: (req, file, cb) => {
            const fileDirectory = file.originalname.split('_')[0];
            const fileName = `${fileDirectory}/${Date.now() + '-' + file.originalname}`;
            cb(null, fileName);
        }
    }),
    limits: { fileSize: 2 * 1024 * 1024 }, 

    fileFilter: (req, file, cb) => {
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('허용되지 않은 파일 형식입니다.'));
        }
    }
});

export default imageUploader;
