import { DateTimePickerProps } from '../interfaces';
import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import CommonStyles from '../screens/CommonStyles';
import { _Text, _View } from '../components';
import { whiteThemeColors } from '../theme';
const DateTimePickerIos: React.FC<DateTimePickerProps> = ({
  data,
  onConfirm,
  minimumDate,
  mode,
  isVisible,
  setisVisible,
}) => {
  const [timeOrDate, setTimeOrDate] = useState(new Date(data));
  function okayPressed(value: any) {
    setisVisible(false);
    if (Platform.OS === 'android') {
      onConfirm(value);
    }
    else onConfirm(timeOrDate);
  }
  const closePicker = () => {
    setisVisible(false);
  };
  return (
    <_View flex={1}>
      <Modal
        transparent={true}
        animationType='slide'
        visible={isVisible}
        supportedOrientations={['portrait', 'landscape']}
      >
        <_View style={styles.mainContainer}>
          <_View style={styles.container}>
            <_Text
              style={{
                fontSize: 16,
                alignSelf: 'center',
                color: whiteThemeColors.primaryTextColor,
                fontFamily: CommonStyles.fonts.semiBold,
                marginRight: mode === 'time' ? 15 : 0,
              }}
            >
              {mode === 'time' ? 'Select Time' : 'Select Date'}
            </_Text>
            <DatePicker
              date={new Date(timeOrDate)}
              onDateChange={(value) => {
                setTimeOrDate(value);
              }}
              textColor='black'
              minimumDate={mode === 'time' ? undefined : minimumDate}
              mode={mode}
              style={{ alignSelf: 'center', marginTop: 15 }}
            />
            <_View style={styles.btnContainer}>
              <TouchableOpacity
                style={[styles.btnCancel]}
                onPress={closePicker}
              >
                <_Text style={styles.btnCancelTxt}>Cancel</_Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnOkay}
                onPress={() => okayPressed(timeOrDate)}
              >
                <_Text style={styles.btnOkayTxt}>OK</_Text>
              </TouchableOpacity>
            </_View>
          </_View>
        </_View>
      </Modal>
    </_View>
  );
};

export { DateTimePickerIos };

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 20,
    width: '100%',
    maxWidth: 350,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
    height: 33,
    marginTop: 15,
  },
  btnOkay: {
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    borderRadius: 10,
  },
  btnOkayTxt: {
    color: whiteThemeColors.white,
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
  },
  btnCancel: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.greyDark + 40,
    borderRadius: 10,
  },
  btnCancelTxt: {
    color: whiteThemeColors.greyDark,
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
  },
});
