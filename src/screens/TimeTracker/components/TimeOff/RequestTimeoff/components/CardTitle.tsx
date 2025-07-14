import { RequestTimeOffCardTitleInterface } from 'interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { convertUTCDateToLocalDateStringFormat } from 'utilities';
import { _Text } from '../../../../../../components';
import CommonStyles from 'screens/CommonStyles';

export const CardTitle: React.FC<RequestTimeOffCardTitleInterface> = ({
  selectedDay,
  timeOff,
}) => {
  return convertUTCDateToLocalDateStringFormat(selectedDay) ===
    convertUTCDateToLocalDateStringFormat(new Date()) ? (
    <_Text style={styles.txt}>{timeOff.TODAY}</_Text>
  ) : (
    <_Text style={styles.txt}>
      {convertUTCDateToLocalDateStringFormat(selectedDay)}
    </_Text>
  );
};

const styles = StyleSheet.create({
  txt: {
    fontSize: 18,
    paddingLeft: 10,
    marginTop: 20,
    height: '10%',
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
