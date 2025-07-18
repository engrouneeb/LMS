import React, { useEffect, useReducer, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { _ActivityIndicator } from '../../../../../../Loader';
import {
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from '../../../../../Utilities';
import { AssessmentChart, Challenge, HomeworkChart } from '.';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import {
  _ModalDropdown,
  _Screen,
  _Text,
  _View,
  endpoint,
  stdProgressReportInterface,
} from '../../../../../components';
import CommonStyles from '../../../../CommonStyles';
import Header from '../../../../Headers';
const StudentProgress: React.FC<stdProgressReportInterface> = ({
  navigation,
  route,
}) => {
  const initialState = {
    courseId: 0,
    courseList: [],
    levelList: [],
    courseName: [],
    levelName: [],
    challengeData: {
      labels: [''],
      data: [0],
    },
    assessmentViewData: {
      labels: [''],
      data: [0],
    },
    homeWorkChartData: {
      labels: [''],
      data: [0],
    },
    loading: false,
  };
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'courseId':
        return { ...state, courseId: action.data };
      case 'courseList':
        return { ...state, courseList: action.data };
      case 'levelList':
        return { ...state, levelList: action.data };
      case 'courseName':
        return { ...state, courseName: action.data };
      case 'levelName':
        return { ...state, levelName: action.data };
      case 'challengeData':
        return { ...state, challengeData: action.data };
      case 'assessmentViewData':
        return { ...state, assessmentViewData: action.data };
      case 'homeWorkChartData':
        return { ...state, homeWorkChartData: action.data };
      case 'loading':
        return { ...state, loading: action.data };
      default:
        return state;
    }
  };

  const [state, setState] = useReducer(reducer, initialState);

  const { studentId, isFromStd: isFromStudent } = route.params;
  const levelRef = useRef(undefined);
  const [levelLoader, setLevelLoader] = useState(false);
  const { Get } = DataAccess();
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
    if (isFromStudent) {
      setState({ type: 'courseId', data: route.params?.courseId });
      getDataFirstTime(route.params?.courseId);
    } else {
      getStudentProgressDetails();
    }
  }, [studentId, route.params]);

  const getStudentProgressDetails = () => {
    var EndPoint: endpoint = ApiEndpoints.GetStudentProgressDetails;
    EndPoint.params = `?studentId=${studentId}`;
    setState({ type: 'loading', data: true });
    Get(EndPoint).then((res: any) => {
      setState({ type: 'loading', data: false });
      if (!res.error) {
        setState({
          type: 'courseList',
          data: res.studentCourses,
        });
        setState({
          type: 'levelList',
          data: res.studentLevels,
        });
        var levels = res.studentLevels.map((levelObject: any) => {
          return levelObject.featureName;
        });
        var courses = res.studentCourses.map((courseObject: any) => {
          return courseObject.epicName;
        });

        setState({
          type: 'courseName',
          data: courses,
        });
        setState({
          type: 'levelName',
          data: levels,
        });
      }
    });
  };
  const getDataFirstTime = (id: any) => {
    getCoursesLevels(id);
    getChallengeData(id, false);
    getAssessmentView(id);
    getHomeWorkChart(id);
  };

  const onValueChange = (id: any) => {
    setState({ type: 'courseId', data: id });
    getCoursesLevels(id);
    getChallengeData(id, false);
    getAssessmentView(id);
    getHomeWorkChart(id);
  };

  const getCoursesLevels = (id: any) => {
    setState({ type: 'loading', data: true });
    var levelNames: any = [];
    var levelIds: any = [];
    var EndPoint: endpoint = ApiEndpoints.GetCoursesLevels;
    EndPoint.params = `?courseId=${id}`;
    setLevelLoader(true);
    Get(EndPoint)
      .then((res: any) => {
        setState({ type: 'loading', data: false });
        if (!res.error) {
          res.map((obj: any) => {
            levelNames.push(obj.featureName);
            levelIds.push(obj.featureId);
          });

          setState({
            type: 'levelList',
            data: levelIds,
          });
          setState({
            type: 'levelName',
            data: levelNames,
          });
          return;
        } else {
          setState({
            type: 'levelList',
            data: [],
          });
          setState({
            type: 'levelName',
            data: [],
          });
          return;
        }
      })
      .catch((Error: any) => console.log({ Error }))
      .finally(() => setLevelLoader(false));
  };
  const onLevelSelect = (id: any) => {
    getAssessmentView(id);
    getChallengeData(id, true);
    getHomeWorkChart(id);
  };
  const getHomeWorkChart = (id: any) => {
    setState({ type: 'loading', data: true });
    var EndPoint: endpoint = ApiEndpoints.GetHomeWorkChart;
    EndPoint.params = `?userId=${studentId}&backlogId=${id}`;
    Get(EndPoint).then((res: any) => {
      setState({ type: 'loading', data: false });
      if (!res.error) {
        setState({
          type: 'homeWorkChartData',
          data: getModalObject(res),
        });
        return;
      }
    });
  };
  const getAssessmentView = (id: any) => {
    setState({ type: 'loading', data: true });
    var EndPoint: endpoint = ApiEndpoints.GetAssessmentView;
    EndPoint.params = `?userId=${studentId}&backlogId=${id}`;
    Get(EndPoint).then((res: any) => {
      setState({ type: 'loading', data: false });
      if (!res.error) {
        setState({
          type: 'assessmentViewData',
          data: getModalObject(res),
        });
        return;
      }
    });
  };

  const getChallengeData = (id: any, isfromLevel: any) => {
    setState({ type: 'loading', data: true });
    let levelId = isfromLevel ? id : -1;
    let courseID = isfromLevel ? state.courseId : id;
    var EndPoint: endpoint = ApiEndpoints.GetChallengeData;
    EndPoint.params = `?UserId=${studentId}&CourseId=${courseID}&LevelId=${levelId}`;
    Get(EndPoint).then((res: any) => {
      setState({ type: 'loading', data: false });
      if (!res.error) {
        setState({
          type: 'challengeData',
          data: getModalObject(res),
        });
        return;
      }
    });
  };
  const getModalObject = (data: any) => {
    var count: any = [];
    var state: any = [];
    var modalObject = { labels: [], data: [] };
    data.map((obj: any) => {
      state.push(obj.state);
      count.push(obj.count);
    });
    modalObject.labels = state;
    modalObject.data = count;
    return modalObject;
  };

  const onBackPress = () => {
    if (Boolean(!route?.params?.parentgoBackScreen)) {
      navigation.navigate(route.params?.goBackScreen);
      return false;
    } else {
      navigation.navigate(route.params?.goBackScreen, {
        goBackScreen: route?.params?.parentgoBackScreen,
        header: route?.params?.header,
        isFromStudentProgress: true,
        studentId: studentId,
        studentName: route?.params?.studentName,
      });
      return true;
    }
  };

  return (
    <_Screen
      header={
        <Header
          isBack
          GoBack={onBackPress}
          Screen={route?.params?.studentName}
        />
      }
      hideTopSafeArea
      onAndroidBack={onBackPress}
      flex={1}
      backgroundColor={whiteThemeColors.background}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ContentStyle}
      >
        <_View
          style={[
            {
              display: isFromStudent ? 'none' : 'flex',
            },
            styles.challengeAssessmentView,
          ]}
        >
          <_Text style={styles.dropdownLabel}>Course</_Text>
          <_View style={styles.dropDownStyle}>
            {state.courseList != undefined && (
              <_ModalDropdown
                isborder={false}
                isdisable={state.courseList.length == 0}
                item={state.courseName}
                label={
                  state.courseList.length != 0
                    ? `Select ${terminologies['Course']?.label} `
                    : `No ${terminologies['Course']?.label} Found`
                }
                style={styles.dropDownContainer}
                dropdownStyle={[
                  {
                    height:
                      state.courseList.length == 0
                        ? 10
                        : state.courseList.length > 3
                        ? 120
                        : state.courseList.length * 40,
                  },
                  styles.dropdownStyles,
                ]}
                dropdownTextHighlightStyle={styles.dropdownTextHighlight}
                dropdownTextStyle={styles.dropDownText}
                onselected={(val) => {
                  levelRef?.current?.select(-1);
                  onValueChange(state.courseList[val].epicId);
                }}
                textStyle={[CommonStyles.className, styles.dropDownTextStyle]}
              />
            )}
          </_View>
        </_View>
        <_View
          style={{
            ...styles.challengeAssessmentView,
            marginTop: 5,
            marginBottom: 15,
          }}
        >
          <_Text style={styles.dropdownLabel}>Level</_Text>
          <_View style={styles.dropDownStyle}>
            {levelLoader ? (
              <_ActivityIndicator
                animating={levelLoader}
                showText={false}
                color={whiteThemeColors.greyDark}
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                }}
              />
            ) : (
              <_ModalDropdown
                isborder={false}
                isdisable={state.levelList.length == 0}
                ref={levelRef}
                item={state.levelName}
                label={
                  state.levelList.length != 0
                    ? 'Select level '
                    : 'No Level Found'
                }
                style={styles.dropDownContainer}
                dropdownStyle={[
                  {
                    height: -1,
                  },
                  styles.levelDropDownStyle,
                ]}
                dropdownTextStyle={styles.dropDownText}
                dropdownTextHighlightStyle={styles.dropdownTextHighlight}
                onselected={(val) => {
                  onLevelSelect(state.levelList[val]);
                }}
                textStyle={[CommonStyles.className, styles.dropDownTextStyle]}
              />
            )}
          </_View>
        </_View>

        <Challenge challengeData={state.challengeData} />
        <HomeworkChart homeWorkChartData={state.homeWorkChartData} />
        <AssessmentChart assessmentViewData={state.assessmentViewData} />
      </ScrollView>
    </_Screen>
  );
};

