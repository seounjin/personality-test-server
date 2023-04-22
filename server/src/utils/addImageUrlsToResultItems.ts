

interface ScoreResultItem {
    resultContent: string;
    explanationContent: string;
    resultImageUrl: string;
}

const addImageUrlsToResultItems = (items: ScoreResultItem[], imageFiles: Express.MulterS3.File[]) => {
    imageFiles.forEach((imgFile) => {
      const index = imgFile.originalname.split('_')[1].split('.')[0];
      items[parseInt(index)].resultImageUrl = imgFile.location;
    });
    return items;
  }

export default addImageUrlsToResultItems;