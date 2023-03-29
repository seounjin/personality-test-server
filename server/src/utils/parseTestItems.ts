

export const parseTestItems = (data: any, userId: string, filename: string) => {
    return {
      ...data,
      userId: userId,
      basicInformationItem: {
        ...data.basicInformationItem,
        thumbnailImgUrl: data.isChangeImage
          ? `${process.env.PROD_CORS_ORIGIN}/static/images/${filename}`
          : filename,
      },
    };
  };
  