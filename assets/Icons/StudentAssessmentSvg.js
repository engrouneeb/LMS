import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const StudentAssessmentSvg = (props) => {
  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }]}>
      <Svg
        id='Layer_1'
        data-name='Layer 1'
        viewBox='0 0 50 50'
        height={props.size}
        width={props.size}
      >
        <Path
          fill={props.color}
          d='M41.86,4.18H35.69V1.78a1.64,1.64,0,0,0-3.27,0v2.4H26.54V1.78a1.64,1.64,0,0,0-3.27,0v2.4H17.39V1.78a1.64,1.64,0,0,0-3.27,0v2.4H7.94A1.63,1.63,0,0,0,6.31,5.82V48.29a1.63,1.63,0,0,0,1.63,1.64H41.86a1.63,1.63,0,0,0,1.63-1.64V5.82a1.63,1.63,0,0,0-1.63-1.64ZM40.23,46.66H9.58V7.45h4.54V9.36a1.64,1.64,0,0,0,3.27,0V7.45h5.88V9.36a1.64,1.64,0,0,0,3.27,0V7.45h5.88V9.36a1.64,1.64,0,0,0,3.27,0V7.45h4.54V46.66Z'
        />
        <Path
          fill={props.color}
          d='M15.23,18.42a1.63,1.63,0,0,0,0,3.26H34.57a1.63,1.63,0,1,0,0-3.26Z'
        />
        <Path
          fill={props.color}
          d='M34.57,27.57H15.23a1.63,1.63,0,0,0,0,3.26H34.57a1.63,1.63,0,1,0,0-3.26Z'
        />
        <Path
          fill={props.color}
          d='M34.57,36.72H15.23a1.63,1.63,0,0,0,0,3.26H34.57a1.63,1.63,0,1,0,0-3.26Z'
        />
      </Svg>
    </View>
  );
};
