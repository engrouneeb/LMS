import React from 'react';
import styles from '../style';
import { _Text, _VectorIcons, _View } from '../../../components';

export const FooterNote = () => {
    return (
      <_View style={styles.footerNoteContainer}>
        <_Text style={styles.footerNoteTxt}>
          Place QR code inside the frame to scan, Please avoid shake to get the
          results quickly
        </_Text>
      </_View>
    );
  };