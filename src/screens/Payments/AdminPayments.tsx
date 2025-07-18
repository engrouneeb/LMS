import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { _Screen, _Text, _VectorIcons, _View } from '../../components';
import DrawerScreens from '../../navigation/Drawer/DrawerScreenNames';
import ScreensNames from '../../navigation/Drawer/DrawerScreenNames';
import CstHeader from '../Headers';
import { whiteThemeColors } from '../../Utilities';
import CommonStyles from '../../screens/CommonStyles';
import { Pressable } from 'react-native';

interface StaffMenuProps {
  route?: any;
}

export const AdminPayments: FC<StaffMenuProps> = ({ route }) => {
  const options = [
    {
      id: 0,
      name: 'Payments',
      navigation: 'Payments',
      iconType: 'MaterialIcons',
      iconName: 'payment',
    },
    {
      id: 1,
      name: 'Transactions',
      navigation: 'Transactions',
      iconType: 'AntDesign',
      iconName: 'creditcard',
    },
  ];
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
          Screen={ScreensNames.payments.name}
        />
      }
      flex={1}
      hideTopSafeArea
      hideBottomSafeArea
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={backPress}
    >
      {options.map((option) => {
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
              size={25}
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
