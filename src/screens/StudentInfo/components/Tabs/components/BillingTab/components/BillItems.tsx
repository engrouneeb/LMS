import moment from 'moment';
import React, { useState } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../../../../../reducers/Appstate';
import { CustomAlert, isStudent, whiteThemeColors } from '../../../../../../../Utilities';
import {
  _Button,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../../../../components';
import { styles } from '../styles';
interface props {
  item: any;
  index: number;
  primary: any;
  onPrimaryPress: (bid: any, primary: any) => void;
  deletePayment: (bid: any) => void;
}
const BillItem: React.FC<props> = ({
  item,
  index,
  primary,
  onPrimaryPress,
  deletePayment,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const UserInfo: any = useSelector((state: Appstate) => state.User.UserInfo);
  const onDeletePress = () => {
    setShowAlert(true);
    setAlertMessage('Are you sure you want to delete this payment method?');
    setAlertTitle('warning');
  };

  const onPrimaryStatus = () => {
    setShowAlert(true);
    setAlertMessage('You cannot change payment status');
    setAlertTitle('Error');
  };

  const closeModal = () => {
    setShowAlert(false);
  };

  const onConfirmPress = () => {
    deletePayment(item.billingId);
    closeModal();
  };
  return (
    <_View style={styles.itemContainer}>
      {!isStudent(UserInfo.roleName) && (
        <TouchableHighlight
          onPress={onDeletePress}
          underlayColor={whiteThemeColors.red + '30'}
          style={styles.removeContainer}
        >
          <_VectorIcons
            name={'trash-o'}
            type={'FontAwesome'}
            size={17}
            color={whiteThemeColors.red}
          />
        </TouchableHighlight>
      )}
      <_View style={styles.textContainer}>
        <Text style={styles.headText}>{'Method Type'}</Text>
        {item?.paymentType ? (
          <_View style={styles.rowView}>
            <_Text style={styles.valueText}>{item.paymentType}</_Text>
            <_VectorIcons
              name={item.paymentType == 'Credit Card' ? 'creditcard' : 'money'}
              type={
                item.paymentType == 'Credit Card' ? 'AntDesign' : 'FontAwesome'
              }
              size={20}
              color={whiteThemeColors.primaryDark}
              style={styles.icon}
            />
          </_View>
        ) : (
          <_Text style={styles.valueText}>-</_Text>
        )}
      </_View>
      <_View style={styles.textContainer}>
        <_Text style={styles.headText}>Card Number</_Text>
        <_Text style={[styles.valueText, { letterSpacing: 3 }]}>
          {item.cardLastFourDigits
            ? `**** ***** **** ${item.cardLastFourDigits}`
            : '-'}
        </_Text>
      </_View>
      <_View
        style={[
          styles.rowView,
          {
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          },
        ]}
      >
        <_View style={[styles.textContainer, { width: '40%' }]}>
          <_Text style={styles.headText}>Added On</_Text>
          <_Text style={styles.valueText}>
            {moment(item?.addedDateTime).format('MMM DD, YYYY')}
          </_Text>
        </_View>
        <_View style={{ justifyContent: 'flex-end' }}>
          <_Button
            submitting={true}
            borderRadius={7}
            width={'100%'}
            style={[
              styles.paymentContainer,
              {
                backgroundColor:
                  index == primary
                    ? whiteThemeColors.primary
                    : whiteThemeColors.white + 90,
              },
            ]}
            BtnTxt={[
              styles.headText,
              {
                color:
                  index == primary
                    ? whiteThemeColors.white
                    : whiteThemeColors.primary,
              },
            ]}
            btnText={'Primary'}
            callback={() =>
              isStudent(UserInfo.roleName)
                ? onPrimaryStatus()
                : onPrimaryPress(item.billingId, primary == index)
            }
          />
        </_View>
      </_View>
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={isStudent(UserInfo.roleName) ? 'Okay' : 'Delete'}
          firstBtnFunc={() => {
            isStudent(UserInfo.roleName)
              ? setShowAlert(false)
              : onConfirmPress();
          }}
          secondBtn={'Close'}
          secondBtnFunc={() => {
            closeModal();
          }}
        />
      )}
    </_View>
  );
};
export default BillItem;
