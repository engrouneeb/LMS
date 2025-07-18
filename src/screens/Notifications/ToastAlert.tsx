import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { View } from 'react-native';
interface props {
  title?: string;
  msg?: string;
  onPress?: () => void;
  onHide?: () => void;
}
const ToastAlert: React.FC<props> = ({ title, msg, onPress, onHide }) => {
  useEffect(() => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: title,
      text2: msg,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 20,
      onShow: () => {},
      onHide: onHide, // called when Toast hides (if `autoHide` was set to `true`)
      onPress: onPress,
      props: {},
    });
  }, [title, msg, onPress]);

  return <View />;
};

export default ToastAlert;
