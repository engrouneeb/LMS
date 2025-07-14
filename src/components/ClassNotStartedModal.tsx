import { FC, default as React, useEffect, useState } from 'react';
import { Image, Modal, Platform, StyleSheet } from 'react-native';
import {
  getTerminologyLabel,
  TerminologyMap,
  verticalScale,
  whiteThemeColors,
} from 'utilities';
import { _Button, _Text, _View } from '.';
import CommonStyles from '../screens/CommonStyles';

interface Props {
  visible: boolean;
  setVisible: (val: boolean) => void;
  handleOnlineClass: (val: any) => void;
  courseID?: Number;
  selectedClassId: any;
}

export const ClassNotStartedModal: FC<Props> = ({
  visible,
  setVisible,
  handleOnlineClass,
  selectedClassId,
}) => {
  const [time, setTime] = useState(300);
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {},
  );
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
    };
    fetchTerminologies();
  }, []);
  useEffect(() => {
    setTime(300);
  }, [visible]);
  useEffect(() => {
    let interval: any = null;
    if (time > 0) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (time == 0) {
      setVisible(false);
    }
    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      handleClass();
    }, 30000); // 30,000 milliseconds = 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleClass = async () => {
    handleOnlineClass(selectedClassId);
  };

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
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
            >
              <Image
                source={require('../../assets/waiting.jpg')}
                resizeMode='contain'
                style={{
                  width: 250,
                  // height: 250,
                  height: '90%',
                }}
              />
              <_Text style={styles.headText}>
                {`The ${terminologies['Class']?.label} hasn't begin yet. Waiting for the ${terminologies['Class']?.label} to begin!`}
              </_Text>
            </_View>
            <_Text
              style={{
                alignSelf: 'center',
                fontSize: 20,
                marginTop: 20,
                color: whiteThemeColors.primary + 90,

                fontFamily: CommonStyles.fonts.semiBold,
              }}
            >
              {formatTime(time)}
            </_Text>
          </_View>

          <_Button
            submitting={true}
            width={'80%'}
            borderRadius={15}
            style={[styles.CancleTimeViewButton, { alignSelf: 'center' }]}
            callback={() => {
              setVisible(false);
            }}
            BtnTxt={[
              styles.buttonLabel,
              {
                // fontFamily: CommonStyles.fonts.universalAppFont,
                color: 'white',
                alignSelf: 'center',
              },
            ]}
            btnText={'Close'}
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
    width: '93%',
    height: Platform.OS == 'android' ? '60%' : '55%',
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
    fontSize: 15,
    textAlign: 'center',
    fontFamily: CommonStyles.fonts.semiBold,
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
    height: 40,
    width: '50%',
    marginTop: verticalScale(0.08),
  },
  buttonLabel: {
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 15,
  },
});
