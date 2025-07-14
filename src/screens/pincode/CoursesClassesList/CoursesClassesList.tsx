import { useNavigation, useRoute } from '@react-navigation/native';
import { _Button, _Screen, _Text, _View, _VectorIcons } from 'components';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import { CustomAlert, isStaff } from 'utilities';
import { whiteThemeColors } from 'utilities/colors';
import {
  CheckInOut,
  checkInSuccess,
  message,
  UpdateUserCheckedInStatus,
} from '../../../actions/PinCodeActions';
import Screens from '../../../screenNames';
import Header from '../../Headers';
import Search from '../../Search';
import { CourseClassCard } from './components';
import { styles } from './styles';
import { CheckinUserInfo } from '../components';
import ScreensNames from '../../../screenNames';
import { SuperadminConfigurationEnum } from '../../../constants';

interface CoursesClassesListProps { }

export const CoursesClassesList: React.FC<CoursesClassesListProps> = () => {
  const navigation = useNavigation<any>();
  const { params } = useRoute();
  const { user } = params;
  const [Courses, setCourse] = useState();
  const { courseClassescheckInList, checkInList } = useSelector(
    (state: Appstate) => state.token
  );
  const { UserInfo, SuperAdminPermission } = useSelector((state) => state.User);
  const selectedLanguage = useSelector((state: Appstate) => state.language);
  const [filteredCourses, setFilteredCourses] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState<boolean>(true);
  const [selectedClasses, setSelectedClasses] = useState<Set<number>>(
    new Set()
  );
  const [isVisible, setisVisible] = useState(false);
  const dispatch = useDispatch();
  const isKioskClassesMandatory = SuperAdminPermission.filter(Obj => Obj.permission == SuperadminConfigurationEnum['KioskClassesMandatory'] && Obj.grantAccess == true);
  const handleBack = useCallback(() => {
    navigation.goBack();
    return true
  }, [navigation]);

  useEffect(() => {
    setFilteredCourses(courseClassescheckInList);
    setCourse(courseClassescheckInList);
    setSelectedClasses(new Set()); // Reset selectedClasses to empty
  }, [courseClassescheckInList, navigation]);
  const selectClass = (classId: number) => {
    setSelectedClasses((prevSelectedClasses) => {
      const updatedSelection = new Set(prevSelectedClasses);
      if (updatedSelection.has(classId)) {
        updatedSelection.delete(classId);
      } else {
        updatedSelection.add(classId);
      }
      return updatedSelection;
    });
  };

  const onChangeText = (data: any) => {
    setFilteredCourses(data);
  };

  const handleNext = () => {
    const selectedClassesArray = Array.from(selectedClasses);
    if (isKioskClassesMandatory.length && selectedClassesArray.length === 0) {
      setError(true);
      setErrorMsg('Class Selection Required \n Please select a class to proceed with the check-in.');
      return;
    }
    if (checkInList?.length > 0) {
      navigation.navigate(Screens.CheckinOutCoursesList.name, {
        selectedClass: selectedClassesArray,
        user,
      });
    } else {
      doCheckIn(selectedClassesArray);
    }
  };
  

  const doCheckIn = async (Ids: []) => {
    const ischeckin = true;
    const classesIds: [] = Ids;
    const { individualCheckinScreen } = selectedLanguage;
    setSubmitting(false);
    const res = await CheckInOut(ischeckin, user?.userId, [], classesIds);
    isStaff(UserInfo.roleName) &&
      user?.userId == UserInfo.userID &&
      dispatch(UpdateUserCheckedInStatus(ischeckin));
    setSubmitting(true);
    if (res.checkedInOutMsg) {
      dispatch(checkInSuccess(res));
      var dt = new Date(res.time);
      var dd = formatDate(dt);
      var chkdOut = individualCheckinScreen.CheckIn;
      dispatch(
        message({
          MainMsg: res.checkedInOutMsg,
          TimeMsg: `${individualCheckinScreen.You} ${chkdOut} ${individualCheckinScreen.successfuly
            } ${individualCheckinScreen.at} ${dt.toLocaleTimeString()} ${individualCheckinScreen.on
            } ${dd}`,
          isGroup: false,
          isCheckIn: true,
        })
      );
      return navigation.navigate(Screens.message.name);
    } else {
      // show error
      setError(true);
      setErrorMsg('Some thing went wrong.');
    }
  };

  const formatDate = (dt: any) => {
    return moment(new Date(dt)).format('ddd MMM Do, YYYY');
  };
  return (
    <_Screen
      header={
        <Header
          Screen='Class List'
          isBack
          isSearchBtn
          OpenSearch={() => {
            setisVisible(true);
          }}
          goBack={handleBack}
          onAndroidBack={handleBack}
        />
      }
      flex={1}
      hideTopSafeArea
      backgroundColor={whiteThemeColors.background}
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          onClose={() => {
            setisVisible(false);
          }}
          animSpeed={100}
          data={Courses}
          searchKey='subscriptionName,className'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ScreensNames.CheckInOutHistory.name, {
            user: params?.user,
            isClass: true,
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
      <CheckinUserInfo UserData={params?.user} />
      <_View style={styles.container}>
        <FlatList
          data={filteredCourses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CourseClassCard
              courseDetails={item}
              onSelect={selectClass}
              selectedClasses={selectedClasses}
            />
          )}
        />
        <_Button
          submitting={submitting}
          callback={handleNext}
          borderRadius={10}
          width='80%'
          style={styles.nextButton}
          BtnTxt={styles.nextButtonText}
          btnText={checkInList && checkInList.length > 0 ? 'Next' : 'Check-In'}
        />
      </_View>
      {error && (
        <CustomAlert
          visible={error}
          title={'Error'}
          msg={errorMsg}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setError(false);
          }}
        />
      )}
    </_Screen>
  );
};
