import { createThumbnail } from 'react-native-create-thumbnail';

const thumbnailUrl: (fileUrl: string) => Promise<void> = async (
  fileUrl: string
) => {
  createThumbnail({
    url: fileUrl,
  })
    .then((response: any) => response)
    .catch((err) => console.log({ err }));
};
export { thumbnailUrl };
