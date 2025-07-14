import { TimeOffRenderListInterface } from 'interfaces';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../components';
import { UserImg } from '../../../../ThumbNail';
import { DAY_COLOR } from '../constants';
import CommonStyles from 'screens/CommonStyles';

export const RenderList: React.FC<TimeOffRenderListInterface> = ({
  item,
  timeOff,
  handlePress,
}) => {
  let timeOffs = item.weekDays.filter((data: any) => data.dayId !== 0);
  return (
    <Pressable
      style={styles.itemListContainer}
      onPress={() => handlePress(item)}
    >
      <_View style={styles.avatarContainer}>
        <UserImg
          UserInfo={{
            FirstName: item.userName,
            LastName: item.userName.split(' ')[1],
            UserImage: '',
            UserImageColor: whiteThemeColors.primary,
          }}
          size={60}
        />
      </_View>
      <_View style={styles.listMiddleContainer}>
        <_View style={styles.listMiddleNameContainer}>
          <_Text style={styles.listMiddleNameTxt}>{item.userName}</_Text>
        </_View>
        <_View
          style={[
            styles.listMiddleDetailsContainer,
            {
              backgroundColor:
                timeOffs.length > 0
                  ? whiteThemeColors.white
                  : whiteThemeColors.primary + 10,
            },
          ]}
        >
          {timeOffs.length > 0 ? (
            timeOffs.map((day: any, index: number) => (
              <_View
                style={[
                  styles.daysBadgeContainer,
                  { backgroundColor: DAY_COLOR[index] },
                ]}
              >
                <_Text style={styles.daysBadgeTxt}>{day.dayName}</_Text>
              </_View>
            ))
          ) : (
            <_View style={styles.noTimeOffContainer}>
              <_VectorIcons
                type={'MaterialCommunityIcons'}
                name={'timer-off-outline'}
                size={20}
                color={whiteThemeColors.greyDark}
              />
              <_Text style={styles.noTimeOffTxt}>{timeOff.NoTimeOff}</_Text>
            </_View>
          )}
        </_View>
      </_View>
      <_View style={styles.listRightContainer}>
        <_VectorIcons
          size={18}
          color={whiteThemeColors.greyDark}
          type='FontAwesome5'
          name='chevron-right'
        />
      </_View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemListContainer: {
    flexDirection: 'row',
    width: '96%',
    height: 85,
    backgroundColor: whiteThemeColors.white + 90,
    marginBottom: 10,
    borderRadius: 15,
    alignSelf: 'center',
  },
  avatarContainer: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  listMiddleContainer: {
    marginLeft: 10,
    width: '65%',
    paddingVertical: 5,
  },
  listMiddleNameContainer: {
    width: '100%',
    height: 25,
    justifyContent: 'center',
  },
  listMiddleNameTxt: {
    color: whiteThemeColors.primary,

    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.medium,
  },
  listMiddleDetailsContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    alignItems: 'center',
    borderRadius: 10,
  },

  daysBadgeContainer: {
    borderRadius: 25,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 5,
  },
  daysBadgeTxt: {
    fontSize: 11,
    color: whiteThemeColors.textColor.whiteText,
  },
  noTimeOffContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noTimeOffTxt: {
    color: whiteThemeColors.greyDark,
    fontSize: 12,
    marginLeft: 5,
    fontFamily: CommonStyles.fonts.regular,
  },
  listRightContainer: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
