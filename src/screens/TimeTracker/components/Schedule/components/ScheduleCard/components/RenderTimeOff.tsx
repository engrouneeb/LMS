import { ScheduleCardRenderTimeOffInterface } from 'interfaces';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';

export const RenderTimeOff: FC<ScheduleCardRenderTimeOffInterface> = ({
  schedule,
  index,
}) => {
  return schedule[index].timeOffs !== null &&
    schedule[index].timeOffs?.startTime != null &&
    schedule[index].timeOffs?.endTime != null ? (
    <_View style={styles.timeCardContainer}>
      <_View width={'22%'} style={{ alignItems: 'center' }}>
        <_View style={styles.timeOffTagContainer}>
          <_Text style={styles.tagText}>Time off</_Text>
        </_View>
        <_View style={styles.timeContainer}>
          <_Text style={styles.timeText}>
            {schedule[index].timeOffs?.startTime}
          </_Text>
          <_Text style={[styles.timeText, styles.marginTop5]}>
            {schedule[index].timeOffs?.endTime}
          </_Text>
        </_View>
      </_View>
      <_View style={styles.subContainer}>
        <_View style={styles.middleContainer} />
        <_View style={styles.timeOffIconContainer}>
          <_VectorIcons
            name={'calendar-times-o'}
            type={'FontAwesome'}
            size={25}
            color={whiteThemeColors.greyDark + 80}
          />
        </_View>
        <_View style={styles.timeOffDescriptionContainer}>
          <_View style={styles.timeOffContainer}>
            <_Text numberOfLines={1} style={styles.nameText}>
              {schedule[index].timeOffs?.title}
            </_Text>

            {schedule[index]?.timeOffs?.isApproved == false && (
              <_View style={styles.tagContainer}>
                <_Text style={styles.tagText}>Draft</_Text>
              </_View>
            )}
          </_View>
          <_Text numberOfLines={2} style={styles.timeOffDescriptionText}>
            {schedule[index].timeOffs?.description}
          </_Text>
        </_View>
      </_View>
    </_View>
  ) : null;
};

const styles = StyleSheet.create({
  timeCardContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  subContainer: {
    flexDirection: 'row',
  },
  timeOffTagContainer: {
    backgroundColor: whiteThemeColors.red,
    width: 60,
    height: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    fontSize: 10,
    color: whiteThemeColors.white,
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginRight: 3,
  },
  timeText: {
    color: whiteThemeColors.greyDark,
    fontSize: 13,
  },
  middleContainer: {
    height: 30,
    borderWidth: 0.5,
    width: 0.5,
    borderColor: 'lightgray',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  timeOffIconContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 50,
    borderColor: whiteThemeColors.greyDark + 40,
    borderWidth: 0.5,
  },
  timeOffDescriptionContainer: {
    marginLeft: 10,
    width: '55%',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500',
  },
  tagContainer: {
    backgroundColor: whiteThemeColors.greyDark,
    paddingHorizontal: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 5,
    width: 50,
  },
  timeOffDescriptionText: {
    color: whiteThemeColors.greyDark,
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'justify',
  },
  marginTop5: {
    marginTop: 5,
  },
  timeOffContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
