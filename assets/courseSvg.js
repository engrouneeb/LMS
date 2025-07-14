import React from 'react';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
import { _View } from '../src/components';
import { whiteThemeColors } from 'utilities';
const CourseSvg = ({ size }) => {
  return (
    <_View>
      <Svg
        id='Layer_3'
        viewBox='0 0 64 64'
        height={size ? size.toString() : '512'}
        width={size ? size.toString() : '512'}
        data-name='Layer 3'
      >
        <Rect
          fill={whiteThemeColors.primaryDark}
          height='42'
          rx='2'
          width='60'
          x='2'
          y='2'
        />
        <Path
          d='m10 40h44a4 4 0 0 1 4-4v-26a4 4 0 0 1 -4-4h-44a4 4 0 0 1 -4 4v26a4 4 0 0 1 4 4z'
          fill={whiteThemeColors.primary}
        />
        <Path
          d='m54.09 6.835a4.03 4.03 0 0 1 -.09-.835h-44a4 4 0 0 1 -4 4v26a3.982 3.982 0 0 1 2.8 1.147h43.29a2 2 0 0 0 2-2z'
          fill='#fff'
        />
        <Path
          d='m34 45.459v9.541l-4-4-4 4v-11.165a3.98 3.98 0 0 0 1.611.4 2.825 2.825 0 0 1 1.75.764 3.972 3.972 0 0 0 4.639.461z'
          fill={whiteThemeColors.primaryDark + '88'}
        />
        <Path
          d='m38 43.835v18.165l-4-4-4 4v-11l4 4v-9.54a3.964 3.964 0 0 0 .639-.46 2.825 2.825 0 0 1 1.75-.764 3.98 3.98 0 0 0 1.611-.4z'
          fill='#f0ae42'
        />
        <Path
          d='m23 38.639a2.825 2.825 0 0 1 .764 1.75 3.971 3.971 0 0 0 3.843 3.843 2.825 2.825 0 0 1 1.75.764 3.97 3.97 0 0 0 5.278 0 2.825 2.825 0 0 1 1.75-.764 3.971 3.971 0 0 0 3.843-3.843 2.825 2.825 0 0 1 .772-1.75 3.97 3.97 0 0 0 0-5.278 2.825 2.825 0 0 1 -.764-1.75 3.971 3.971 0 0 0 -3.843-3.843 2.825 2.825 0 0 1 -1.754-.768 3.97 3.97 0 0 0 -5.278 0 2.825 2.825 0 0 1 -1.75.764 3.971 3.971 0 0 0 -3.843 3.843 2.825 2.825 0 0 1 -.768 1.754 3.97 3.97 0 0 0 0 5.278z'
          fill='#d5883e'
        />
        <Circle cx='32' cy='36' fill='#f9d266' r='5' />
        <Path
          d='m27 36a4.95 4.95 0 0 0 .625 2.375 4.95 4.95 0 0 0 2.375.625 5 5 0 0 0 5-5 4.95 4.95 0 0 0 -.625-2.375 4.95 4.95 0 0 0 -2.375-.625 5 5 0 0 0 -5 5z'
          fill='#fce797'
        />
        <G fill={whiteThemeColors.primary}>
          <Path d='m23 9h18v2h-18z' fill={whiteThemeColors.primaryDark} />
          <Path d='m17 13h30v2h-30z' />
          <Path d='m13 17h38v2h-38z' />
        </G>
        <Path d='m45 35h6v2h-6z' fill='#78a0d4' />
        <Path d='m13 35h6v2h-6z' fill='#78a0d4' />
      </Svg>
    </_View>
  );
};

export default CourseSvg;
