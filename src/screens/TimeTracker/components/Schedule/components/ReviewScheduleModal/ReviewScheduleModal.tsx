import { ReviewScheduleModalInterface } from '../../../../../../interfaces';
import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../../../../../reducers/Appstate';
import { _View } from '../../../../../../components';
import {
  ModalHeader,
  NotifyOptions,
  PublishButton,
  SummaryTotalShift,
} from './components';
import { styles } from './style';
import { useAppModulePermission } from '../../../../../../customHooks';

export const ReviewScheduleModal: React.FC<ReviewScheduleModalInterface> = ({
  modalVisible,
  setModalVisible,
  selectedWeekStartDate,
  selectedWeekEndDate,
  onSelect,
  publishSchedule,
  totalShifts,
}) => {
  const { adminSchedule } = useSelector((state: Appstate) => state.language);
  const notificationTypesList = adminSchedule.notificationTypes;
  const [selectedItem, setSelectedItem] = useState<any>([]);
  const { filterMenuOptions } = useAppModulePermission();
  const isPublishSchedule = filterMenuOptions("PublishSchedule");

  return (
    <Modal
      transparent
      supportedOrientations={['portrait', 'landscape']}
      animationType='slide'
      visible={modalVisible}
    >
      <_View style={styles.centeredView}>
        <_View style={styles.modalView}>
          <ModalHeader
            startDate={selectedWeekStartDate}
            endDate={selectedWeekEndDate}
            setModalVisible={setModalVisible}
          />
          <_View style={styles.section}>
            <SummaryTotalShift totalShifts={totalShifts} />
          </_View>
          <NotifyOptions
            typeLists={notificationTypesList}
            onPress={(index: any, item: any) => {
              onSelect(index);
              setSelectedItem(item);
            }}
            selectedItem={selectedItem}
          />
          {isPublishSchedule && <PublishButton
            onPress={() => {
              publishSchedule();
              setModalVisible(false);
            }}
          />}
        </_View>
      </_View>
    </Modal>
  );
};
