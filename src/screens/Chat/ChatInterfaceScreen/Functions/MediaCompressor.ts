import {
  Image as ImageCompressor,
  Video as VideoCompressor,
} from 'react-native-compressor';

export const Media_Compressor: (
  uri: string,
  type: string
) => Promise<string> = async (uri: string, type: string) => {
  if (type === 'image')
    return await ImageCompressor.compress(uri, {
      compressionMethod: 'auto',
    });
  else
    return await VideoCompressor.compress(uri, {
      compressionMethod: 'auto',
    });
};
