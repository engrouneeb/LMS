import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { convertUTCDateStringToLocalDate, whiteThemeColors } from '../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../components';
import ScreensNames from '../../../screenNames';
import CommonStyles from '../../CommonStyles';
import { styles } from '../style';
import { NotificationDefault, NotificationIcon } from './NotificationIcons';
import { filterdNotificationType } from './TypesInterfaces';
interface NotificationListCardInterfaces {
  item: filterdNotificationType;
}
const NotificationListCard: FC<NotificationListCardInterfaces> = ({ item }) => {
  const navigation: any = useNavigation();
  let newAnnouncement = 'new announcement';
  const renderNotificationIcon = (notification: any) => {
    return notification !== 0 ? (
      NotificationIcon[notification]
    ) : (
      <NotificationDefault />
    );
  };

  const renderDateTime = (date: string) => {
    var notificationDate = moment(date);
    var today = moment();
    let dif = today.diff(notificationDate, 'days');
    let yeardif = today.diff(notificationDate, 'year');
    if (dif > 0) {
      if (yeardif > 0) return moment(date).format('MMM DD-YYYY, h:mm A');
      return moment(date).format('MMM DD, h:mm A');
    }
    return moment(new Date(convertUTCDateStringToLocalDate(date))).fromNow();
  };
  return (
    <TouchableOpacity
      activeOpacity={10}
      disabled={item?.title.trim().toLowerCase() != newAnnouncement}
      onPress={() => {
        navigation.navigate(ScreensNames.AnnouncementDetails.name, {
          id: item.announcementId,
        });
      }}
      style={styles.listItemContainer}
    >
      <_View style={styles.listItemSubContainer}>
        <_View style={styles.listItemIconContainer}>
          {renderNotificationIcon(item?.notificationType)}
        </_View>

        <_View style={[CommonStyles.mL0, styles.listItemTitleNameContainer]}>
          <_Text numberOfLines={2} style={styles.notificationTitleTxt}>
            {item?.title}
          </_Text>
          <_Text numberOfLines={2} style={styles.notificationDetailTxt}>
            {item?.notification}
          </_Text>
        </_View>
      </_View>
      {item?.title?.trim().toLowerCase() == newAnnouncement && (
        <_View
          style={{
            width: 25,
            height: 25,
            backgroundColor: whiteThemeColors.primary + 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            position: 'absolute',
            right: 15,
          }}
        >
          <_VectorIcons
            name={'arrowright'}
            type={'AntDesign'}
            size={16}
            color={whiteThemeColors.primary}
          />
        </_View>
      )}
      {item?.date ? (
        <_View style={styles.timeElapsedContainer}>
          <_Text style={styles.timeElapsedTxt}>
            {renderDateTime(item?.date)}
          </_Text>
        </_View>
      ) : null}
    </TouchableOpacity>
  );
};

export { NotificationListCard };
