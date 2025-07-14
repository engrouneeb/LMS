import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G, Polygon } from 'react-native-svg';

export const RIghtArrowSvg = (props) => {
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
        viewBox='0 0 297 297'
        style='enable-background:new 0 0 297 297;'
        width={props.size}
        height={props.size}
      >
        <G>
          <Polygon
            fill={props.color}
            points='33,66 0,66 66,148 0,231 33,231 99,148  '
          />
          <Polygon
            fill={props.color}
            points='83,66 50,66 116,148 50,231 83,231 149,148  '
          />
          <Polygon
            fill={props.color}
            points='133,66 100,66 166,148 100,231 133,231 199,148  '
          />
          <Polygon
            fill={props.color}
            points='231,66 149,66 215,148 149,231 231,231 297,148  '
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
