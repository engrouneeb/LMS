import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

export const SetupSvg = (props) => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Svg
        version='1.1'
        x='0px'
        y='0px'
        viewBox='0 0 1000 1000'
        enable-background='new 0 0 1000 1000'
        width={props.size}
        height={props.size}
      >
        <G fill={props.color}>
          <Path
            fill={props.color}
            d='M220,885V675h70V535h-70V115H80v420H10v140h70v210H220z M570,885V395h70V255h-70V115H430v140h-70v140h70v490H570z M990,675V535h-70V115H780v420h-70v140h70v210h140V675H990z'
          />
        </G>
      </Svg>
    </View>
  );
};
