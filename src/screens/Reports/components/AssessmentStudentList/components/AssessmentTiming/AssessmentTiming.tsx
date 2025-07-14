import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import {
  _Text,
  _VectorIcons,
  _View,
  assesmentTimingInterface,
} from '../../../../../../components';
import { styles } from './style';
import {
  whiteThemeColors,
  collapsiableAnimation,
  getTerminologyLabel,
  TerminologyMap,
} from 'utilities';
import moment from 'moment';

const AssessmentTiming: React.FC<assesmentTimingInterface> = ({
  reportData,
}) => {
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
      <_View style={styles.innerContainer}>
        <_View width={'100%'}>
          <_View width={'100%'}>
            <_Text style={{ ...styles.headerText, marginBottom: 10 }}>
              {`${terminologies['Assessment']?.label} Timing`}
            </_Text>
          </_View>
        </_View>
        {open && (
          <_View style={styles.assessmentToggleContainer}>
            <_View style={styles.assessmentToggleDetailsContainer}>
              <_View style={styles.assessmentTotalTimeContainer}>
                <_Text style={[styles.labelText, styles.totalTimeLabel]}>
                  Total Time
                </_Text>
                <_View style={styles.timeView}>
                  <_Text style={styles.timeText} numberOfLines={1}>
                    {reportData.dataForReport &&
                    reportData.dataForReport.assessmentTotalTime &&
                    reportData.dataForReport.assessmentTotalTime.ticks == 0
                      ? 'No Time Limit'
                      : reportData.dataForReport &&
                        reportData.dataForReport.assessmentTotalTime &&
                        getTimeInString(
                          reportData.dataForReport.assessmentTotalTime,
                        )}
                  </_Text>
                </_View>
              </_View>
            </_View>
            <_View style={styles.assessmentCardClockIconContainer}>
              <_VectorIcons
                name={'clockcircle'}
                type={'AntDesign'}
                color={whiteThemeColors.primary}
                size={18}
              />
            </_View>

            <_View style={styles.assessmentTimeTakenContainer}>
              <_View style={styles.assessmentTimeTakenSubContainer}>
                <_Text style={[styles.labelText, styles.timeTakenLabel]}>
                  Time Taken
                </_Text>
                <_View style={styles.timeView}>
                  <_Text style={styles.timeText} numberOfLines={1}>
                    {reportData.dataForReport &&
                      reportData.dataForReport.assessmentTimeTaken &&
                      getTimeInString(
                        reportData.dataForReport.assessmentTimeTaken,
                      )}
                  </_Text>
                </_View>
              </_View>
            </_View>
          </_View>
        )}
        <_View style={styles.CardToggleIconContainer}>
          <_VectorIcons
            name={open ? 'chevron-up' : 'chevron-down'}
            type={'MaterialCommunityIcons'}
            size={21}
            color={whiteThemeColors.white}
          />
        </_View>
      </_View>
    </Pressable>
  );
};
export { AssessmentTiming };
