import React from 'react';
import { styles } from './Style';
import { whiteThemeColors } from 'utilities';
import { Modal, TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../../../../components';
import { ScrollView } from 'react-native';
import { DetailCard } from './DetailCard';
interface props {
  show: boolean;
  close: any;
  Details: any;
}
export const DetailModal: React.FC<props> = ({ show, close, Details }) => {
  return (
    <Modal
      transparent
      supportedOrientations={['portrait', 'landscape']}
      visible={show}
      animationType={'fade'}
      onRequestClose={close}
    >
      <_View style={{ flex: 1, backgroundColor: whiteThemeColors.background }}>
        <ScrollView>
          <_View style={[styles.modalHeader]}>
            <_View style={styles.headerText}>
              <_Text style={[styles.modalHeaderText, { color: 'white' }]}>
                {'Details'}
              </_Text>
              <TouchableOpacity
                onPress={close}
                style={{
                  padding: 5,
                  marginRight: 10,
                  backgroundColor: whiteThemeColors.white + 90,
                  borderRadius: 5,
                }}
              >
                <_VectorIcons
                  name={'close'}
                  type={'AntDesign'}
                  size={18}
                  color={whiteThemeColors.white}
                />
              </TouchableOpacity>
            </_View>
          </_View>
          <DetailCard Details={Details} />
        </ScrollView>
      </_View>
    </Modal>
  );
};
