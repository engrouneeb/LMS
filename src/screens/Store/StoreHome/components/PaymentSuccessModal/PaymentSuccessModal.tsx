import React, { FC } from 'react';
import { styles } from './styles';
import { whiteThemeColors } from 'utilities';
import { Modal, TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../../../components';

interface Props {
  visible: boolean;
  setVisible: (val: boolean) => void;
  getAllInventories: () => void;
}

const PaymentSuccessModal: FC<Props> = ({
  visible,
  setVisible,
  getAllInventories,
}) => {
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      transparent={true}
      visible={visible}
    >
      <_View style={styles.centeredView}>
        <_View style={styles.modalView}>
          <_View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                getAllInventories();
              }}
              style={styles.crossIcon}
            >
              <_VectorIcons
                type={'Entypo'}
                name='cross'
                style={{ padding: 7 }}
                color={whiteThemeColors.black}
              />
            </TouchableOpacity>
          </_View>
          <_View style={styles.webViewContainer}>
            <_View
              style={[
                styles.modalInsideView,
                { justifyContent: 'center', alignItems: 'center' },
              ]}
            >
              <_VectorIcons
                type={'Ionicons'}
                name='checkmark-done-circle-sharp'
                size={80}
                color={whiteThemeColors.primary}
              />
              <_Text style={styles.headText}>
                {'Inventory Purchased Successfully'}
              </_Text>
            </_View>
          </_View>
        </_View>
      </_View>
    </Modal>
  );
};
export default PaymentSuccessModal;
