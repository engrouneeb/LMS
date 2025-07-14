import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons } from '../../components';
import { whiteThemeColors } from '../../theme';
import { BottomBackButtonInterface } from '../../interfaces';
export const BottomLeftButton: React.FC<BottomBackButtonInterface> = ({
  text,
  onPress,
  iconName,
  iconType,
  size,
  iconSize,
}) => {
  return (
    <TouchableOpacity
      // full
      style={{
        ...styles.db_container,
        height: size ? size : 50,
        width: size ? size : text ? 140 : 50,
      }}
      onPress={onPress}
    >
      <_VectorIcons
        name={iconName}
        type={iconType}
        size={iconSize ? iconSize : 24}
        color={whiteThemeColors.primaryDark}
        style={styles.db_icon}
      />
      {text && <_Text style={styles.text}>{text}</_Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  db_container: {
    flexDirection: 'row',
    paddingLeft: 10,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 0,
    backgroundColor: whiteThemeColors.primary + '20',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: -20,
    color: whiteThemeColors.primaryTextColor,
  },
  db_icon: {
    marginLeft: 1,
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
