import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { debounce } from 'lodash';
import React, { createRef, useEffect, useState } from 'react';
import { Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import {
  clearNotificationCount,
  DeleteNotification,
} from '../../actions/NotificationActions';
import { _Screen, _Text, _View, endpoint } from '../../components';
import DrawerName from '../../navigation/Drawer/DrawerScreenNames';
import CommonStyles from '../CommonStyles';
import CstHeader from '../Headers';
import Search from '../Search';
import { filterdNotificationType, NotificationList } from './components';
import { styles } from './style';
import { whiteThemeColors } from '../../Utilities';
import { Appstate } from '../../reducers/Appstate';
import { EndpointType } from '../../interfaces';
import { useNavigation } from '@react-navigation/native';
var BadgeAndroid = require('react-native-android-badge');

let takes = 30;
const NotificationsTab = () => {
  const navigation: any = useNavigation();
  const searchRef: any = createRef();
  const dispatch = useDispatch();
  const { Get } = DataAccess();
  const { Notification, ClearAll, NoNotificationisFound } = useSelector(
    (state: Appstate) => state.language.notificationScreen,
  );
  const NotificationCount = useSelector(
    (state: Appstate) => state.token.NotificationCount,
  );
  const [isVisible, setisVisible] = useState(false);
  let _rowRefs: any = [];
  const [data, setData] = useState<any>([]);
  const [filterdNotification, setFilterdNotification] = useState<any>([]);
  const [skips, setSkips] = useState<number>(0);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [refreshingLoader, setRefreshingLoader] = useState<boolean>(true);
  const [mainLoader, setMainLoader] = useState<boolean>(true);
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const [footerLoader, setFooterLoader] = useState(false);

  useEffect(() => {
    dispatch(clearNotificationCount(0));
    AsyncStorage.setItem('notificationBadgeCount', JSON.stringify(0));
    navigation.addListener('focus', async () => {
      if (NotificationCount !== undefined && NotificationCount.Count > 0) {
        await AsyncStorage.setItem('badgeCount', '0');
        AsyncStorage.setItem('notificationBadgeCount', JSON.stringify(0));
        _clearNotification();
      }
      initialLoad_And_LoadMore();
    });
  }, []);

  const initialLoad_And_LoadMore = async (onEndReached = false) => {
    setisVisible(false);
    if (!hasMoreData) return;
    onEndReached ? setFooterLoader(true) : setMainLoader(true);
    let skip = skips + takes;
    setSkips(skip);
    let Endpoint: EndpointType = ApiEndpoints.GetUserNotifications;
    Endpoint.params = `?take=${takes}&&skip=${skips}`;
    Get(Endpoint)
      .then((res: filterdNotificationType[]) => {
        if (res?.length > 0) {
          updateLocalCoursesState(res);
        } else setHasMoreData(false);
      })
      .catch((Error: any) => console.log({ initialLoad_And_LoadMore: Error }))
      .finally(() => (setFooterLoader(false), setMainLoader(false)));
    setRefreshingLoader(false);
  };

  const pullToRefreshFetch = async () => {
    let skip = 0;
    setSkips(skip);
    setHasMoreData(true);
    setRefreshingLoader(true);
    let Endpoint: endpoint = ApiEndpoints.GetUserNotifications;
    Endpoint.params = `?take=${takes}&&skip=${skip}`;
    Get(Endpoint).then((res: filterdNotificationType[]) => {
      if (res?.length > 0) {
        setData(res);
        setFilterdNotification(res);
      } else setHasMoreData(false);
    });
    setRefreshingLoader(false);
  };

  const updateLocalCoursesState = (
    notificationArray: filterdNotificationType[],
  ) => {
    setData([...data, ...notificationArray]);
    setFilterdNotification([...filterdNotification, ...notificationArray]);
  };

  const handleOnSwipe = (
    data: filterdNotificationType[],
    item: filterdNotificationType,
  ) => {
    if (_rowRefs !== null) {
      _rowRefs.forEach((ref: any) => {
        if (ref !== null) {
          ref.close();
        }
      });
    }
    data = data.filter(
      (notification: filterdNotificationType) => notification.id !== item.id,
    );
    setFilterdNotification(data);
    setData(data);
    dispatch(DeleteNotification(item.id));
  };

  const handleBack = () => {
    navigation.navigate(DrawerName.dashboard.name);
    return true;
  };

  const _clearNotification = () => {
    dispatch(clearNotificationCount(0));
    AsyncStorage.setItem('notificationBadgeCount', JSON.stringify(0));
    if (Platform.OS === 'ios') {
      PushNotificationIOS.getApplicationIconBadgeNumber((num) => {
        PushNotificationIOS.setApplicationIconBadgeNumber(0);
      });
    } else {
      BadgeAndroid.setBadge(0);
    }
    AsyncStorage.setItem('notificationBadgeCount', JSON.stringify(0));
  };

  const sendQuery = async (text: string) => {
    setMainLoader(true);
    let Endpoint: endpoint = ApiEndpoints.GetUserNotifications;
    Endpoint.params = `?take=${30}&&skip=${0}&&search=${text}`;
    await Get(Endpoint).then((res: any) => {
      setFilterdNotification(res);
      setMainLoader(false);
    });
  };

  const delayedQuery = debounce((text: string) => sendQuery(text), 500);

  const onChangeText = (text: string) => {
    setIsSearchOpened(true);
    if (Boolean(text.trim().length)) delayedQuery(text);
    else setFilterdNotification(data);
  };

  const clearAll = () => {
    setFilterdNotification([]);
    setData([]);
    dispatch(DeleteNotification());
  };

  return (
    <_Screen
      header={
        <CstHeader
          isMenu
          isSearchBtn
          OpenMenu={() => navigation.toggleDrawer()}
          Screen={Notification}
          OpenSearch={() => setisVisible(true)}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
    >
      {isVisible && (
        <Search
          onChangeText={onChangeText}
          onClose={() => {
            setFilterdNotification(data);
            setisVisible(false);
            setIsSearchOpened(false);
          }}
          animSpeed={100}
          data={data}
          searchKey='notification,title'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      <SafeAreaView style={styles.container}>
        {filterdNotification?.length > 0 && (
          <TouchableOpacity onPress={() => clearAll()} style={styles.clearBtn}>
            <_Text style={[CommonStyles.className, { fontSize: 14 }]}>
              {ClearAll}
            </_Text>
          </TouchableOpacity>
        )}
        <_View
          height={'100%'}
          style={{ backgroundColor: whiteThemeColors.background }}
        >
          <NotificationList
            footerLoader={footerLoader}
            isSearchOpened={isSearchOpened}
            NoNotificationisFound={NoNotificationisFound}
            mainLoader={mainLoader}
            filterdNotification={filterdNotification}
            refreshingLoader={refreshingLoader}
            pullToRefreshFetch={pullToRefreshFetch}
            initialLoad_And_LoadMore={initialLoad_And_LoadMore}
            handleOnSwipe={handleOnSwipe}
            collectRowRefs={(ref: any) => _rowRefs.push(ref)}
          />
        </_View>
      </SafeAreaView>
    </_Screen>
  );
};

export { NotificationsTab };
