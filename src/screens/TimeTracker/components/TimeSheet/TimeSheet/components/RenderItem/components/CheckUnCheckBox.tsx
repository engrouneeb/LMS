import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { _VectorIcons } from '../../../../../../../../components';
import { whiteThemeColors } from 'utilities';
import { TimeSheetCheckUnCheckBoxInterface } from 'interfaces';

export const CheckUnCheckBox: React.FC<TimeSheetCheckUnCheckBoxInterface> = ({
  show,
  selectedSheets,
  Obj,
  onCheckBoxPress,
}) => {
  const _vectorIconName = (status: any, id: any) => {
    return selectedSheets.includes(id) && status == 'New'
      ? 'check-box'
      : selectedSheets.includes(id) && status == 'Submitted'
      ? 'check-box'
      : 'check-box-outline-blank';
  };
  const _vectorIconColor = (status: any, id: any) => {
    return selectedSheets.includes(id) && status == 'New'
      ? whiteThemeColors.primary
      : selectedSheets.includes(id) && status == 'Submitted'
      ? whiteThemeColors.green
      : whiteThemeColors.greyDark;
  };

  return show ? (
    <TouchableOpacity
      style={styles.checkBoxContainer}
      onPress={onCheckBoxPress}
    >
      <_VectorIcons
        type={'MaterialIcons'}
        name={_vectorIconName(Obj.status, Obj.tmskey)}
        size={25}
        color={_vectorIconColor(Obj.status, Obj.tmskey)}
      />
    </TouchableOpacity>
  ) : null;
};
const styles = StyleSheet.create({
  checkBoxContainer: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: 10,
    right: 5,
  },
});
