import {RequestCoverBtnInterface} from '../../../../../../../interfaces';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {whiteThemeColors} from '../../../../../../../Utilities';
import {_Text, _View} from '../../../../../../../components';
import {_ActivityIndicator} from '../../../../../../Loader/_ActivityIndicator';

const RequestBtn: React.FC<RequestCoverBtnInterface> = ({
  onCoverSubmit,
  handleModalState,
  isSavingCover,
  loading,
}) => {
  return loading ? null : (
    <_View style={styles.bottomButtnView}>
      <Pressable
        style={[
          styles.bottomButtons,
          isSavingCover
            ? {backgroundColor: whiteThemeColors.greyDark}
            : {backgroundColor: whiteThemeColors.primary},
        ]}
        onPress={() => onCoverSubmit()}
        disabled={isSavingCover}>
        {isSavingCover ? (
          <_View style={styles.sendBtn}>
            <_Text style={styles.bottomBtnText}>Please wait..</_Text>
            <_ActivityIndicator
              size="small"
              color={whiteThemeColors.white}
              showText={false}
            />
          </_View>
        ) : (
          <_Text style={styles.bottomBtnText}>SEND</_Text>
        )}
      </Pressable>

      <Pressable
        style={[
          styles.bottomButtons,
          isSavingCover
            ? {backgroundColor: whiteThemeColors.greyDark}
            : {backgroundColor: whiteThemeColors.primary},
        ]}
        onPress={() => handleModalState(false)}
        disabled={isSavingCover}>
        <_Text style={styles.bottomBtnText}>CANCEL</_Text>
      </Pressable>
    </_View>
  );
};
export {RequestBtn};

const styles = StyleSheet.create({
  bottomButtnView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 25,
    elevation: 10,
    zIndex: 10,
  },
  bottomButtons: {
    width: '40%',
    justifyContent: 'center',
    borderRadius: 5,
    height: 40,
    shadowColor: '#000',
    alignItems: 'center',
  },
  sendBtn: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  bottomBtnText: {
    color: whiteThemeColors.textColor.whiteText,
  },
});
