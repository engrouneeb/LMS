import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import {
  collapsiableAnimation,
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import {
  _Screen,
  _Text,
  _VectorIcons,
  _View,
  endpoint,
} from '../../components';
import { _ActivityIndicator } from '../../screens/Loader';
import Header from '../Headers';
import { ReportCharts, ScoreStatus, Summary } from './components';
import { styles } from './style';
interface props {
  navigation: any;
  route: any;
}
const StudentAssessmentDetials: React.FC<props> = ({ navigation, route }) => {
  const [reportData, setReportData] = useState<any>({});
  const [stackBarChartData, setStackBarChartData] = useState<any>({});
  const [stackBarChartWidth, setStackBarChartWidth] = useState(
    Dimensions.get('window').width,
  );
  const [loading, setloading] = useState(true);
  const [numberOfStack, setNumberOfStack] = useState(0);
  const { Get } = DataAccess();
  useEffect(() => {
    let studentId = route.params.assessmentUserId;
    let assessmentId = route.params.assessmentId;
    getOnlineAssessmentReport(assessmentId, studentId);
    getBarChartForOnlineAssessmentReport(assessmentId);
  }, []);

  const chartConfig = {
    backgroundGradientFrom: whiteThemeColors.white,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: whiteThemeColors.white,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    useShadowColorFromDataset: false, // optional
    propsForBackgroundLines: {
      stroke: whiteThemeColors.transparent,
    },
    decimalPlaces: 1,
    barPercentage: 0.8,
    barRadius: 5,
    propsForLabels: {
      strokeWidth: 0.1,
      stroke: whiteThemeColors.BarChart.labelStrokeColor,
      fontSize: 10,
      fontFamily: CommonStyles.fonts.regular,
      // color: whiteThemeColors.primary,
    },
    propsForHorizontalLabels: {
      strokeWidth: 0.2,
      stroke: whiteThemeColors.lightBlack,
      fontSize: 10,
      fontFamily: CommonStyles.fonts.light,
      padding: 0,
      marginLeft: 300,
    },
  };
  const getOnlineAssessmentReport = (assessmentId: any, studentId: any) => {
    var EndPoint: endpoint = ApiEndpoints.GetOnlineAssessmentReport;
    EndPoint.params = `?assignmentId=${assessmentId}&studentId=${studentId}`;
    Get(EndPoint).then((res: any) => {
      if (!res.error) return setReportData(res);
    });
  };
  const getBarChartForOnlineAssessmentReport = (assessmentId: any) => {
    setloading(true);
    var EndPoint: endpoint = ApiEndpoints.GetAssessmentResultData;
    EndPoint.params = `?assessmentId=${assessmentId}`;
    Get(EndPoint).then((res: any) => {
      if (!res.error) {
        res.length > 3 ? setStackBarChartWidth(120 * res.length) : null;
        var legends = ['Correct', 'Wrong', 'Skip'];
        var labels = res.map((obj: any) => {
          let x =
            obj.categoryName.length > 10
              ? obj.categoryName.substring(0, 9) + '..'
              : obj.categoryName;
          return x;
        });
        setNumberOfStack(labels.length);
        var dataForChart = res.map((obj: any) => {
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
          data: dataForChart,
          barColors: Colors,
        };
        setStackBarChartData(finalObject);
      }
    });
    setloading(false);
  };
  const handleBack = () => {
    navigation.goBack();
    return true;
  };
  return (
    <_Screen
      header={
        <Header
          Screen={reportData?.assessmentName}
          isBack={true}
          GoBack={() => navigation.goBack()}
        />
      }
      flex={1}
      hideTopSafeArea
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={handleBack}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {loading && (
          <_View
            style={{
              position: 'absolute',
              top: Dimensions.get('screen').height / 2.5,
              alignSelf: 'center',
              zIndex: 1,
            }}
          >
            <_ActivityIndicator size='large' />
          </_View>
        )}
        <_View style={styles.summaryContainer}>
          <Summary report={reportData} />
          <AssessmentTiming reportData={reportData} />
          <ScoreStatus reportData={reportData} />
          <ReportCharts
            stackBarChartData={stackBarChartData}
            stackBarChartWidth={stackBarChartWidth}
            chartConfig={chartConfig}
            lengthCount={numberOfStack}
          />
        </_View>
      </ScrollView>
    </_Screen>
  );
};

const AssessmentTiming = ({ reportData }: any) => {
  const [open, setOpen] = useState(false);
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
  const showTiming = () => {
    collapsiableAnimation();
    setOpen(true);
  };
  const hideTiming = () => {
    collapsiableAnimation();
    setOpen(false);
  };

  const getTimeInString = (timeInString: string) => {
    const duration = moment.duration(timeInString, 'seconds');
    return `${duration.hours()} hr ${duration.minutes()} min ${duration.seconds()} sec`;
  };

  return (
    <Pressable
      onPress={open ? hideTiming : showTiming}
      style={styles.cardContainer}
    >
      <_View style={[styles.innerContainer, { height: 'auto' }]}>
        <_View style={styles.infoContainer}>
          <_View style={{ width: '100%' }}>
            <_Text style={{ ...styles.headerText, marginBottom: 10 }}>
              {`${terminologies['Assessment']?.label} Timing`}
            </_Text>
          </_View>
        </_View>
        {open && (
          <_View style={styles.timingCard}>
            <_View style={styles.txtContainer}>
              <_View style={{ alignSelf: 'flex-start', marginHorizontal: 10 }}>
                <_Text style={{ ...styles.labelText, marginBottom: 5 }}>
                  {'Total Time'}
                </_Text>
                <_View>
                  <_Text
                    style={{
                      fontFamily: CommonStyles.fonts.semiBold,
                      fontSize: 12,
                    }}
                    numberOfLines={1}
                  >
                    {reportData.dataForReport &&
                    reportData.dataForReport.assessmentTotalTime &&
                    reportData.dataForReport.assessmentTotalTime.ticks == 0
                      ? 'No Time Limit'
                      : reportData.dataForReport &&
                        Boolean(reportData.dataForReport.assessmentTotalTime) &&
                        getTimeInString(
                          reportData.dataForReport.assessmentTotalTime,
                        )}
                  </_Text>
                </_View>
              </_View>
            </_View>
            <_View style={{ paddingBottom: 4 }}>
              <_VectorIcons
                name={'clockcircle'}
                type={'AntDesign'}
                color={whiteThemeColors.primary}
                size={21}
              />
            </_View>

            <_View style={styles.timeTakenContainer}>
              <_View style={{ alignSelf: 'flex-start', marginHorizontal: 10 }}>
                <_Text style={{ ...styles.labelText, marginBottom: 5 }}>
                  {'Time Taken'}
                </_Text>
                <_View>
                  <_Text
                    numberOfLines={1}
                    style={{
                      fontFamily: CommonStyles.fonts.semiBold,
                      fontSize: 12,
                    }}
                  >
                    {reportData.dataForReport &&
                      Boolean(reportData.dataForReport.assessmentTimeTaken) &&
                      getTimeInString(
                        reportData.dataForReport.assessmentTimeTaken,
                      )}
                  </_Text>
                </_View>
              </_View>
            </_View>
          </_View>
        )}
        <_View style={styles.circleBtn}>
          <_VectorIcons
            name={open ? 'chevron-up' : 'chevron-down'}
            type={'MaterialCommunityIcons'}
            size={28}
            color={whiteThemeColors.primary}
          />
        </_View>
      </_View>
    </Pressable>
  );
};
export default StudentAssessmentDetials;
