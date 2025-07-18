import React from 'react';
import { StyleSheet } from 'react-native';
import { _Text, _View } from '../../../components';
import CommonStyles from '../../CommonStyles';

const AvatarOnly = ({ name, size, backgroundColor, textColor, textSize }) => {
  return (
    <_View
      style={[
        styles.avatarContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 3,
          backgroundColor: backgroundColor,
        },
      ]}
    >
      {name && (
        <_Text
          style={[
            styles.avatarTxt,

            {
              fontSize: textSize,
              color: textColor,
            },
          ]}
        >
          {`${name[0]}${name.split(' ')[1][0]}`}
        </_Text>
      )}
    </_View>
  );
};

export { AvatarOnly };

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarTxt: {
    textTransform: 'uppercase',
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
