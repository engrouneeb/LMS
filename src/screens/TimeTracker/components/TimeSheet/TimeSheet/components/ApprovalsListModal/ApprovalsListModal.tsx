import { ApprovalsListModalInterface } from 'interfaces';
import React from 'react';
import { FlatList, Modal, Platform, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Button, _Text, _View } from '../../../../../../../components';
import { RenderItem } from './components';

export const ApprovalsListModal: React.FC<ApprovalsListModalInterface> = ({
  timeSheet,
  approvers,
  onPressCallback,
  modalVisible,
}) => {
  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={modalVisible}
      supportedOrientations={['portrait', 'landscape']}
    >
      <_View style={styles.approversName}>
        <_Text style={styles.approverNameText}>{timeSheet.Approvers}</_Text>
      </_View>

      {approvers.length > 0 ? (
        <FlatList
          data={approvers}
          renderItem={({ item }) => <RenderItem Obj={item} />}
          keyExtractor={(item: any) => item.uniqueId}
        />
      ) : (
        <_Text style={styles.NoApproversAssigned}>
          {timeSheet.NoApproversAssigned}
        </_Text>
      )}
      <_View style={styles.closeBtnView}>
        <_Button
          isBlock={false}
          submitting={true}
          width={240}
          borderRadius={15}
          style={[styles.closeBtn]}
          callback={onPressCallback}
          btnText={timeSheet.Close}
          BtnTxt={{
            color: whiteThemeColors.white,
          }}
        />
      </_View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  approversName: {
    width: '100%',
    height: Platform.OS == 'ios' ? 100 : 50,
    backgroundColor: whiteThemeColors.primary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  approverNameText: {
    fontSize: 17,
    paddingTop: Platform.OS == 'ios' ? 40 : 0,

    color: whiteThemeColors.white,
  },
  NoApproversAssigned: {
    justifyContent: 'center',
    marginTop: 60,
    alignSelf: 'center',

    color: whiteThemeColors.primaryTextColor,
  },
  closeBtnView: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  closeBtn: {
    marginLeft: 10,
    marginVertical: 10,
    justifyContent: 'center',
    height: 42,
    alignItems: 'center',
    backgroundColor: whiteThemeColors.primary,
    alignSelf: 'center',
  },
});
