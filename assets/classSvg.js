import React from 'react';
import {View} from 'react-native';
import Svg, {Circle, G, Path} from 'react-native-svg';
import {whiteThemeColors} from './../src/Utilities';
import {_View} from '../src/components';
const ClassSvg = ({size}) => {
  return (
    <_View>
      <Svg
        id="Flat"
        enable-background="new 0 0 64 64"
        height={size ? size.toString() : '512'}
        viewBox="0 0 64 64"
        width={size ? size.toString() : '512'}>
        <Path d="m31 3h30v33h-30z" fill={whiteThemeColors.primary + '25'} />
        <Path d="m3 32h36v4h-36z" fill="#454a6d" />
        <Path
          d="m25 32v-8l3.172 3.172c1.562 1.562 4.095 1.562 5.657 0l7.171-7.172-4-4-6 6-4.803-5.603c-.76-.887-1.869-1.397-3.037-1.397h-14.16c-2.209 0-4 1.791-4 4v9c0 2.209 1.791 4 4 4z"
          fill="#4ac3ed"
        />
        <Path
          d="m19 32h-2v-4c0-.552-.449-1-1-1h-6v-4h2v2h4c1.654 0 3 1.346 3 3z"
          fill="#31a9d4"
        />
        <Path
          d="m20 10c0 2.923-2.509 5.261-5.491 4.977-2.6-.248-4.509-2.58-4.509-5.192v-4.785c0-1.105.895-2 2-2h6c1.105 0 2 .895 2 2v1l2 4z"
          fill="#e89d43"
        />
        <Path d="m12 15 3 6 3-6z" fill="#eae8e5" />
        <Path
          d="m50 11.118-6-3-5.553 2.777-.894-1.79 6.447-3.223 6 3 5.553-2.777.894 1.79z"
          fill="#454a6d"
        />
        <Path
          d="m36.757 13h8.485v2h-8.485z"
          fill={whiteThemeColors.primaryDark}
          transform="matrix(.707 -.707 .707 .707 2.109 33.092)"
        />
        <Path d="m45 17h12v2h-12z" fill={whiteThemeColors.primary} />
        <Path d="m45 21h12v2h-12z" fill={whiteThemeColors.primaryDark} />
        <Path d="m45 25h12v2h-12z" fill={whiteThemeColors.primary} />
        <Path d="m45 29h12v2h-12z" fill={whiteThemeColors.primaryDark} />
        <G fill="#76cc7a">
          <Path
            d="m11 50c-2.761 0-5 2.239-5 5v6h10v-6c0-2.761-2.239-5-5-5z"
            fill={whiteThemeColors.primaryDark}
          />
          <Circle cx="11" cy="46" r="4" fill={whiteThemeColors.primary} />
          <Path
            d="m25 50c-2.761 0-5 2.239-5 5v6h10v-6c0-2.761-2.239-5-5-5z"
            fill={whiteThemeColors.primaryDark}
          />
          <Circle cx="25" cy="46" r="4" fill={whiteThemeColors.primary} />
          <Path
            d="m39 50c-2.761 0-5 2.239-5 5v6h10v-6c0-2.761-2.239-5-5-5z"
            fill={whiteThemeColors.primaryDark}
          />
          <Circle cx="39" cy="46" r="4" fill={whiteThemeColors.primary} />
          <Path
            d="m53 50c-2.761 0-5 2.239-5 5v6h10v-6c0-2.761-2.239-5-5-5z"
            fill={whiteThemeColors.primaryDark}
          />
          <Circle cx="53" cy="46" r="4" fill={whiteThemeColors.primary} />
        </G>
        <Path d="m5 36h32v5h-32z" fill="#33385c" />
      </Svg>
    </_View>
  );
};

export default ClassSvg;
