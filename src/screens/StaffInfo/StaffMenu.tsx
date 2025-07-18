import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { _Screen, _Text, _VectorIcons, _View } from '../../components';
import DrawerScreens from '../../navigation/Drawer/DrawerScreenNames';
import ScreensNames from '../../screenNames';
import CstHeader from '../Headers';
import {
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from '../../Utilities';
import CommonStyles from '../../screens/CommonStyles';
import { Pressable } from 'react-native';
import { useAppModulePermission } from '../../customHooks';
import { AppModuleScreenTypeEnum, AppModuleTypeEnum, ModuleScreenName } from '../../constants';

interface StaffMenuProps {
  route?: any;
}

export const StaffMenu: FC<StaffMenuProps> = ({ route }) => {
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {},
  );
  const { filterMenuOptions } = useAppModulePermission();

  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
    };
    fetchTerminologies();
  }, []);
  const options = [
    {
      id: 0,
      name: 'Staff Info',
      navigation: DrawerScreens.StaffInfo.name,
      iconType: 'FontAwesome',
      iconName: 'users',
      module: AppModuleTypeEnum.StaffInfo,
      screen: AppModuleScreenTypeEnum.StaffIntro,
    },
    {
      id: 1,
      name: `${terminologies['Class']?.label} Overview`,
      navigation: DrawerScreens.ClassOverview.name,
      iconType: 'FontAwesome5',
      iconName: 'chalkboard-teacher',
      module: AppModuleTypeEnum.StaffInfo,
      screen: AppModuleScreenTypeEnum.ClassOverview,
    },
  ]; 
  const menu=filterMenuOptions(options);
  const navigation: any = useNavigation();
  const backPress = () => {
    navigation.navigate(DrawerScreens.dashboard.name);
    return true;
  };
  return (
    <_Screen
      header={
        <CstHeader
          isMenu
          OpenMenu={() => {
            navigation.toggleDrawer();
          }}
          GoBack={backPress}
          Screen={ScreensNames.StaffDetails.name}
        />
      }
      flex={1}
      hideTopSafeArea
      hideBottomSafeArea
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={backPress}
    >
      {menu.map((option) => {
        return (
          <Pressable
            onPress={() => {
              navigation.navigate(option.navigation);
            }}
            style={{
              height: 60,
              borderRadius: 8,
              backgroundColor: whiteThemeColors.white,
              margin: 8,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <_VectorIcons
              type={option.iconType}
              name={option.iconName}
              size={18}
              color={whiteThemeColors.primary + 60}
              style={{ margin: 10 }}
            />
            <_Text
              style={{
                width: '80%',
                fontSize: 14,
                textTransform: 'capitalize',
                fontFamily: CommonStyles.fonts.semiBold,
              }}
            >
              {option.name}
            </_Text>
            <_VectorIcons
              type='Entypo'
              name={'chevron-right'}
              size={14}
              color={whiteThemeColors.primary}
              style={{ marginright: 10 }}
            />
          </Pressable>
        );
      })}
    </_Screen>
  );
};
