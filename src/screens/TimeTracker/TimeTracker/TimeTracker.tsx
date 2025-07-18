import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../../../reducers/Appstate';
import { isAdmin, whiteThemeColors } from '../../../Utilities';
import { setTimeOffInstructor } from '../../../actions/AsyncStorage';
import { _Screen, _View, NoPermission } from '../../../components';
import DrawerScreens from '../../../navigation/Drawer/DrawerScreenNames';
import Screens from '../../../screenNames';
import Header from '../../Headers';
import { RenderItem } from './components';
import { useAppModulePermission } from '../../../customHooks';

export const TimeTracker = () => {
  const [sumOfBadges, setSumOfBadges] = useState(0);
  const { filterMenuOptions } = useAppModulePermission();
   const [showNoPermission,setNoPermission]= useState(false);
  const { userData, timeTrackerBadges, timeTrackerScreen } = useSelector(
    (state: Appstate) => ({
      userData: state.User.UserInfo,
      timeTrackerBadges: state.timetracker.timeTrackerBadges,
      timeTrackerScreen: state.language.timeTrackerScreen,
    })
  );
  const menuList=filterMenuOptions(timeTrackerScreen.adminList);
  const dispatch = useDispatch();
  const navigation = useNavigation<
    DrawerNavigationProp<ParamListBase> & NavigationProp<ParamListBase>
  >();
 useEffect(()=>{
       setNoPermission(!(menuList?.length>0));
     },[])
  useEffect(() => getRequestsBadgesCount(), []);

  const handleBack = () => {
    navigation.navigate(DrawerScreens.dashboard.name);
    return true;
  };

  const getRequestsBadgesCount = () => {
    let badges = 0;
    for (const key in timeTrackerBadges) {
      if (key !== 'status') {
        if (typeof timeTrackerBadges[key] === 'number') {
          badges += timeTrackerBadges[key];
        }
      }
    }
    setSumOfBadges(badges);
  };

  const openScreen = (item: any) => {
    if (navigation.isFocused()) {
      switch (item.title) {
        case timeTrackerScreen.Schedule:
          return navigation.navigate(Screens.schedule.name);
        case timeTrackerScreen.Timesheet:
          return navigation.navigate(Screens.timeSheet.name);
        case timeTrackerScreen.TimeOff:
          if (isAdmin(userData.roleName)) {
            return navigation.navigate(Screens.instructorList.name);
          } else {
            dispatch(setTimeOffInstructor(userData.userID));
            return navigation.navigate(Screens.timeOff.name, {
              userId: userData.userID,
            });
          }
        case timeTrackerScreen.Wages:
          return navigation.navigate(Screens.wages.name, {
            Wages: timeTrackerScreen.Wages,
          });
        case timeTrackerScreen.Requests:
          return navigation.navigate(Screens.requests.name, {
            Requests: timeTrackerScreen.Requests,
          });
        case timeTrackerScreen.Setup:
          return navigation.navigate(Screens.setupScreen.name, {
            setup: timeTrackerScreen.Setup,
          });
        default:
          break;
      }
    }
  };
  return (
    <_Screen
      header={
        <Header
          isMenu
          OpenMenu={() => navigation.toggleDrawer()}
          Screen={timeTrackerScreen.timeTracker}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
      backgroundColor={whiteThemeColors.background}
    >
      {showNoPermission?
                <NoPermission/>
                :<FlatList
        showsVerticalScrollIndicator={false}
        data={menuList&&menuList}
        style={{ flex: 1 }}
        ListHeaderComponent={() => <_View height={15} />}
        renderItem={({ item, index }) => (
          <RenderItem
            item={item}
            index={index}
            onPressCard={() => openScreen(item)}
            sumOfBadges={sumOfBadges}
            timeTrackerScreen={timeTrackerScreen}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />}
    </_Screen>
  );
};
