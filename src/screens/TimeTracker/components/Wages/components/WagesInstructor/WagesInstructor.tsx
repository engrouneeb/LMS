import { useNavigation } from '@react-navigation/native';
import { WagesInstructorInterface } from '../../../../../../interfaces';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../../../../../../reducers/Appstate';
import { isInstructor, whiteThemeColors } from '../../../../../../Utilities';
import { getWages } from '../../../../../../actions/TimeTrackerActions';
import { _Screen, _View, isPortrait } from '../../../../../../components';
import Screens from '../../../../../../screenNames';
import CstHeader from '../../../../../Headers';
import Loader from '../../../../../Loader/loader';
import Search from '../../../../../Search';
import { AddScheduleBtn, RenderEmpty, RenderItem } from './components';
import { styles } from './style';
import { useAppModulePermission } from '../../../../../../customHooks';
var UserId: number;

export const WagesInstructor: React.FC<WagesInstructorInterface> = ({
  route,
  role,
}) => {
  const navigation: any = useNavigation();
  const { filterMenuOptions } = useAppModulePermission();
  const WAGES = useSelector((state: Appstate) => state.timetracker.wages);
  const WAGES_FROM: any = useSelector(
    (state: Appstate) => state.timetracker.wagesFrom,
  );
  const WAGES_TYPE: any = useSelector(
    (state: Appstate) => state.timetracker.wagesType,
  );
  const USER_INFO: any = useSelector((state: Appstate) => state.User.UserInfo);
  const { addWage } = useSelector((state: Appstate) => state.language);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [changableWidth, setChangeableWidth] = useState(245);
  const [loader, setLoader] = useState(false);
  const searchField: any = useRef();
  const [isVisible, setisVisible] = useState(false);
  const dispatch: any = useDispatch();
  const isShowAddWages = filterMenuOptions("AddWages")

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setChangeableWidth(Platform.OS == 'ios' ? 450 : isPortrait() ? 245 : 450);
    });
    return () => subscription?.remove();
  });

  useEffect(() => {
    handleAPI();
    return () => setFilteredData([]);
  }, []);

  const handleAPI = () => {
    setLoader(true);
    if (Boolean(route.params.UserId)) {
      UserId = route.params.UserId;
    } else {
      UserId = USER_INFO.userID;
    }
    if (route?.params !== undefined && route?.params !== null) {
      if (
        route.params.fromAddWage !== undefined &&
        route.params.fromAddWage !== null &&
        route.params.fromAddWage !== ''
      ) {
        updateLocalStateOfWages();
        return;
      }
    }
    dispatch(getWages(UserId))
      .then((res: any) => {
        setFilteredData(res.data.wages);
        setLoader(false);
      })
      .catch(() => { });
  };

  const updateLocalStateOfWages = () => {
    setFilteredData(WAGES);
  };

  const handleBack = () => {
    navigation.goBack();
    return true;
  };

  return (
    <_Screen
      header={
        <CstHeader
          isBack
          isSearchBtn
          OpenSearch={() => setisVisible(true)}
          Screen={addWage.Wages}
          GoBack={() => navigation.goBack()}
          backgroundColor={whiteThemeColors.background}
          bottomSafeAreaColor={whiteThemeColors.background}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
    >
      {isVisible && (
        <Search
          onInputChange={(data: any) => setFilteredData(data)}
          onClose={() => setisVisible(false)}
          animSpeed={100}
          data={WAGES}
          searchKey='itemName'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      <_View style={styles.maincontainer}>
        {loader ? (
          <Loader />
        ) : filteredData.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            data={filteredData}
            renderItem={({ item, index }) => (
              <RenderItem
                item={item}
                addWage={addWage}
                WAGES_FROM={WAGES_FROM}
                WAGES_TYPE={WAGES_TYPE}
                changableWidth={changableWidth}
                role={role}
                _onPress={() => {
                  navigation.navigate(Screens.addUpdateWage.name, {
                    wagesObject: item,
                    UserId: route.params.UserId,
                    selectedWage: index,
                    fromAddWage: null,
                    type: 'update wage',
                  });
                }}
              />
            )}
            keyExtractor={(item: any) => item.uniqueId}
          />
        ) : (
          <RenderEmpty />
        )}
      </_View>
      {isShowAddWages && <AddScheduleBtn
        visiblity={!isInstructor(role)}
        _onPress={() => {
          navigation.setOptions({
            updateLocalStateOfWages: updateLocalStateOfWages,
          });
          return navigation.navigate(Screens.addUpdateWage.name, {
            UserId: route.params.UserId,
            type: 'add wage',
          });
        }}
      />}
    </_Screen>
  );
};
