import { StyleSheet, Modal } from 'react-native';
import React, { FC } from 'react';
import CommonStyles from '../screens/CommonStyles';
import { whiteThemeColors,verticalScale } from '../Utilities';
import { _View, _Text, _TextInput, _Button, _VectorIcons } from './index';
import { OopsModalProps } from '../interfaces';

export const OopsModal: FC<OopsModalProps> = ({
  visible,
  setVisible,
  alertMessage,
}) => {
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      transparent={true}
      visible={visible}
    >
      <_View style={styles.centeredView}>
        <_View style={styles.modalView}>
          <_View style={styles.webViewContainer}>
            <_View
              style={[
                styles.modalInsideView,
                { justifyContent: 'center', alignItems: 'center' },
              ]}
            >
              <_VectorIcons
                type={'AntDesign'}
                name='closecircleo'
                size={80}
                color={whiteThemeColors.red}
              />
              <_Text style={styles.headText}>Oops!</_Text>
            </_View>
            <_Text
              style={[
                styles.headText,
                {
                  fontSize: 13,
                  marginBottom: 5,
                  fontFamily: CommonStyles.fonts.light,
                },
              ]}
            >
              {alertMessage}
            </_Text>
          </_View>

          <_Button
            submitting={true}
            width={'80%'}
            borderRadius={5}
            style={[styles.CancleTimeViewButton, { alignSelf: 'center' }]}
            callback={() => {
              setVisible(false);
            }}
            BtnTxt={[
              styles.buttonLabel,
              {
                color: 'white',
                alignSelf: 'center',
              },
            ]}
            btnText={'Okay'}
          />
        </_View>
      </_View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.6)',
  },
  modalView: {
    position: 'absolute',
    width: '80%',
    height: '37%',
    borderRadius: 25,
    backgroundColor: 'white',
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    right: 20,
    top: 15,
    zIndex: 1,
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.greyLite,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  modalInsideView: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: CommonStyles.fonts.medium,
    marginTop: 15,
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  CancleTimeViewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: CommonStyles.themeClr.backgroundColor,
    // borderWidth: 1,
    // borderRadius: 25,
    // height: verticalScale(0.048),
    // width: scale(0.5),
    height: 40,
    width: '50%',
    marginTop: verticalScale(0.08),
  },
  buttonLabel: {
    fontSize: 15,
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
