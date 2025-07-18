import React, { useEffect, useReducer, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from '../../../../../../Utilities';
import {
  AssesmentPercentage,
  AssessmentTiming,
  ReportCharts,
  ScoreStatus,
  Summary,
} from '..';
import ApiEndpoints from '../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../data/DAL';
import {
  _ModalDropdown,
  _Screen,
  _Text,
  _View,
  endpoint,
  studentAssesmentInterface,
} from '../../../../../../components';
import CommonStyles from '../../../../../CommonStyles';
import Header from '../../../../../Headers';
import Loader from '../../../../../Loader/loader';
import { intialState, reducer } from './States';
import { styles } from './style';
const index: React.FC<studentAssesmentInterface> = ({ navigation, route }) => {
  const {
    isFromStudentAssessment,
    assessmentId,
    stdName: header,
  } = route?.params;

  const [state, setState] = useReducer(reducer, intialState);
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
    getAssessmentList();
    if (isFromStudentAssessment) {
      loadData();
    } else {
      setState({ type: 'isLoading', data: true });
      const { stdId } = route.params;
      var EndPoint: endpoint = ApiEndpoints.GetStudentChallengesList;
      EndPoint.params = `?studentId=${stdId}`;
      Get(EndPoint).then((res: any) => {
        if (!res.error) setState({ type: 'challengeList', data: res });
        setState({ type: 'isLoading', data: false });

        return;
      });
    }
  }, []);
  const loadData = () => {
    const { stdId } = route.params;
    getOnlineAssessmentReport(assessmentId, stdId);
    getPieChartForOnlineAssessmentReport(assessmentId, stdId);
    getBarChartForOnlineAssessmentReport(assessmentId);
  };

  const onBackPress = () => {
    navigation.goBack();
    return true;
  };

  const _findColor = (day: any) => {
    switch (day) {
      case 0:
        return whiteThemeColors.PieChart.skip;
      case 1:
        return whiteThemeColors.PieChart.correct;

      case 2:
        return whiteThemeColors.PieChart.wrong;

      default:
        whiteThemeColors.PieChart.correct;
    }
  };

  const getAssessmentList = () => {
    const { stdId } = route.params;
    var EndPoint: endpoint = ApiEndpoints.GetOnlineAssessmentsAgainstChallenge;
    EndPoint.params = `?studentId=${stdId}`;
    Get(EndPoint).then((res: any) => {
      if (!res.error) setState({ type: 'assessmentList', data: res });
      return;
    });
  };
  const selectedAssessment = (index: any) => {
    const { stdId } = route.params;
    getOnlineAssessmentReport(state.assessmentList[index].key, stdId);
    getPieChartForOnlineAssessmentReport(
      state.assessmentList[index].key,
      stdId,
    );
    getBarChartForOnlineAssessmentReport(state.assessmentList[index].key);
  };
  const getOnlineAssessmentReport = (assignmentId: any, studentId: any) => {
    var EndPoint: endpoint = ApiEndpoints.GetOnlineAssessmentReport;
    EndPoint.params = `?assignmentId=${assignmentId}&studentId=${studentId}`;
    Get(EndPoint).then((res: any) => {
      if (!res.error) return setState({ type: 'reportData', data: res });
    });
  };
  const getPieChartForOnlineAssessmentReport = (
    assignmentId: any,
    studentId: any,
  ) => {
    var EndPoint: endpoint = ApiEndpoints.GetPieChartForOnlineAssessmentReport;
    EndPoint.params = `?assignmentId=${assignmentId}&studentId=${studentId}`;
    Get(EndPoint).then((res: any) => {
      if (!res.error) {
        var finalCharArray = res.map((item: any, index: any) => {
          var obj: any = {
            name: '',
            population: 0,
            color: '',
            legendFontColor: '',
            legendFontSize: 0,
          };
          obj.name = item.key;
          obj.population = item.value;
          obj.color = _findColor(index);
          obj.legendFontColor = _findColor(index);
          obj.legendFontSize = 12;
          return obj;
        });

        setState({ type: 'pieChartData', data: finalCharArray });
      }
    });
  };

  const getBarChartForOnlineAssessmentReport = (assignmentId: any) => {
    var EndPoint: endpoint = ApiEndpoints.GetAssessmentResultData;
    EndPoint.params = `?assessmentId=${assignmentId}`;
    Get(EndPoint).then((res: any) => {
      if (!res.error) {
        res.length > 3
          ? setState({ type: 'stackBarChartWidth', data: 120 * res.length })
          : null;
        var legends = ['Correct', 'Wrong', 'Skip'];
        var labels = res.map((obj: any) => {
          let x =
            obj.categoryName.length > 10
              ? obj.categoryName.substring(0, 9) + '..'
              : obj.categoryName;
          return x;
        });
        setState({ type: 'numberOfStacks', data: labels.length });

        var dataforChart = res.map((obj: any) => {
          var singleData = [];
          obj.numberOfQuestionsPassed != 0 &&
            singleData.push(obj.numberOfQuestionsPassed);
          obj.numberOfQuestionsFailed != 0 &&
            singleData.push(obj.numberOfQuestionsFailed);
          obj.numberOfQuestionsSkipped != 0 &&
            singleData.push(obj.numberOfQuestionsSkipped);
          return singleData;
        });

        var Colors = ['#55CE9B', '#F04461', '#EC737C'];
        const finalObject = {
          labels: labels,
          legend: legends,
          data: dataforChart,
          barColors: Colors,
        };
        setState({ type: 'stackBarChartData', data: finalObject });
      }
    });
  };

  return (
    <_Screen
      header={
        <Header
          isBack={true}
          GoBack={() => {
            navigation.goBack();
          }}
          Screen={header}
        />
      }
      hideTopSafeArea
      onAndroidBack={onBackPress}
      flex={1}
      backgroundColor={whiteThemeColors.background}
    >
      {state.isLoading ? (
        <Loader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: whiteThemeColors.background, flex: 1 }}
        >
          <_View style={styles.ContentStyle}>
            <_Text
              style={[
                styles.dropdownLabel,
                { display: isFromStudentAssessment ? 'none' : 'flex' },
              ]}
            >
              {'Challenge'}
            </_Text>
            <_View
              style={{
                paddingHorizontal: 10,
                marginHorizontal: 15,
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: whiteThemeColors.white,
                borderRadius: 8,
                height: 45,
                display: isFromStudentAssessment ? 'none' : 'flex',
                alignSelf: 'center',
              }}
            >
              {state.challengeList != undefined && (
                <_ModalDropdown
                  item={state.challengeList.map((userObj: any) => {
                    return userObj.text;
                  })}
                  isdisable={state.challengeList.length == 0}
                  label={
                    state.challengeList.length != 0
                      ? 'Select Challenge'
                      : 'No Challenge Found'
                  }
                  onselected={(val: any) => getAssessmentList()}
                  selectedValue={state.selectedTimeZone}
                  style={{}}
                  dropdownStyle={{
                    width: '83%',
                    marginTop: 10,
                    borderRadius: 10,
                    numberOfLines: 1,
                  }}
                  dropdownTextStyle={{
                    marginLeft: 10,
                    width: '97%',
                    color: whiteThemeColors.greyDark,
                    fontSize: 13,
                    fontFamily: CommonStyles.fonts.regular,
                  }}
                  textStyle={[
                    {
                      marginLeft: 10,
                      color: whiteThemeColors.greyDark,
                      fontFamily: CommonStyles.fonts.regular,
                      fontSize: 13,
                      width: '97%',
                    },
                  ]}
                  defaultTextStyle={{
                    color: whiteThemeColors.greyDark,
                    fontSize: 13,
                    fontFamily: CommonStyles.fonts.regular,
                    width: '97%',
                  }}
                />
              )}
            </_View>
            <_Text
              style={[
                styles.dropdownLabel,
                {
                  marginTop: 10,
                  display: isFromStudentAssessment ? 'none' : 'flex',
                },
              ]}
            >
              {`${terminologies['Assessment']?.label}`}
            </_Text>
            <_View
              style={{
                paddingHorizontal: 10,
                marginHorizontal: 15,
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: whiteThemeColors.white,
                borderRadius: 8,
                height: 45,
                display: isFromStudentAssessment ? 'none' : 'flex',
                alignSelf: 'center',
              }}
            >
              {state.challengeList != undefined && (
                <_ModalDropdown
                  item={state.assessmentList.map((userObj: any) => {
                    return userObj.value;
                  })}
                  label={
                    state.assessmentList.length != 0
                      ? `Select ${terminologies['Assessment']?.label}`
                      : `No ${terminologies['Assessment']?.label} Found`
                  }
                  isdisable={state.assessmentList.length === 0}
                  onselected={selectedAssessment}
                  style={{}}
                  dropdownStyle={{
                    width: '83%',
                    marginTop: 10,
                    borderRadius: 10,
                    numberOfLines: 1,
                  }}
                  dropdownTextStyle={{
                    marginLeft: 10,
                    width: '97%',
                    color: whiteThemeColors.greyDark,
                    fontSize: 13,
                    fontFamily: CommonStyles.fonts.regular,
                  }}
                  textStyle={[
                    {
                      marginLeft: 10,
                      color: whiteThemeColors.greyDark,
                      fontFamily: CommonStyles.fonts.regular,
                      fontSize: 13,
                      width: '97%',
                    },
                  ]}
                  defaultTextStyle={{
                    color: whiteThemeColors.greyDark,
                    fontSize: 13,
                    fontFamily: CommonStyles.fonts.regular,
                    width: '97%',
                  }}
                />
              )}
            </_View>

            <_View marginTop={20}></_View>
            <Summary report={state.reportData} />
            <AssessmentTiming reportData={state.reportData} />
            <AssesmentPercentage reportData={state.reportData} />
            <ScoreStatus reportData={state.reportData} />
            <ReportCharts chartsData={state} />
          </_View>
        </ScrollView>
      )}
    </_Screen>
  );
};

export const StudentAssessmentReport = React.memo(index);
