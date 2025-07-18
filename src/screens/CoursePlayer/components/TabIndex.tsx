import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomAlert,
  StudentInterface,
  isStudent,
  whiteThemeColors,
} from '../../../Utilities';
import ApiEndPoint from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  courseDetailFailed,
  courseDetailLoading,
  courseDetailSuccess,
} from '../../../actions/CourseDetailsAction';
import {
  CP_studentFailed,
  CP_studentLoading,
  CP_studentSuccess,
} from '../../../actions/CoursePlayerStudentActions';
import { _Screen, _Text, _View, endpoint } from '../../../components';
import { TabIndexInterface } from '../../../interfaces';
import { Appstate } from '../../../reducers/Appstate';
import Header from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
import { StudentsList, TabViewComponent } from './common';
const _TabIndex: React.FC<TabIndexInterface> = ({ navigation, route }) => {
  const { Get } = DataAccess();
  const dispatch = useDispatch();
  const { loading, success, failed, data }: any = useSelector(
    (state: Appstate) => state.courseDetailReducer,
  );
  const { courseContentScreen } = useSelector(
    (state: Appstate) => state.language,
  );
  const [isVisible, setisVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState(undefined);
  const [alertMessage, setAlertMessage] = useState(undefined);

  useEffect(() => {
    getCourseDetailTabs(route.params.courseID);
  }, []);

  const onBackPress = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    navigation.addListener('willFocus', (payload: any) => {
      if (payload.action.params !== undefined)
        getCourseDetailTabs(payload.action.params.courseID);
      else getCourseDetailTabs(payload.state.params.courseID);
    });
  }, []);
  const getCourseDetailTabs = (courseID: any) => {
    let url: endpoint = ApiEndPoint.GetCourseDetails;
    url.params = `?CourseId=${courseID}`;
    dispatch(courseDetailLoading());
    Get(url)
      .then((res: any) => {
        if (!res) {
          return dispatch(courseDetailFailed());
        }
        return dispatch(courseDetailSuccess(res));
      })
      .catch(() => {
        return dispatch(courseDetailFailed());
      });
  };

  const getStudentDetails = (id: any) => {
    let courseID = route.params.courseID;
    let userId = id > 0 ? id : route.params.userID;
    let url: endpoint = ApiEndPoint.GetCoursePlayerStudentData;
    url.params = `?CourseId=${courseID}&UserId=${userId}&StudentId=${id}`;
    dispatch(CP_studentLoading());
    Get(url)
      .then((res: any) => {
        if (!res) {
          dispatch(CP_studentFailed());
          setAlertTitle(courseContentScreen.Error);
          setAlertMessage(courseContentScreen.CannotGetStudentData);
          setShowAlert(true);
        }

        return dispatch(CP_studentSuccess(res));
      })
      .catch(() => {
        dispatch(CP_studentFailed());
        setAlertTitle(courseContentScreen.Error);
        setAlertMessage(courseContentScreen.CannotGetStudentData);
        setShowAlert(true);
      });
  };

  return (
    <_Screen
      header={
        <Header
          isBack={true}
          isMenu={false}
          Screen={
            Boolean(route?.params?.courseName)
              ? route?.params?.courseName
              : courseContentScreen.CourseContent
          }
          isLogout={false}
          isStudent={
            !isStudent(route?.params?.role as StudentInterface) ? true : false
          }
          OpenStudents={() => {
            // studentRef?.current?.hideModal();

            setisVisible(true);
          }}
          GoBack={() => {
            navigation.goBack();
          }}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={onBackPress}
    >
      {isVisible && (
        <StudentsList
          // ref={studentRef}
          getStudentDetails={getStudentDetails}
          isFromWhiteBoard={false}
          userID={route.params.userID}
          courseId={route.params.courseID}
          isVisible={isVisible}
          setisVisible={setisVisible}
        />
      )}
      {loading ? (
        <_ActivityIndicator size='large' />
      ) : failed ? (
        <_View style={styles.container}>
          <_Text style={styles.text}>
            {courseContentScreen.FailedToLoadData}
          </_Text>
        </_View>
      ) : success ? (
        <TabViewComponent
          navigation={navigation}
          routePath={route}
          tabBar={data.courseFeilds.backlogTabElementsList}
          isCourse={true}
          courseFeilds={data.courseFeilds.backlogFormElementsList}
          courseContent={data.courseChilds.courseChilds}
          role={route.params?.role}
        />
      ) : (
        <></>
      )}
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            if (alertTitle == 'Success') {
              setShowAlert(false);
              navigation.goBack();
            }
            setShowAlert(false);
          }}
        />
      )}
    </_Screen>
  );
};

export const TabIndex = React.memo(_TabIndex);

const styles = StyleSheet.create({
  loaderContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingVertical: 10,
    paddingHorizontal: 15,

    color: whiteThemeColors.primaryTextColor,
  },
});
