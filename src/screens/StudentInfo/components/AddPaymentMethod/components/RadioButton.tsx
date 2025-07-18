import React from 'react';
import { _View } from '../../../../../components';
import { styles } from '../../../styles';
interface props {
  selected: any;
}

export const Radio: React.FC<props> = ({ selected }) => (
  <_View
    style={selected ? styles.selectedRadioContainer : styles.radioContainer}
  >
    <_View
      style={
        selected
          ? styles.selectedRadioInnerContainer
          : styles.radioInnerContainer
      }
    />
  </_View>
);
