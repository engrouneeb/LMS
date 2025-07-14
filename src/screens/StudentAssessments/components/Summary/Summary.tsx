import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../../components';
import { Style } from './style';
import {
  collapsiableAnimation,
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import CommonStyles from 'screens/CommonStyles';
interface props {
  report: any;
}
export const Summary: React.FC<props> = ({ report }) => {
  const [open, setOpen] = useState(false);
  const showSummary = () => (collapsiableAnimation(), setOpen(true));
  const hideSummary = () => (collapsiableAnimation(), setOpen(false));
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
  return (
    <Pressable
      onPress={open ? hideSummary : showSummary}
      style={Style.cardContainer}
    >
      <_View style={Style.innerContainer}>
        <_View style={Style.infoContainer}>
          <_View style={{ width: '40%' }}>
            <_Text style={{ ...Style.headerText, marginBottom: 5 }}>
              {'Summary'}
            </_Text>
          </_View>
          <_View style={Style.stdNameContainer}>
            <_Text style={{ ...Style.labelText, fontSize: 12 }}>
              {'Student Name'}
            </_Text>
            <_Text style={Style.stdName}>{report.studentName}</_Text>
          </_View>
        </_View>
        {open && (
          <_View style={{ width: '100%' }}>
            <_View style={Style.summary}>
              <_View style={Style.infoContainer}>
                <_View style={Style.infoRow}>
                  <_View style={{ width: '50%' }}>
                    <_Text style={Style.labelText} numberOfLines={1}>
                      {`Total ${terminologies['Question']?.pluralLabel}`}
                    </_Text>
                    <_Text style={Style.text}>
                      {report?.dataForReport?.totalQuestionsCount}
                    </_Text>
                  </_View>
                  <_View style={{ width: '50%' }}>
                    <_Text style={Style.labelText} numberOfLines={1}>
                      {'Correct Answer(s)'}
                    </_Text>
                    <_Text style={Style.text}>
                      {report?.dataForReport?.totalCorrectQuestionsCount}
                    </_Text>
                  </_View>
                </_View>
              </_View>
              <_View style={Style.infoContainer}>
                <_View style={Style.infoRow}>
                  <_View style={{ width: '50%' }}>
                    <_Text style={Style.labelText} numberOfLines={1}>
                      {'Wrong Answer(s)'}
                    </_Text>
                    <_Text style={Style.text}>
                      {report?.dataForReport?.totalWrongQuestionsCount}
                    </_Text>
                  </_View>
                  <_View style={{ width: '50%' }}>
                    <_Text style={Style.labelText} numberOfLines={1}>
                      {'Skipped Answer(s)'}
                    </_Text>
                    <_Text style={Style.text}>
                      {report?.dataForReport?.totalSkippedQuestionsCount}
                    </_Text>
                  </_View>
                </_View>
              </_View>
              <_View style={Style.infoContainer}>
                <_Text style={Style.labelText} numberOfLines={1}>
                  {'Obtained Points'}
                </_Text>
                <_Text style={Style.text}>
                  {report?.dataForReport?.pointsObtained}
                </_Text>
              </_View>
            </_View>
            <_View style={Style.totalPointContainer}>
              <_Text
                style={{ ...Style.labelText, fontSize: 16 }}
                numberOfLines={1}
              >
                {'Total Points:'}
              </_Text>
              <_Text
                style={{
                  fontFamily: CommonStyles.fonts.semiBold,
                  marginRight: 20,
                  textAlign: 'center',
                  paddingHorizontal: 10,

                  fontSize: 16,
                }}
              >
                {report?.dataForReport?.totalPoints}
              </_Text>
            </_View>
          </_View>
        )}
        <_View style={Style.circleBtn}>
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
