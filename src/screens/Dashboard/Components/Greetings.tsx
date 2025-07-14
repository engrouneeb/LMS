import React, { FC } from 'react';
import { isParent, whiteThemeColors } from 'utilities';
import { getGreetings, getVectorIconName } from '../Functions';
import { _Screen, _Text, _VectorIcons, _View } from '../../../components';
import { isTablet } from 'react-native-device-info';
import { StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
interface Props {
  roleName: any;
  children: any;
}

export const Greeting: FC<Props> = ({ roleName, children }) => {
  return (
    <>
      <_Text numberOfLines={1} style={styles.welcomeViewText}>
        Good
      </_Text>
      <_View
        style={{
          ...styles.welcomeViewTextBody,
          flex: isParent(roleName) ? (isTablet() ? 5 : 3) : 5,
          marginLeft: isParent(roleName) && children && !isTablet() ? 18 : 0,
        }}
      >
        <_Text numberOfLines={1} style={styles.welcomeViewText}>
          {getGreetings()}
        </_Text>
        <_VectorIcons
          type={'Ionicons'}
          name={getVectorIconName()}
          size={20}
          style={{ alignSelf: 'center' }}
          color={whiteThemeColors.greyDark}
        />
      </_View>
    </>
  );
};

const styles = StyleSheet.create({
  welcomeViewText: {
    fontSize: 20,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.greyDark,
    marginLeft: 10,
  },
  welcomeViewTextBody: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 25,
  },
});
