import { MyRequestDetailsHeaderCardInterface } from '../../../../../interfaces';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../Utilities';
import { _Text, _View } from '../../../../../components';
import { UserImg } from '../../../../ThumbNail';
import CommonStyles from '../../../../../screens/CommonStyles';

const HeaderCard: FC<MyRequestDetailsHeaderCardInterface> = ({
  userName,
  type,
  data,
}) => {
  return (
    <_View style={styles.firstCard}>
      <_View style={styles.firstCardContainer}>
        <UserImg
          UserInfo={{
            FirstName: userName,
            LastName: userName.split(' ')[1] || ' ',
            UserImage: '',
            UserImageColor: whiteThemeColors.primary,
          }}
          size={70}
        />
        <_View style={{ marginLeft: 10 }}>
          <_Text style={styles.nameText}>{userName}</_Text>
          <_Text style={styles.dateText}>
            {`Request a ${type} on ${data?.startDateTemp}`}
          </_Text>
        </_View>
      </_View>
    </_View>
  );
};

export { HeaderCard };
const styles = StyleSheet.create({
  firstCard: {
    width: '100%',
    backgroundColor: whiteThemeColors.white + 90,
    padding: 20,
    justifyContent: 'center',
    borderRadius: 25,
  },
  firstCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 16,
    fontFamily: CommonStyles.fonts.semiBold,
    textTransform: 'capitalize',
  },
  dateText: {
    fontSize: 10,
    fontFamily: CommonStyles.fonts.medium,
    color: 'gray',
  },
});
