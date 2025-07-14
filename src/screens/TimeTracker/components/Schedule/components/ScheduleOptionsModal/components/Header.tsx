import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';
import { whiteThemeColors } from 'utilities';
import { ScheduleOptionsModalHeaderInterface } from 'interfaces';
import CommonStyles from 'screens/CommonStyles';

export const Header: FC<ScheduleOptionsModalHeaderInterface> = ({
  setModalVisible,
}) => {
  return (
    <_View style={styles.headerContainer}>
      <_Text style={{ fontFamily: CommonStyles.fonts.semiBold, fontSize: 16 }}>
        Add Schedule
      </_Text>
      <TouchableOpacity onPress={setModalVisible} style={styles.crossIcon}>
        <_VectorIcons
          type={'Entypo'}
          name='cross'
          size={14}
          color={whiteThemeColors.black}
          style={{ padding: 8 }}
        />
      </TouchableOpacity>
    </_View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  crossIcon: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
});
