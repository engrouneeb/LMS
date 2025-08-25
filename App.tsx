import React, { useEffect, useState } from 'react';
import { LogBox, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import VersionCheck from 'react-native-version-check';
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';
import Setup from './src/boot/setup';
import { AppUpdateModal } from './src/components/AppUpdateModal';
import crashlytics from '@react-native-firebase/crashlytics';
import ErrorBoundary from 'react-native-error-boundary';
import { setJSExceptionHandler } from 'react-native-exception-handler';

import ErrorComponent from './src/components/_ErrorComponent';
LogBox.ignoreAllLogs();
function App() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [url, setUrl] = useState('');
  const inAppUpdates = new SpInAppUpdates(
    true, // isDebug
  );
  LogBox.ignoreAllLogs(); 
  useEffect(() => {
    console.warn = () => {};
    console.error = () => {};
    SplashScreen.hide();
    getupdate();
  }, []);
  async function checkReports() {
    // returns boolean value
    const unsentReports = await crashlytics().checkForUnsentReports();
    return unsentReports;
  }
  const exceptionhandler = (error, isFatal) => {
    if (isFatal) {
      crashlytics().log('App.tsx');
      crashlytics().recordError(new Error(error));
    }
    // your error handler function
  };
  setJSExceptionHandler(exceptionhandler, true);
  const hideUpdateAlert = () => {
    setIsUpdateAvailable(false);
  };
  const getupdate = async () => {
    (await checkReports()) && crashlytics().sendUnsentReports();
    if (!__DEV__) {
      Platform.OS === 'android'
        ? inAppUpdates.checkNeedsUpdate().then((result) => {
            if (result.shouldUpdate) {
              const updateOptions = Platform.select({
                android: {
                  updateType: IAUUpdateKind.IMMEDIATE,
                },
              });
              updateOptions && inAppUpdates.startUpdate(updateOptions);
            }
          })
        : VersionCheck.needUpdate().then((res: any) => {
            if (res?.isNeeded) {
              setIsUpdateAvailable(true);
              setUrl(res?.storeUrl);
            }
          });
    }
  };

  Icon.loadFont();
  return (
    <ErrorBoundary FallbackComponent={ErrorComponent}>
      
      {isUpdateAvailable ? (
        <AppUpdateModal hideUpdateAlert={hideUpdateAlert} url={url} />
      ) : (
        <Setup />
        
      )}
    </ErrorBoundary>
  );
}

export default App;
