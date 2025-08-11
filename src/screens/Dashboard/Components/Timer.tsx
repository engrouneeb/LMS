import {_Button, _Text, _VectorIcons, _View} from '../../../components';
import React, {FC, Fragment, useEffect, useState} from 'react';
import {FlatList, Modal, Pressable, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Loader from '../../Loader/loader';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import {DataAccess} from '../../../../data/DAL';
import {showHideTimer} from '../../../actions/TimerAction';
import {whiteThemeColors} from '../../../Utilities/colors';
import {styles} from './TimerStyles';

interface InitialState {
  totalCheckInTime: string;
  userCheckInTime: string;
  isShowContinue: boolean;
  pauseContinueTimerLogs: Array<any>;
}

// Utility function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

// Component to render individual clock details
const RenderItem: FC<{item: any}> = ({item}) => (
  <Fragment>
    <_View style={styles.renderItemContainer}>
      <_View style={styles.renderItemRow}>
        <_View style={styles.renderItemIconWrapper}>
          <_View style={styles.renderItemIcon}>
            <_VectorIcons
              type="Entypo"
              name="clock"
              color={whiteThemeColors.red + 90}
              size={24}
            />
          </_View>
          <_View style={styles.renderItemTextWrapper}>
            <_Text>Pause</_Text>
            <_Text style={styles.renderItemTimeText}>{item.pauseTime}</_Text>
          </_View>
        </_View>
        <_View style={styles.renderItemIconWrapper}>
          <_View style={styles.renderItemIcon}>
            <_VectorIcons
              type="AntDesign"
              name="clockcircleo"
              color={whiteThemeColors.green}
              size={24}
            />
          </_View>
          <_View style={styles.renderItemTextWrapper}>
            <_Text>Continue</_Text>
            <_Text style={styles.renderItemTimeText}>{item.continueTime}</_Text>
          </_View>
        </_View>
      </_View>
    </_View>
  </Fragment>
);

export const Timer: React.FC<{isShow: boolean}> = ({isShow}) => {
  console.log('===================');
  console.log({isShow});
  console.log('===================');
  const [modalVisible, setModalVisible] = useState(isShow);

  useEffect(() => {
    setModalVisible(isShow);
  }, [isShow]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [clockDetails, setClockDetails] = useState<InitialState>({
    totalCheckInTime: '',
    userCheckInTime: '',
    isShowContinue: false,
    pauseContinueTimerLogs: [],
  });
  const [submitting, setIsSubmitting] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {Get, PostSecured} = DataAccess();

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLoading(true);
    getTimerLog();
  }, [modalVisible]);

  const getTimerLog = async () => {
    const EndPoint = ApiEndpoints.GetStaffTimerLogs;
    const res = await Get(EndPoint);
    setLoading(false);
    if (!res.error) {
      setClockDetails(res);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    dispatch(showHideTimer(false));
  };

  const handleTimeLog = async () => {
    setIsSubmitting(false);
    const EndPoint = ApiEndpoints.PauseContinueStaffTimer;
    await PostSecured(EndPoint, {});
    handleModalClose();
    setIsSubmitting(true);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleModalClose}>
      <View style={styles.modalBackground}>
        <_View style={styles.modalContent}>
          <_View style={styles.titleContainer}>
            <_Text style={styles.titleText}>Check-In/Out Detail</_Text>
            <Pressable onPress={handleModalClose} style={styles.closeButton}>
              <_VectorIcons
                type="IonIcons"
                name="close"
                size={20}
                color={whiteThemeColors.primary}
              />
            </Pressable>
          </_View>
          <_View style={styles.timeDateContainer}>
            <_View style={styles.timeDateWrapper}>
              <_VectorIcons
                type="MaterialCommunityIcons"
                name="timetable"
                size={50}
                color={whiteThemeColors.primary}
              />
              <_View style={styles.dateTimeTextContainer}>
                <Text style={styles.dateText}>
                  {formatDate(currentTime.toDateString())}
                </Text>
                <Text style={styles.timeText}>
                  {currentTime.toLocaleTimeString()}
                </Text>
              </_View>
            </_View>
          </_View>
          <_View style={styles.separator} />
          <_View style={styles.contentContainer}>
            <_Text style={styles.sectionTitle}>Activity Logs</_Text>
            <_View style={styles.logContainer}>
              <_View style={styles.detailContainer}>
                <_View style={styles.iconContainer}>
                  <_VectorIcons
                    type="AntDesign"
                    name="login"
                    color={whiteThemeColors.green}
                    size={20}
                  />
                </_View>
                <_View style={styles.detailTextContainer}>
                  <_View style={styles.row}>
                    <_VectorIcons
                      type="MaterialCommunityIcons"
                      name="clock-check-outline"
                      size={18}
                      color={whiteThemeColors.primary}
                    />
                    <_Text style={styles.labelText}>Check-In</_Text>
                  </_View>
                  <_Text style={styles.detailText}>
                    {clockDetails?.userCheckInTime || 'N/A'}
                  </_Text>
                </_View>
                <_View>
                  <_View style={styles.row}>
                    <_VectorIcons
                      type="MaterialCommunityIcons"
                      name="timer-outline"
                      size={22}
                      color={whiteThemeColors.primary}
                    />
                    <_Text style={styles.labelText}>Time Logged</_Text>
                  </_View>
                  <_Text style={styles.detailText}>
                    {clockDetails?.totalCheckInTime || 'N/A'}
                  </_Text>
                </_View>
              </_View>
              {clockDetails.pauseContinueTimerLogs.length > 0 ? (
                <FlatList
                  data={clockDetails.pauseContinueTimerLogs}
                  keyExtractor={item => item?.id}
                  renderItem={({item}) => <RenderItem item={item} />}
                  style={styles.list}
                />
              ) : (
                <_View style={styles.noLogsContainer}>
                  <_VectorIcons
                    type="MaterialCommunityIcons"
                    name="timetable"
                    size={100}
                    color={whiteThemeColors.primary}
                  />
                  <_Text style={styles.dateText}>No Time Logs</_Text>
                </_View>
              )}
            </_View>
            <_View style={styles.footer}>
              <_Button
                isBlock={!submitting}
                width={'50%'}
                borderRadius={8}
                submitting={submitting}
                callback={handleTimeLog}
                style={styles.btnStyle}
                BtnTxt={{color: 'white', alignSelf: 'center'}}
                btnText={clockDetails.isShowContinue ? 'Continue' : 'Pause'}
              />
            </_View>
          </_View>
        </_View>
      </View>
      {loading && <Loader />}
    </Modal>
  );
};
