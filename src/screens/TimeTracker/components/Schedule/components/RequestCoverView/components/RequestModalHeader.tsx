import { RequestCoverModalHeaderInterface } from '../../../../../../../interfaces';
import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';

const RequestModalHeader: React.FC<RequestCoverModalHeaderInterface> = ({
  handleMsgInputState,
  type,
  msgInputState,
  loading,
}) => {
  return (
    <_View style={styles.requestModalHeader}>
      <_View style={styles.requestModalTextContainer}>
        <_Text style={styles.headerText}>
          Request {type === 'cover' ? 'Cover' : 'Trade'}
        </_Text>
      </_View>
      {!loading && (
        <Pressable
          style={styles.modalBtn}
          onPress={() => handleMsgInputState(!msgInputState)}
        >
          <_VectorIcons
            type={!msgInputState ? 'Entypo' : 'AntDesign'}
            name={!msgInputState ? 'new-message' : 'closesquareo'}
            size={20}
            color={whiteThemeColors.white}
          />
        </Pressable>
      )}
    </_View>
  );
};
export { RequestModalHeader };

const styles = StyleSheet.create({
  requestModalHeader: {
    flexDirection: 'row',
    width: '100%',
    height: Platform.OS == 'ios' ? 90 : 50,
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS == 'ios' ? 30 : 0,
  },
  requestModalTextContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 50,
  },
  headerText: {
    color: whiteThemeColors.textColor.whiteText,
    fontSize: 18,
  },
  modalBtn: {
    height: '100%',
    flex: 0.18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
});
