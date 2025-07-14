import React from 'react';
import { isTablet } from 'react-native-device-info';
import { _ActivityIndicator } from 'screens/Loader';
import { NoNotification } from '../../../../assets/Icons';
import { hp } from '../../../Helpers/Responsiveness';
import { _Text, _View } from '../../../components';
import { styles } from '../style';
import { Dimensions } from 'react-native';

interface props {
  NoNotificationisFound: string;
}
const ListEmpty: React.FC<props> = ({ NoNotificationisFound }) => {
  const { width, height } = Dimensions.get('screen');
  return (
    <_View style={{ flex: 1 }}>
      <_View style={styles.emptyListContainer}>
        <_View
          style={{
            width,
            height,
            marginTop: isTablet() ? hp(10) : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <NoNotification />
          <_Text style={styles.noDataFoundTxt}>{NoNotificationisFound}</_Text>
        </_View>
      </_View>
    </_View>
  );
};

export { ListEmpty };
