import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { _View } from '../../src/components';
export const AnnouncementsIcon = (props) => {
  return (
    <_View
      style={[
        StyleSheet.absoluteFill,
        { alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Svg
        version='1.1'
        id='Layer_1'
        width={props.size}
        height={props.size}
        viewBox='0 0 300 300'
        style='enable-background:new 0 0 300 300;'
      >
        <Path
          id='XMLID_1_'
          class='st0'
          fill={props.color}
          d='M253.9,174.4l-11.9-45.1c21.4-19.8-7.1-29.3-7.1-29.3l-14.1-45.4c-3.6,3.9-12,13-12,13L234.9,172  c-41.2-23.7-95-14.2-95-14.2l-7.9-32.4c0,0,45.9-24.5,76.8-57.8c0,0,8.4-9,12-13l-0.2-0.5c-7.1-13.5-21.4-4-21.4-4  c-51.4,72.8-132.2,79.1-132.2,79.1l-15,4c-15,19.8,3.2,47.5,3.2,47.5c9.5,15.8,23.7,6.3,23.7,6.3c5.5-4.7,12.7,0,12.7,0  c-1.6,31.7,26.1,64.9,26.1,64.9c23,5.5,37.2-10.3,37.2-10.3c11.1-7.9-1.6-13.5-1.6-13.5c-11.1,0-15-15-15-15  c5.5-8.7-8.7-17.4-8.7-17.4c-4-14.2,11.9-22.2,11.9-22.2c52.2-10.3,91.8,15,91.8,15C254.7,196.6,253.9,174.4,253.9,174.4z'
        />
      </Svg>
    </_View>
  );
};
