import moment from 'moment';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../components';
import { whiteThemeColors } from '../../../Utilities';
import { Constants, TitleWithValue } from './';
import CommonStyles from '../../../screens/CommonStyles';

const DetailsModal = ({
  details,
  visibleModalDetails,
  setVisibleModalDetails,
}) => {
  const {
    eventName,
    eventTiming,
    className,
    courseLevel,
    requestedBy,
    nextTransactionDateTime,
  } = details;

  console.log(nextTransactionDateTime);
  const ModalHeader = () => {
    return (
      <_View style={styles.modalDetailsHeaderContainer}>
        <_Text style={styles.modalDetailsHeaderTxt}>
          {`${Constants.PaymentDetails}`}
        </_Text>
        <TouchableOpacity
          onPress={() => setVisibleModalDetails(false)}
          style={[styles.modalDetailsCloseBtn, styles.cardShadow]}
        >
          <_VectorIcons
            type={'Entypo'}
            name='cross'
            size={22}
            color={whiteThemeColors.primary}
          />
        </TouchableOpacity>
      </_View>
    );
  };

  const Row = ({ title1, title2, value1, value2, height = '23%' }) => {
    return (
      <_View style={[styles.rowContainer, { height: height }]}>
        <_View width={'50%'}>
          <TitleWithValue title={title1} value={value1} valueSize={12} />
        </_View>
        <_View width={'50%'}>
          <TitleWithValue title={title2} value={value2} valueSize={12} />
        </_View>
      </_View>
    );
  };

  const Body = () => {
    return (
      <_View
        width={'99.5%'}
        style={[styles.modalContentContainer, styles.cardShadow]}
      >
        <Row
          title1={Constants.CourseLevel}
          title2={Constants.ClassName}
          value1={courseLevel}
          value2={className}
        />
        <Row
          title1={Constants.EventName}
          title2={Constants.RequestedBy}
          value1={eventName}
          value2={requestedBy}
        />
        <Row
          title1={Constants.EventTiming}
          title2={Constants.NextScheduleDate}
          value1={eventTiming == '' ? 'null' : eventTiming}
          value2={
            nextTransactionDateTime == '' ? 'null' : nextTransactionDateTime
          }
        />
      </_View>
    );
  };

  const ModalContent = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setVisibleModalDetails(false)}
        style={styles.modalDetailsContainer}
      >
        <_View style={styles.modalDetailsBodyContainer}>
          <ModalHeader />
          <Body />
        </_View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='slide'
      transparent={true}
      visible={visibleModalDetails}
      onRequestClose={() => setVisibleModalDetails(false)}
    >
      <ModalContent />
    </Modal>
  );
};

export { DetailsModal };

const styles = StyleSheet.create({
  modalDetailsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.3)',
    paddingHorizontal: 2,
  },
  modalDetailsBodyContainer: {
    width: '100%',
    height: 250,
    backgroundColor: whiteThemeColors.background,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 30,
  },
  modalDetailsHeaderContainer: {
    width: '100%',
    backgroundColor: whiteThemeColors.background,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContentContainer: {
    height: '100%',
    backgroundColor: whiteThemeColors.background,
    alignSelf: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 5,
  },
  modalDetailsHeaderTxt: {
    fontSize: 18,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.semiBold,
    marginTop: -20,
  },
  modalDetailsCloseBtn: {
    width: 25,
    height: 25,
    backgroundColor: whiteThemeColors.white,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    position: 'absolute',
    right: -10,
    top: 10,
  },
  rowContainer: {
    width: '98%',

    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    paddingHorizontal: 11,
    marginVertical: 4,
  },
  cardShadow: {
    shadowColor: whiteThemeColors.white + 30,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});
