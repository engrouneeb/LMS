import { _Text, _VectorIcons, _View } from 'components';
import React, { FC } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../theme';
import WhiteLabelConfig from '../WhiteLabelConfig';

interface Props {
  visible: boolean;
  title?: string;
  msg?: string;
  firstBtn?: string;
  firstBtnFunc: () => void;
  secondBtn?: any;
  secondBtnFunc?: () => void;
}

export const CustomAlert: FC<Props> = ({
  visible,
  title,
  msg,
  firstBtn,
  firstBtnFunc,
  secondBtn,
  secondBtnFunc,
}) => {
  const getIconName = (type?: string) => {
    switch (type) {
      case 'Error':
        return 'closecircleo';
      case 'Success':
        return 'checkcircleo';
      case 'Warning':
        return 'warning';
      default:
        return 'infocirlceo';
    }
  };
  const getIconColor = (type?: string) => {
    switch (type) {
      case 'Error':
        return whiteThemeColors.red;
      case 'Success':
        return whiteThemeColors.green;
      case 'Warning':
        return whiteThemeColors.orange;
      default:
        return whiteThemeColors.orange;
    }
  };
  return (
    <Modal transparent visible={visible} animationType={'fade'}>
      <_View style={styles.container}>
        <_View style={styles.popupContainer}>
          <_View style={styles.popupHeaderContainer}>
            <_View
              style={{
                backgroundColor: whiteThemeColors.white + 90,
                width: 50,
                height: 50,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <_VectorIcons
                name={getIconName(title)}
                size={25}
                type={'AntDesign'}
                color={getIconColor(title)}
              />
            </_View>

            <_Text style={[styles.headerTxt, { color: getIconColor(title) }]}>
              {title}
            </_Text>
          </_View>
          <_View style={styles.contentContainer}>
            <_Text style={[styles.contentTxt, {}]} numberOfLines={3}>
              {msg}
            </_Text>
          </_View>

          <_View style={styles.btnContainer}>
            {firstBtn && (
              <TouchableOpacity
                onPress={() => {
                  firstBtnFunc();
                }}
                style={styles.btnPrimary}
              >
                <_Text style={[styles.btnPrimaryTxt, {}]}>{firstBtn}</_Text>
              </TouchableOpacity>
            )}
            {secondBtn && (
              <TouchableOpacity
                onPress={secondBtnFunc}
                style={styles.btnSecondary}
              >
                <_Text style={[styles.btnSecondaryTxt, {}]}>{secondBtn}</_Text>
              </TouchableOpacity>
            )}
          </_View>
        </_View>
      </_View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.greyDark + 80,
  },
  popupContainer: {
    minHeight: 150,
    borderRadius: 30,
    width: 300,
    backgroundColor:
      WhiteLabelConfig.APP_VARIANT_NAME == 'stembuilderslms'
        ? '#f2f2f2'
        : whiteThemeColors.background,
    padding: 20,
  },
  popupHeaderContainer: {
    // height: 30,
    width: '100%',
    // flexDirection: 'row',
    alignItems: 'center',

    // paddingTop: 20,
    justifyContent: 'center',

    borderBottomColor: whiteThemeColors.primary + 20,
    // backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 15,
    borderBottomWidth: 0.7,
  },
  headerTxt: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: whiteThemeColors.greyDark,
    fontFamily: 'Montserrat-SemiBold',
    paddingVertical: 8,
  },
  contentContainer: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentTxt: {
    paddingHorizontal: 5,
    alignSelf: 'center',
    color: whiteThemeColors.black,
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
  },
  btnContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginTop: 3,
    paddingHorizontal: 5,
  },
  btnPrimary: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: whiteThemeColors.primary,
  },
  btnSecondary: {
    backgroundColor: whiteThemeColors.white,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  btnPrimaryTxt: {
    marginBottom: -2,
    color: whiteThemeColors.white,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
  },
  btnSecondaryTxt: {
    marginBottom: -2,
    color: whiteThemeColors.black,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
  },
});
