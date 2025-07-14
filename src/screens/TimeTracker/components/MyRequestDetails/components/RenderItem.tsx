import {
  MyRequestDetailsRenderItemInterface,
  StatusColorInterface,
} from 'interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../../components';
import { UserImg } from '../../../../ThumbNail';
import CommonStyles from 'screens/CommonStyles';

const StatusColor: StatusColorInterface = {
  Submitted: '#004bc0',
  Pending: '#FFBF00',
  Approved: whiteThemeColors.green,
};
const RenderItem: React.FC<MyRequestDetailsRenderItemInterface> = ({
  item,
}) => {
  return (
    <_View style={styles.mainContainer}>
      <_View style={styles.subContainer}>
        <UserImg
          UserInfo={{
            FirstName: item?.fullName,
            LastName: item?.fullName.split(' ')[1] || ' ',
            UserImage: '',
            UserImageColor: whiteThemeColors.primary,
          }}
          size={40}
        />
        <_View style={styles.bodyCard}>
          <_View width={'78%'}>
            <_Text style={styles.statusNameText}>{item?.fullName}</_Text>
            {item?.comments && (
              <_View>
                <_Text style={styles.commontsText}>{'Comment:'}</_Text>
                <_Text style={styles.commontText}>{item?.comments}</_Text>
              </_View>
            )}
          </_View>
          <_View
            style={[
              styles.statusContainer,
              {
                backgroundColor:
                  StatusColor[item?.status] || whiteThemeColors.red,
              },
            ]}
          >
            <_Text style={styles.status}>{item?.status}</_Text>
          </_View>
        </_View>
      </_View>
    </_View>
  );
};

export { RenderItem };
const styles = StyleSheet.create({
  statusNameText: {
    fontSize: 14,
    fontFamily: CommonStyles.fonts.semiBold,
    textTransform: 'capitalize',
    width: '75%',
    color: whiteThemeColors.primary,
  },
  bodyCard: {
    marginLeft: 10,
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {
    marginTop: 10,
    width: '100%',
    backgroundColor: whiteThemeColors.white + 90,
    padding: 20,
    borderRadius: 20,
  },
  commontText: {
    fontSize: 12,
    paddingLeft: 10,

    fontFamily: CommonStyles.fonts.regular,
  },
  commontsText: {
    fontSize: 10,
    marginTop: 3,
    color: '#3c3c3c',
  },
  status: {
    color: 'white',
    fontSize: 8,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  statusContainer: {
    width: 60,
    height: 18,
    backgroundColor: 'green',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
