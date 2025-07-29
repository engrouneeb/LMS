import {
  addUpdateStudentInfoInterface,
  StudentInfoCardInterface,
} from '../../../../../../../../interfaces';
import moment from 'moment';
import React, {FC, useEffect, useReducer, useState} from 'react';
import {
  Alert,
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import CommonStyles from '../../../../../../../../screens/CommonStyles';
import {
  DateTimePickerIos,
  whiteThemeColors,
} from '../../../../../../../../Utilities';
import {loading} from '../.../../../../../../../../../actions/AsyncStorage';
import ApiEndpoints from '../../../../../../../../../data/ApiEndpoints';
import {DataAccess} from '../../../../../../../../../data/DAL';
import {_Text, _VectorIcons, _View} from '../../../../../../../../components';
import WhiteLabelConfig from '../../../../../../../../WhiteLabelConfig';
import Loader from '../../../../../../../Loader/loader';
import {SingleTextInput} from '../ContactCard/components/SingleTextInput';
import {intialState, reducer} from './State';

type StudentInfoType = {
  firstName: string;
  lastName: string;
  userImage: string;
  gender: '0' | '1' | '3' | '4';
  email: string;
  dob: string;
  studentNumber: string;
  username?: string;
  password: string;
  confirmPassword: string;
};
interface StudentInfoUpdateModalInterface extends StudentInfoCardInterface {
  showModal: boolean;
}
export const StudentInfoUpdateModal: FC<StudentInfoUpdateModalInterface> = ({
  studentInfo,
  onPress,
  onSubmitt,
  showModal,
}) => {
  const dispatch = useDispatch();
  const {PostSecured} = DataAccess();
  const [showUpdateModal, setShowUpdateModal] = useState(showModal);
  const [isKeyboardOpened, setIsKeyboardOpened] = useState(false);
  const [state, _setState] = useReducer(reducer, intialState);
  const [IsVisible, setIsVisible] = useState(false);
  const setState = (type: string, data: any) => _setState({type, data});
  useEffect(() => {
    setShowUpdateModal(showModal);
    setState('intialsState', studentInfo);
  }, [showModal]);
  const onChangeValue: (val: string, type: string) => void = (val, type) =>
    setState(type, val);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardOpened(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardOpened(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const updateInfo = async () => {
    dispatch(loading(true));
    const Endpoint = ApiEndpoints.AddUpdateStudentInfoDetail;
    const params: addUpdateStudentInfoInterface = {};
    params.studentInfo = [state];
    const res = await PostSecured(Endpoint, params);
    dispatch(loading(false));
    if (res?.key) {
      Alert.alert('Success', res?.value);
      setShowUpdateModal(false);
      onSubmitt(state);
    } else Alert.alert('Error', res?.value);
  };

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType="slide"
      transparent={true}
      visible={showUpdateModal}>
      <_View style={styles.container}>
        <_View
          style={[
            styles.subContainer,
            {
              height: isKeyboardOpened ? '100%' : '80%',
            },
          ]}>
          <_View style={styles.topBarContainer}>
            <_View style={styles.topBar} />
          </_View>

          <_View style={styles.titleContainer}>
            <_Text
              style={{
                fontSize: 18,
                fontFamily: CommonStyles.fonts.semiBold,
                color: whiteThemeColors.primary,
              }}>
              Student Information
            </_Text>
          </_View>
          <_Text
            style={{
              fontSize: 12,
              fontFamily: CommonStyles.fonts.regular,
              color: whiteThemeColors.greyDark,
              marginLeft: 10,
              paddingBottom: 20,
            }}>
            Effortlessly update student information and password.
          </_Text>
          <ScrollView>
            <SingleTextInput
              icon={{type: 'Ionicons', name: 'person'}}
              placeholder={'Enter first name'}
              value={state?.firstName}
              onChangeText={val => onChangeValue(val, 'firstName')}
            />
            <SingleTextInput
              icon={{type: 'Ionicons', name: 'person'}}
              placeholder={'Enter last name'}
              value={state?.lastName}
              onChangeText={val => onChangeValue(val, 'lastName')}
            />
            <SingleTextInput
              icon={{type: 'Fontisto', name: 'email'}}
              placeholder={'Enter email'}
              value={state?.email}
              onChangeText={val => onChangeValue(val, 'email')}
            />
            {/* <SingleTextInput
            icon={{ type: 'Ionicons', name: 'person' }}
            placeholder={'Enter gender'}
            value={GenderLookup[state.gender]}
            onChangeText={(val) => onChangeValue(val, 'gender')}
          /> */}
            <Pressable
              style={{
                flexDirection: 'row',
                width: '100%',
                height: 40,
                borderRadius: 10,
                backgroundColor: whiteThemeColors.white + 90,
                paddingHorizontal: 10,
                paddingRight: 10,
                marginBottom: 10,
                alignItems: 'center',
              }}
              onPress={() => setIsVisible(true)}>
              <_VectorIcons
                type={'Ionicons'}
                name={'calendar'}
                size={18}
                color={whiteThemeColors.primary}
              />
              <_Text style={{fontSize: 14, marginLeft: 10}}>
                {moment(state?.dob).format('MMM DD, YYYY')}
              </_Text>
            </Pressable>
            {/* <SingleTextInput
              icon={{ type: 'Entypo', name: 'email' }}
              placeholder={'Enter username'}
              value={state?.username}
              onChangeText={(val) => onChangeValue(val, 'username')}
            /> */}
            {/* <SingleTextInput
              icon={{ type: 'Fontisto', name: 'locked' }}
              placeholder={'Enter password'}
              value={state?.password}
              onChangeText={(val) => onChangeValue(val, 'password')}
              isSecured
            />
            <SingleTextInput
              icon={{ type: 'Fontisto', name: 'locked' }}
              placeholder={'Enter confirmPassword'}
              value={state?.confirmPassword}
              onChangeText={(val) => onChangeValue(val, 'confirmPassword')}
              isSecured
            /> */}
            <_View style={styles.saveChangesContainer}>
              <Pressable onPress={updateInfo} style={styles.btnSave}>
                <_Text style={styles.btnSaveTxt}>Save Changes</_Text>
              </Pressable>
            </_View>
            <_View style={styles.closeBtnContaienr}>
              <Pressable
                onPress={() => {
                  setShowUpdateModal(false);
                  onPress();
                }}
                style={styles.closeBtn}>
                <_Text style={styles.closeBtnTxt}>Close</_Text>
              </Pressable>
            </_View>
            {IsVisible && (
              <DateTimePickerIos
                onConfirm={(date: Date) => {
                  onChangeValue(date.toISOString(), 'dob');
                  onChangeValue(moment(date).format('MM/DD/YYYY'), 'birthDate');
                }}
                data={new Date(state?.dob)}
                mode="date"
                isVisible={IsVisible}
                setisVisible={setIsVisible}
              />
            )}
          </ScrollView>
        </_View>
      </_View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.6)',
  },
  subContainer: {
    width: '100%',
    backgroundColor: whiteThemeColors.background,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingHorizontal: 10,
  },
  topBarContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    marginTop: 3,
    height: 5,
    width: '30%',
    backgroundColor: whiteThemeColors.black + 50,
    alignSelf: 'center',
    borderRadius: 5,
  },
  titleContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saveChangesContainer: {
    width: '100%',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  btnSave: {
    width: '100%',
    height: 40,
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  btnSaveTxt: {
    color: whiteThemeColors.white,
    fontSize: 16,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  closeBtnContaienr: {
    width: '100%',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  closeBtn: {
    width: '100%',
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: whiteThemeColors.white + 90,
  },
  closeBtnTxt: {
    color: whiteThemeColors.primary,
    fontSize: 16,

    fontFamily: CommonStyles.fonts.semiBold,
  },
});