const styles = StyleSheet.create({
  ContentStyle: {
    marginTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 10,
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: whiteThemeColors.background,
  },
  dropDownStyle: {
    width: '98%',

    borderRadius: 10,

    backgroundColor: whiteThemeColors.white,
    alignSelf: 'center',
    paddingVertical: 3,
  },
  dropdownLabel: {
    fontSize: 15,
    color: whiteThemeColors.primaryTextColor,
    paddingVertical: 5,
    marginLeft: 5,
    fontFamily: CommonStyles.fonts.semiBold,
  },

  challengeAssessmentView: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  dropDownContainer: {
    height: -1,
    paddingVertical: 10,
    padding: 10,
  },
  dropdownStyles: {
    marginTop: 10,
    width: '88%',
    marginLeft: -10,
    borderRadius: 10,
    ...CommonStyles.shadow,
    padding: 4,
  },
  dropdownTextHighlight: {
    backgroundColor: whiteThemeColors.primary + 'c0',
    color: whiteThemeColors.white,
    textAlign: 'justify',
  },
  dropDownText: {
    color: whiteThemeColors.black,
    fontSize: 13,
    textAlign: 'justify',
    fontFamily: CommonStyles.fonts.medium,
  },
  dropDownTextStyle: {
    fontSize: 13,
    color: whiteThemeColors.greyDark,
    width: '100%',
    fontFamily: CommonStyles.fonts.medium,
  },
  levelDropDownStyle: {
    width: '88%',
    marginLeft: -10,
    padding: 10,
    borderRadius: 15,
    ...CommonStyles.shadow,
    alignSelf: 'center',
  },
});

export const StudentProgressReport = React.memo(StudentProgress);
