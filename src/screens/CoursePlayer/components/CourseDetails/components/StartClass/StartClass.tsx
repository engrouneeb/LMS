import AsyncStorage from '@react-native-async-storage/async-storage';
import { SecureSettInterface, StartClassInterface } from '../../../../../../interfaces';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import {
  getTerminologyLabel,
  Orientation,
  TerminologyMap,
  whiteThemeColors,
} from '../../../../../../Utilities';
import {
  _Button,
  _Text,
  _TextInput,
  _VectorIcons,
  _View,
} from '../../../../../../components';
import { ClassTypesConstants, SuperadminConfigurationEnum } from '../../../../../../constants';
import { useMeetingLogoutHook } from '../../../../../../customHooks';
import { Appstate } from '../../../../../../reducers/Appstate';
import CommonStyles from '../../../../../CommonStyles';
import { styles } from './styles';
import { UnderMaintenance } from './UnderMaintenance';

interface OwnProps {
  onChange: (changeText: string) => void;
  onChangeUrl: (url: string) => void;
  onClose: (val: boolean) => void;
  onSaveClass: (saveText: any) => void;
  onStartClass: (startText: any) => void;
}
type props = OwnProps & StartClassInterface;

const restrictedUsers = ['calibercollageadmin', 'fahad', 'john', 'steve86'];

