import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {
  TAG_COLORInterface,
  TimeTrackerRequestCardInterface,
  TotalHoursInterface,
} from '../../../../../../interfaces';
import {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {whiteThemeColors} from '../../../../../../Utilities';
import {_Text, _View} from '../../../../../../components';
import {CoverRequestConstants} from '../../../../../../constants';
import ScreensNames from '../../../../../../screenNames';
import {UserImg} from '../../../../../ThumbNail';
import {styles} from './style';

const TAG_COLOR: TAG_COLORInterface = {
  [CoverRequestConstants.Submitted]: '#004bc0',
  [CoverRequestConstants.Pending]: '#FFBF00',
  [CoverRequestConstants.Approved]: whiteThemeColors.green,
  [CoverRequestConstants.Approve]: whiteThemeColors.green,
};

const TotalHours: FC<TotalHoursInterface> = ({totalHours, category}) => {
  return <_Text style={styles.details}>{`${totalHours}h ${category}`}</_Text>;
};

export const RequestCard: FC<TimeTrackerRequestCardInterface> = ({
  item,
  onButtonAction,
  showButtons = true,
  variant,
  rejectVisible,
}) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate(ScreensNames.myRequestsDetails.name, {
          data: item,
          type: variant,
        })
      }>
      <_View style={styles.innerCont}>
        <_View style={styles.innerContainer}>
          <UserImg
            UserInfo={{
              FirstName: item.fullName || item.itemName,
              LastName:
                item.fullName.split(' ')[1] || item.itemName.split(' ')[1],
              UserImage: '',
              UserImageColor: whiteThemeColors.primary,
            }}
            size={50}
          />
        </_View>

        <_View width={'88%'}>
          <_View style={styles.viewIn}>
            <_Text style={styles.userNameText}>
              {item.fullName || item.itemName}
            </_Text>
            <_View
              style={[
                styles.tag,
                {
                  backgroundColor:
                    TAG_COLOR[item?.status] || whiteThemeColors.red,
                },
              ]}>
              <_Text style={styles.tagText}>{item.status}</_Text>
            </_View>
          </_View>
          {variant == 'Time Off' && (
            <TotalHours totalHours={item.totalHours} category={'time off'} />
          )}
          {variant == 'Timesheet' && (
            <TotalHours totalHours={item.totalHours} category={'timesheet'} />
          )}
          <_Text style={styles.details}>
            {`Requested on ${item.startDateTemp}`}
          </_Text>
          {variant == 'Time Off' && (
            <_Text numberOfLines={2} style={styles.details}>
              {item.itemName}
            </_Text>
          )}
        </_View>
      </_View>
      {showButtons && (
        <_View style={styles.buttonContainer}>
          {rejectVisible == true ? null : (
            <TouchableOpacity
              style={styles.declineBtn}
              onPress={() =>
                onButtonAction(item, CoverRequestConstants.Rejected)
              }>
              <_Text style={styles.btnText}>Reject</_Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.approveBtn}
            onPress={() =>
              onButtonAction(item, CoverRequestConstants.Approved)
            }>
            <_Text style={[styles.btnText, {color: whiteThemeColors.green}]}>
              Approve
            </_Text>
          </TouchableOpacity>
        </_View>
      )}
    </TouchableOpacity>
  );
};
