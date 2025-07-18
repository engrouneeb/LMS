import React, { FC, useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Orientation, isParent, isStudent, whiteThemeColors } from '../../Utilities';
import { PinComponent } from '.';
import { _VectorIcons, _View } from '../../components';
import { Appstate } from '../../reducers/Appstate';
import { QRCode } from './QRCode';
import styles from './style';
import { usePincode } from './hooks';
import{saveCheckInMethod} from "../../actions/PinCodeActions"

const PIN_CODE = require('../../../assets/pinCode.png');
interface props {
  navigation: any;
}
export const PinCodeScreen: FC<props> = ({ navigation }) => {
  const userRole: any = useSelector((state: Appstate) => state.User.UserInfo);
  const {selectedCheckinMethod}= useSelector((state: Appstate) => state.token);
  const dispatch = useDispatch();
  const [switchedScreen, setSwitchedScreen] = useState<"PinCode"|"QRCode"|undefined>(selectedCheckinMethod);
  const { getCompanyCheckInList } = usePincode();
  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    getCompanyCheckInList();
  }, []);
  console.log({switchedScreen});
  

  const headerSwitchIcon = () => {
    return (
      <Orientation
        getOrientation={(o: any) => {
          setOrientation(o);
        }}
      >
        <TouchableOpacity onPress={() => {
         const nextScreen = switchedScreen === "PinCode" ? "QRCode" : "PinCode";
         dispatch(saveCheckInMethod(nextScreen));
         setSwitchedScreen(nextScreen);
        }}
          >
          {switchedScreen=="PinCode" ? (
            <Image
              source={PIN_CODE}
              style={
                orientation == 'PORTRAIT'
                  ? styles.pinIcon
                  : styles.orientedPinIcon
              }
            />
          ) : (
            <_VectorIcons
              type={'MaterialCommunityIcons'}
              name={'qrcode-scan'}
              size={32}
              color={whiteThemeColors.white}
            />
          )}
        </TouchableOpacity>
      </Orientation>
    );
  };
  const UserRole = userRole?.roleName;
  return !isStudent(UserRole) && !isParent(UserRole) ? (
    <_View style={{ flex: 1 }}>
      <_View style={styles.switchContainer}>{headerSwitchIcon()}</_View>
      {switchedScreen=="QRCode"  ? <QRCode /> : <PinComponent />}
    </_View>
  ) : (
    <PinComponent />
  );
};
