import React from 'react';
import { StyleSheet } from 'react-native';
import { _View } from '../../../../../../../components';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _ActivityIndicator } from '../../../../../../Loader';
import { ScheduleUserListViewFooterLoaderInterface } from '../../../../../../../interfaces';

const FooterLoader: React.FC<ScheduleUserListViewFooterLoaderInterface> = ({
  footerLoader,
}) => (
  <_View style={styles.container}>
    {footerLoader && (
      <_ActivityIndicator color={whiteThemeColors.greyDark} showText={false} />
    )}
  </_View>
);
export { FooterLoader };

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
