import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

export const ChallengeCompletionSvg = (props) => {
  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }]}>
      <Svg
        version='1.1'
        id='Capa_1'
        x='0px'
        y='0px'
        width={props.size}
        height={props.size}
        viewBox='156.5 156.5 199 199'
        enable-background='new 156.5 156.5 199 199'
      >
        <G>
          <Path
            fill={props.color}
            d='M337.103,343.84v-44.453h-46.295v44.453h-11.66v-69.572h-46.295v69.572h-11.66v-57.013h-46.295v57.013H156.5v11.66h199
		v-11.66H337.103z'
          />
          <Path
            fill={props.color}
            d='M250.17,212.206v14.644h-12.186c-3.851,0-6.972,3.122-6.972,6.972v17.043h49.975v-17.043c0-3.851-3.121-6.972-6.972-6.972
		H261.83v-14.644c10.817-2.432,19.125-11.48,20.453-22.674h18.938v-11.66h-18.745v-9.711h8.633V156.5H220.89v11.66h8.633v9.71
		h-18.746v11.66h18.938C231.044,200.726,239.353,209.773,250.17,212.206z'
          />
        </G>
      </Svg>
    </View>
  );
};
