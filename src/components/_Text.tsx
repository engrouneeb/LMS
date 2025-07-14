import React, { FC } from 'react';
import { Text } from 'react-native';
import { TextInterfaces } from 'interfaces';
export const _Text: FC<TextInterfaces> = ({
  children,
  color,
  size,
  fontFamily,
  margin,
  position,
  padding,
  numberOfLines,
  style,
  textAlign,
  cutText,
  alignSelf,
  width,
  onPress,
  ...props
}) => {
  return (
    <Text
      {...props}
      numberOfLines={numberOfLines}
      style={[style, margin, padding]}
    >
      {children}
    </Text>
  );
};
