import React from 'react';
import styles from '../style';
import { TouchableOpacity } from 'react-native';
import { _Screen, _Text, _VectorIcons, _View } from '../../../components';
import { whiteThemeColors } from 'utilities';
interface props {
  onPress: () => void;
}
export const Buttons: React.FC<props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.btnCon} onPress={onPress}>
      <_VectorIcons
        type={'MaterialCommunityIcons'}
        name={'qrcode-scan'}
        size={15}
        color={whiteThemeColors.white}
      />
      <_Text style={styles.btnTxt}>Scan QR Code</_Text>
    </TouchableOpacity>
  );
};
