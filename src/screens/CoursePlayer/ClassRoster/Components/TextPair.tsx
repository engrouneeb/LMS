import React from 'react';
import { _View, _Text,_VectorIcons } from 'components';
import {styles} from "./"
import { whiteThemeColors } from '../../../../Utilities/colors';
interface Props {
  label: string;
  value: string | number | undefined;
  width?: string;
  iconName?:string;
}

export const TextPair: React.FC<Props> = ({ label, value, width = '50%' ,iconName}) => (
  <_View width={width} style={{ marginBottom: 5,marginTop:2 }}>
    <_View flexDirection='row'>
    {iconName&&<_VectorIcons
          type={"MaterialCommunityIcons"}
          name={iconName}
          size={20}
          color={whiteThemeColors.primary}
          style={{marginRight:3}}
        />}
    <_Text style={styles.key}>{label}</_Text>
    </_View>
    <_Text style={[styles.value,!iconName&&{marginLeft:0}]}>{value}</_Text>
  </_View>
);
