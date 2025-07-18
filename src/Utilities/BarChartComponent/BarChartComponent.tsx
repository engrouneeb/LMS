import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { whiteThemeColors } from '../../theme';
import { BarChartProps } from '../../interfaces';
import CommonStyles from '../../screens/CommonStyles';

export const BarChartComponent: FC<BarChartProps> = ({ points, labels }) => {
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
      // color: whiteThemeColors.primary,
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
  const data = {
    labels: labels,
    datasets: [
      {
        data: points,
      },
    ],
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        margin: 0,
        width: '100%',
        paddingHorizontal: 0,
      }}
    >
      <BarChart
        style={{ marginLeft: -25 }}
        data={data}
        width={400}
        height={200}
        chartConfig={chartConfig}
      />
    </ScrollView>
  );
};
