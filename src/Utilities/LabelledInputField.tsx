import React from 'react';
import { _Text, _View } from '../components';
import CommonStyles from '../screens/CommonStyles';
import { whiteThemeColors } from '../theme';
interface labelledInputField {
  title?: any;
  children?: any;
  input?: any;
}
export const LabelledInputField: React.FC<labelledInputField> = ({
  title,
  children,
  input,
}) => (
  <_View style={{ padding: 20, width: '100%' }}>
    <_Text
      style={[
        CommonStyles.className,
        {
          alignSelf: 'flex-start',
          marginLeft: 10,
          marginBottom: 4,

          color: whiteThemeColors.primaryTextColor,
        },
      ]}
    >
      {title}
    </_Text>
    <_View
      style={{
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        borderWidth: input ? 0.75 : 0,
        borderColor: whiteThemeColors.greyDark,
        width: '100%',
        backgroundColor: whiteThemeColors.white,
      }}
    >
      {children}
    </_View>
  </_View>
);
