import { useIsFocused, useNavigation } from '@react-navigation/native';
import { EndpointType, Tab } from 'interfaces';
import { NavigationProps } from 'navigation';
import React, { FC, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CustomAlert, isAdmin, whiteThemeColors } from 'utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { _Screen, _Text, _VectorIcons, _View } from '../../../components';
import { TopTabs } from '../../../components/TopTabs';
import { Appstate } from '../../../reducers/Appstate';
import CstHeader from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
import { getSelectedTab } from '../StoreHome/helper';
import ShipmentItemCard from './components/ShipmentItemCard/ShipmentItemCard';
import CommonStyles from 'screens/CommonStyles';

export const Shipment: FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const tabId: any = useSelector(
    (state: Appstate) => state.tabReducer.activeTab,
  );
  const { roleName }: any = useSelector(
    (state: Appstate) => state.User.UserInfo,
  );
  const [tabs, setTabs] = useState<Tab[]>([{ id: 0, name: 'Unassigned' }]);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [shipmentItems, setShipmentItems] = useState([]);
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>('');
  const isUserAdmin = isAdmin(roleName);
  const navigation = useNavigation<NavigationProps>();
  const { Get } = DataAccess();
  const onAndroidBack = () => {
    dispatch(getSelectedTab(0));
    navigation.goBack();
    return true;
  };
  const GetAllShippedItems = () => {
    setIsLoading(true);
    let url: EndpointType = ApiEndpoints.GetAllShippedItems;
    url.params = `?categoryId=${tabId}`;
    Get(url).then((res: any) => {
      if (res) {
        setShipmentItems(res);
        setIsLoading(false);
      }
      setIsLoading(false);
    });
  };

  const getAllCategories = () => {
    setIsLoading(true);
    let url: EndpointType = ApiEndpoints.GetInventoriesCategories;
    Get(url).then((res: any) => {
      if (res.error) {
        setAlertText(res.error_description);
        setAlertModalVisible(true);
        setIsLoading(false);
      } else {
        setTabs([{ id: 0, name: 'Unassigned' }, ...res]);
      }
      setIsLoading(false);
    });
  };
  useEffect(() => {
    GetAllShippedItems();
    getAllCategories();
  }, []);

  useEffect(() => {
    GetAllShippedItems();
  }, [activeTab]);

  useEffect(() => {
    isFocused && GetAllShippedItems();
  }, [isFocused]);

  return (
    <_Screen
      header={
        <CstHeader
          isBack={true}
          GoBack={() => {
            dispatch(getSelectedTab(0));
            navigation.goBack();
          }}
          Screen={isUserAdmin ? 'Shipment Needed' : 'Recent Orders'}
        />
      }
      onAndroidBack={onAndroidBack}
      backgroundColor={whiteThemeColors.background}
      hideTopSafeArea
      flex={1}
    >
      <TopTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        showTabName={true}
        setitem={(value) => console.log(value)}
      />
      {isLoading ? (
        <_ActivityIndicator
          size={'large'}
          color={whiteThemeColors.primary}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      ) : (
        <>
          {shipmentItems.length > 0 ? (
            <FlatList
              data={shipmentItems}
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ShipmentItemCard
                  item={item}
                  tabId={tabId}
                  isUserAdmin={isUserAdmin}
                  GetAllShippedItems={GetAllShippedItems}
                />
              )}
              keyExtractor={({ index }) => index}
            />
          ) : (
            <_View style={styles.emptyList}>
              <_VectorIcons
                type='MaterialCommunityIcons'
                name={'dolly'}
                size={90}
                color={whiteThemeColors.primary + 90}
              />
              <_Text style={styles.emptyListText}>
                No Shipment Items Found
              </_Text>
            </_View>
          )}
        </>
      )}
      {alertModalVisible && (
        <CustomAlert
          visible={alertModalVisible}
          title={'Error'}
          msg={alertText}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setAlertModalVisible(false);
          }}
        />
      )}
    </_Screen>
  );
};
const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    alignSelf: 'center',
    fontFamily: CommonStyles.fonts.medium,
    marginTop: 30,
  },
});
