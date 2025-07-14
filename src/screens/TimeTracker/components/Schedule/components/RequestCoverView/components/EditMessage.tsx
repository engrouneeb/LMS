import { EditMessageInterface } from 'interfaces';
import React, { FC, useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import {
  _Button,
  _Text,
  _TextInput,
  _View,
} from '../../../../../../../components';

const EditMessage: FC<EditMessageInterface> = ({
  handleMsgInputState,
  setMessage,
  message,
  msgInputState,
  loading,
}) => {
  const heightAnim: Animated.Value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (msgInputState === true) {
      Animated.timing(heightAnim, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (msgInputState === false) {
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [msgInputState]);

  return loading ? null : (
    <Animated.View
      style={[
        styles.msgBoxView,
        {
          transform: [
            {
              translateY: heightAnim,
            },
          ],
        },
      ]}
    >
      <_View style={styles.editMsgView}>
        <_Text style={styles.editMsgText}>Message</_Text>
        <_View style={styles.closeButton}>
          <_Button
            submitting={true}
            style={styles.editMsgBtn}
            callback={() => handleMsgInputState(false)}
            btnText={'OK'}
            BtnTxt={styles.editMsgBtnText}
            activeOpacity={0.8}
          />
        </_View>
      </_View>
      <_View style={{ borderBottomWidth: 0 }}>
        <_TextInput
          multiline
          autoFocus
          width={'100%'}
          style={styles.msgInputStyle}
          value={message}
          onChange={(text) => {
            setMessage(text.nativeEvent.text);
          }}
          placeholder='Message'
        />
      </_View>
    </Animated.View>
  );
};
export { EditMessage };
const styles = StyleSheet.create({
  closeButton: {
    height: 25,
    paddingHorizontal: 5,
    flex: 0.11,
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary,
    ...Platform.select({
      android: {
        shadowColor: whiteThemeColors.black,
        shadowOpacity: 1,
        elevation: 8,
        shadowRadius: 20,
      },
    }),
    borderRadius: 5,
  },
  msgBoxView: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
    borderBottomColor: whiteThemeColors.black,
  },
  msgInputStyle: {
    width: '100%',
    borderColor: whiteThemeColors.greyDark,
    borderWidth: 1,
    borderRadius: 5,
    height: 70,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
  },
  editMsgView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  editMsgText: {
    color: whiteThemeColors.primaryTextColor,
    marginLeft: 4,
    marginBottom: 10,
    flex: 0.99,
    fontSize: 18,
  },
  editMsgBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  editMsgBtnText: {
    fontSize: 12,
    textAlignVertical: 'center',
    color: whiteThemeColors.textColor.whiteText,
  },
});
