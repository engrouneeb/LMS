import React from 'react';
import { TouchableOpacity } from 'react-native';
import { _Text } from '../../../../../../../components';
import { convertUTCDateToLocalDateStringFormat } from 'utilities';
import { styles } from '../style';
import { DataTimePropInterface } from 'interfaces';

export const DateTime: React.FC<DataTimePropInterface> = ({
  onPress,
  label,
  value,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <_Text style={styles.headText}>{label}</_Text>
      <_Text style={styles.timeText}>
        {['Start Date', 'End Date'].includes(label)
          ? convertUTCDateToLocalDateStringFormat(value)
          : value}
      </_Text>
    </TouchableOpacity>
  );
};
