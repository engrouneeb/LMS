import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import { _Screen } from '../../../components';
import { Appstate } from '../../../reducers/Appstate';
import ScreensNames from '../../../screenNames';
import CstHeader from '../../Headers';
import BootomTab from './Tabs/Tabs';
interface props {
  route?: any;
}
const StaffDetails: React.FC<props> = ({ route }) => {
  const { roleName: role, userID }: any = useSelector(
    (state: Appstate) => state.User.UserInfo,
  );
  let userId;
  if (route) {
    userId = route?.params.userId;
  } else userId = userID;

  const navigation: any = useNavigation();

  const backPress = () => {
    navigation.goBack();
    return true;
  };
  return (
    <_Screen
      header={
        <CstHeader
          isBack
          goBack={() => navigation.goBack()}
          Screen={ScreensNames.StaffDetails.name}
        />
      }
      flex={1}
      hideTopSafeArea
      hideBottomSafeArea
      onAndroidBack={backPress}
    >
      <BootomTab staffId={userId} />
    </_Screen>
  );
};

export { StaffDetails };
