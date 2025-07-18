import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../../../../../Utilities';
import { _Text, _View } from '../../../../../components';
import { UserImg } from '../../../../ThumbNail';
import CommonStyles from '../../../../../screens/CommonStyles';
interface props {
  Obj: any;
  index: number;
}
export const DiscussionCard: React.FC<props> = ({ Obj, index }) => {
  const [showMore, setShowMore] = useState(-1);
  const handleShowMore = (index: number) => {
    if (showMore == index) {
      setShowMore(-1);
    } else {
      setShowMore(index);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => handleShowMore(index)}
      style={styles.renderItemCard}
    >
      <_View style={styles.userImageContainer}>
        <UserImg
          UserInfo={{
            FirstName: Obj?.name.split(' ')[0],
            LastName: Obj?.name.split(' ')[1],
            UserImage: Obj?.image || '',
            UserImageColor: whiteThemeColors.primary,
          }}
          size={35}
        />
        <_View style={styles.innerCard}>
          <_Text style={styles.name}>{Obj?.name}</_Text>
          <_Text style={styles.dateTime}>{Obj?.dateTime}</_Text>
          <_View
            style={{
              backgroundColor: whiteThemeColors.white + 90,
              padding: 3,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
              position: 'absolute',
              top: 20,
              width: 70,
            }}
          >
            <_Text
              style={{
                color: whiteThemeColors.primary,
                fontSize: 10,
                fontFamily: CommonStyles.fonts.semiBold,
              }}
            >
              {Obj?.isFromStaff ? 'Staff' : 'Student'}
            </_Text>
          </_View>
        </_View>
      </_View>

      <_View style={styles.feedBackContainer}>
        <_Text numberOfLines={showMore == -1 ? 1 : -1} style={styles.feedBack}>
          {Obj?.feedback}
        </_Text>
      </_View>
      {Obj?.feedback.length >= 58 && (
        <_Text style={styles.extend}>
          {index == showMore ? 'read less...' : 'read more ...'}
        </_Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  renderItemCard: {
    width: '95%',
    backgroundColor: whiteThemeColors.primary + 10,
    borderRadius: 15,
    padding: 5,
    paddingLeft: 15,
    alignSelf: 'center',
  },
  userImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
  },
  innerCard: {
    justifyConter: 'center',
    marginLeft: 5,
    width: '80%',
  },
  name: {
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.medium,
  },
  dateTime: {
    fontSize: 10,
    color: whiteThemeColors.greyDark,
    marginTop: 3,
    fontFamily: CommonStyles.fonts.regular,
  },
  feedBackContainer: {
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  feedBack: {
    fontSize: 12,
    color: whiteThemeColors.black,
    textAlign: 'left',
    fontFamily: CommonStyles.fonts.regular,
    paddingBottom: 10,
  },
  extend: {
    marginHorizontal: 5,
    fontSize: 10,
    color: whiteThemeColors.greyDark,
    textAlign: 'left',
    fontFamily: CommonStyles.fonts.regular,
  },
});
