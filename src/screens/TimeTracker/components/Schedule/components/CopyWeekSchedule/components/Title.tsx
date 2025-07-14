import React from 'react';
import { _Text, _View } from '../../../../../../../components';
import { convertUTCDateToLocalDateStringFormat } from 'utilities';
import { styles } from '../style';
import { CopyWeekScheduleTitleInterface } from 'interfaces';

export const Title: React.FC<CopyWeekScheduleTitleInterface> = ({
  startDate,
  endDate,
}) => {
  return (
    <_View style={styles.mainTitleContainer}>
      <_Text style={styles.copyToText}>
        Schedule Copy to
        <_Text style={styles.timeText}>
          {`  ${convertUTCDateToLocalDateStringFormat(
            startDate,
            'MMM DD'
          )} - ${convertUTCDateToLocalDateStringFormat(endDate, 'MMM DD')}`}
        </_Text>
      </_Text>
    </_View>
  );
};
