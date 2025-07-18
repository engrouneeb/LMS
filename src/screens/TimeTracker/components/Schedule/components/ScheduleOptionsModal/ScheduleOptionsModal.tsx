import { ScheduleOptionsModalInterface } from '../../../../../../interfaces';
import React, { FC } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { _View } from '../../../../../../components';
import { CustomButton, Header } from './components';
import { whiteThemeColors } from 'theme';
import { useAppModulePermission } from '../../../../../../customHooks';

export const ScheduleOptionsModal: FC<ScheduleOptionsModalInterface> = ({
  modalVisible,
  setModalVisible,
  handleCopyWeekScheduleModal,
  handleCopyPreviousWeek,
  onPressByRange,
  handleAddWageItem,
  showAddWageItem,
}) => {
  const { filterMenuOptions } = useAppModulePermission();
  const isCreateSchedule = filterMenuOptions("CreateSchedule");
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='slide'
      transparent={true}
      visible={modalVisible}
    >
      <_View style={styles.centeredView}>
        <_View style={styles.modalView}>
          <_View style={styles.inner}>
            <Header setModalVisible={setModalVisible} />
            <CustomButton
              btnText={'Copy Previous Schedule'}
              callback={() => {
                setModalVisible();
                handleCopyPreviousWeek();
              }}
            />
            {isCreateSchedule && <><CustomButton
              callback={() => {
                setModalVisible();
                handleCopyWeekScheduleModal();
              }}
              btnText={'Copy Week Schedule'}
              marginTop={8}
            />
              <CustomButton
                callback={onPressByRange}
                btnText={'Add Schedule By Range'}
                marginTop={8}
              />
            </>}
            <CustomButton
              callback={handleAddWageItem}
              btnText={'Add Wage Item'}
              marginTop={8}
              show={showAddWageItem}
            />
          </_View>
        </_View>
      </_View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.3)',
  },
  modalView: {
    position: 'absolute',
    bottom: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  inner: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
