import React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
// import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Provider } from 'react-redux';
import Navigator from '../navigation/MainNav';
import store from '../store';
import OfflineNotice from '../OfflineNotice';
const Setup = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Navigator />
        <OfflineNotice />
        {/* <Toast ref={(ref: any) => Toast?.setRef(ref)} /> */}
      </View>
    </Provider>
  );
};
export default Setup;
