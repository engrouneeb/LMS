import React, { useCallback } from 'react';
import { WebView } from 'react-native-webview';
import { useSelector, useDispatch } from 'react-redux';
import { loading } from '../../actions/AsyncStorage';
import { _Screen, _View } from '../../components';
import Header from '../Headers';

const OnlineClass = ({ navigation }) => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const handleBack = useCallback(() => {
    navigation.goBack();
    return true; // disable back button
  }, [navigation]);

  const handleLoadStart = () => {
    dispatch(loading(true));
  };

  const handleLoadEnd = () => {
    dispatch(loading(false));
  };

  return (
    <_Screen
      header={
        <Header
          isBack={true}
          isMenu={false}
          Screen={'Online Class'}
          isLogout={true}
          GoBack={() => navigation.goBack()}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
    >
      <WebView
        source={{ uri: navigation.state.params.data }}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />
    </_Screen>
  );
};

export default OnlineClass;
