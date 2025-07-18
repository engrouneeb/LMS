import React from 'react';
import { TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../../../../components';
import { whiteThemeColors } from '../../../../../../Utilities';
import { styles } from '../styles';
import { DownloadFooterInterface } from '../../../../../../interfaces';

export const DownloadFooter: React.FC<DownloadFooterInterface> = ({
  previousStep,
  commonWords,
  nextStep,
  previous,
  next,
}) => {
  return (
    <_View style={styles.footer}>
      <TouchableOpacity
        onPress={previousStep}
        style={{
          display: previous ? 'flex' : 'none',
          ...styles.leftChevron,
        }}
      >
        <_VectorIcons
          type='Entypo'
          name='chevron-thin-left'
          size={14}
          color={whiteThemeColors.black}
          style={styles.chevron}
        />
        <_Text style={styles.previousStep}>{commonWords.previous}</_Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={nextStep}
        style={{
          display: next ? 'flex' : 'none',
          ...styles.rightChevron,
        }}
      >
        <_Text style={styles.nextStep}>{commonWords.next}</_Text>
        <_VectorIcons
          type='Entypo'
          name='chevron-thin-right'
          size={14}
          color={whiteThemeColors.black}
          style={styles.chevron}
        />
      </TouchableOpacity>
    </_View>
  );
};
