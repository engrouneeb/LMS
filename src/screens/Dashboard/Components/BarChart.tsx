import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import CommonStyles from '../../CommonStyles';
import { whiteThemeColors } from '../../../Utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  ms_studentsEnrolledFailed,
  ms_studentsEnrolledLoading,
  ms_studentsEnrolledSuccess,
} from '../../../actions/MS_DBStudentsEnrolledActions';
import { _Text, _VectorIcons, _View, endpoint } from '../../../components';
import { Appstate } from '../../../reducers/Appstate';
import { _ActivityIndicator } from '../../Loader';
import styles from '../style';
interface props {
  userid: number | null;
}
const BarChartCmp: React.FC<props> = ({ userid }) => {
  const [pointsPerMonth, setPointsPerMonth] = useState([]);
  const [pointsPerMonthDates, setPointsPerMonthDates] = useState([]);
  const [noDataStudent, setnoDataStudent] = useState<'flex' | 'none'>('none');
  const dispatch = useDispatch();
  const { ms_db_loading } = useSelector(
    (state: Appstate) => state.msStudentEnrolledReducer,
  );
  const { dashboardScreen } = useSelector((state: Appstate) => state.language);
  const { Get } = DataAccess();
  useEffect(() => {
    getEnrolledStudents();
  }, [userid]);

  const getEnrolledStudents = () => {
    let lbs: any = [];
    let _datasets: any = [];
    var EndPoint: endpoint = ApiEndpoints.GetPointsByMonthChart;
    if (userid) EndPoint.params = `?studentId=${userid}`;
    dispatch(ms_studentsEnrolledLoading());
    Get(EndPoint)
      .then((res: any) => {
        if (res.length > 0) {
          res.slice(0, 7).map((obj: any) => {
            lbs.push(obj.monthName);
            _datasets.push(obj.totalPoints);
          });
          setPointsPerMonthDates(lbs);
          setPointsPerMonth(_datasets);
          setnoDataStudent('none');
        } else {
          setnoDataStudent('flex');
        }
        return dispatch(ms_studentsEnrolledSuccess(res));
      })
      .catch(() => {
        setnoDataStudent('none');
        return dispatch(ms_studentsEnrolledFailed());
      });
  };

  const numberIntoCurrencyFormat = (number: number, conversion = false) => {
    if (number >= 1e6) return conversion ? (number / 1e6).toFixed(1) : 2;
    else if (number >= 1e3) return conversion ? (number / 1e3).toFixed(1) : 1;
    else return conversion ? number : 0;
  };

  return (
    <_View style={[styles.centerView, { marginTop: 20 }]}>
      <_Text
        style={{
          color: 'black',
          textAlign: 'left',
          fontSize: 14,
          fontFamily: CommonStyles.fonts.semiBold,
        }}
      >
        {dashboardScreen.PointsAchieved}
      </_Text>
      <_View
        style={{
          width: '100%',
          height: 235,
          marginLeft: -60,
          marginTop: 10,
          alignSelf: 'center',
        }}
      >
        {ms_db_loading ? (
          <_View
            style={{
              flex: 1,
              width: '100%',
              alignSelf: 'center',
              marginRight: -100,
            }}
          >
            <_ActivityIndicator showText={false} />
          </_View>
        ) : pointsPerMonth.length > 0 ? (
          <BarChart
            data={{
              labels: pointsPerMonthDates,
              datasets: [
                {
                  data: pointsPerMonth,
                },
              ],
            }}
            width={Dimensions.get('window').width}
            height={180}
            verticalLabelRotation={0}
            showBarTops={false}
            chartConfig={{
              // fillShadowGradient: whiteThemeColors.background,
              fillShadowGradientOpacity: 10,
              backgroundColor: whiteThemeColors.background,
              backgroundGradientFrom: whiteThemeColors.background,
              backgroundGradientTo: whiteThemeColors.background,
              // backgroundGradientToOpacity: 1,
              decimalPlaces: 0,
              barPercentage: 0.7,
              barRadius: 5,
              propsForLabels: {
                strokeWidth: 0.1,
                stroke: whiteThemeColors.BarChart.labelStrokeColor,
                fontSize: 8,
                fontFamily: CommonStyles.fonts.medium,
                // color: whiteThemeColors.primary,
              },

              color: (opacity = 1) => whiteThemeColors.primary,
              formatYLabel: (y) => {
                if (numberIntoCurrencyFormat(y) == 1)
                  return numberIntoCurrencyFormat(y, true) + 'K';
                else if (numberIntoCurrencyFormat(y) == 2)
                  return numberIntoCurrencyFormat(y, true) + 'M';
                else return y;
              },
            }}
            withInnerLines={false}
          />
        ) : (
          <_View
            style={[
              styles.noEnrollnment,
              {
                display: noDataStudent,
                marginRight: -100,
              },
            ]}
          >
            <_VectorIcons
              type='MaterialCommunityIcons'
              name='star-off-outline'
              size={60}
              color={whiteThemeColors.primary}
            />
            {/* <NoEnrollmentPerMonth /> */}

            <_Text
              style={{
                position: 'absolute',
                bottom: 0,
                color: whiteThemeColors.primary,
                fontFamily: CommonStyles.fonts.medium,
              }}
            >
              {`0 ${dashboardScreen.PointsAchieved}`}
            </_Text>
          </_View>
        )}
      </_View>
    </_View>
  );
};

export const BarChartComponent = React.memo(BarChartCmp);
