import {
  FeebackTabCardInterface,
  FeedbackModalInterface,
  FeedbackTabInterface,
} from 'interfaces';
import React, { FC, useState } from 'react';
import { Modal, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import { _ActivityIndicator } from 'screens/Loader';
import { whiteThemeColors } from 'utilities';
import { NoInfoSvg } from '../../../../../../../assets/Icons';
import { _Text, _VectorIcons, _View } from '../../../../../../components';
import FeedbackMessage from './components/FeedbackMessage';
import { styles } from './styles';
import { NoDataFound } from '../NoDataFound';

const _FeedBackTab: React.FC<FeedbackTabInterface> = ({
  classLabel,
  levleLabel,
}) => {
  const { feedback, loading }: any = useSelector((state: Appstate) => ({
    feedback: state.StudentInfoReducer.feedback[0]?.classesList || [],
    loading: state.StudentInfoReducer.isFeedbackLoading,
  }));

  return (
    <_View flex={1} backgroundColor={whiteThemeColors.background}>
      {loading ? (
        <_ActivityIndicator size='large' />
      ) : !Boolean(feedback.length) ? (
        <NoDataFound />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {feedback.map((clsObj: any) => (
            <FeedbackCard
              data={clsObj}
              classLabel={classLabel}
              courseLevel={levleLabel}
            />
          ))}
        </ScrollView>
      )}
    </_View>
  );
};

const FeedbackCard: FC<FeebackTabCardInterface> = ({
  data,
  classLabel,
  courseLevel,
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const showCenterFeedback = (data: any) => {
    setFeedback(data);
    setShowFeedback(true);
  };

  const showStudentFeedback = (data: any) => {
    setFeedback(data);
    setShowFeedback(true);
  };

  return (
    <_View style={styles.innerContainer}>
      <_View style={styles.headerContainer}>
        <_Text style={styles.labelText}>{`${classLabel} ${courseLevel}`}</_Text>
        <_Text numberOfLines={2} style={styles.text}>
          {data.courseLevelName}
        </_Text>
        <_Text style={styles.labelText}>{`${classLabel} Name`}</_Text>
        <_Text numberOfLines={2} style={styles.text}>
          {data.className}
        </_Text>
        <_View style={styles.line} />
        <_Text style={styles.labelText}>{'Feedback'}</_Text>
        <_View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              showCenterFeedback(data?.centerFeedback);
            }}
          >
            <_View style={styles.btnView}>
              <_Text numberOfLines={1} style={styles.centerTxt}>
                {'Center'}
              </_Text>
            </_View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              showStudentFeedback(data.studentFeedback);
            }}
          >
            <_View style={styles.btnView}>
              <_Text style={styles.contactStd}>{'Contact/Student'}</_Text>
            </_View>
          </TouchableOpacity>
        </_View>
      </_View>
      <FeedbackModal
        show={showFeedback}
        list={feedback}
        close={() => setShowFeedback(false)}
      />
    </_View>
  );
};

const FeedbackModal: FC<FeedbackModalInterface> = ({ show, close, list }) => {
  return (
    <Modal
      visible={show}
      transparent
      animationType={'slide'}
      style={{ backgroundColor: 'red' }}
      onRequestClose={close}
    >
      <_View style={styles.modalMainContainer}>
        <_View style={styles.modalContainer}>
          <_View
            style={
              list && list.length > 0
                ? styles.modalHeaderContainer1
                : styles.modalHeaderContainer
            }
          >
            <_Text style={styles.modalHeaderText}>{'Feedback'}</_Text>
            <TouchableOpacity
              style={{
                backgroundColor: whiteThemeColors.primary + 30,
                marginRight: 10,
                width: 30,
                height: 30,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
              activeOpacity={0.8}
              onPress={close}
            >
              <_VectorIcons
                name={'close'}
                type={'AntDesign'}
                size={20}
                color={whiteThemeColors.primaryDark}
              />
            </TouchableOpacity>
          </_View>
          {!list || list.length == 0 ? (
            <_View style={styles.noInfoContainer}>
              <NoInfoSvg size={80} opacity={0.8} />
              <_Text style={styles.noInfo}>{'No Feedback'}</_Text>
            </_View>
          ) : (
            <_View style={styles.feedbackContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ width: '100%' }}
              >
                {list.map((Obj: any) => {
                  return (
                    <FeedbackMessage
                      name={Obj.name}
                      text={Obj.feedback}
                      dateTime={Obj.dateTime}
                      image={Obj.image}
                    />
                  );
                })}
              </ScrollView>
            </_View>
          )}
        </_View>
      </_View>
    </Modal>
  );
};
export const FeedbackTab = React.memo(_FeedBackTab);
