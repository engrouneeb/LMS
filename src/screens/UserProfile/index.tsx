import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {PermissionsAndroid, Pressable} from 'react-native';
import RNFS from 'react-native-fs';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';

import {CustomAlert, whiteThemeColors} from '../../Utilities';
import ApiEndpoints from '../../../data/ApiEndpoints';
import {DataAccess} from '../../../data/DAL';
import {loading} from '../../actions/AsyncStorage';
import {GetUserData} from '../../actions/PinCodeActions';
import {_Screen, _Text, _View} from '../../components';
import DrawerScreens from '../../navigation/Drawer/DrawerScreenNames';
import {Appstate} from '../../reducers/Appstate';
import CstHeader from '../Headers';
import {ChangePasswordModal} from './ChangePasswordModal';
import {Avatar, DropDown, FullScreenImage, UserInfoRow} from './components';
import {styles} from './styles';
import {useDashboard} from '../Dashboard/Hooks/useDashboard';

const UserProfile = () => {
  const dispatch: any = useDispatch();
  const {
    roleName,
    fullName,
    userImag,
    userName,
    firstName,
    lastName,
    email,
    businessCompanyGuid,
    companyUrl,
  } = useSelector((state: Appstate) => state?.User?.UserInfo);
  const navigation: any = useNavigation();
  const [userImage, setUserImage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isHow, setIsHow] = useState(false);
  const [showFullScreenPic, setShowFullScreenPic] = useState(false);
  const [changePasswordModal, setPasswordModal] = useState(false);
  const [quickLinkConfig, setQuickLinkConfig] = useState<
    {name: string; labelName: string | null; status: boolean}[]
  >([]);
  const {PostSecuredFormData} = DataAccess();
  const {getParentQuickLinkConfiguration} = useDashboard();

  const backPress = () => {
    navigation.navigate(DrawerScreens.dashboard.name);
    return true;
  };

  const requestCameraPermission = async () => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (userImag) setUserImage(userImag);
  }, []);
  useEffect(() => {
    let isMounted = true;

    const fetchQuickLinks = async () => {
      try {
        const quickLinksData = await getParentQuickLinkConfiguration();
        if (isMounted && quickLinksData) {
          setQuickLinkConfig(quickLinksData.filter((item: any) => item.status));
        }
      } catch (error) {
        console.error('Error fetching quick links:', error);
      }
    };

    fetchQuickLinks();

    return () => {
      isMounted = false;
    };
  }, []);

  const showImagePicker = () => {
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
      } else if (response?.error) {
        setAlertMessage(response.error);
        setAlertTitle('Error');
        setShowAlert(true);
      } else {
        let imageData: any = response?.assets[0];
        setUserImage(imageData.uri);
        handleFileUpload(imageData);
      }
    });
  };
  const showCameraPicker = () => {
    requestCameraPermission();
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response: any) => {
      if (response.didCancel) {
        setShowAlert(true);
        setAlertMessage('Please give permission');
        setAlertTitle('Error');
      } else if (response.errorCode) {
        setShowAlert(true);
        setAlertMessage(response.errorCode);
        setAlertTitle('Error');
      } else {
        let fileData = response.assets[0];
        setUserImage(fileData.uri);
        handleFileUpload(fileData);
      }
    });
  };

  const handleFileUpload = async (imageData: any) => {
    let fileBase64 = await RNFS.readFile(imageData.uri, 'base64');
    let extnsn = imageData.uri.split('.').pop();
    let fileName = imageData.fileName;
    let endPoint = ApiEndpoints.UpdateUserProfileImage;
    const data = new FormData();
    data.append('Name', fileName);
    data.append('ContentType', imageData.type);
    data.append('Extension', extnsn);
    data.append('FileBase64', fileBase64);
    data.append('ItemId', 0);
    data.append('DependentId', 0);
    dispatch(loading(true));
    PostSecuredFormData(endPoint, data).then(response => {
      dispatch(loading(false));
      dispatch(GetUserData());
      if (response.error) {
        setAlertMessage(response.error_description);
        setAlertTitle('Error');
        setShowAlert(true);
      }
    });
  };
  const isEnabled = (linkName: string) => {
    return quickLinkConfig.some(item => item.name === linkName && item.status);
  };

  return (
    <_Screen
      header={
        <CstHeader
          isMenu
          OpenMenu={() => {
            navigation.toggleDrawer();
            setIsHow(false);
          }}
          Screen={'Profile'}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={backPress}
      backgroundColor={whiteThemeColors.background}>
      <_View style={styles.container}>
        <_View style={styles.profileHeaderContainer}>
          <Avatar
            profilePicUri={userImage}
            isShownDropdown={isHow}
            hideDropdown={setIsHow}
            showFullScreenPic={setShowFullScreenPic}
          />

          <_Text style={styles.userFullNameTxt}>{fullName}</_Text>
          <_Text style={styles.userRoleTxt}>{roleName}</_Text>
          <Pressable
            onPress={() => setPasswordModal(true)}
            style={styles.changePasswordBtn}>
            <_Text style={styles.changePasswordTxt}>Change Password</_Text>
          </Pressable>
        </_View>
        {isHow && (
          <DropDown
            isVisible={isHow}
            setIsVisble={setIsHow}
            showCameraPicker={showCameraPicker}
            showImagePicker={showImagePicker}
          />
        )}
        <_View style={styles.personalInfoContainer}>
          <_Text style={styles.personalInfoTxt}>{'Personal Information'}</_Text>
          <UserInfoRow title={'First Name'} value={firstName} icon={'person'} />
          <UserInfoRow title={'Last Name'} value={lastName} icon={'person'} />
          <UserInfoRow
            title={'User id'}
            value={userName}
            icon={'login'}
            type={'SimpleLineIcons'}
          />
          <UserInfoRow title={'Email'} value={email} icon={'email'} />
        </_View>
        {isEnabled('Connect to Social Media') && (
        <Pressable
          onPress={() => {
            navigation.navigate('Home', {
              screen: 'SocailLogin',
            });
          }}
          style={{
            width: 200,
            height: 35,
            zIndex: 100,
            borderRadius: 10,
            backgroundColor: whiteThemeColors.primary,
            alignSelf: 'flex-end',
            marginRight: 20,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <_Text style={styles.changePasswordTxt}>
            Connect to Social Media
          </_Text>
        </Pressable>
         )}  
      </_View>
      <ChangePasswordModal
        modalVisible={changePasswordModal}
        setModalVisible={(val: boolean) => setPasswordModal(val)}
        userName={userName}
      />
      <FullScreenImage
        imageUri={userImage}
        showFullScreen={showFullScreenPic}
        closeFullScreen={setShowFullScreenPic}
      />
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
    </_Screen>
  );
};

export default UserProfile;
