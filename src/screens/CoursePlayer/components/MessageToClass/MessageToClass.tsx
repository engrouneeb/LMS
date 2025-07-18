import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  CustomAlert,
  getTerminologyLabel,
  Orientation,
  TerminologyMap,
  whiteThemeColors,
} from '../../../../Utilities';
import NotificationSVG from '../../../../../assets/notificationSVG';
import ApiEndpoints from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import {
  _Screen,
  _Text,
  _TextInput,
  _VectorIcons,
  _View,
} from '../../../../components';
import { NotificationTypes } from '../../../../constants';
import Screens from '../../../../screenNames';
import Header from '../../../Headers';
import { styles } from './styles';
import { MessageToClassInterface } from '../../../../interfaces';
import CommonStyles from '../../../CommonStyles';

const _MessageToClass: React.FC<MessageToClassInterface> = ({
  navigation,
  route,
}) => {
  const { PostSecuredWithParams } = DataAccess();
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [notificationTxt, setNotificationTxt] = useState('');
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
  const handleMessageText = (text: string) => {
    setNotificationTxt(text);
  };

  const handleSendMessageToClass = () => {
    if (notificationTxt.length > 0) {
      let clsName = encodeURIComponent(route.params.className);
      let msg = encodeURIComponent(notificationTxt);
      let url = ApiEndpoints.SendNotificationToClass;
      let params = `?classId=${route.params.classId}&className=${clsName}&message=${msg}&notificationType=${NotificationTypes.SendNotificationToClass}`;
      PostSecuredWithParams(url, params);
      setShowAlert(true);
      setAlertMessage(
        `Notification has been sent to ${terminologies['Class']?.label}`,
      );
      setAlertTitle('Success');
    } else {
      setShowAlert(true);
      setAlertMessage('Please enter message');
      setAlertTitle('Error');
    }
  };

  const goBack = () => {
    if (route.params.backTo === Screens.courseClasses.name) {
      navigation.goBack();
    } else {
      navigation.navigate(Screens.coursePlayer.name);
    }
  };
  useEffect(() => {
    let x =
      Dimensions.get('window').height > Dimensions.get('window').width
        ? Dimensions.get('window').height
        : Dimensions.get('window').width;
    setHeight(x);
  }, [orientation]);
  const handleBack = () => {
    navigation.goBack();
    return true; //disable back button
  };
  return (
    <Orientation
      getOrientation={(o: any) => {
        setOrientation(o);
      }}
    >
      <_Screen
        header={
          <Header
            isBack={true}
            isMenu={false}
            isLogout={false}
            Screen={`Send Notification To ${terminologies['Class']?.label}`}
            GoBack={() => {
              navigation.goBack();
            }}
          />
        }
        flex={1}
        hideTopSafeArea
        onAndroidBack={handleBack}
        backgroundColor={whiteThemeColors.background}
      >
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        >
          <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            enabled
            keyboardVerticalOffset={Platform.OS === 'android' ? -180 : -10}
          >
            <_View
              style={{
                ...styles.container,
                height: orientation == 'PORTRAIT' ? height * 0.2 : height * 0.3,
              }}
            >
              <_View
                style={{
                  ...styles.circle2,
                  bottom: height * 0.1,
                  height: height * 0.13,
                  width: height * 0.13,
                  borderRadius: (height * 0.13) / 2,
                }}
              />
              <NotificationSVG size={height * 0.18} />
            </_View>
            <_View style={styles.nameView}>
              <_Text numberOfLines={2} style={styles.clsName}>
                {route.params.className}
              </_Text>
            </_View>
            <_View style={styles.nameView}>
              <_Text style={styles.detailsText}>
                {`The ${terminologies['Class']?.label} Notification Center transforms the way you engage with your ${terminologies['Class']?.label}, ensuring that everyone is well-informed.`}
              </_Text>
            </_View>
            <_View style={styles.bottomContainer}>
              <_View style={styles.inputContainer}>
                <_TextInput
                  autoFocus
                  value={notificationTxt}
                  onChangeText={(value) => handleMessageText(value)}
                  placeholder='Enter Notification'
                  multiline
                  width='100%'
                  textAlignVertical='top'
                  style={styles.input}
                />
                <_View
                  style={[
                    styles.btnContainer,
                    {
                      justifyContent: Boolean(notificationTxt.length)
                        ? 'space-between'
                        : 'flex-end',
                    },
                  ]}
                >
                  {Boolean(notificationTxt.length) ? (
                    <TouchableOpacity
                      onPress={() => {
                        setNotificationTxt('');
                      }}
                      style={styles.clearBtn}
                    >
                      <_Text
                        style={{
                          fontSize: 14,
                          color: whiteThemeColors.primary,
                          marginRight: 3,
                          fontFamily: CommonStyles.fonts.regular,
                        }}
                      >
                        Clear
                      </_Text>
                      <_VectorIcons
                        name='close'
                        type='MaterialIcons'
                        color={whiteThemeColors.primary}
                        size={15}
                      />
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity
                    onPress={handleSendMessageToClass}
                    style={styles.btn}
                  >
                    <_Text
                      style={{
                        fontSize: 14,
                        color: whiteThemeColors.white,
                        marginRight: 5,
                        fontFamily: CommonStyles.fonts.regular,
                      }}
                    >
                      Send
                    </_Text>
                    <_VectorIcons
                      name='send'
                      type='FontAwesome'
                      color={whiteThemeColors.white}
                      size={13}
                    />
                  </TouchableOpacity>
                </_View>
              </_View>
            </_View>
          </KeyboardAvoidingView>
        </ScrollView>
      </_Screen>
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            if (alertTitle == 'Success') {
              goBack();
            }
            setShowAlert(false);
          }}
        />
      )}
    </Orientation>
  );
};
export const MessageToClass = React.memo(_MessageToClass);
