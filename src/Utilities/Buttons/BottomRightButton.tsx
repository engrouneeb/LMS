import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons } from '../../components';
import { whiteThemeColors } from '../../theme';
import { BottomBackButtonInterface } from '../../interfaces';
import CommonStyles from '../../screens/CommonStyles';
export const BottomRightButton: React.FC<BottomBackButtonInterface> = ({
  text,
  onPress,
  iconName,
  iconType,
  size,
  loading,
  iconSize,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.db_container,
        height: size ? size : 50,
        elevation: loading ? 0 : 5,
        width: size ? size : 140,
      }}
      disabled={loading}
      onPress={onPress}
    >
      <_Text style={styles.text}>{text ? text : ''}</_Text>
      <_VectorIcons
        name={iconName}
        type={iconType}
        size={iconSize ? iconSize : 24}
        style={{ ...styles.db_icon }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  db_container: {
    flexDirection: 'row',
    paddingLeft: 10,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.primaryDark,
    shadowColor: whiteThemeColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    borderWidth: 0.5,
    borderColor: whiteThemeColors.primary,
  },
  text: {
    fontSize: 16,
    // xmarginRight: -20,
    fontFamily: 'Montserrat-SemiBold',
    color: whiteThemeColors.white,
  },
  db_icon: {
    color: whiteThemeColors.white,
  },
  pb_container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pb_text: {
    fontSize: 12,
    paddingLeft: 15,
  },
});
