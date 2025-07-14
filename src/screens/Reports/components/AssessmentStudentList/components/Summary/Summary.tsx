import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import {
  _Text,
  _VectorIcons,
  _View,
  studentSummaryInterface,
} from '../../../../../../components';
import { styles } from './style';
import {
  whiteThemeColors,
  collapsiableAnimation,
  getTerminologyLabel,
  TerminologyMap,
} from 'utilities';
const Summary: React.FC<studentSummaryInterface> = ({ report }) => {
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

  const showSummary = () => {
    collapsiableAnimation();
    setOpen(true);
  };
  const hideSummary = () => {
    collapsiableAnimation();
    setOpen(false);
  };
  return (
    <Pressable
      onPress={open ? hideSummary : showSummary}
      style={styles.cardContainer}
    >
      <_View style={styles.innerContainer}>
        <_View width={'100%'}>
          <_View width={'40%'}>
            <_Text style={styles.headerText}>Summary</_Text>
          </_View>
          {report.studentName && (
            <_View style={styles.summaryStdNameContainer}>
              <_Text style={[styles.labelText, styles.summaryStdNameLabelTxt]}>
                Student Name :
              </_Text>
              <_Text style={[styles.text, styles.summaryStdNameValueTxt]}>
                {report.studentName}
              </_Text>
            </_View>
          )}
        </_View>
        {open && (
          <_View width={'100%'}>
            <_View style={styles.summaryToggleCardFiguresContianer}>
              <_View width={'100%'}>
                <_View style={styles.infoRow}>
                  <_View style={styles.summaryCardSingleCellContainer}>
                    <_Text style={styles.labelText} numberOfLines={1}>
                      {`Total ${terminologies['Question']?.pluralLabel} : `}
                    </_Text>
                    <_Text style={styles.text}>
                      {report?.dataForReport?.totalQuestionsCount}
                    </_Text>
                  </_View>
                  <_View style={styles.summaryCardSingleCellContainer}>
                    <_Text style={styles.labelText} numberOfLines={1}>
                      {'Correct Answer(s) : '}
                    </_Text>
                    <_Text style={styles.text}>
                      {report?.dataForReport?.totalCorrectQuestionsCount}
                    </_Text>
                  </_View>
                </_View>
              </_View>
              <_View width={'100%'}>
                <_View style={styles.infoRow}>
                  <_View style={styles.summaryCardSingleCellContainer}>
                    <_Text style={styles.labelText} numberOfLines={1}>
                      {'Wrong Answer(s) : '}
                    </_Text>
                    <_Text style={styles.text}>
                      {report?.dataForReport?.totalWrongQuestionsCount}
                    </_Text>
                  </_View>
                  <_View style={styles.summaryCardSingleCellContainer}>
                    <_Text style={styles.labelText} numberOfLines={1}>
                      {'Skipped Answer(s) : '}
                    </_Text>
                    <_Text style={styles.text}>
                      {report?.dataForReport?.totalSkippedQuestionsCount}
                    </_Text>
                  </_View>
                </_View>
              </_View>
              <_View style={styles.summaryCardSingleCellContainer}>
                <_Text style={styles.labelText} numberOfLines={1}>
                  {'Obtained Points : '}
                </_Text>
                <_Text style={styles.text}>
                  {report?.dataForReport?.pointsObtained}
                </_Text>
              </_View>
            </_View>
            <_View style={styles.summaryCardTotalPointsContainer}>
              <_Text
                style={{ ...styles.labelText, fontSize: 14 }}
                numberOfLines={1}
              >
                {'Total Points : '}
              </_Text>
              <_Text style={[styles.text, styles.totalPointsTxt]}>
                {report?.dataForReport?.totalPoints}
              </_Text>
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
export { Summary };
