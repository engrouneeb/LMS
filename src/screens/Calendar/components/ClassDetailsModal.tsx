import { _Text, _VectorIcons, _View } from '../../../components';
import React, { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomAlert,
  getTerminologyLabel,
  isParent,
  isStudent,
  TerminologyMap,
  whiteThemeColors,
} from '../../../Utilities';
import { Appstate } from '../../../reducers/Appstate';
import { _ActivityIndicator } from '../../Loader';
import { ClassDetailsModaleProps } from '../../../interfaces';
import CommonStyles from '../../CommonStyles';
import { InstructorSlotsModal } from './InstructorSlotsModal';
import Loader from '../../Loader/loader';
import { RequestMakeupOrCancelClass } from '../../../actions/ClassActions';
import moment from 'moment';

export const ClassDetailsModal: FC<ClassDetailsModaleProps> = ({
  modalVisible,
  setModalVisible,
  selectedItem,
  onCancelClass,
  onStartClass,
  selectedDate,
  makeupCancelClassStatus,
}) => {
  enum RequestStatus {
    Sent = 1,
    Accepted,
  }
  enum RequestType {
    Cancel = 1,
    MakeUp,
  }
  const userInfo: any = useSelector((state: Appstate) => state.User.UserInfo);
  const { roleName } = userInfo;
  const [loader, setLoader] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState<boolean>(false);
  const [showInstructorSlotModal, setShowInstructorSlotModal] =
    useState<boolean>(false);
  const RequestCancelClassType = 1; // 1 for cancel class;
  const requestDate = moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss.SS');
  const dispatch: any = useDispatch();
  const {
    isClassCancelled,
    isMakeupClass,
    isShowRequest,
    cancelMakeupRequest,
  } = makeupCancelClassStatus;
  const onCloseModal = () => {
    setModalVisible(false);
    setShowInstructorSlotModal(false);
  };
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
    return setLoader(false);
  }, [modalVisible]);
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      transparent={true}
      visible={modalVisible}
    >
      <_View style={styles.centeredView}>
        <_View style={styles.modalView}>
          <_View style={styles.headerContainer}>
            <_Text
              style={styles.headText}
            >{`${terminologies['Class']?.label} Details`}</_Text>

            <TouchableOpacity onPress={onCloseModal} style={styles.crossIcon}>
              <_VectorIcons
                type={'Entypo'}
                name='cross'
                size={15}
                color={whiteThemeColors.black}
                style={{ padding: 5 }}
              />
            </TouchableOpacity>
          </_View>
          <_View style={styles.innerContainer}>
            <_Text style={styles.classNameText}>{selectedItem.className}</_Text>
            <_View style={styles.timingContainer}>
              <_VectorIcons
                type={'Entypo'}
                name='clock'
                size={15}
                color={whiteThemeColors.greyDark}
                style={{ marginRight: 10 }}
              />
              <_Text style={styles.timingText}>
                {`From ${selectedItem.timeFrom} to ${selectedItem.timeTo}`}
              </_Text>
              {selectedItem.isLocalTime && (
                <_Text style={styles.localText}>{`  (Local)`}</_Text>
              )}
            </_View>
            <_View
              style={{ flexDirection: 'row', marginTop: 10, width: '85%' }}
            >
              <_Text
                style={styles.keyText}
              >{`${terminologies['Course']?.label} : `}</_Text>
              <_Text numberOfLines={2} style={styles.valueText}>
                {selectedItem.courseName}
              </_Text>
            </_View>
            <_View>
              <_View style={styles.instructorContainer}>
                <_Text style={styles.keyText}>{'Instructors : '}</_Text>

                <_Text numberOfLines={2} style={styles.valueText}>
                  {selectedItem.instructorName}
                </_Text>
              </_View>
            </_View>
            <_View style={styles.btnsContainer}>
             {!isParent(roleName)&& <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    width:
                      isStudent(roleName)  ? '88%' : '38%',
                  },
                ]}
                onPress={onStartClass}
              >
                {loader ? (
                  <ActivityIndicator
                    color={whiteThemeColors.white}
                    size={'small'}
                  />
                ) : (
                  <_Text style={styles.btnTxt}>
                    {isStudent(roleName)  
                      ? `Join ${terminologies['Class']?.label}`
                      : `Start ${terminologies['Class']?.label}`}
                  </_Text>
                )}
              </TouchableOpacity>}
              {!isStudent(roleName) && !isParent(roleName) && (
                <TouchableOpacity
                  onPress={onCancelClass}
                  style={[
                    styles.btn,
                    {
                      backgroundColor: whiteThemeColors.red,
                    },
                  ]}
                >
                  <_Text
                    style={styles.btnTxt}
                  >{`Cancel ${terminologies['Class']?.label}`}</_Text>
                </TouchableOpacity>
              )}
            </_View>
            {isParent(roleName) && isShowRequest && (
              <_View style={styles.btnsContainer}>
                {Boolean(cancelMakeupRequest.cancelMakeupReqId) ? (
                  <_Text style={styles.cancelRequestSend}>
                    {`${terminologies['Class']?.label} ${
                      RequestType[cancelMakeupRequest.cancelMakeupReqType]
                    } Request ${
                      RequestStatus[cancelMakeupRequest.cancelMakeupReqStatus]
                    }`}
                  </_Text>
                ) : (
                  <>
                    {!isClassCancelled && (
                      <TouchableOpacity
                        onPress={() => {
                          setShowCancelAlert(true);
                        }}
                        style={styles.requestBtn}
                      >
                        <_Text style={styles.requestBtnTxt}>
                          {`Request Cancel ${terminologies['Class']?.label}`}
                        </_Text>
                      </TouchableOpacity>
                    )}
                    {!isMakeupClass && (
                      <TouchableOpacity
                        onPress={() => {
                          setShowInstructorSlotModal(true);
                        }}
                        style={styles.requestBtn}
                      >
                        <_Text style={styles.requestBtnTxt}>
                          {`Request Make-Up ${terminologies['Class']?.label}`}
                        </_Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </_View>
            )}
          </_View>
        </_View>
        {loading && <Loader />}
        <CustomAlert
          visible={showCancelAlert}
          title={'Warning'}
          msg={`Are you sure you want to request for cancel ${terminologies['Class']?.label}?`}
          firstBtn={'Yes'}
          secondBtn={'No'}
          firstBtnFunc={() => {
            // incase of makeupclass will send makeup class id
            const { classId, timingId, makeupClassId } = selectedItem;
            setShowCancelAlert(false);
            setLoading(true);
            dispatch(
              RequestMakeupOrCancelClass(
                classId,
                timingId,
                requestDate,
                0, //dayId is 0 in case of cancel class
                RequestCancelClassType,
                makeupClassId,
              ),
            )
              .then((response: any) => {
                setLoading(false);
                if (response) {
                  Alert.alert('Alert', response.message, [
                    {
                      text: 'Okay',
                      onPress: () => {
                        setShowCancelAlert(false);
                        onCloseModal();
                      },
                    },
                  ]);
                } else
                  Alert.alert('Alert', 'Something went wrong', [
                    {
                      text: 'Okay',
                      onPress: () => {
                        setShowCancelAlert(false);
                        onCloseModal();
                      },
                    },
                  ]);
              })
              .finally(() => {
                setLoading(false);
                // This code will execute regardless of whether the promise is resolved or rejected
              });
          }}
          secondBtnFunc={() => {
            setShowCancelAlert(false);
          }}
        />
        {showInstructorSlotModal && (
          <InstructorSlotsModal
            visible={showInstructorSlotModal}
            onClose={onCloseModal}
            selectedItem={selectedItem}
            selectedDate={requestDate}
          />
        )}
      </_View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.7)',
  },
  modalView: {
    // height: 360,
    backgroundColor: whiteThemeColors.primary,
    width: '90%',
    borderRadius: 35,
    maxHeight: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headText: {
    color: whiteThemeColors.white,
    fontSize: 18,
    fontFamily: CommonStyles.fonts.semiBold,
    textAlign: 'center',
  },

  button: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: whiteThemeColors.white,
    fontSize: 14,
    fontFamily: CommonStyles.fonts.regular,
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.white,
    borderRadius: 10,
    zIndex: 10,
    marginRight: 15,
    marginTop: 10,
    position: 'absolute',
    right: 10,
  },
  inputText: {
    paddingLeft: 15,
    fontSize: 12,
  },
  card: {
    backgroundColor: whiteThemeColors.white,
    width: '90%',
    height: 120,
    alignSelf: 'center',

    marginTop: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
  },
  cardInner: {
    backgroundColor: whiteThemeColors.primary,
    height: '100%',
    width: '15%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerContainer: {
    backgroundColor: whiteThemeColors.background,
    marginTop: 25,
    width: '100%',
    borderRadius: 35,
    paddingHorizontal: 30,
    padding: 20,
    paddingBottom: 5,
  },
  classNameText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: CommonStyles.fonts.medium,
  },
  timingContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  timingText: {
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 13,
    textAlign: 'center',
  },
  localText: {
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 12,
  },
  keyText: {
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 12,
    marginLeft: 42,
  },
  valueText: {
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 12,
    width:"80%"
  },
  instructorContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: '80%',
  },
  btnsContainer: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.green,
    width: '38%',
    height: 30,
    borderRadius: 10,
  },
  btnTxt: {
    fontSize: 12,
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.bold,
  },
  requestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary,
    width: '49%',
    height: 30,
    borderRadius: 8,
  },
  requestBtnTxt: {
    fontSize: 10,
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
    textAlign: 'center',
  },
  cancelRequestSend: {
    fontSize: 12,
    color: whiteThemeColors.red,
    fontFamily: CommonStyles.fonts.semiBold,
    textAlign: 'center',
  },
});
