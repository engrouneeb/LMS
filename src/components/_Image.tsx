import React, { FC } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';
interface ImageInterfaces extends FastImageProps {
  style: any;
  uri: any;
}
export const _Image: FC<ImageInterfaces> = ({
  style,
  uri,
  resizeMode = FastImage.resizeMode.cover,
  ...rest
}) => (
  <FastImage
    style={style}
    source={{
      uri: uri,
      priority: FastImage.priority.normal,
      cache: FastImage.cacheControl.immutable,
    }}
    resizeMode={resizeMode}
    {...rest}
  />
);
