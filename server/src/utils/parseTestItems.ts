

export const parseTestItems = (data: any, userId: string, filename: string) => {
    return {
      ...data,
      userId: userId,
      basicInformationItem: {
        ...data.basicInformationItem,
        thumbnailImgUrl: data.isChangeImage
          ? `${process.env.IMAGE_URL}/static/${filename}`
          : filename,
      },
    };
  };
  