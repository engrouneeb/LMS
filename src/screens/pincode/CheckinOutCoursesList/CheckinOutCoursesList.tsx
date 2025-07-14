import { useNavigation, useRoute } from '@react-navigation/native';
import { _Button, _Screen, _Text, _View, _VectorIcons } from 'components';
import React, { FC, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { isStaff, whiteThemeColors } from 'utilities';
import Header from '../../Headers';
import { CourseCard } from './components';
import { styles } from './styles';
import Screens from '../../../screenNames';
import { useDispatch, useSelector } from 'react-redux';
import {
  CheckInOut,
  checkInSuccess,
  message,
  UpdateUserCheckedInStatus,
} from '../../../actions/PinCodeActions';
import { Appstate } from '../../../reducers/Appstate';
import moment from 'moment';
import { CustomAlert } from 'utilities';
import { CheckinUserInfo } from '../components';
import ScreensNames from '../../../screenNames';
import CommonStyles from 'screens/CommonStyles';
import { SuperadminConfigurationEnum } from '../../../constants';

interface CheckinOutCoursesListProps { }
export const CheckinOutCoursesList: FC<CheckinOutCoursesListProps> = ({ }) => {
  const navigation: any = useNavigation();
  const { params } = useRoute();
  const { user } = params;
  const dispatch: any = useDispatch();
  const selectedLanguage = useSelector((state: Appstate) => state.language);
  const { checkInList, isCheckedIn } = useSelector(
    (state: Appstate) => state.token
  );
  const { individualCheckinScreen } = selectedLanguage;
  const { UserInfo, SuperAdminPermission } = useSelector((state: Appstate) => state.User);
  const [courses, setCourses] = useState<any[]>(checkInList);
  const [submitting, setSubmitting] = useState<boolean>(true);
  const [coursesIds, setCoursesIds] = useState<[]>([]);
  const [alertTitle, setAlertTitle] = useState<string | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(
    undefined
  );
  const [firstBtn, setFirstBtn] = useState<string | undefined>(undefined);
  const [showAlert, setShowAlert] = useState<boolean | undefined>(false);
  const KioskSubjectsMandory = SuperAdminPermission.filter(Obj => Obj.permission == SuperadminConfigurationEnum['KioskSubjectsMandory'] && Obj.grantAccess == true);
  useEffect(() => {
    setCourses(checkInList);
  }, []);

  const onSelectCourse = (id: number) => {
    let ids = coursesIds;
    const index = coursesIds.indexOf(id);
    if (index !== -1) {
      // Number is present, remove it
      ids.splice(index, 1);
    } else {
      // Number is not present, add it
      ids.push(id);
    }

    setCoursesIds(ids);
  };

  const formatDate = (dt: any) => {
    return moment(new Date(dt)).format('ddd MMM Do, YYYY');
  };

  const doCheckIn = async (isCheckIn: boolean) => {
    try {
      let classesIds = params.selectedClass ? Array.from(params.selectedClass) : [];
      const { individualCheckinScreen } = selectedLanguage;
      const { userId } = user;
  
      if (KioskSubjectsMandory.length && coursesIds.length== 0) {
        setAlertTitle('Error');
        setAlertMessage('Subject Selection Required \nPlease select a subject to proceed with the check-in.');
        setFirstBtn('Okay');
        setShowAlert(true);
        return;
      }
      else{
      setSubmitting(false);
      const res = await CheckInOut(isCheckIn, userId, coursesIds, classesIds);
      if (isStaff(UserInfo.roleName) && userId === UserInfo.userID) {
        dispatch(UpdateUserCheckedInStatus(isCheckIn));
      }
      setSubmitting(true);
      if (res.checkedInOutMsg) {
        dispatch(checkInSuccess(res));
        const date = new Date(res.time);
        const formattedDate = formatDate(date);
        const action = isCheckIn
          ? individualCheckinScreen.CheckIn
          : individualCheckinScreen.CheckOut;
  
        dispatch(
          message({
            MainMsg: res.checkedInOutMsg,
            TimeMsg: `${individualCheckinScreen.You} ${action} ${individualCheckinScreen.successfuly} ${individualCheckinScreen.at} ${date.toLocaleTimeString()} ${individualCheckinScreen.on} ${formattedDate}`,
            isGroup: false,
            isCheckIn: isCheckIn,
          })
        );
  
        return navigation.navigate(Screens.message.name);
      } else {
        setAlertTitle('Error');
        setAlertMessage('Something went wrong');
        setFirstBtn('Okay');
        setShowAlert(true);
      }}
    } catch (error) {
      console.error('Error during check-in/out:', error);
      setAlertTitle('Error');
      setAlertMessage('An unexpected error occurred. Please try again.');
      setFirstBtn('Okay');
      setShowAlert(true);
      setSubmitting(true);
    }
  };
  
  const handleBack: () => boolean = () => {
    navigation.goBack();
    return true;
  }

  return (
    <_Screen
      header={
        <Header
          isBack
          goBack={handleBack}
          Screen={'Check-In List'}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
      backgroundColor={whiteThemeColors.background}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ScreensNames.CheckInOutHistory.name, {
            user,
            isClass: false,
          })
        }
        style={styles.historyContainer}
      >
        <_VectorIcons
          type={'MaterialCommunityIcons'}
          name={'history'}
          size={25}
          color={whiteThemeColors.primary}
        />
      </TouchableOpacity>

      <_View style={styles.container}>
        <CheckinUserInfo UserData={params?.user} />
        <_View style={styles.messageContianer}>
          <_Text style={styles.descriptionText}>
            Please select the items you want to check-in by selecting them from
            the list.
          </_Text>
        </_View>
        <_View flex={1}>
          <FlatList
            data={courses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <CourseCard courseDetails={item} onSelect={onSelectCourse} />
            )}
          />
          <_Button
            submitting={submitting}
            callback={() => {
              doCheckIn(!isCheckedIn);
            }}
            borderRadius={10}
            width={'80%'}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: whiteThemeColors.primary,
              height: 40,
              alignSelf: 'center',
            }}
            BtnTxt={{
              color: 'white',
              alignSelf: 'center',
              fontFamily: CommonStyles.fonts.semiBold,
            }}
            btnText={
              Boolean(isCheckedIn)
                ? individualCheckinScreen.CheckOut
                : individualCheckinScreen.CheckIn
            }
          />
        </_View>
      </_View>
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={firstBtn}
          firstBtnFunc={() => setShowAlert(false)}
        />
      )}
    </_Screen>
  );
};
