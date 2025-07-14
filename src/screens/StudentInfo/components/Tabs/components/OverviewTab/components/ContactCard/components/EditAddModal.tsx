import { ItemProps, addUpdateStudentInfoInterface } from 'interfaces';
import { FC, useEffect, useState } from 'react';
import { Alert, Keyboard, Modal, Pressable, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { CustomAlert, whiteThemeColors } from 'utilities';
import { loading } from '../.../../../../../../../../../../actions/AsyncStorage';
import ApiEndpoints from '../../../../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../../../../data/DAL';
import { _Text, _View } from '../../../../../../../../../components';
import Loading from '../../../../../../../../Loader/Loading';
import { SingleTextInput } from './SingleTextInput';
import WhiteLabelConfig from '../../../../../../../../../WhiteLabelConfig';

interface userData {
  firstName: string;
  lastName: string;
  email: string;
  work: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  userName: string;
}

interface EditAddModalProps {
  idAddNewUSer: boolean;
  visible: boolean;
  index?: number;
  setVisible: (val: boolean) => void;
  userData: userData;
  setUserData: (value: userData | any) => void;
  submitNewUser: (value: userData | any) => void;
  setRePopulate: (value: boolean) => void;
  contactList: ItemProps[];
  familyInfo?: FamilyInfoCardInterface;
}

export const EditAddModal: FC<EditAddModalProps> = ({
  idAddNewUSer = false,
  visible,
  index = -1,
  setVisible,
  userData,
  setUserData,
  submitNewUser,
  setRePopulate,
  contactList,
  familyInfo,
}) => {
  const [isKeyboardOpened, setIsKeyboardOpened] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const { PostSecured } = DataAccess();
  const dispatch = useDispatch();
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
      setRePopulate(true);
    };
  }, []);

  const handleModalSubmission = async () => {
    dispatch(loading(true));
    if (userData.password !== userData.confirmPassword) {
      setAlertTitle('Error');
      setAlertMessage('Password and Confirm password should be same.');
      setShowAlert(true);
      return;
    }

    let updatedContacts: ItemProps[];
    let newContact: ItemProps = {
      contactConfirmPassword: userData.confirmPassword,
      contactEmail: userData.email,
      contactFirstName: userData.firstName,
      contactId: idAddNewUSer ? 0 : contactList[index].contactId,
      contactLastName: userData.lastName,
      contactPassword: userData.password,
      contactUsername: userData.userName,
      isActive: true,
      isLead: true,
      isParentPortalAccessBtn: true,
      parentGuid: idAddNewUSer ? null : contactList[index].parentGuid,
      sectionNo: 0,
      familyId: 0,
      type: '3',
      work: userData.work,
      cell: userData.phoneNumber,
      contactGuidString: idAddNewUSer
        ? ''
        : contactList[index].contactGuidString,
    };
    //  call to api to submitt changes
    updatedContacts = [...contactList];
    if (idAddNewUSer) updatedContacts.push(newContact);
    else updatedContacts[index] = newContact;
    const Endpoint = ApiEndpoints.AddUpdateStudentInfoDetail;
    let params: addUpdateStudentInfoInterface = {};
    params.contactInfo = updatedContacts;
    params.familyInfo = familyInfo;
    params.studentInfo = [];

    const res = await PostSecured(Endpoint, params);
    dispatch(loading(false));
    if (res?.key) {
      Alert.alert('Success', res?.value, [
        {
          text: 'Okay',
          onPress: () => {
            submitNewUser(updatedContacts);
            setVisible(false);
          },
        },
      ]);
    } else Alert.alert('Alert', res?.error_description);
  };

  const handleModalClose = () => {
    setVisible(false);
  };

  const handleOnChangeText = (title: string, value: string) => {
    setUserData((prevState: userData) => ({
      ...prevState,
      [title]: value,
    }));
  };
  return (
    <Modal
      transparent
      visible={visible}
      animationType={'slide'}
      onRequestClose={handleModalClose}
    >
      <_View style={styles.container}>
        <_View
          style={[
            {
              height: isKeyboardOpened ? '95%' : '80%',
            },
            styles.subContainer,
          ]}
        >
          <_View style={styles.topBarContainer}>
            <_View style={styles.topBar} />
          </_View>
          <_View style={styles.headerContainer}>
            <_Text style={styles.modalTitle}>
              {idAddNewUSer ? 'Add New Contact' : 'Update Details'}
            </_Text>
          </_View>

          <_View style={styles.formContainer}>
            <SingleTextInput
              icon={{ type: 'Ionicons', name: 'person' }}
              placeholder={'Enter first Name'}
              value={userData.firstName}
              onChangeText={(value: string) =>
                handleOnChangeText('firstName', value)
              }
            />
            <SingleTextInput
              icon={{ type: 'Ionicons', name: 'person' }}
              placeholder={'Enter last Name'}
              value={userData.lastName}
              onChangeText={(value: string) =>
                handleOnChangeText('lastName', value)
              }
            />
            <SingleTextInput
              icon={{ type: 'Fontisto', name: 'email' }}
              placeholder={'Enter Email'}
              value={userData.email}
              onChangeText={(value: string) =>
                handleOnChangeText('email', value)
              }
            />
            <SingleTextInput
              icon={{ type: 'Feather', name: 'phone-call' }}
              placeholder={'Enter Phone Number'}
              value={userData.phoneNumber}
              onChangeText={(value: string) =>
                handleOnChangeText('phoneNumber', value)
              }
            />
            <SingleTextInput
              icon={{ type: 'MaterialCommunityIcons', name: 'office-building' }}
              placeholder={'Enter Work'}
              value={userData.work}
              onChangeText={(value: string) =>
                handleOnChangeText('work', value)
              }
            />
              {idAddNewUSer&&<><SingleTextInput
              icon={{ type: 'Entypo', name: 'email' }}
              placeholder={'Enter username for portal access'}
              value={userData.userName}
              onChangeText={(value: string) =>
                handleOnChangeText('userName', value)
              }
            />
            <SingleTextInput
              icon={{ type: 'Fontisto', name: 'locked' }}
              placeholder={'Enter password for portal access'}
              value={userData.password}
              onChangeText={(value: string) =>
                handleOnChangeText('password', value)
              }
              isSecured
            />
                 <SingleTextInput
              icon={{ type: 'Fontisto', name: 'locked' }}
              placeholder={'Repeat Password'}
              value={userData.confirmPassword}
              onChangeText={(value: string) =>
                handleOnChangeText('confirmPassword', value)
              }
              isSecured
            /></>}
          </_View>
          <_View style={styles.btnContainer}>
            <Pressable
              onPress={handleModalSubmission}
              style={styles.saveChangesBtn}
            >
              <_Text style={styles.saveChangesTxt}>Save Changes</_Text>
            </Pressable>
          </_View>
          <_View style={styles.btnContainer}>
            <Pressable onPress={handleModalClose} style={styles.closeBtn}>
              <_Text style={styles.closeBtnText}>Close</_Text>
            </Pressable>
          </_View>
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
          secondBtn={'Close'}
          secondBtnFunc={() => {
            setShowAlert(false);
          }}
        />
      )}
      <Loading />
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
    backgroundColor:whiteThemeColors.background,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
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
  headerContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: whiteThemeColors.primary,
  },
  saveChangesBtn: {
    width: '100%',
    height: 40,
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  closeBtn: {
    width: '100%',
    height: 40,
    borderColor: whiteThemeColors.primary,
    // backgroundColor: whiteThemeColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },
  saveChangesTxt: {
    color: whiteThemeColors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  closeBtnText: {
    color: whiteThemeColors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  formContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  btnContainer: {
    width: '100%',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
