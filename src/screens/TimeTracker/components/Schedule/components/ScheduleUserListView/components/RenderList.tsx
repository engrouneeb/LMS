import {ScheduleUserListViewRenderItemInterface} from '../../../../../../../interfaces';
import React from 'react';
import {Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {Appstate} from '../../../../../../../reducers/Appstate';
import {whiteThemeColors} from '../../../../../../../Utilities';
import {_Text, _View} from '../../../../../../../components';
import {UserImg} from '../../../../../../ThumbNail';
import {styles} from '../style';

export const RenderList: React.FC<ScheduleUserListViewRenderItemInterface> = ({
  user,
  index,
  onPress,
  weekDaysShort,
}) => {
  const {adminSchedule} = useSelector((state: Appstate) => state.language);
  return (
    <_View key={index.toString() + '+---'} style={styles.card}>
      <Pressable
        style={styles.pressableStyle}
        onPress={() => onPress(user.userID)}>
        <UserImg
          UserInfo={{
            FirstName: user.fName,
            LastName: user.lName,
            UserImage: '',
            UserImageColor: whiteThemeColors.primary,
          }}
          size={50}
        />

        <_View style={styles.cardDetailsContainer}>
          <_Text style={styles.nameText}>{user.fName + ' ' + user.lName}</_Text>
          <_Text style={styles.bodyText}>
            {user.schedule.filter((x: any) => x.todaySchedule == true)[0]
              ? adminSchedule.Today +
                ' ' +
                user.schedule.filter((x: any) => x.todaySchedule == true)[0]
                  .todayCheckIn +
                ' - ' +
                user.schedule.filter((x: any) => x.todaySchedule == true)[0]
                  .todayCheckOut
              : adminSchedule.Today + ' ' + adminSchedule.NoSchedule}
          </_Text>
          <_View style={styles.weekDays}>
            {weekDaysShort.map((day: any, _index: any) =>
              user.schedule[_index].daySchedules.length > 0 ? (
                <_Text
                  style={[
                    styles.coloredDayNameTxt,
                    {
                      backgroundColor:
                        whiteThemeColors.scheduleWeekIcon[_index],
                      borderColor: whiteThemeColors.scheduleWeekIcon[_index],
                    },
                  ]}>
                  {day}
                </_Text>
              ) : null,
            )}
          </_View>
        </_View>
      </Pressable>
    </_View>
  );
};
