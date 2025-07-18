import React from 'react';
import {
  _Text,
  _View,
  _TextInput,
  _VectorIcons,
} from '../../../../../../components';
import { whiteThemeColors } from '../../../../../../Utilities';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CommonStyles from '../../../../../../screens/CommonStyles';

export const ShipmentCheck = ({ setIsShipmentNeeded, IsShipmentNeeded }) => {
  return (
    <_View style={styles.checkContainer}>
      <TouchableOpacity onPress={() => setIsShipmentNeeded(!IsShipmentNeeded)}>
        <_VectorIcons
          type={'MaterialCommunityIcons'}
          name={IsShipmentNeeded ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={24}
          color={
            IsShipmentNeeded
              ? whiteThemeColors.primary
              : whiteThemeColors.greyDark + 80
          }
        />
      </TouchableOpacity>
      <_Text style={styles.text}>{'Shipment Needed'}</_Text>
    </_View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    marginLeft: 2,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.medium,
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
  },
});
