import { ScheduleCardAddScheduleAndShowDateInterface } from '../../../../../../../interfaces';
import React, { FC, Fragment } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Text, _VectorIcons } from '../../../../../../../components';
import CommonStyles from '../../../../../../../screens/CommonStyles';
import { useAppModulePermission } from '../../../../../../../customHooks';

export const AddScheduleAndShowDate: FC<
  ScheduleCardAddScheduleAndShowDateInterface
> = ({ date, onPress }) => {
 const { filterMenuOptions } = useAppModulePermission();
 const isCreateSchedule=filterMenuOptions("CreateSchedule");
  return (
    <Fragment>
      <_Text style={styles.dateText}>{date}</_Text>
     {isCreateSchedule&&<TouchableOpacity onPress={(index) => onPress(index)}>
        <_VectorIcons
          type='EvilIcons'
          name='plus'
          size={35}
          color={whiteThemeColors.primary}
          style={styles.iconStyle}
        />
      </TouchableOpacity>}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  dateText: {
    marginLeft: 10,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.medium,
  },
  iconStyle: {
    marginRight: 10,
  },
});
