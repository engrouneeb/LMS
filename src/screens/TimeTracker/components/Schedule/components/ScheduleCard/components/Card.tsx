import {ScheduleCardItemCardInterface} from '../../../../../../../interfaces';
import React, {FC, Fragment} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {isAdmin, whiteThemeColors} from '../../../../../../../Utilities';
import {_Text, _View} from '../../../../../../../components';
import {UserImg} from '../../../../../../ThumbNail';
import {DraftButton} from './DraftButton';
import {PublishButton} from './PublishButton';
import CommonStyles from '../../../../../../../screens/CommonStyles';
import {useSelector} from 'react-redux';
import {Appstate} from '../../../../../../../reducers/Appstate';

export const Card: FC<ScheduleCardItemCardInterface> = ({
  show,
  schedule,
  setEditingEnable,
  changeModalState,
  userName,
  index,
  setShowRecoverModal,
  dates,
  setIndexVal,
}) => {
  const {roleName} = useSelector((state: Appstate) => state.User.UserInfo);
  {
    return show ? (
      <Fragment>
        {schedule[index].daySchedules.map((value: any, index1: any) => {
          return (
            <TouchableOpacity
              disabled={!isAdmin(roleName)}
              onPress={() => {
                setEditingEnable();
                changeModalState(
                  true,
                  dates[index],
                  index,
                  value?.checkIn,
                  value?.checkOut,
                  value?.scheduleID,
                  value?.dayID,
                  value?.wageID,
                  value?.dayComments,
                  true,
                );
              }}
              style={styles.innerContainer}>
              <_View style={styles.body}>
                <_View style={styles.timeContainer}>
                  <_Text style={styles.timeText}>{value.checkIn}</_Text>
                  <_Text style={[styles.timeText, {marginTop: 5}]}>
                    {value.checkOut}
                  </_Text>
                </_View>
                <_View style={styles.middleContainer} />
                <UserImg
                  UserInfo={{
                    FirstName: userName[0],
                    LastName: userName.split(' ')[1] || '',
                    UserImage: '',
                    UserImageColor: whiteThemeColors.primary,
                  }}
                  size={50}
                />
                <_View style={{marginLeft: 10, width: '50%'}}>
                  <_Text style={styles.nameText}>{userName}</_Text>
                  <_Text
                    numberOfLines={2}
                    style={{
                      color: whiteThemeColors.greyDark,
                      fontSize: 10,
                      fontFamily: CommonStyles.fonts.regular,
                    }}>
                    {value.dayComments}
                  </_Text>
                  <DraftButton visiblity={!value?.isPublished} />
                </_View>
              </_View>

              <PublishButton
                setShowRecoverModal={setShowRecoverModal}
                showPublishBtn={value?.isPublished}
                setIndexVal={setIndexVal}
                index1={index1}
              />
            </TouchableOpacity>
          );
        })}
      </Fragment>
    ) : null;
  }
};

const styles = StyleSheet.create({
  innerContainer: {
    height: 80,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  timeText: {
    color: whiteThemeColors.greyDark,
    fontSize: 13,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  middleContainer: {
    height: 30,
    borderWidth: 0.5,
    width: 0.5,
    borderColor: 'lightgray',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  nameText: {
    fontSize: 16,
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
