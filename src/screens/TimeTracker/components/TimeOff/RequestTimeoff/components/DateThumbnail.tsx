import moment from 'moment';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { _Text, _View } from '../../../../../../components';
import CommonStyles from '../../../../../CommonStyles';
import { whiteThemeColors } from '../../../../../../Utilities';
import { RenderDate } from './RenderDate';
import { RequestTimeOffDateThumbnailInterface } from '../../../../../../interfaces';

export const DateThumbnail: React.FC<RequestTimeOffDateThumbnailInterface> = ({
  selectedDay,
}) => (
  <_View style={styles.container}>
    <_Text style={styles.dateTxt}>
      {moment(selectedDay).format('ddd').toUpperCase()}
    </_Text>
    <RenderDate date={moment(selectedDay).format('D')} />
  </_View>
);

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height / 15,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  dateTxt: {
    fontSize: 18,

    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.red,
    letterSpacing: 3,
  },
});
