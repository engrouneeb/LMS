import React, { useState } from 'react';
import { Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';
import { _Text, _VectorIcons, _View } from '../../../../components';
import { Style } from './style';
import { collapsiableAnimation, whiteThemeColors } from '../../../../Utilities';
interface props {
  chartConfig: ChartConfig;
  lengthCount: number;
  stackBarChartData: StackBarChartData;
  stackBarChartWidth: number;
}

interface StackBarChartData {
  barColors: any;
  data: any;
  labels: any;
  legend: any;
}

interface ChartConfig {
  backgroundGradientFrom: string;
  backgroundGradientFromOpacity: number;
  backgroundGradientTo: string;
  backgroundGradientToOpacity: number;
  barPercentage: number;
  color: any;
  decimalPlaces: number;
  propsForBackgroundLines: PropsForBackgroundLines;
  propsForHorizontalLabels: PropsForHorizontalLabels;
  useShadowColorFromDataset: boolean;
}

interface PropsForHorizontalLabels {
  fontSize: number;
  fontWeight: string;
  marginLeft: number;
  padding: number;
  stroke: string;
  strokeWidth: number;
}

interface PropsForBackgroundLines {
  stroke: string;
}

export const ReportCharts: React.FC<props> = ({
  stackBarChartData,
  chartConfig,
  stackBarChartWidth,
  lengthCount,
}) => {
  const [open, setOpen] = useState(false);
  const showReport = () => (collapsiableAnimation(), setOpen(true));
  const hideReport = () => (collapsiableAnimation(), setOpen(false));
  return (
    <_View style={Style.cardContainer}>
      <_View style={Style.innerContainer}>
        <Pressable
          onPress={open ? hideReport : showReport}
          style={Style.infoContainer}
        >
          <_Text style={{ ...Style.headerText, marginBottom: 15 }}>
            {'Report'}
          </_Text>
        </Pressable>
        {open && (
          <_View style={{ width: '100%' }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={Style.scrollView1}
            >
              {stackBarChartData.data && (
                <StackedBarChart
                  data={stackBarChartData}
                  width={
                    lengthCount == 1
                      ? stackBarChartWidth - 100
                      : stackBarChartWidth
                  }
                  height={220}
                  hideLegend={false}
                  chartConfig={chartConfig}
                />
              )}
            </ScrollView>
          </_View>
        )}
        <TouchableOpacity
          onPress={open ? hideReport : showReport}
          style={Style.circleBtn}
        >
          <_VectorIcons
            name={open ? 'chevron-up' : 'chevron-down'}
            type={'MaterialCommunityIcons'}
            size={28}
            color={whiteThemeColors.primary}
          />
        </TouchableOpacity>
      </_View>
    </_View>
  );
};
