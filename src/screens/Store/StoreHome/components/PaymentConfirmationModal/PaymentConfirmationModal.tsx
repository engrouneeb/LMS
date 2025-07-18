import { styles } from './styles';
import React, { FC, useEffect, useState } from 'react';
import { isPortrait, whiteThemeColors } from '../../../../../Utilities';
import { Dimensions, Modal, Text, TouchableOpacity } from 'react-native';
import { _Button, _VectorIcons, _View } from '../../../../../components';
import { PaymentConfirmationModalProps } from '../../../../../interfaces';
const PaymentConfirmationModal: FC<PaymentConfirmationModalProps> = ({
  visible,
  setVisible,
  totalCartCost,
  totalCartPoints,
  isPaymentLoading,
  handleInventoryPayment,
}) => {
  const [isPaymentConfirm, setIsPaymentConfirm] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  useEffect(() => {
    setIsPaymentConfirm(false);
  }, [visible]);

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', () => {
      setIsLandscape(isPortrait() ? false : true);
    });
    return () => sub.remove();
  }, []);
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      transparent={true}
      visible={visible}
    >
      <_View style={styles.centeredView}>
        <_View
          style={{ ...styles.modalView, height: isLandscape ? '65%' : '35%' }}
        >
          <_View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.crossIcon}
            >
              <_VectorIcons
                type='Entypo'
                name='cross'
                size={15}
                color={whiteThemeColors.black}
                style={{ padding: 7 }}
              />
            </TouchableOpacity>
          </_View>
          <_View style={styles.webViewContainer}>
            <_View style={styles.modalInsideView}>
              <_View
                style={{
                  borderRadius: 20,
                  backgroundColor: whiteThemeColors.primary,
                }}
              >
                <_VectorIcons
                  type='MaterialIcons'
                  name='payment'
                  size={35}
                  style={{ padding: 20, borderRadius: 10 }}
                />
              </_View>
              <Text style={styles.headText}>{'Purchase Confirmation'}</Text>
              <Text style={styles.sureText}>
                {'Are you sure you want to Continue & Pay?'}
              </Text>
              <Text style={styles.totalText}>{`$${
                Math.round(totalCartCost * 10) / 10
              }`}</Text>
              <Text
                style={{ ...styles.totalText, fontSize: 16 }}
              >{`Acheived Points: ${totalCartPoints}`}</Text>
              <_View style={styles.buttonContainer}>
                <_Button
                  disabled={isPaymentConfirm ? true : false}
                  borderRadius={15}
                  submitting={true}
                  width='50%'
                  style={styles.cancelButton}
                  btnText={'Cancel'}
                  BtnTxt={styles.cancelText}
                  callback={() => {
                    setVisible(false);
                  }}
                />
                <_Button
                  borderRadius={15}
                  submitting={!isPaymentLoading}
                  width='50%'
                  style={styles.confirmButton}
                  btnText={'Confirm'}
                  BtnTxt={styles.confirmText}
                  callback={() => {
                    setIsPaymentConfirm(true);
                    handleInventoryPayment();
                  }}
                />
              </_View>
            </_View>
          </_View>
        </_View>
      </_View>
    </Modal>
  );
};
export default PaymentConfirmationModal;
