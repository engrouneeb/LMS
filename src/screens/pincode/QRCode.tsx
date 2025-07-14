import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Orientation, whiteThemeColors } from 'utilities';
import { _Screen, _View, requestCameraPermission } from '../../components';
import drawerScreens from '../../navigation/Drawer/DrawerScreenNames';
import Header from '../Headers';
import { QrScanner } from './QrScanner/QrScanner';
import { Buttons, QRIcon } from './components';
import { QRDetails } from './components/QRCodeComponents';
import styles from './style';
export const QRCode: React.FC = () => {
  const navigation: any = useNavigation();
  const [showScanner, setShowScanner] = useState(false);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [status, setStatus] = useState<any>();
  const requestPermission = async () => {
    const requestPermission = await requestCameraPermission();
    if (requestPermission) setShowScanner(true);
  };
  const handleBack = () => {
    navigation.navigate(drawerScreens.dashboard.name);
    return true;
  };
  return (
    <Orientation
      getOrientation={(o: any) => {
        setOrientation(o);
      }}
    >
      <_Screen
        header={
          <Header
            isBack
            Screen={showScanner ? 'Scan QR' : 'QR Code'}
            GoBack={() => {
              setStatus(null);
              if (showScanner) setShowScanner(false);
              else handleBack();
            }}
          />
        }
        flex={1}
        hideTopSafeArea
        onAndroidBack={handleBack}
        backgroundColor={whiteThemeColors.background}
      >
        {showScanner ? (
          <QrScanner
            setStatus={setStatus}
            onClose={() => setShowScanner(false)}
          />
        ) : (
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <_View style={styles.userInfoCon}>
              {status ? (
                <QRDetails status={status} />
              ) : (
                <QRIcon orientation={orientation} />
              )}
              <Buttons onPress={() => requestPermission()} />
            </_View>
          </ScrollView>
        )}
      </_Screen>
    </Orientation>
  );
};
