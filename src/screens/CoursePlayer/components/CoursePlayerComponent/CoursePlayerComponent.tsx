import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useReducer, useState } from 'react';
import { Alert, Dimensions, FlatList, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTerminologyLabel,
  isAdmin,
  isParent,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import { NoCourse } from '../../../../../assets/NoCourse.js';
import ApiEndpoints from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import { hp } from '../../../../Helpers/Responsiveness';
import {
  assignCoursesFailed,
  assignCoursesSuccess,
} from '../../../../actions/AssignCoursesAction';
import { loading } from '../../../../actions/AsyncStorage';
import { CP_studentProgress } from '../../../../actions/CoursePlayerStudentActions';
import { _Screen, _Text, _View, endpoint } from '../../../../components';
import DrawerScreens from '../../../../navigation/Drawer/DrawerScreenNames';
import { useLogin } from '../../../../navigation/MainNav';
import { Appstate } from '../../../../reducers/Appstate';
import Screens from '../../../../screenNames';
import Header from '../../../Headers';
import { _ActivityIndicator } from '../../../Loader';
import Search from '../../../Search';
import { reducer, stateConstant } from './States';
import { RenderCard } from './components/RenderCard';
import { styles } from './styles';
// import { ReturnPage } from '../../../../constants.js';
const MESSAGE_TO_CLASS = 'messageToClass';
const ASSIGNSTUDENT = 'assignStudents';
const Class_Overview = 'classOverview';
interface props {
  navigation?: any;
  role: string;
  userID: number;
}
export const CoursePlayerComponent: React.FC<props> = ({ role, userID }) => {
  const { Get } = DataAccess();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const {
    data: Courses,
    isdataLoaded,
    loading: isLoading,
  } = useSelector((state: Appstate) => state.coursePlayerContentReducer);
  const selectedLanguage = useSelector((state: Appstate) => state.language);
  const { coursesScreen } = selectedLanguage;
  const [state, _setState] = useReducer(reducer, stateConstant.INTIAL_STATE);
  const setState = (type: any, data: any) => _setState({ type, data });
  const { classMenu } = useSelector((state: Appstate) => state.language);
  const [header] = React.useState(classMenu);
  const { orientation } = useLogin();
  const [isVisible, setisVisible] = useState(false);
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
    setState(stateConstant.IS_USER_SEARCHING, false);
    let w =
      Dimensions.get('screen').height > Dimensions.get('screen').width
        ? Dimensions.get('screen').width
        : Dimensions.get('screen').height;
    setState(stateConstant.COURSES, Courses);
    setState(stateConstant.FILTERED_DATA, Courses);
    setState(stateConstant.WIDTH, w);
    return () => {
      setState(stateConstant.INTIAL_STATE, {});
    };
  }, []);
  useEffect(() => {
    loadAllCourses();
  }, []);
  useEffect(() => {
    if (orientation) setState(stateConstant.ORIENTATION, orientation);
  }, [orientation]);
  const loadAllCourses = () => {
    let Endpoint: endpoint = ApiEndpoints.GetCoursePlayerContent;
    Endpoint.params = `?Take=${-1}&Skip=${0}`;
    Get(Endpoint).then((res: any) => {
      let obj = {
        isSearching: false,
        hasMoreData: false,
        isUserSearching: false,
        courses: res.coursesDetail,
        filteredData: res.coursesDetail,
      };
      setState(stateConstant.LOAD_ALL_COURSES, obj);
    });
  };

  const handleBack = () => {
    navigation.navigate(DrawerScreens?.dashboard?.name);
    return true;
  };

  const handelPopUpMenu = (status: boolean, id: number) => {
    if (state.selectedCourseId == id && state.popUpShown) {
      setState(stateConstant.POPUP_SHOWN, false);
      setState(stateConstant.SELECTED_COURSE_ID, 0);
    } else if (state.selectedCourseId == 0) {
      setState(stateConstant.POPUP_SHOWN, status);
      setState(stateConstant.SELECTED_COURSE_ID, id);
    } else if (
      state.selectedCourseId != 0 &&
      state.selectedCourseId != id &&
      state.popUpShown
    ) {
      setState(stateConstant.POPUP_SHOWN, false);
      setState(stateConstant.SELECTED_COURSE_ID, 0);
    } else {
      setState(stateConstant.POPUP_SHOWN, status);
      setState(stateConstant.SELECTED_COURSE_ID, id);
    }
  };
  const onSelectCourse = (
    courseId: number,
    courseName: string,
    courseImage: string,
  ) => {
    dispatch(CP_studentProgress(false));
    navigation.navigate(Screens.courseDetails.name, {
      courseID: courseId,
      courseName: courseName,
      courseImage: courseImage,
      role: role,
      userID: userID,
    });
  };

  const handleCourseMenu = async (courseId: number, menuName: string) => {
    console.log({menuName});
    
    dispatch(loading(true));
    let url: endpoint = ApiEndpoints.getCourseClasses;
    url.params = `?CourseId=${courseId}`;
    let res = await Get(url);
    dispatch(loading(false));
    if (res.error === null) {
      if(menuName==Class_Overview){
       return navigation.navigate("ClassOverview",{courseId:courseId});
      }

      if (res.isJustOneClass === false) {
        dispatch(assignCoursesSuccess(res.classDetail));
        return navigation.navigate(Screens.courseClasses.name, {
          redirectTo: menuName,
          courseID: courseId,
          onClassSelect: onClassSelect,
        });
      } else {
        if (menuName == ASSIGNSTUDENT) {
          onSelectStd(res.classDetail[0]?.value, Screens.coursePlayer.name);
        } else if (menuName == MESSAGE_TO_CLASS) {
          onSelectMessageToClass(
            courseId,
            res.classDetail[0]?.value,
            res.classDetail[0]?.text,
            Screens.coursePlayer.name,
          );
        }else if (menuName == Class_Overview) {
          navigation.navigate("ClassOverview", 
             { courseId: courseId }, // Parameters for the nested screen
          );
      }
    }
    } else {
      dispatch(assignCoursesFailed());
      Alert.alert(`${res.error}`);
    }
  };

  const onClassSelect = (
    courseID: number,
    classID: number,
    className: string,
    menuName: string,
  ) => {
    if (menuName == ASSIGNSTUDENT) {
      onSelectStd(classID, Screens.courseClasses.name);
    } else if (menuName == MESSAGE_TO_CLASS) {
      onSelectMessageToClass(
        courseID,
        classID,
        className,
        Screens.courseClasses.name,
      );
    } else if (menuName == COURSE_CLASSESS) {
      navigation.navigate("CourseClass",{courseId:courseID})
    }
  };
  const onSelectStd = (classId: number, backTo: string) => {
    navigation.navigate(Screens.courseAssignment.name, {
      backTo: backTo,
      classId: classId,
      type: 1,
    });
  };

  const onSelectMessageToClass = (
    courseId: number,
    classId: number,
    className: string,
    backTo: string,
  ) => {
    var sCourse;
    sCourse = state.filteredData.filter((Course: any) => {
      if (Course.courseId == courseId) return Course;
    });
    var selectedCourse = sCourse[0];
    navigation.navigate(Screens.messageToClass.name, {
      backTo: backTo,
      classId: classId,
      className: className,
      classImage: selectedCourse?.courseImage,
      nummerOfStudent: selectedCourse?.numberOfStudent,
    });
  };

  const onChangeText = (data: any) => {
    setState(stateConstant.IS_USER_SEARCHING, true);
    setState(stateConstant.FILTERED_DATA, data);
  };

  const { filteredData, courses } = state;
  return (
    <_Screen
      header={
        <Header
          isBack={false}
          isMenu
          isSearchBtn
          OpenMenu={() => {
            navigation.toggleDrawer();
          }}
          Screen={terminologies['Course']?.pluralLabel || coursesScreen.Courses}
          isLogout={false}
          OpenSearch={() => {
            setisVisible(true);
          }}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
      backgroundColor={whiteThemeColors.background}
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          animSpeed={100}
          data={courses && courses}
          searchKey='courseName'
          outPos={-110}
          inPos={-10}
          onClose={() => {
            setState(stateConstant.IS_SEARCHING, false);
            setisVisible(false);
          }}
          height={60}
          isVisible={isVisible}
        />
      )}
      <_View style={styles.container}>
        {isLoading ? (
          <_View style={styles.loadingContainer}>
            <_ActivityIndicator size='large' />
          </_View>
        ) : isdataLoaded ? (
          <>
            {filteredData && filteredData?.length <= 0 ? (
              <_View style={styles.subContainer}>
                <_View style={styles.noCourseContainer}>
                  <NoCourse />
                  <_Text style={styles.noCourseContainerTxt}>
                    {`No ${terminologies['Course']?.label || 'Course'} Found`}
                  </_Text>
                </_View>
              </_View>
            ) : null}

            {Courses && Courses?.length !== 0 ? (
              <_View
                style={{
                  width: '100%',
                  backgroundColor: whiteThemeColors.background,
                }}
              >
                <FlatList
                  keyExtractor={(item) => item.courseName.toString()}
                  key={state.orienation}
                  refreshing={Boolean(state.isSearching)}
                  contentContainerStyle={{
                    paddingBottom: 50,
                  }}
                  onRefresh={() => {
                    if (!state.isUserSearching && state.hasMoreData) {
                      setState(stateConstant.IS_SEARCHING, true);
                      loadAllCourses();
                    } else {
                      setState(stateConstant.IS_SEARCHING, false);
                    }
                  }}
                  initialNumToRender={8}
                  style={{
                    height:
                      Platform.OS === 'ios'
                        ? Dimensions.get('window').height - hp(15)
                        : Dimensions.get('window').height - hp(5),
                    width: '100%',
                  }}
                  numColumns={state.orienation == 'LANDSCAPE' ? 2 : 1}
                  data={filteredData}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <RenderCard
                      item={item}
                      index={index}
                      width={state.width}
                      coruseId={item.courseId}
                      courses={Courses}
                      role={role}
                      userID={userID}
                      onSelectCourse={onSelectCourse}
                      onSelectCourseMenu={handleCourseMenu}
                      key={index.toString() + '---'}
                      handelPopUpMenu={handelPopUpMenu}
                      isPopUpShown={state.popUpShown}
                      selectedCourseId={state.selectedCourseId}
                      orienation={state.orienation}
                      header={header}
                    />
                  )}
                  removeClippedSubviews={true}
                  onEndReached={!state.isUserSearching ? loadAllCourses : null}
                  onEndReachedThreshold={0.5}
                  maxToRenderPerBatch={8}
                  legacyImplementation={true}
                />
              </_View>
            ) : null}
          </>
        ) : (
          <_ActivityIndicator
            size={'large'}
            style={{
              paddingTop: 40,
              backgroundColor: whiteThemeColors.background,
            }}
          />
        )}
      </_View>
    </_Screen>
  );
};
