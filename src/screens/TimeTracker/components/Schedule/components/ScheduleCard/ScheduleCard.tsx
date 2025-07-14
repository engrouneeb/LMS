import { ScheduleCardInterface } from 'interfaces';
import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  convertUTCDateToLocalDateStringFormat,
  whiteThemeColors,
} from 'utilities';
import { _View } from '../../../../../../components';
import RequestModal from '../RequestCoverView/RequestModal';
import { Card, NoWorkSchedule, RenderTimeOff } from './components';
import { AddScheduleAndShowDate } from './components/AddScheduleAndShowDate';
const ScheduleCard: FC<ScheduleCardInterface> = ({
  day,
  dates,
  index,
  schedule,
  userName,
  onPress,
  setEditingEnable,
  changeModalState,
  domainURL,
  userID,
}) => {
  const [showRecoverModal, setShowRecoverModal] = useState(false);
  const [indexVal, setIndexVal] = useState<any>();
  const date = `${day}, ${convertUTCDateToLocalDateStringFormat(dates[index])}`;
  return (
    <_View width={'100%'}>
      <_View style={styles.container}>
        <AddScheduleAndShowDate date={date} onPress={onPress} />
      </_View>
      <Card
        show={schedule[index].daySchedules.length !== 0}
        schedule={schedule}
        setEditingEnable={setEditingEnable}
        changeModalState={changeModalState}
        userName={userName}
        index={index}
        setShowRecoverModal={setShowRecoverModal}
        dates={dates}
        setIndexVal={setIndexVal}
      />
      {showRecoverModal && (
        <RequestModal
          showModal={showRecoverModal}
          handleModalState={() => setShowRecoverModal(false)}
          date={dates[index]}
          checkIn={schedule[index]?.daySchedules[indexVal]?.checkIn}
          checkOut={schedule[index]?.daySchedules[indexVal]?.checkOut}
          userID={userID}
          dayID={schedule[index]?.daySchedules[indexVal]?.dayID}
          type='cover'
          domainURL={domainURL}
          day={day}
        />
      )}
      <NoWorkSchedule visibility={schedule[index].daySchedules.length == 0} />
      <RenderTimeOff schedule={schedule} index={index} />
    </_View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.primary + 10,
  },
});
export { ScheduleCard };
