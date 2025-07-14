import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

export const RightArrowSvg2 = (props) => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Svg
        version='1.1'
        id='Capa_1'
        x='0px'
        y='0px'
        width={props.size}
        height={props.size}
        viewBox='0 0 451.846 451.847'
        style='enable-background:new 0 0 451.846 451.847;'
      >
        <G>
          <Path
            fill={props.color}
            d='M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744   L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284   c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z'
          />
        </G>
        <G />
        <G />
        <G />
        <G />
        <G />
        <G />
        <G />
        <G />
        <G />
        <G />
        <G />
        <G />
        <G />
        <G />
        <G />
      </Svg>
    </View>
  );
};
