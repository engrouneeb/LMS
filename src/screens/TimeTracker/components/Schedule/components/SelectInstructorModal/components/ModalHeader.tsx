import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';
import { whiteThemeColors } from 'utilities';
import { SelectInstructorModalHeaderInterface } from 'interfaces';
import CommonStyles from 'screens/CommonStyles';

export const ModalHeader: FC<SelectInstructorModalHeaderInterface> = ({
  setModalVisible,
}) => {
  return (
    <_View style={styles.headerContainer}>
      <_Text style={styles.titleTxt}>Select Instructor</_Text>
      <TouchableOpacity
        onPress={() => setModalVisible(false)}
        style={styles.crossIcon}
      >
        <_VectorIcons
          type={'Ionicons'}
          name='close-outline'
          size={30}
          color={whiteThemeColors.black}
        />
      </TouchableOpacity>
    </_View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  crossIcon: {
    borderRadius: 10,
  },
  titleTxt: {
    fontSize: 13,
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.bold,
  },
});
