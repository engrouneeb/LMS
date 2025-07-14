import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

export const NotificationSvg = (props) => {
  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }]}>
      <Svg
        version='1.1'
        id='Capa_1'
        x='0px'
        y='0px'
        width={props.size}
        height={props.size}
        viewBox='0 227.5 480 527'
        enable-background='new 0 227.5 480 527'
      >
        <G>
          <Path
            fill={props.color}
            d='M438.574,654.86l-34.34-57.24c-15.86-26.42-24.24-56.68-24.24-87.479V460c0-63.3-42.24-116.84-100-134.1V290
		c0-22.061-17.94-40-40-40c-22.061,0-40,17.94-40,40V325.9c-57.759,17.26-100,70.8-100,134.1v50.141c0,30.8-8.38,61.039-24.22,87.46
		l-34.34,57.24c-1.86,3.101-1.9,6.94-0.12,10.08c1.78,3.14,5.08,5.08,8.68,5.08h380c3.6,0,6.919-1.939,8.699-5.06
		C440.474,661.82,440.414,657.94,438.574,654.86z'
          />
          <Path
            fill={props.color}
            d='M239.994,730c27.819,0,51.7-16.44,62.98-40H177.014C188.294,713.56,212.174,730,239.994,730z'
          />
        </G>
      </Svg>
    </View>
  );
};
