import { WagesDetailsInterface } from 'interfaces';
import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _View } from '../../../../../../components';
import {
  Info,
  ModalHeader,
  StartEndTime,
  TitleValue,
  WageTitle,
} from './components';

export const WageDetailsModal: React.FC<WagesDetailsInterface> = ({
  modalVisible,
  setModalVisible,
  wageData,
}) => {
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='slide'
      transparent={true}
      visible={modalVisible}
    >
      <_View style={styles.centeredView}>
        <_View style={styles.modalView}>
          <ModalHeader onCloseModal={() => setModalVisible(false)} />
          <_View style={styles.innerContainer}>
            <WageTitle title={wageData.itemName} />
            <StartEndTime
              startDate={wageData.startDateDisplay}
              endDate={wageData.endDateDisplay}
            />
            <Info
              wageTitle={'Wage : '}
              wageValue={wageData.userWage}
              hoursTitle={'Hours : '}
              hoursValue={wageData.totalHours}
            />
            <TitleValue title={'Status : '} value={wageData.status} />
            <TitleValue
              title={'Apply Wage From : '}
              value={wageData.applyWageFrom}
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
    backgroundColor: 'rgba(54,54,54,0.5)',
  },
  modalView: {
    backgroundColor: whiteThemeColors.background,
    width: '100%',
    borderRadius: 35,
    position: 'absolute',
    bottom: -2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  innerContainer: {
    backgroundColor: whiteThemeColors.background,
    // marginTop: 25,
    width: '100%',
    paddingBottom: 30,
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    paddingHorizontal: 30,
    padding: 20,
  },
});
