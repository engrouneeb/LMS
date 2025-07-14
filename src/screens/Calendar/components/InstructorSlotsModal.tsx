import { FC, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { _Text, _VectorIcons, _View, endpoint } from 'components';
import CommonStyles from 'screens/CommonStyles';
import Loader from '../../Loader/loader';
import { CustomAlert, whiteThemeColors } from 'utilities';
import { RequestMakeupOrCancelClass } from '../../../actions/ClassActions';
import { Item } from '../../../interfaces/screensInterfaces/CalendarScreenInterfaces';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { Schedule } from './Schedule';
import { NoSlots } from './NoSlots';

interface InstructorSlotsModalProps {
  visible: boolean;
  onClose: (val: boolean) => void;
  selectedItem: Item;
  selectedDate: string;
}

interface TimeEntry {
  dayID: number | undefined;
  startTime: string;
  timeTo: string;
  endTime: string;
  dayDate: string;
  scheduleID: number;
  makeupClassId: number;
}

export const InstructorSlotsModal: FC<InstructorSlotsModalProps> = ({
  visible,
  onClose,
  selectedItem,
  selectedDate,
}) => {
  const [loading, setLoading] = useState(false);
  const [showMakeupAlert, setShowMakeupAlert] = useState<boolean>(false);
  const [scheduleList, setScheduleList] = useState<TimeEntry[]>();
  const [selectedDay, setSelectedDay] = useState<TimeEntry>();
  const RequestMakeupClassType = 2; // 2 for makeup class request;
  const dispatch: any = useDispatch();
  const { Get } = DataAccess();
  const { classId, timingId, makeupClassId } = selectedItem;

  useEffect(() => {
    if (visible) getInstructorSchedule();
  }, [visible]);

  const getInstructorSchedule = async () => {
    setLoading(true);
    const EndPoint: endpoint = ApiEndpoints.GetSchedulesForMakeupClass;
    EndPoint.params = `?ClassId=${classId}&TimeId=${timingId}`;
    try {
      const res = await Get(EndPoint);
      if (!res.error) {
        setScheduleList(res?.scheduleDays);
      } else {
        console.error('Error fetching schedule:', res.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMakeupRequest = async () => {
    setShowMakeupAlert(false);
    setLoading(true);
    try {
      const response = await dispatch(
        RequestMakeupOrCancelClass(
          classId,
          timingId,
          selectedDate,
          selectedDay?.dayID,
          RequestMakeupClassType,
          makeupClassId,
        ),
      );
      if (response) {
        Alert.alert('Alert', response.message, [
          {
            text: 'Okay',
            onPress: () => {
              setShowMakeupAlert(false);
              onClose(false);
            },
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      transparent={true}
      visible={visible}
    >
      <_View style={styles.centeredView}>
        <_View style={styles.modalView}>
          <_View style={styles.headerContainer}>
            <_Text style={styles.headText}>Available Slots</_Text>
            <TouchableOpacity
              onPress={() => onClose(false)}
              style={styles.crossIcon}
            >
              <_VectorIcons
                type={'Entypo'}
                name='cross'
                size={15}
                color={whiteThemeColors.black}
                style={{ padding: 5 }}
              />
            </TouchableOpacity>
          </_View>
          <_View style={styles.innerContainer}>
            {loading && <Loader />}
            <FlatList
              data={scheduleList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ marginBottom: 20 }}
              renderItem={({ item }) => (
                <Schedule
                  item={item}
                  onSelectSchedule={setSelectedDay}
                  selected={selectedDay}
                />
              )}
              ListEmptyComponent={<NoSlots loading={loading} />}
              ListFooterComponent={
                selectedDay && (
                  <TouchableOpacity
                    style={styles.requestBtn}
                    onPress={() => setShowMakeupAlert(true)}
                  >
                    <_Text style={styles.requestBtnTxt}>
                      Request Make-Up Class
                    </_Text>
                  </TouchableOpacity>
                )
              }
            />
          </_View>
        </_View>
        <CustomAlert
          visible={showMakeupAlert}
          title={'Warning'}
          msg={'Are you sure you want to request for make-up class?'}
          firstBtn={'Yes'}
          secondBtn={'No'}
          firstBtnFunc={handleMakeupRequest}
          secondBtnFunc={() => setShowMakeupAlert(false)}
        />
      </_View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.7)',
  },
  modalView: {
    backgroundColor: whiteThemeColors.primary,
    width: '90%',
    borderRadius: 35,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headText: {
    color: whiteThemeColors.white,
    fontSize: 18,
    fontFamily: CommonStyles.fonts.semiBold,
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.white,
    borderRadius: 10,
    zIndex: 10,
    marginRight: 15,
    marginTop: 10,
    position: 'absolute',
    right: 10,
  },
  innerContainer: {
    backgroundColor: whiteThemeColors.background,
    marginTop: 25,
    width: '100%',
    minHeight: '25%',
    borderRadius: 35,
    paddingHorizontal: 10,
    padding: 10,
    paddingBottom: 5,
    overflow: 'hidden',
  },
  requestBtn: {
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 8,
    height: 35,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  requestBtnTxt: {
    fontSize: 12,
    color: whiteThemeColors.white,
    alignSelf: 'center',
  },
});
