import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import {
  BarChartComponent,
  collapsiableAnimation,
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../components';
import CommonStyles from 'screens/CommonStyles';
interface props {
  assessmentViewData: any;
}
const AssessmentChart: React.FC<props> = ({ assessmentViewData }) => {
  const [open, setOpen] = useState(true);
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
  const showChart = () => {
    collapsiableAnimation();
    setOpen(true);
  };
  const hideChart = () => {
    collapsiableAnimation();
    setOpen(false);
  };

  return (
    <TouchableOpacity
      activeOpacity={9}
      onPress={open ? hideChart : showChart}
      style={styles.innerContainer}
    >
      <_Text
        style={styles.headerText}
      >{`${terminologies['Assessment']?.label}`}</_Text>

      {open && (
        <_View width={'100%'}>
          {assessmentViewData && (
            <BarChartComponent
              points={assessmentViewData.data}
              labels={assessmentViewData.labels}
            />
          )}
        </_View>
      )}
      <_View style={styles.btn}>
        <_VectorIcons
          name={open ? 'chevron-up' : 'chevron-down'}
          type={'MaterialCommunityIcons'}
          size={20}
          color={whiteThemeColors.primary}
        />
      </_View>
    </TouchableOpacity>
  );
};

export { AssessmentChart };

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: 'flex-start',
    paddingTop: 15,
    paddingBottom: 30,
    width: '94%',
    borderRadius: 15,
    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',
    backgroundColor: whiteThemeColors.white + 90,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 16,
    color: whiteThemeColors.primaryTextColor,

    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.semiBold,
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 20,
  },
  btn: {
    position: 'absolute',
    top: 30,
    right: 18,
    zIndex: 1,
    borderRadius: 8,
    backgroundColor: whiteThemeColors.primary + 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
