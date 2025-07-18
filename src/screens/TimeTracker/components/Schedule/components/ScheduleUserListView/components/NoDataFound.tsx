import React from 'react';
import EmptyList from '../../../../../../EmptyList';
import { NoData } from '../../../../../../../../assets/Icons';
import { _View } from '../../../../../../../components';
import { StyleSheet } from 'react-native';
import { ScheduleUserListViewNoDataFoundInterface } from '../../../../../../../interfaces';

const NoDataFound: React.FC<ScheduleUserListViewNoDataFoundInterface> = ({
  text,
}) => {
  return (
    <_View style={styles.container}>
      <EmptyList image={<NoData />} text={text} />
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { NoDataFound };
