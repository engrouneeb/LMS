import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { ItemInterface, UserAndBadgesInterface } from '../../../../interfaces';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../../reducers/Appstate';
import { whiteThemeColors } from '../../../../Utilities';
import { Clock2Svg, ClockSvg } from '../../../../../assets/Icons';
import { _Screen, _Text, _VectorIcons, _View, NoPermission } from '../../../../components';
import ScreensNames from '../../../../screenNames';
import Header from '../../../Headers';
import { TimeTrackerRequests } from '../../../values/english';
import { Counter } from './components/Requests';
import CommonStyles from '../../../../screens/CommonStyles';
import { AppModuleTypeEnum, AppModuleScreenTypeEnum } from '../../../../constants';
import { useAppModulePermission } from '../../../../customHooks';


const GetSvg = {
  [TimeTrackerRequests.TimeSheet]: (
    <Clock2Svg size={30} color={whiteThemeColors.icons.clock2Icon} />
  ),
  [TimeTrackerRequests.TimeOff]: (
    <ClockSvg size={35} color={whiteThemeColors.icons.clockIcon} />
  ),
  [TimeTrackerRequests.Expense]: (
    <_VectorIcons
      type={'MaterialCommunityIcons'}
      name='trending-up'
      color={whiteThemeColors.icons.blueIcon}
      size={35}
    />
  ),
  [TimeTrackerRequests.Cover]: (
    <_VectorIcons
      type={'AntDesign'}
      name='menu-fold'
      color={whiteThemeColors.icons.classIcon}
      size={28}
    />
  ),
};

const Requests = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { currentUser, timeTrackerBadges }: UserAndBadgesInterface =
    useSelector((state: Appstate) => ({
      currentUser: state.User.UserInfo,
      timeTrackerBadges: state.timetracker.timeTrackerBadges,
    }));
    const [showNoPermission,setNoPermission]= useState(false)
  const { filterMenuOptions } = useAppModulePermission();

  const Tabs = [
    {
      name: TimeTrackerRequests.TimeSheet,
      navigateTo: ScreensNames.timeSheetRequests.name,
      badgeCount: timeTrackerBadges?.timeSheetCount,
      module: AppModuleTypeEnum.TimeTracker,
      screen: AppModuleScreenTypeEnum.RequestTimesheet
    },
    {
      name: TimeTrackerRequests.TimeOff,
      navigateTo: ScreensNames.timeOffRequests.name,
      badgeCount: timeTrackerBadges?.timeOffCount,
      module: AppModuleTypeEnum.TimeTracker,
      screen: AppModuleScreenTypeEnum.RequestTimeOff
    },
    {
      name: TimeTrackerRequests.Expense,
      navigateTo: ScreensNames.expenseRequests.name,
      badgeCount: timeTrackerBadges?.expenseCount,
      module: AppModuleTypeEnum.TimeTracker,
      screen: AppModuleScreenTypeEnum.RequestExpense
    },
    {
      name: TimeTrackerRequests.Cover,
      navigateTo: ScreensNames.coverRequests.name,
      badgeCount:
        timeTrackerBadges?.coverCount + timeTrackerBadges?.coverageCount,
      module: AppModuleTypeEnum.TimeTracker,
      screen: AppModuleScreenTypeEnum.RequestCover
    },
  ];
  const requestTabs = filterMenuOptions(Tabs);
  const handleOnPress = (item: ItemInterface) => {
    navigation.navigate(item.navigateTo, {
      timeTrackerBadges: timeTrackerBadges,
      roleName: currentUser?.roleName,
    });
  };
   useEffect(()=>{
      setNoPermission(!(requestTabs?.length>0));
    },[])

  const renderItem = useCallback(
    (item: ItemInterface) => {
      return (
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => handleOnPress(item)}
        >
          <_View style={styles.svgContainer}>{GetSvg[item.name]}</_View>
          <_Text style={styles.tabText}>{item.name}</_Text>
          <_View
            style={{
              width: 30,
              height: 30,
              backgroundColor: whiteThemeColors.primary + 30,
              borderRadius: 8,
              position: 'absolute',
              right: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <_VectorIcons
              type={'AntDesign'}
              name='right'
              color={whiteThemeColors.white}
              size={15}
            />
          </_View>
          <Counter item={item} />
        </TouchableOpacity>
      );
    },
    [requestTabs]
  );

  const handleBack = () => {
    navigation.goBack();
    return true;
  };
  return (
    <_Screen
      header={<Header isBack Screen={'Requests'} GoBack={handleBack} />}
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
      backgroundColor={whiteThemeColors.background}
    >
       {showNoPermission?
          <NoPermission/>
          :
          <FlatList
        showsVerticalScrollIndicator={false}
        data={requestTabs}
        renderItem={({ item }) => renderItem(item)}
        ListHeaderComponent={() => <_View height={20} />}
        keyExtractor={(item) => item.name.toString()}
      />
      } 
    </_Screen>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.white + 90,
    flexDirection: 'row',
    marginVertical: 5,
    borderRadius: 20,
    height: 100,
  },
  tabText: {
    paddingVertical: 35,
    fontSize: 16,
    marginLeft: 30,
    fontFamily: CommonStyles.fonts.medium,
  },
  svgContainer: {
    backgroundColor: whiteThemeColors.white,
    width: '25%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
export { Requests };
