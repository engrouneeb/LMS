import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import CommonStyles from 'screens/CommonStyles';
import {
  CustomAlert,
  DateTimePickerIos,
  convertUTCDateToLocalDateStringFormat,
  whiteThemeColors,
} from 'utilities';
import {
  _Button,
  _StyledTextInput,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../../components';
import { Appstate } from '../../../../../reducers/Appstate';
let isSelect = false;
interface props {
  isEdit: any;
  timeIn: any;
  timeOut: any;
  title?: any;
  comment?: any;
  handleModalState: (st: any) => void;
  updateLocalState?: (Object: any, tpe: any) => void;
  postData?: (obj: any) => void;
  showModal: any;
  selectedUser: any;
  selectedDate: any;
}
const TimeOffModal: React.FC<props> = ({
  isEdit,
  timeIn,
  timeOut,
  title,
  comment,
  handleModalState,
  updateLocalState,
  selectedUser,
  postData,
  selectedDate,
  showModal,
}) => {
  const [, setSelectedItem] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [comments, setComment] = useState('');
  const [titles, setTitle] = useState('');
  const [startTimeSelected, setStartTimeSelection] = useState(true);
  const { addTimeOffScreen } = useSelector((state: Appstate) => state.language);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isvisible, setisvisble] = useState(false);
  useEffect(() => {
    setSelectedItem(null);
    setStartTime('');
    setEndTime('');
    setComment('');
    setTitle('');
    setStartTimeSelection(false);
  }, []);

  useEffect(() => {
    if (isEdit === true) {
      setStartTime(timeIn);
      setEndTime(timeOut);
      setTitle(title);
      setComment(comment);
    } else {
      setStartTime('');
      setEndTime('');
      setComment('');
      setTitle('');
    }
  }, [timeIn, timeOut, isEdit]);

  const handleTimeConfirm = (time: any) => {
    isSelect = false;
    if (time === null) {
      return;
    }
    let currentTime = moment(time).format('hh:mm A');
    if (startTimeSelected) setStartTime(currentTime);
    else setEndTime(currentTime);
  };
  const onSubmitAddForm = () => {
    let sTime = moment(startTime, 'h:mma');
    let eTime = moment(endTime, 'h:mma');
    if (titles.trim().length == 0) {
      setAlertTitle('Error');
      setAlertMessage('Please enter Title');
      setShowAlert(true);
    } else if (startTime.trim().length == 0) {
      setAlertTitle('Error');
      setAlertMessage('Please select start Time');
      setShowAlert(true);
    } else if (endTime.trim().length == 0) {
      setAlertTitle('Error');
      setAlertMessage('Please select end Time');
      setShowAlert(true);
    } else if (sTime.isBefore(eTime)) {
      let Object;
      Object = {
        title: titles,
        startTime: startTime,
        endTime: endTime,
        comment: comments,
      };
      handleModalState(false);
      updateLocalState?.(Object, 'Add');
      postData?.(Object);
    } else {
      setAlertTitle('Error');
      setAlertMessage('End time must be greater than start time for TimeOff');
      setShowAlert(true);
    }
  };

  return (
    <_View flex={1}>
      <Modal
        transparent
        animationType='fade'
        visible={showModal}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={() => handleModalState(false)}
      >
        <_View style={_styles.wholeScreenContainer}>
          <_View style={_styles.modalPage}>
            <_View style={_styles.modalHeader}>
              <_Text style={_styles.headerTxt}>
                {addTimeOffScreen.AddTimeFor}
              </_Text>
              <_Text
                style={[
                  _styles.headerTxt,
                  {
                    color: whiteThemeColors.primary,
                    textTransform: 'capitalize',
                    fontFamily: CommonStyles.fonts.semiBold,
                  },
                ]}
              >
                {selectedUser && selectedUser.length > 20
                  ? `  ${selectedUser.substring(0, 20)}...`
                  : `  ${selectedUser}`}
              </_Text>
              <TouchableOpacity
                onPress={() => {
                  handleModalState(false);
                }}
                style={_styles.closeBtn}
              >
                <_VectorIcons
                  type='MaterialCommunityIcons'
                  name='close'
                  color={whiteThemeColors.primary}
                  size={20}
                />
              </TouchableOpacity>
            </_View>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'position' : 'height'}
              enabled
              keyboardVerticalOffset={Platform.OS === 'android' ? -180 : -10}
              style={{ flex: 1 }}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <_View style={_styles.bodyContainer}>
                  <_View
                    style={[
                      {
                        width: '50%',
                        alignSelf: 'center',
                        marginHorizontal: 100,
                        height: 40,
                        borderRadius: 8,
                        backgroundColor: whiteThemeColors.primary + 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}
                  >
                    <_Text
                      style={{
                        color: whiteThemeColors.greyDark,
                        fontSize: 18,
                        fontFamily: CommonStyles.fonts.semiBold,
                      }}
                    >
                      {convertUTCDateToLocalDateStringFormat(selectedDate)}
                    </_Text>
                  </_View>
                  <_View style={_styles.singleRowContainer}>
                    <_Text style={_styles.titleTxt}>
                      {addTimeOffScreen.Name}
                    </_Text>
                    <_View style={_styles.componentContainer}>
                      <_StyledTextInput
                        width={'100%'}
                        placeholder='Enter Name'
                        placeholderTextColor='grey'
                        onChangeText={(titleTxt) => {
                          setTitle(titleTxt);
                        }}
                        value={titles}
                        style={_styles.txtInput}
                      />
                    </_View>
                  </_View>

                  <_View style={_styles.singleRowContainer}>
                    <_Text style={_styles.titleTxt}>
                      {addTimeOffScreen.StartTime}
                    </_Text>
                    <_View style={_styles.componentContainer}>
                      <TouchableOpacity
                        style={[_styles.componentBtn]}
                        onPress={() => {
                          setisvisble(true);
                          setStartTimeSelection(true);
                        }}
                      >
                        {startTime !== '' ? (
                          <_Text style={_styles.componentBtnTxt}>
                            {startTime}
                          </_Text>
                        ) : (
                          <_Text style={_styles.componentBtnTxt}>
                            {addTimeOffScreen.SelectStartTime}
                          </_Text>
                        )}
                        <_View style={_styles.iconContainer}>
                          <_VectorIcons
                            type={'MaterialCommunityIcons'}
                            name={'clock-edit-outline'}
                            size={25}
                            color={whiteThemeColors.primary}
                          />
                        </_View>
                      </TouchableOpacity>
                    </_View>
                  </_View>
                  <_View style={_styles.singleRowContainer}>
                    <_Text style={_styles.titleTxt}>
                      {addTimeOffScreen.EndTime}
                    </_Text>
                    <_View style={_styles.componentContainer}>
                      <TouchableOpacity
                        style={[_styles.componentBtn]}
                        onPress={() => {
                          setStartTimeSelection(false);
                          {
                            isSelect
                              ? [
                                  setAlertTitle('Error'),
                                  setAlertMessage(
                                    'Please Select Start Time first',
                                  ),
                                  setShowAlert(true),
                                ]
                              : setisvisble(true);
                          }
                        }}
                      >
                        {endTime !== '' ? (
                          <_Text style={_styles.componentBtnTxt}>
                            {endTime}
                          </_Text>
                        ) : (
                          <_Text style={_styles.componentBtnTxt}>
                            {addTimeOffScreen.SelectEndTime}
                          </_Text>
                        )}
                        <_View style={_styles.iconContainer}>
                          <_VectorIcons
                            type={'MaterialCommunityIcons'}
                            name={'clock-edit-outline'}
                            size={25}
                            color={whiteThemeColors.primary}
                          />
                        </_View>
                      </TouchableOpacity>
                    </_View>
                  </_View>
                  {isvisible && (
                    <DateTimePickerIos
                      onConfirm={(value: string) => handleTimeConfirm(value)}
                      data={new Date().getTime()}
                      mode='time'
                      isVisible={isvisible}
                      setisVisible={setisvisble}
                    />
                  )}
                  <_View style={_styles.singleRowContainer}>
                    <_Text style={_styles.titleTxt}>
                      {addTimeOffScreen.Comment}
                    </_Text>
                    <_View style={[_styles.componentContainer]}>
                      <_StyledTextInput
                        width='100%'
                        placeholder='Enter Comment'
                        placeholderTextColor='grey'
                        onChangeText={(message) => {
                          setComment(message);
                        }}
                        value={comments}
                        style={_styles.commentInputTxt}
                      />
                    </_View>
                  </_View>
                  <_View
                    style={[_styles.singleRowContainer, { marginTop: 10 }]}
                  >
                    <_Button
                      submitting={true}
                      width={'88%'}
                      borderRadius={10}
                      style={[_styles.btn, _styles.shadow]}
                      callback={() => {
                        onSubmitAddForm();
                      }}
                      BtnTxt={{
                        color: 'white',
                        alignSelf: 'center',
                        fontSize: 15,
                        fontFamily: CommonStyles.fonts.semiBold,
                      }}
                      btnText={
                        isEdit === false
                          ? addTimeOffScreen.Add
                          : addTimeOffScreen.Update + ' '
                      }
                    />
                  </_View>
                </_View>
              </ScrollView>
            </KeyboardAvoidingView>
          </_View>
        </_View>

        {showAlert && (
          <CustomAlert
            visible={showAlert}
            title={alertTitle}
            msg={alertMessage}
            firstBtn={'Okay'}
            firstBtnFunc={() => {
              setShowAlert(false);
            }}
          />
        )}
      </Modal>
    </_View>
  );
};

export { TimeOffModal };

const _styles = StyleSheet.create({
  wholeScreenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: whiteThemeColors.black + 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalPage: {
    alignContent: 'center',
    borderRadius: 30,
    alignSelf: 'center',
    width: '96%',
    height: '65%',
    backgroundColor: whiteThemeColors.background,
  },
  modalHeader: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,

    // justifyContent: 'space-evenly',
    padding: 20,

    // alignItems: 'center',
  },
  headerContainer: {
    justifyContent: 'flex-start',
  },
  headerTxt: {
    fontSize: 20,
    fontFamily: CommonStyles.fonts.regular,
    color: 'black',
  },
  closeBtn: {
    height: 30,
    width: 30,

    // justifyContent: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary + 30,
    borderRadius: 8,
    position: 'absolute',
    right: 20,
    top: 20,
  },
  bodyContainer: {
    height: '100%',
    width: '100%',
  },
  singleRowContainer: {
    marginBottom: 10,
    height: 70,
    width: '100%',
    justifyContent: 'center',
  },
  componentContainer: {
    width: '85%',
    alignSelf: 'center',
    height: 45,
  },
  txtInput: {
    paddingHorizontal: 10,
    height: 45,
    borderColor: whiteThemeColors.greyDark,
    fontSize: 14,
    justifyContent: 'center',
  },
  titleTxt: {
    marginLeft: 30,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.primary,
  },
  shadow: {
    shadowColor: whiteThemeColors.greyDark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  componentBtn: {
    padding: 0,
    paddingHorizontal: 15,
    height: 45,
    flexDirection: 'row',
    marginBottom: 2,
    borderColor: whiteThemeColors.greyDark,
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 10,
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: CommonStyles.fonts.medium,
    marginTop: 4,
  },
  componentBtnTxt: {
    color: whiteThemeColors.greyDark,
    fontSize: 14,
    fontFamily: CommonStyles.fonts.medium,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    height: 20,
    marginBottom: 2,
    borderColor: whiteThemeColors.greyDark,
    alignItems: 'center',
  },
  commentInputTxt: {
    paddingLeft: 10,
    fontSize: 14,
    height: 80,
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  btn: {
    height: 45,
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
