import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { _Text, _View } from '../../../../../../../components';
import { whiteThemeColors } from 'utilities';
import { ScheduleAddTimeCreateUpdateBtnInterface } from 'interfaces';
import CommonStyles from 'screens/CommonStyles';

export const CreateUpdateBtn: React.FC<
  ScheduleAddTimeCreateUpdateBtnInterface
> = ({ onPress, isCreateBtn, isVisibleCreate }) => {
  return (
    <_View style={styles.continueButton}>
      <Pressable
        disabled={isVisibleCreate}
        style={styles.buttonSave}
        onPress={onPress}
      >
        <_Text style={styles.buttonText}>
          {isCreateBtn ? 'Update Schedule' : 'Create Schedule'}
        </_Text>
      </Pressable>
    </_View>
  );
};

const styles = StyleSheet.create({
  continueButton: {
    marginTop: 15,
    borderBottomWidth: 0,
    marginBottom: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonSave: {
    width: '100%',
    height: 45,
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,

    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
