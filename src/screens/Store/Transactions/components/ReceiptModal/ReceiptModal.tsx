import React, { FC, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { whiteThemeColors, isPortrait } from '../../../../../Utilities';
import { Modal, TouchableOpacity, Dimensions } from 'react-native';
import { _Text, _View, _VectorIcons, _Button } from '../../../../../components';
import { styles } from './styles';
export type ReceiptModalProps = {
  receiptUrl: string;
};
interface Props {
  item: ReceiptModalProps;
  visible: boolean;
  setVisible: (val: boolean) => void;
}
const ReceiptModal: FC<Props> = ({ visible, setVisible, item }) => {
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  useEffect(() => {
    const subs = Dimensions.addEventListener('change', () => {
      setIsLandscape(isPortrait() ? false : true);
    });
    return () => subs.remove();
  }, []);
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <_View style={styles.centeredView}>
        <_View
          style={{ ...styles.modalView, height: isLandscape ? '65%' : '75%' }}
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
                color={whiteThemeColors.white}
                style={{ padding: 7 }}
              />
            </TouchableOpacity>
          </_View>
          <_View style={styles.webViewContainer}>
            <WebView
              source={{
                uri: item?.receiptUrl,
              }}
              style={{
                flex: 1,
              }}
            />
          </_View>
        </_View>
      </_View>
    </Modal>
  );
};
export default ReceiptModal;
