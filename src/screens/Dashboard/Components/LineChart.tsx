import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import { whiteThemeColors } from 'utilities';
import { NoActiveStudent } from '../../../../assets/Icons';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  ms_studentsFailed,
  ms_studentsLoading,
  ms_studentsSuccess,
} from '../../../actions/MS_DasboardStudentsAnalyticsActions';
import { _Text, _View } from '../../../components';
import { Appstate } from '../../../reducers/Appstate';
import { _ActivityIndicator } from '../../Loader';
import styles from '../style';
import CommonStyles from 'screens/CommonStyles';
const LineChartCmp = () => {
  const [datasets, setDatasets] = useState([0]);
  const [labels, setLables] = useState([]);

  const { dashboardScreen } = useSelector((state: Appstate) => state.language);
  const dispatch = useDispatch();
  const { ms_db_loading } = useSelector(
    (state: Appstate) => state.msStudentAnalyticsReducer,
  );
  const { Get } = DataAccess();

  useEffect(() => {
    getStudentData();
  }, []);

  const getStudentData = () => {
    let lbs: any = [];
    let _datasets: any = [];
    var EndPoint = ApiEndpoints.GetActiveStudent;
    dispatch(ms_studentsLoading());
    Get(EndPoint)
      .then((res: any) => {
        if (res.length <= 0) {
          setDatasets(_datasets);
        } else {
          res.map((obj: any) => {
            lbs.push(obj.category);
            _datasets.push(obj.count);
          });
          setLables(lbs);
        }
        setDatasets(_datasets);
        dispatch(ms_studentsSuccess(res));
      })
      .catch(() => {
        return dispatch(ms_studentsFailed());
      });
  };
  return (
    <_View style={[styles.centerView]}>
      {datasets.length > 0 ? (
        <_View
          style={{
            width: '90%',
            height: 240,
            borderRadius: 10,
            padding: 0,
            marginLeft: 23,
            alignSelf: 'center',
          }}
        >
          <_Text
            style={{
              color: 'black',
              fontSize: 14,
              marginTop: 10,
              marginLeft: -25,
              fontFamily: CommonStyles.fonts.semiBold,
            }}
          >
            {dashboardScreen.EnrollmentsReceived}
          </_Text>
          {ms_db_loading ? (
            <_ActivityIndicator showText={false} />
          ) : (
            <LineChart
              style={{
                borderRadius: 16,
                paddingRight: 40,
                width: '100%',
                marginTop: 10,
                marginLeft: -50,
              }}
              data={{
                labels: labels,

                datasets: [
                  {
                    data: datasets,
                    color: (opacity = 1) => whiteThemeColors.primary + 90, // optional
                  },
                ],
              }}
              width={
                Dimensions.get('window').width +
                Dimensions.get('window').width / 12
              }
              height={180}
              chartConfig={{
                backgroundColor: whiteThemeColors.background,
                backgroundGradientFrom: whiteThemeColors.background,
                backgroundGradientTo: whiteThemeColors.background,
                fillShadowGradientFrom: whiteThemeColors.primary,
                fillShadowGradientTo: 'white', // Gradient colors for the fill
                fillShadowGradientOpacity: 0.5,
                propsForBackgroundLines: {
                  stroke: whiteThemeColors.primary,
                  strokeWidth: '0',
                },

                propsForDots: {
                  r: 5,
                  strokeWidth: '0',
                  stroke: whiteThemeColors.primaryDsark,
                },

                propsForLabels: {
                  strokeWidth: 0.1,
                  stroke: whiteThemeColors.primary,
                  fontSize: 8,
                  fontFamily: CommonStyles.fonts.medium,
                },
                decimalPlaces: 0,
                color: (opacity = 1) => whiteThemeColors.greyDark,
                strokeWidth: 5,
              }}
              verticalLabelRotation={0}
              withShadow={true}
              withInnerLines={false}
              bezier={true}
              fromZero={true}
            />
          )}
        </_View>
      ) : (
        <_View
          style={{
            width: '100%',
            height: 270,
            marginLeft: 10,
            borderRadius: 16,
            padding: 0,
            paddingTop: 10,
            margin: 0,
          }}
        >
          <NoActiveStudent />
          <_Text
            style={{
              marginTop: 200,
              textAlign: 'center',
              color: whiteThemeColors.primary,
              fontFamily: CommonStyles.fonts.medium,
            }}
          >
            {dashboardScreen.NoActiveStudentsFound}
          </_Text>
        </_View>
      )}
    </_View>
  );
};

export const LineChartComponent = React.memo(LineChartCmp);
