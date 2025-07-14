import { ReviewScheduleModalHeaderInterfac } from 'interfaces';
import moment from 'moment';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';
import CommonStyles from 'screens/CommonStyles';

export const ModalHeader: React.FC<ReviewScheduleModalHeaderInterfac> = ({
  startDate,
  endDate,
  setModalVisible,
}) => {
  return (
    <_View style={styles.headerContainer}>
      <_Text style={styles.headText}>
        {`${moment(startDate).format('MMM DD')} - ${moment(endDate).format(
          'MMM DD'
        )}`}
      </_Text>
      <TouchableOpacity
        onPress={() => setModalVisible(false)}
        style={styles.crossIcon}
      >
        <_VectorIcons
          type={'Entypo'}
          name='cross'
          size={15}
          color={whiteThemeColors.black}
          style={{ padding: 10 }}
        />
      </TouchableOpacity>
    </_View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headText: {
    color: whiteThemeColors.primaryTextColor,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: CommonStyles.fonts.semiBold,
  },
  crossIcon: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
});
