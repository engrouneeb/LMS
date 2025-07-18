import React, { FC } from 'react';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _View, _Text } from '../../../../../../../components';
import { isAdmin } from '../../../../../../../Utilities';
import {
  CheckUnCheckBox,
  SheetName,
  SheetStatus,
  TotalHours,
  UserInfo,
  WeekDaysAndTotalHours,
} from './components';
import { TimeSheetRenderItemInterface } from '../../../../../../../interfaces';

export const RenderItem: FC<TimeSheetRenderItemInterface> = ({
  Obj,
  btnDisabled,
  onCardPress,
  userRole,
  onCheckBoxPress,
  selectedSheets,
  aprrovers,
  setModal,
  isAddTimesheet
}) => {
  return (
    <_View style={styles.container}>
      <_View style={styles.listItem}>
        <TouchableOpacity
          disabled={btnDisabled}
          activeOpacity={0.7}
          onPress={onCardPress}
          style={styles.clickableListBtn}
        >
          <_View style={styles.listContentContainer}>
            <_View style={styles.listHeaderContainer}>
              <UserInfo Obj={Obj} />
              {isAddTimesheet&&<CheckUnCheckBox
                show={Obj.status != 'Submitted' && !isAdmin(userRole)}
                selectedSheets={selectedSheets}
                Obj={Obj}
                onCheckBoxPress={onCheckBoxPress}
              />}
            </_View>
            <_View style={styles.listBodyContainer}>
              <_View style={styles.sheetDetailsContianer}>
                <SheetName name={Obj.itemName} />
                <TotalHours totalWeekHours={Obj.totelWeekHr} />
              </_View>
              <_View style={styles.sheetDetailsContianer}>
                <SheetStatus status={Obj.status} />
                {aprrovers?.length > 0 && (
                  <Pressable
                    onPress={() => setModal()}
                    style={{
                      backgroundColor: whiteThemeColors.primary,
                      borderRadius: 4,
                    }}
                  >
                    <_Text
                      style={{
                        color: whiteThemeColors.white,
                        fontSize: 10,
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                      }}
                    >
                      Approvers
                    </_Text>
                  </Pressable>
                )}
              </_View>
            </_View>
            <WeekDaysAndTotalHours Obj={Obj} />
          </_View>
        </TouchableOpacity>
      </_View>
    </_View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
  },
  listItem: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  clickableListBtn: {
    width: '100%',
    alignSelf: 'center',

    backgroundColor: whiteThemeColors.background,
  },
  listContentContainer: {
    borderRadius: 20,
    width: '100%',
    backgroundColor: whiteThemeColors.white + 90,
    padding: 15,
  },
  listHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  listBodyContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 40,
    marginHorizontal: 10,
  },
  sheetDetailsContianer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
});
