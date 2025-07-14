import { Pressable, StyleSheet } from 'react-native';
import { Keyboard } from 'react-native';
import { SingleTextInput } from '../ContactCard/components/SingleTextInput';
import {
  FamilyInfoCardInterface,
  addUpdateStudentInfoInterface,
  FamilyInfoType,
} from 'interfaces';
import React, { FC, useEffect, useReducer, useState } from 'react';
import { Alert, Modal, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from 'utilities';
import ApiEndpoints from '../../../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../../../data/DAL';
import {
  _Text,
  _TextInput,
  _VectorIcons,
  _View,
} from '../../../../../../../../components';
import { FamilyInfoInterface } from '../../../../../../../../interfaces';
import { intialState, reducer } from './State';
import Loading from '../../../../../../../Loader/Loading';
import { loading } from '../.../../../../../../../../../actions/AsyncStorage';
import { useDispatch } from 'react-redux';
import WhiteLabelConfig from '../../../../../../../../WhiteLabelConfig';
interface familyInfoInterface {
  city: string;
  county?: any;
  emergencyContactInfo: string;
  endDate?: any;
  familyId: number;
  familyLocationId: number;
  familyName: string;
  famiyGuidString?: any;
  famliyGuid: string;
  healthInsuranceCarrier?: any;
  homeAddress: string;
  importStudents?: any;
  isParentFamily: boolean;
  primaryPhone: string;
  referral: string;
  startDate?: any;
  state: string;
  studentsCount: number;
  zip: string;
}

interface FamilyInfoModalInterface extends FamilyInfoCardInterface {
  onPress: (val: familyInfoInterface) => void;
  showModal: boolean;
  familyInfo: FamilyInfoType;
}

export const FamilyInfoUpdateModal: FC<FamilyInfoModalInterface> = ({
  familyInfo,
  onPress,
  showModal,
}) => {
  const [isKeyboardOpened, setIsKeyboardOpened] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(showModal);
  const [state, _setState] = useReducer(reducer, intialState);
  const { PostSecured } = DataAccess();
  const dispatch = useDispatch();
  const setState = (type: string, data: any) => _setState({ type, data });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpened(true);
      },
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
  useEffect(() => {
    setShowUpdateModal(showModal);
    setState('intialsState', familyInfo);
  }, [showModal]);
  const onChangeValue: (val: string, type: string) => void = (val, type) =>
    setState(type, val);
  const updateInfo = async () => {
    const familyInfo: FamilyInfoInterface = state;
    dispatch(loading(true));
    // call to api to submitt changes
    const Endpoint = ApiEndpoints.AddUpdateStudentInfoDetail;
    let params: addUpdateStudentInfoInterface = {};
    params.contactInfo = [];
    params.familyInfo = familyInfo;
    params.studentInfo = [];
    setTimeout(() => {
      dispatch(loading(false));
    }, 3000);
    const res = await PostSecured(Endpoint, params);
    if (res?.key) {
      onPress(state);
      setShowUpdateModal(false);
    } else Alert.alert('Alert', res?.value);
  };
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='slide'
      transparent={true}
      visible={showUpdateModal}
    >
      <_View style={styles.container}>
        <_View
          style={[
            styles.subContainer,
            {
              height: isKeyboardOpened ? '95%' : '70%',
            },
          ]}
        >
          <_View style={styles.topBarContainer}>
            <_View style={styles.topBar} />
          </_View>

          <_View style={styles.titleContainer}>
            <_Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: whiteThemeColors.primary,
              }}
            >
              Family Information
            </_Text>
          </_View>
          <SingleTextInput
            icon={{ type: 'Ionicons', name: 'person' }}
            placeholder={'Enter family Name'}
            value={state?.familyName}
            onChangeText={(val) => onChangeValue(val, 'familyName')}
          />
          <SingleTextInput
            icon={{ type: 'Entypo', name: 'home' }}
            placeholder={'Enter home address'}
            value={state?.homeAddress}
            onChangeText={(val) => onChangeValue(val, 'homeAddress')}
          />
          <SingleTextInput
            icon={{ type: 'MaterialCommunityIcons', name: 'home-city' }}
            placeholder={'Enter city'}
            value={state?.city}
            onChangeText={(val) => onChangeValue(val, 'city')}
          />
          <SingleTextInput
            icon={{ type: 'MaterialCommunityIcons', name: 'home-map-marker' }}
            placeholder={'Enter state'}
            value={state?.state}
            onChangeText={(val) => onChangeValue(val, 'state')}
          />
          <SingleTextInput
            icon={{ type: 'MaterialIcons', name: 'location-on' }}
            placeholder={'Enter zip code'}
            value={state?.zip}
            onChangeText={(val) => onChangeValue(val, 'zip')}
          />
          <SingleTextInput
            icon={{ type: 'MaterialCommunityIcons', name: 'phone-classic' }}
            placeholder={'Enter phone number'}
            value={state?.primaryPhone}
            onChangeText={(val) => onChangeValue(val, 'primaryPhone')}
          />
          <SingleTextInput
            icon={{ type: 'MaterialIcons', name: 'contact-phone' }}
            placeholder={'Enter emergency contact info'}
            value={state?.emergencyContactInfo}
            onChangeText={(val) => onChangeValue(val, 'emergencyContactInfo')}
          />
          <_View style={styles.saveChangesContainer}>
            <Pressable onPress={updateInfo} style={styles.btnSave}>
              <_Text style={styles.btnSaveTxt}>Save Changes</_Text>
            </Pressable>
          </_View>
          <_View style={styles.closeBtnContaienr}>
            <Pressable
              onPress={() => {
                setShowUpdateModal(false);
                onPress(state);
              }}
              style={styles.closeBtn}
            >
              <_Text style={styles.closeBtnTxt}>Close</_Text>
            </Pressable>
          </_View>
        </_View>
        <Loading />
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
    marginBottom: 10,
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
    borderRadius: 5,
  },
  btnSaveTxt: {
    color: whiteThemeColors.white,
    fontSize: 16,
    fontWeight: '500',
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
    borderColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },
  closeBtnTxt: {
    color: whiteThemeColors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
});
