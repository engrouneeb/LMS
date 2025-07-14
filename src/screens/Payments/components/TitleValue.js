import React from 'react';
import { StyleSheet } from 'react-native';
import { _Text, _View } from '../../../components';
import CommonStyles from '../../CommonStyles';
import { whiteThemeColors } from 'utilities';
import { Constants } from './Constants';

const TitleWithValue = ({
  title = '',
  value = '',
  titleSize = 10,
  valueSize = 11,
  titleColor = whiteThemeColors.greyDark,
  valueColor = whiteThemeColors.primary,
  toBeRed = false,
}) => {
  return (
    <_View
      style={{
        flexDirection: 'column',

        // height: '100%',
        width: '100%',
      }}
    >
      {title.length != 0 && (
        <_Text
          style={{
            fontSize: titleSize,
            color: toBeRed ? whiteThemeColors.red : titleColor,
            fontFamily: CommonStyles.fonts.semiBold,
          }}
        >
          {title}
        </_Text>
      )}
      {value.length != 0 && (
        <_Text
          numberOfLines={2}
          style={{
            fontSize: valueSize,
            color: toBeRed ? whiteThemeColors.red : valueColor,
            fontFamily: CommonStyles.fonts.medium,
          }}
        >
          {value}
        </_Text>
      )}
    </_View>
  );
};

const UserName = ({ name, toBeRed = false }) => (
  <_Text
    style={[
      styles.userNameTxt,
      { color: toBeRed ? whiteThemeColors.red : whiteThemeColors.primaryDark },
    ]}
  >
    {name}
  </_Text>
);

const Status = ({ status, toBeRed = false }) => {
  const backgroundColor = {
    [Constants.ManualRecurring]: whiteThemeColors.primaryDark,
    [Constants.ScheduledRecurring]: whiteThemeColors.green,
    [Constants.Unpaid]: '#d87f7f',
  };
  const statusWidth = {
    [Constants.ManualRecurring]: '75%',
    [Constants.ScheduledRecurring]: '87%',
    [Constants.Unpaid]: '75%',
  };
  return (
    <_View
      style={[
        {
          width: statusWidth[status],
          backgroundColor: toBeRed
            ? whiteThemeColors.red + 20
            : backgroundColor[status] + 80,
        },
        styles.statusContainer,
      ]}
    >
      <_Text
        style={[
          {
            color: toBeRed ? whiteThemeColors.red : backgroundColor[status],
          },
          styles.statusTxt,
        ]}
      >
        {status}
      </_Text>
    </_View>
  );
};

export { UserName, Status, TitleWithValue };

const styles = StyleSheet.create({
  userNameTxt: {
    fontSize: 15,
    fontFamily: CommonStyles.fonts.semiBold,
    textTransform: 'capitalize',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    borderRadius: 10,
    width: 120,
  },
  statusTxt: {
    fontSize: 10,
    fontFamily: CommonStyles.fonts.medium,
    color: 'white',
  },
});
