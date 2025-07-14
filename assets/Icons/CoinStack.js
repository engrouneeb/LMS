import Svg, { G, Polygon, Rect } from 'react-native-svg';

import React from 'react';
import { StyleSheet, View } from 'react-native';

export const CoinStack = (props) => {
  return (
    <View
      style={[
        // StyleSheet.absoluteFill,
        { alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Svg
        version='1.1'
        id='Layer_1'
        x='0px'
        y='0px'
        width={props.size}
        height={props.size}
        viewBox='0 0 200 200'
        enable-background='new 0 0 200 200'
      >
        <G>
          <Polygon
            fill={props.color}
            points='198.417,199.774 0.25,199.774 0.25,0.417 17.875,0.417 17.875,182.148 198.417,182.148  '
          />
        </G>
        <Rect
          x='36.001'
          y='61.563'
          fill={props.color}
          width='29.082'
          height='101.345'
        />
        <Rect
          x='79.625'
          y='0.417'
          fill={props.color}
          width='29.083'
          height='162.491'
        />
        <Rect
          x='125.45'
          y='61.563'
          fill={props.color}
          width='29.082'
          height='101.345'
        />
        <Rect
          x='170.836'
          y='110.032'
          fill={props.color}
          width='29.081'
          height='52.876'
        />
      </Svg>
    </View>
  );
};
