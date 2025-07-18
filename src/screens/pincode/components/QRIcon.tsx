import React from 'react';
import styles from '../style';
import { _Text, _VectorIcons, _View } from '../../../components';
import { whiteThemeColors } from '../../../Utilities';
interface props {
  orientation: any;
}
export const QRIcon: React.FC<props> = ({ orientation }) => {
  return orientation == 'PORTRAIT' ? (
    <_View style={styles.defaultContainer}>
      <_VectorIcons
        type={'MaterialCommunityIcons'}
        name={'qrcode-scan'}
        size={105}
        color={whiteThemeColors.primary}
      />
      <_Text style={styles.footerNoteTxt}>
        Place QR code inside the frame to scan, Please avoid shake to get the
        results quickly
      </_Text>
    </_View>
  ) : (
    <_View style={styles.defaultContainer} />
  );
};
