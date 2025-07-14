import React, { FC } from 'react';
import { View } from 'react-native';
import { ViewInterfaces } from 'interfaces';
export const _View: FC<ViewInterfaces> = ({
  children,
  margins,
  paddings,
  alignItems,
  justify,
  flex,
  flexDirection,
  maxHeight,
  maxWidth,
  height,
  width,
  minHeight,
  minWidth,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        margins,
        paddings && {
          paddingTop: paddings.paddingTop,
          paddingBottom: paddings.paddingBottom,
          paddingLeft: paddings.paddingLeft,
          paddingRight: paddings.paddingRight,
          paddingHorizontal: paddings.paddingHorizontal,
          paddingVertical: paddings.paddingVertical,
          padding: paddings.padding,
        },
        alignItems && { alignItems },
        justify && { justifyContent: justify },
        flexDirection ? { flexDirection } : undefined,
        flex ? { flex } : undefined,
        maxHeight ? { maxHeight } : undefined,
        maxWidth ? { maxWidth } : undefined,
        minHeight ? { minHeight } : undefined,
        minWidth ? { minWidth } : undefined,
        height ? { height } : undefined,
        width ? { width } : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
