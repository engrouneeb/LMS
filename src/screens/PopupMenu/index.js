import React, { useRef } from 'react';
import {
  findNodeHandle,
  StyleSheet,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { whiteThemeColors } from 'utilities';
import { _View } from '../../components';

export default PopupMenu = (props) => {
  const icon = useRef();
  const onError = () => {};
  const onPress = () => {
    if (icon) {
      UIManager.showPopupMenu(
        findNodeHandle(icon.current),
        props.actions,
        onError,
        props.onPress
      );
    } else {
    }
  };
  return (
    <TouchableOpacity onPress={onPress} style={props.style}>
      {Boolean(props?.myIcon) ? (
        <_View style={styles.constainer}>
          <Icon
            name='camera'
            size={20}
            color={props.iconColor ? props.iconColor : whiteThemeColors.white}
            ref={icon}
          />
        </_View>
      ) : (
        <Icon
          name={'dots-three-vertical'}
          size={16}
          color={whiteThemeColors.greyDark}
          ref={icon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  constainer: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: whiteThemeColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
