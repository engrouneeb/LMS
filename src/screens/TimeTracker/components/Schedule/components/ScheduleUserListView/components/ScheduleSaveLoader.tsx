import { ScheduleUserListViewScheduleSaveLoaderInterface } from '../../../../../../../interfaces';
import React from 'react';
import { _Text, _View } from '../../../../../../../components';
import { _ActivityIndicator } from '../../../../../../Loader';
import { styles } from '../style';

export const ScheduleSaveLoader: React.FC<
  ScheduleUserListViewScheduleSaveLoaderInterface
> = ({ text }) => {
  return (
    <_View style={styles.savingScheduleContainer}>
      <_View style={styles.savingScheduleSubContainer}>
        <_ActivityIndicator size={'large'} showText={false} />
        <_Text style={styles.savingScheduleTxt}>{text}</_Text>
      </_View>
    </_View>
  );
};