const _StartClass: React.FC<props> = ({
  onChange,
  onChangeUrl,
  onClose,
  onSaveClass,
  onStartClass,
  showModal,
  classId,
  data,
}) => {
  const { JoinClass } = useMeetingLogoutHook();
  const [classType, setClassType] = useState<number>(0);
  const [classUrl, setClassUrl] = useState<string>('');
  const [enableUrl, setEnableUrl] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<string>('');
  const [intialClassSelected, setIntialClassSelected] = useState<number>();
  const [currentClassSelected, setCurrentClassSelected] = useState<number>();
  const { onlineClass } = useSelector((state: Appstate) => state.language);
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
  const [classTypes, setClassTypes] = useState([]);
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {},
  );
  const {SuperAdminPermission}=useSelector((state:Appstate)=>state.User);  
  const isZoomClass=SuperAdminPermission.filter(Obj=>Obj.permission==SuperadminConfigurationEnum['ZoomClass']&&Obj.grantAccess==true)
  console.log(isZoomClass.length);
  const isGoogleMeetClass=SuperAdminPermission.filter(Obj=>Obj.permission==SuperadminConfigurationEnum['GoogleMeetClass']&&Obj.grantAccess==true);
  
  
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
    };
    fetchTerminologies();
  }, []);

  useEffect(() => {
    fetchModeOfJoiningClass();
  }, [classId, showModal, data]);
  const fetchModeOfJoiningClass = async () => {
    let newArray: any = [];
    let isGoogleMeetClassStatus = false;
    await AsyncStorage.getItem('secureSett')
      .then(
        (response: string | null) => response != null && JSON.parse(response),
      )
      .then((res: SecureSettInterface) => {
        const { secureTerminologies, } = res;
        for (var item in secureTerminologies)
          if (secureTerminologies[item]?.key == 'Calimatic')
            newArray.push(secureTerminologies[item].value);
        newArray.length == 0 && newArray.push('Calimatic');
        if (Boolean(isZoomClass.length)) newArray.push('Zoom')
        if (Boolean(isGoogleMeetClass.length)) {
          newArray.push('Google Meet');
          isGoogleMeetClassStatus = isGoogleMeetClass;
        }
      })
      .catch((CatchError) => {
        console.error({ CatchError });
      });

    setClassTypes(newArray);
    if (data) {
      const { onlineClassType, classUrl } = data;
      setClassType(newArray[onlineClassType - 1]);
      setClassUrl(classUrl);
      setIntialClassSelected(newArray[onlineClassType - 1]);
      setCurrentClassSelected(newArray[onlineClassType - 1]);
      if (
        onlineClassType === ClassTypesConstants.GoogleMeet &&
        isGoogleMeetClassStatus
      )
        setEnableUrl(true);
      else setEnableUrl(false);
    }
  };

  const handlePicker = (value: any) => {
    setCurrentClassSelected(value);
    setClassType(value);
    if (value === 'Google Meet') {
      setEnableUrl(true);
    } else {
      setEnableUrl(false);
    }
    onChange(value);
  };

  const findColor = (value: any) => {
    if (classType === value) {
      return CommonStyles.themeClr.backgroundColor;
    } else {
      return whiteThemeColors.white;
    }
  };

  const findTextColor = (value: any) => {
    if (classType === value) {
      return 'white';
    } else {
      return CommonStyles.themeClr.backgroundColor;
    }
  };

  const onchangeUrl = (value: any) => {
    setClassUrl(value);
    onChangeUrl(value);
  };
  const isValidHttpUrl = (txt: string) => {
    if (Boolean(txt))
      var res: any = txt.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
      );
    return res !== null;
  };

  return restrictedUsers.includes(user?.userName?.toLocaleLowerCase()) ? (
    <UnderMaintenance onClose={onClose} show={showModal} />
  ) : (
    <_View style={styles.container}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={showModal}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={() => {
          onClose(false);
        }}
      >
        <_View style={styles.subContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Orientation
              getOrientation={(o: string) => {
                setOrientation(o);
              }}
            >
              <_View
                style={[
                  styles.modalPage,
                  {
                    marginTop: orientation === 'PORTRAIT' ? '30%' : '1%',
                  },
                ]}
              >
                <_View style={styles.modalHeader}>
                  <_View style={styles.modalHeaderTextContainer}>
                    <_Text style={styles.buttonLabel}>
                      {`${onlineClass.StartOnlineClass.replace(
                        'Class',
                        terminologies['Class']?.label,
                      )}`}
                    </_Text>
                  </_View>
                  <TouchableOpacity
                    style={styles.modalCloseBtn}
                    onPress={() => {
                      onClose(false);
                    }}
                  >
                    <_VectorIcons
                      type='AntDesign'
                      name='close'
                      color={'white'}
                      size={20}
                    />
                  </TouchableOpacity>
                </_View>
                <_View style={styles.classNView}>
                  <_Text
                    style={[
                      CommonStyles.classNameInModal,
                      {
                        color: whiteThemeColors.primaryTextColor,
                        fontFamily: CommonStyles.fonts.medium,
                      },
                    ]}
                  >
                    {data?.className}
                  </_Text>
                </_View>
                {classTypes.map((classtype, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      handlePicker(classtype);
                    }}
                    style={[
                      styles.optionBtnContainer,
                      { backgroundColor: findColor(classtype) },
                    ]}
                    key={index.toString()}
                  >
                    <_Text
                      style={[
                        CommonStyles.className,
                        styles.optionBtnText,
                        {
                          color: findTextColor(classtype),
                          fontFamily: CommonStyles.fonts.semiBold,
                        },
                      ]}
                    >
                      {classtype}
                    </_Text>
                  </TouchableOpacity>
                ))}
                {enableUrl ? (
                  <_View style={styles.TextInpIconContainer}>
                    <_VectorIcons
                      name={'link'}
                      type={'FontAwesome'}
                      color={'lightgrey'}
                      size={20}
                    />
                    <_TextInput
                      autoFocus
                      autoCapitalize='none'
                      clearButtonMode={'while-editing'}
                      value={classUrl?.toLocaleLowerCase()}
                      onChange={(e) =>
                        onchangeUrl(e.nativeEvent.text?.toLocaleLowerCase())
                      }
                      style={[
                        CommonStyles.classTime,
                        styles.textInp,
                        { fontFamily: CommonStyles.fonts.medium, fontSize: 12 },
                      ]}
                      placeholderTextColor='lightgrey'
                      placeholder={onlineClass.EnterUrl}
                    />
                  </_View>
                ) : (
                  <>
                    <_View style={styles.orJoinRunningClassContainer}>
                      <_Text style={styles.horizontalLine} />
                      <_Text style={{ color: whiteThemeColors.primary }}>
                        {'OR'}
                      </_Text>
                      <_Text style={styles.horizontalLine} />
                    </_View>
                    <TouchableOpacity
                      onPress={() => {
                        JoinClass(classId, onClose, showModal);
                      }}
                      style={styles.orJoinRunningClassBtn}
                    >
                      <_VectorIcons
                        type='MaterialCommunityIcons'
                        name='account-multiple-plus-outline'
                        color={whiteThemeColors.primary}
                        size={20}
                        style={{ paddingRight: 10, marginBottom: 3 }}
                      />
                      <_Text
                        style={[
                          CommonStyles.className,
                          { color: whiteThemeColors.primaryTextColor },
                        ]}
                      >
                        {`Join Running ${terminologies['Class']?.label}`}
                      </_Text>
                    </TouchableOpacity>
                  </>
                )}
                <_View style={styles.bottomBtnContainer}>
                  <_Button
                    borderRadius={10}
                    width='40%'
                    submitting={true}
                    loaderColor={whiteThemeColors.white}
                    BtnTxt={[
                      CommonStyles.className,
                      {
                        color: whiteThemeColors.white,
                        fontFamily: CommonStyles.fonts.semiBold,
                      },
                    ]}
                    style={styles.CancleTimeViewButton}
                    btnText={onlineClass.Save}
                    callback={() => {
                      if (classType == 3) {
                        if (isValidHttpUrl(classUrl)) {
                          setIntialClassSelected(classType);
                          onSaveClass(data);
                        } else {
                          Alert.alert('Please enter a valid url');
                        }
                      } else {
                        setIntialClassSelected(classType);
                        onSaveClass(data);
                      }
                    }}
                  />
                  <_Button
                    borderRadius={10}
                    width='40%'
                    submitting={true}
                    loaderColor={whiteThemeColors.white}
                    BtnTxt={[
                      CommonStyles.className,
                      {
                        color: 'white',
                        fontFamily: CommonStyles.fonts.semiBold,
                      },
                    ]}
                    style={[
                      styles.CancleTimeViewButton,
                      { backgroundColor: 'green' },
                    ]}
                    btnText={onlineClass.StartClass.replace(
                      'Class',
                      terminologies['Class']?.label,
                    )}
                    callback={() => {
                      if (currentClassSelected == intialClassSelected) {
                        onStartClass(data);
                      } else {
                        Alert.alert(
                          `Please save the changes in order to start the ${terminologies['Class']?.label}.`,
                        );
                      }
                    }}
                  />
                </_View>
              </_View>
            </Orientation>
          </ScrollView>
        </_View>
      </Modal>
    </_View>
  );
};
export const StartClass = React.memo(_StartClass);
