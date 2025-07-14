import React from 'react';
import { ScrollView } from 'react-native';
import { LoadLogoImage } from 'utilities';
import { _Text, _View } from '../../../components';
import PinInput from '../inputview';
import { KeyBoard } from '../keyboard';
import styles from '../style';
interface props {
  pinCodeScreen: any;
  orientation: string;
  changePin: any;
  errorText: string;
  clearAll: any;
  backBtn: any;
  pinCode: any;
  pin: string;
}
export const CheckOrientation: React.FC<props> = ({
  pinCodeScreen,
  orientation,
  changePin,
  errorText,
  clearAll,
  backBtn,
  pinCode,
  pin,
}) => {
  return (
    <_View style={styles.pinContainer}>
      {orientation == 'PORTRAIT' && (
        <_View style={styles.logoContainer}>
          <LoadLogoImage showLogo={false} height={150} width={150} />
        </_View>
      )}

      <_View style={styles.pinInputContainer}>
        <_Text style={styles.pinInputTxt}>{pinCodeScreen.EnterYourPIN}</_Text>
        <PinInput pinCode={pinCode} style={{ zIndex: 10, flex: 1 }} />
      </_View>
      <_View style={styles.invalidPinContainer}>
        {errorText.includes('Invalid') && pin.length == 0 ? (
          <_Text style={styles.invalidPinTxt}>{errorText}</_Text>
        ) : null}
      </_View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyBoard
          keys={pinCodeScreen.keyMeta}
          clearAll={clearAll}
          backBtn={backBtn}
          changePin={changePin}
        />
      </ScrollView>
    </_View>
  );
};
