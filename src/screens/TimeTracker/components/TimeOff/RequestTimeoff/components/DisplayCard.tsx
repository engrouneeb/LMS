import React from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../../../../components';
import CommonStyles from '../../../../../CommonStyles';
import {
  convertUTCDateToLocalDateStringFormat,
  scale,
  whiteThemeColors,
} from 'utilities';
import { DateThumbnail } from './DateThumbnail';
import { RequestTimeOffDisplayCardInterface } from 'interfaces';

export const DisplayCard: React.FC<RequestTimeOffDisplayCardInterface> = ({
  element,
  isTimeOff,
  onPress,
  selectedDay,
  timeOffComment,
  onPressDelete,
  timings,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      style={[styles.modalCard]}
      onPress={onPress}
    >
      <_View style={[styles.View1]}>
        <DateThumbnail
          // selectedDay={convertUTCDateToLocalDateStringFormat(selectedDay)}
          selectedDay={selectedDay}
        />

        {isTimeOff ? (
          <_View style={styles.View11}>
            <_View style={styles.circle} />
          </_View>
        ) : null}
      </_View>
      <_View style={styles.line} />
      <_View style={styles.View2}>
        <_View style={styles.nameContainer}>
          <_Text style={[CommonStyles.className, styles.userNameTxt]}>
            {element.userName}
          </_Text>
        </_View>
        <_View style={styles.View21}>
          <_VectorIcons
            type='FontAwesome5'
            name='clock'
            style={styles.classTime}
            color='black'
            size={14}
          />
          <_Text style={[styles.classTime, styles.timingsTxt]}>{timings}</_Text>
        </_View>
        <_View style={styles.timeOffCommentContainer}>
          <_Text
            numberOfLines={4}
            style={[styles.classTime, styles.timeOffCommentTxt]}
          >
            {timeOffComment}
          </_Text>
        </_View>
      </_View>
      {isTimeOff ? (
        <TouchableOpacity onPress={onPressDelete} style={styles.btnDelete}>
          <_VectorIcons
            type='FontAwesome5'
            name='trash-alt'
            size={14}
            color={whiteThemeColors.red}
          />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalCard: {
    alignSelf: 'center',
    opacity: 1,
    height: 130,
    padding: '2%',
    width: '95%',
    borderRadius: 20,

    flexDirection: 'row',
    backgroundColor: whiteThemeColors.white + 90,
  },
  shadow: {
    ...Platform.select({
      ios: {},
      android: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: whiteThemeColors.black,
        shadowOpacity: 0.5,
        elevation: 20,
      },
    }),
  },
  View1: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: '100%',
  },
  View11: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: -5,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    backgroundColor: whiteThemeColors.red,
  },
  line: {
    width: 2,
    height: '100%',
    backgroundColor: whiteThemeColors.black,
    opacity: 0.3,
  },
  View2: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '55%',
    flex: 1,
  },
  View21: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 5,
  },
  classTime: {
    paddingLeft: 5,
    fontSize: 12,
  },
  nameContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingLeft: 10,
    height: 30,
  },
  userNameTxt: {
    color: whiteThemeColors.primaryTextColor,
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.semiBold,
    marginTop: 10,
  },
  timingsTxt: {
    fontSize: 12,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.medium,
  },
  timeOffCommentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  timeOffCommentTxt: {
    paddingTop: 5,
    color: whiteThemeColors.greyDark,
    fontSize: 12,
    paddingLeft: 0,
    fontFamily: CommonStyles.fonts.regular,
  },
  btnDelete: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: whiteThemeColors.primary + 30,
    borderRadius: 8,
  },
});
