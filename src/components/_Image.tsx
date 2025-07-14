import React, { FC } from 'react';
import { Image } from 'react-native';
//import FastImage, { FastImageProps } from 'react-native-fast-image';
interface ImageInterfaces {
  style: any;
  uri: any;
}
export const _Image: FC<ImageInterfaces> = ({
  style,
  uri,
  ...rest
}) => (
  <Image
    style={style}
    source={{
      uri: uri,
    }}
    {...rest}
  />
);
