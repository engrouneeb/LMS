import React, { useState } from 'react';
import { Dimensions, Pressable, ScrollView } from 'react-native';
import { PieChart, StackedBarChart } from 'react-native-chart-kit';
import { whiteThemeColors, collapsiableAnimation } from 'utilities';
import {
  _Text,
  _VectorIcons,
  _View,
  reportChartInterface,
} from '../../../../../../components';
import { styles } from './style';
import CommonStyles from 'screens/CommonStyles';

const chartConfig = {
  fillShadowGradientOpacity: 10,
  backgroundColor: whiteThemeColors.white,
  backgroundGradientFrom: whiteThemeColors.white,
  backgroundGradientTo: whiteThemeColors.background,
  // backgroundGradientToOpacity: 1,
  decimalPlaces: 0,
  barPercentage: 0.7,
  barRadius: 5,

  propsForLabels: {
    strokeWidth: 0.1,
    stroke: whiteThemeColors.primary,
    fontSize: 8,
    fontFamily: CommonStyles.fonts.medium,
  },

  propsForBackgroundLines: {
    stroke: whiteThemeColors.primary,
    strokeWidth: '0',
  },

  propsForDots: {
    r: 5,
    strokeWidth: '0',
    stroke: whiteThemeColors.primaryDark,
  },

  color: (opacity = 1) => whiteThemeColors.primary,
  strokeWidth: 5,
};
const screenWidth = Dimensions.get('window').width;

const ReportCharts: React.FC<reportChartInterface> = ({ chartsData }) => {
  const { stackBarChartData, pieChartData, stackBarChartWidth, lengthCount } =
    chartsData;
  const [open, setOpen] = useState(false);

  const showReport = () => {
    collapsiableAnimation();
    setOpen(true);
  };
  const hideReport = () => {
    collapsiableAnimation();
    setOpen(false);
  };

  return (
    <_View style={styles.cardContainer}>
      <_View style={styles.innerContainer}>
        <Pressable
          onPress={open ? hideReport : showReport}
          style={styles.infoContainer}
        >
          <_Text style={styles.headerText}>Report</_Text>
        </Pressable>
        {open && (
          <_View width={'100%'}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {stackBarChartData.data && (
                <StackedBarChart
                  data={stackBarChartData}
                  width={
                    lengthCount == 1
                      ? stackBarChartWidth - 100
                      : stackBarChartWidth - 50
                  }
                  height={240}
                  hideLegend={false}
                  chartConfig={chartConfig}
                  verticalLabelsHeightPercentage={0.8}
                />
              )}
            </ScrollView>
            <_View
              style={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderColor: whiteThemeColors.black + 20,
              }}
            ></_View>
            <PieChart
              data={pieChartData}
              width={screenWidth}
              height={170}
              chartConfig={chartConfig}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'0'}
              center={[0, 10]}
              style={{ marginLeft: -20 }}
            />
          </_View>
        )}
        <Pressable
          onPress={open ? hideReport : showReport}
          style={styles.CardToggleIconContainer}
        >
          <_VectorIcons
            name={open ? 'chevron-up' : 'chevron-down'}
            type={'MaterialCommunityIcons'}
            size={21}
            color={whiteThemeColors.white}
          />
        </Pressable>
      </_View>
    </_View>
  );
};

export { ReportCharts };
