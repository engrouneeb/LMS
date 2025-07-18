import { WagesSummaryModalInterface } from '../../../../../../interfaces';
import React from 'react';
import { Modal } from 'react-native';
import { _View } from '../../../../../../components';
import { Header, StickyIcon, TitleValues } from './components';
import { styles } from './style';

export const SummaryModal: React.FC<WagesSummaryModalInterface> = ({
  modalVisible,
  setModalVisible,
  WageDetails,
}) => {
  return (
    <Modal
      transparent
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      visible={modalVisible}
    >
      <_View style={styles.centeredView}>
        <_View style={styles.modalView}>
          <Header
            headerText={'View Summary'}
            _onPress={() => setModalVisible(false)}
          />
          <_View style={styles.innerContainer}>
            <StickyIcon />
            <TitleValues
              containerStyle
              title={'Total Schduled Hours : '}
              value={WageDetails.totalScheduledHours}
            />
            <TitleValues
              title={'Total Logged Hours : '}
              value={WageDetails.loggedHours}
            />
            <TitleValues
              title={'Total Check-In/Out Hours : '}
              value={WageDetails.checkInOutHours}
            />
            <TitleValues
              title={'Total Fixed Hours : '}
              value={WageDetails.fixedHours}
            />
            <TitleValues
              title={'Total Wages : '}
              value={WageDetails.totalWages}
            />
          </_View>
        </_View>
      </_View>
    </Modal>
  );
};
