

export const parseTestItems = (data: any, userId: string, filename: string) => {
    return {
      ...data,
      userId: userId,
      basicInformationItem: {
        ...data.basicInformationItem,
        thumbnailImgUrl: data.isChangeImage
          ? `http://localhost:8080/static/images/${filename}`
          : filename,
      },
    };
  };
  