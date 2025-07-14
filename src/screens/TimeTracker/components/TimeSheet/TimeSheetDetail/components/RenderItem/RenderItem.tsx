import { TimeSheetDetailRenderItemInterface } from 'interfaces';
import React, { FC } from 'react';
import { TextInput } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';
import { styles } from './style';

export const RenderItem: FC<TimeSheetDetailRenderItemInterface> = ({
  Obj,
  handleHours,
  handleComments,
  txtInptRef,
  timeSheetDetial,
}) => {
  return (
    <_View style={styles.singleCardContainer}>
      <_View
        style={[
          styles.timeSheetDay,
          {
            backgroundColor: Obj.color,
          },
        ]}
      >
        <_Text style={[styles.timeSheetDayFont]}>{Obj.date}</_Text>
      </_View>
      <_View style={styles.timeSheetDetails}>
        <_View style={styles.timeSheetDetailsLeft}>
          <_Text style={[styles.timeSheetDetailsTitle]}>{Obj.day}</_Text>

          <_View style={styles.addHourContainer}>
            <_VectorIcons
              type={'MaterialCommunityIcons'}
              name={'clock-edit-outline'}
              size={15}
              color={whiteThemeColors.greyDark}
            />
            <TextInput
              numberOfLines={1}
              placeholder={timeSheetDetial.AddHr}
              style={styles.addHourTxtInp}
              ref={txtInptRef}
              keyboardType={'numeric'}
              onChangeText={(text) => handleHours(text, Obj)}
            />
          </_View>

          <_View style={styles.addCommentContainer}>
            <_VectorIcons
              type={'MaterialCommunityIcons'}
              name={'comment-edit-outline'}
              size={15}
              color={whiteThemeColors.greyDark}
            />
            <TextInput
              clearButtonMode='always'
              style={styles.addCommentTxtInp}
              placeholder={timeSheetDetial.AddCommentsHere}
              onChangeText={(text) => handleComments(text, Obj)}
            />
          </_View>
        </_View>
        <_View style={styles.timeSheetDetailsRight}>
          <_View
            style={[
              styles.totalHourContainer,
              {
                backgroundColor: Obj.color,
              },
            ]}
          >
            <_Text style={styles.totalHourLabelTxt}>
              {timeSheetDetial.LoggedHr}
            </_Text>
            <_Text style={styles.totalHourTxt}>{Obj.time}</_Text>
          </_View>
        </_View>
      </_View>
    </_View>
  );
};
