import React, { Fragment, useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../Utilities';
import { RecoverSvg, TradeSvg } from '../../../../../../../assets/Icons';
import RequestModal from './RequestModal';

const RequestCoverView = ({ ...props }) => {
  const [showModal, setModalState] = useState(false);

  const handleModalState = (state: any) => setModalState(state);
  return (
    <Fragment>
      <Pressable
        style={styles.addButton}
        onPress={() => handleModalState(true)}
      >
        {props.type === 'cover' ? <RecoverSvg /> : <TradeSvg />}
      </Pressable>
      {showModal && (
        <RequestModal
          showModal={showModal}
          handleModalState={handleModalState}
          date={props.date}
          checkIn={props.checkInTime}
          checkOut={props.checkOutTime}
          userID={props.userID}
          dayID={props.dayID}
          type={props.type}
          domainURL={props.domainURL}
          day={''}
        />
      )}
    </Fragment>
  );
};

export default React.memo(RequestCoverView);

const styles = StyleSheet.create({
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 10,
    backgroundColor: '#0047AB',
    ...Platform.select({
      android: {
        shadowColor: whiteThemeColors.black,
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 1,
        elevation: 7,
        shadowRadius: 20,
      },
    }),
    marginHorizontal: 2,
    zIndex: 100,
  },
});
