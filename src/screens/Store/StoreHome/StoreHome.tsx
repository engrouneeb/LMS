import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {
  CartItemType,
  EndpointType,
  InventoryItemsType,
  Tab,
} from '../../../interfaces';
import { toInteger } from 'lodash';
import { NavigationProps } from 'navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Linking, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomAlert,
  isAdmin,
  isParent,
  isStudent,
  whiteThemeColors,
} from 'utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { getClassesDates } from '../../../actions/DashBoardActions';
import { _Screen, _Text, _VectorIcons, _View } from '../../../components';
import { TopTabs } from '../../../components/TopTabs';
import { Appstate } from '../../../reducers/Appstate';
import CstHeader from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
import { InventoryCard } from './components';
import AddFloatingButton from './components/AddFloatingButton/AddFloatingButton';
import { AddtoCartModal } from './components/AddtoCartModal/AddtoCartModal';
import { CartFloatingButton } from './components/CartFloatingButton/CartFloatingButton';
import PaymentConfirmationModal from './components/PaymentConfirmationModal/PaymentConfirmationModal';
import PaymentSuccessModal from './components/PaymentSuccessModal/PaymentSuccessModal';
import { StoreFlatlistHeader } from './components/StoreFlatlistHeader/StoreFlatlistHeader';
import { getSelectedTab } from './helper';
import { styles } from './style';
interface StoreHomeProps extends InventoryItemsType {}

export const StoreHome: React.FC<StoreHomeProps> = () => {
  const { storeScreen }: any = useSelector((state: Appstate) => state.language);
  const { userID, roleName, companyUrl, licenseCmpKey }: any = useSelector(
    (state: Appstate) => state.User.UserInfo
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<InventoryItemsType>();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [inventoryItems, setInventoryItems] = useState<InventoryItemsType[]>(
    []
  );
  const [totalCartCost, setTotalCartCost] = useState<number | undefined>();
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [tabs, setTabs] = useState<Tab[]>([{ id: 0, name: 'Unassigned' }]);
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
  const [isItemsFetching, setIsItemsFetching] = useState<boolean>(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [token, setToken] = useState();
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] =
    useState<boolean>(false);
  const isUserStudent: boolean = isStudent(roleName);
  const isUserParent: boolean = isParent(roleName);
  const isUserAdmin: boolean = isAdmin(roleName);
  const [paymentWith, setPaymentWith] = useState<string>('');
  const [totalCartPoints, setTotalCartPoints] = useState<number>(0);
  const [userTotalPoints, setUserTotalPoints] = useState<number>(0);
  const [children, setchildren] = useState<[]>([]);
  const [selectedChild, setSelectedChild] = useState<any>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>('');
  const navigation = useNavigation<NavigationProps>();
  const { Get, PostSecured, PostSecuredWithParams } = DataAccess();
  const tabId: any = useSelector(
    (state: Appstate) => state.tabReducer.activeTab
  );
  useEffect(() => {
    AsyncStorage.getItem('@UserAuth').then((res: any) => {
      let tokenRes = JSON.parse(res);
      let token = tokenRes.token;
      setToken(token);
    });
  }, []);
  useEffect(() => {
    calculateTotalCharges();
  });
  const calculateTotalCharges = () => {
    let cost: number = 0;
    let achivePoints: number = 0;
    for (let i = 0; i < cartItems?.length; i++) {
      if (cartItems[i]['isPayment'] == true) {
        cost = cost + cartItems[i]['totalPaymentCost'];
      }
      if (cartItems[i]['isPayment'] == false) {
        achivePoints =
          achivePoints + cartItems[i]['totalAcheivementPointsCost'];
      }
    }
    setTotalCartCost(cost);
    setTotalCartPoints(achivePoints);
  };
  const getAllCategories = () => {
    setIsLoading(true);
    let url: EndpointType = ApiEndpoints.GetInventoriesCategories;
    Get(url).then((res: any) => {
      if (res?.error) {
        setAlertText(res.error_description);
        setAlertModalVisible(true);
      } else {
        setTabs([{ id: 0, name: 'Unassigned' }, ...res]);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getAllCategories();
    GetAchievedPoints();
  }, []);

  useEffect(() => {
    getAllInventories();
  }, [activeTab]);
  useEffect(() => {
    isUserAdmin && getAllInventories();
    const willFocusSubscription = navigation.addListener('focus', () => {
      !activeTab && getAllCategories();
    });
    return willFocusSubscription;
  }, [navigation]);

  const GetAchievedPoints = useCallback(() => {
    let url = ApiEndpoints.GetBalancePoints;
    Get(url).then((res: any) => {
      if (res) {
        setUserTotalPoints(res?.totalPoints);
      }
    });
  }, []);
  const getAllInventories = useCallback(() => {
    setIsItemsFetching(true);
    let url: EndpointType = ApiEndpoints.GetAllStoreItems;
    url.params = `?&take=${10}&skip=${0}&categoryId=${tabId}`;
    Get(url).then((res: any) => {
      if (res) {
        setInventoryItems(res);
      }
      setIsItemsFetching(false);
    });
  }, [activeTab]);
  const onAddtoCartWithPayment = (
    quantity: number,
    OrderingItem: CartItemType
  ) => {
    quantity = toInteger(quantity);
    let itemArr = inventoryItems;
    let objIndex = itemArr.findIndex((obj) => obj.id == OrderingItem?.id);
    if (itemArr[objIndex].quantityWithPayment === undefined) {
      itemArr[objIndex].quantityWithPayment = 0;
    }
    if (itemArr[objIndex].quantityWithPoints === undefined) {
      itemArr[objIndex].quantityWithPoints = 0;
    }
    if (
      itemArr[objIndex].available! <
      itemArr[objIndex]?.quantityWithPoints! + quantity
    ) {
      setAlertModalVisible(true);
      setAlertText(`${itemArr[objIndex]?.available} Items are available`);
    } else {
      itemArr[objIndex].ordered_Quantity =
        toInteger(itemArr[objIndex]?.quantityWithPayment) + quantity;
      itemArr[objIndex].quantityWithPayment = quantity;
      itemArr[objIndex].totalPaymentCost = itemArr[objIndex].cost! * quantity;
      itemArr[objIndex].totlaCost = itemArr[objIndex].cost! * quantity;
      if (cartItems.length >= 1) {
        let cartItemIndex = cartItems.findIndex(
          (cart) => cart.id == OrderingItem?.id && cart.isPayment == true
        );
        if (cartItemIndex > -1) {
          cartItems[cartItemIndex] = {
            ...OrderingItem,
            isPayment: true,
            quantityWithPayment: quantity,
          };
          setCartItems(cartItems);
          return;
        } else {
          setCartItems([
            ...cartItems,
            { ...OrderingItem, isPayment: true, quantityWithPayment: quantity },
          ]);
        }
      } else {
        setCartItems([
          { ...OrderingItem, isPayment: true, quantityWithPayment: quantity },
        ]);
      }
    }
  };
  const onAddtoCartWithPoints = (
    quantity: number,
    OrderingItem: InventoryItemsType & CartItemType,
    variant = ''
  ) => {
    quantity = toInteger(quantity);
    let itemArr = inventoryItems;
    let objIndex = itemArr.findIndex((obj) => obj.id == OrderingItem?.id);
    if (itemArr[objIndex].quantityWithPayment === undefined) {
      itemArr[objIndex].quantityWithPayment = 0;
    }
    if (itemArr[objIndex].quantityWithPoints === undefined) {
      itemArr[objIndex].quantityWithPoints = 0;
    }
    if (
      itemArr[objIndex].available! <
      itemArr[objIndex]?.quantityWithPayment! + quantity
    ) {
      setAlertText(`${itemArr[objIndex]?.available} Items are in Store`);
      setAlertModalVisible(true);
    } else {
      itemArr[objIndex].ordered_Quantity =
        toInteger(itemArr[objIndex].quantityWithPayment) + quantity;
      itemArr[objIndex].quantityWithPoints = quantity;
      itemArr[objIndex].totalAcheivementPointsCost =
        itemArr[objIndex].achivePointsCost! * quantity;
      if (cartItems.length >= 1) {
        let cartItemIndex = cartItems.findIndex(
          (cart) => cart.id == OrderingItem?.id && cart.isPayment == false
        );
        if (cartItemIndex > -1) {
          cartItems[cartItemIndex] = {
            ...OrderingItem,
            isPayment: false,
            quantityWithPoints: quantity,
          };
          setCartItems(cartItems);
          return;
        } else {
          setCartItems([
            ...cartItems,
            { ...OrderingItem, isPayment: false, quantityWithPoints: quantity },
          ]);
        }
      } else {
        setCartItems([
          { ...OrderingItem, isPayment: false, quantityWithPoints: quantity },
        ]);
      }
    }
  };
  const removePointsCartItem = (removingItem: InventoryItemsType) => {
    let itemArr = inventoryItems;
    let objIndex = itemArr.findIndex((obj) => obj.id == removingItem?.id);
    itemArr[objIndex].ordered_Quantity =
      itemArr[objIndex].ordered_Quantity! -
      itemArr[objIndex].quantityWithPoints!;
    itemArr[objIndex].totalAcheivementPointsCost = 0;
    itemArr[objIndex].quantityWithPoints = 0;
    let removeItem = cartItems.findIndex(
      (cart) => cart.id == removingItem?.id && cart.isPayment == false
    );
    cartItems.splice(removeItem, 1);
    setCartItems(cartItems);
  };
  const removePaymentCartItem = (removingItem: CartItemType) => {
    let itemArr = inventoryItems;
    let objIndex = itemArr.findIndex((obj) => obj.id == removingItem?.id);
    itemArr[objIndex].ordered_Quantity =
      itemArr[objIndex].ordered_Quantity! -
      itemArr[objIndex].quantityWithPayment!;
    itemArr[objIndex].totalPaymentCost = 0;
    itemArr[objIndex].quantityWithPayment = 0;
    let removeItem = cartItems.findIndex(
      (cart) => cart.id == removingItem?.id && cart.isPayment == true
    );
    cartItems.splice(removeItem, 1);
    setCartItems(cartItems);
  };
  const handleInventoryPayment = async () => {
    setIsPaymentLoading(true);
    let inventoryData = [];
    for (let item of cartItems) {
      {
        item.isPayment
          ? inventoryData.push({
              ID: 0,
              InventoryID: item.inventoryId,
              InventoryName: item.inventory,
              FranchiseID: licenseCmpKey,
              FranchiseName: item.franchise,
              Cost: item.cost,
              TotalCost: item.totlaCost,
              QuantityNeeded: item.quantityWithPayment,
              QuantityInCart: 0,
              Available: item.available,
              isPayment: item.isPayment,
              StudentId: isUserParent
                ? selectedChild?.id
                : isUserStudent
                ? userID
                : 0,
            })
          : inventoryData.push({
              ID: 0,
              InventoryID: item.inventoryId,
              InventoryName: item.inventory,
              FranchiseID: licenseCmpKey,
              FranchiseName: item.franchise,
              AchivePointsCost: item.achivePointsCost,
              TotalAchivePointsCost: item.totalAcheivementPointsCost,
              QuantityNeeded: item.quantityWithPoints,
              QuantityInCart: 0,
              Available: item.available,
              Cost: item.cost,
              TotalCost: item.cost * item.quantityWithPoints,
              isPayment: item.isPayment,
              StudentId: isUserParent
                ? selectedChild?.id
                : isUserStudent
                ? userID
                : 0,
            });
      }
    }
    saveAutoLogin(token, inventoryData);
  };

  const saveAutoLogin = (token: any, inventoryData: any) => {
    var EndPoint = ApiEndpoints.SaveAutoMobileLogin;

    let params = { Token: token, data: `${JSON.stringify(inventoryData)}` };
    PostSecured(EndPoint, params).then((res: any) => {
      if (res) {
        setShowPaymentModal(false);
        let baseUrl = companyUrl;
        let Fetchingurl = `/Account/ProcessPaymentForMobile?TokenGuid=${res?.guid}`;
        let URL = baseUrl + Fetchingurl;
        Linking.canOpenURL(URL).then((supported) => {
          if (supported) {
            Linking.openURL(URL);
            setCartItems([]);
            setIsPaymentLoading(false);
          } else Alert.alert('Error', 'cannot open open url');
        });
      } else Alert.alert('Error', 'cannot open open url');
    });
  };

  const deleteInventory = async (inventory: CartItemType) => {
    try {
      const url = ApiEndpoints.DeleteInventory;
      let params = `?inventoryId=${inventory.inventoryId}`;
      let response = await PostSecuredWithParams(url, params);
      if (response.error) {
        setAlertText(response.error_description);
        setAlertModalVisible(true);
      } else if (response.status1 == false) {
        setAlertText(response.msg);
        setAlertModalVisible(true);
      } else {
        for (let i = 0; i < inventoryItems.length; i++) {
          if (inventoryItems[i]?.id === inventory.id) {
            setInventoryItems(
              inventoryItems.filter((x) => x.id != inventory.id)
            );
          }
        }
      }
    } catch (error) {
      console.log('Error while deleting', error);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClassesDates()).then((res: any) => {
      setchildren(res?.data?.childList);
      setSelectedChild(res?.data?.childList[0]);
    });
  }, []);

  const onValueChange = (value: number) => {
    var selectedChild = children[value];
    setSelectedChild(selectedChild);
  };
  const onProceedToPayment = () => {
    if (selectedChild?.length === 0) {
      setAlertText('Select a Student to Proceed');
      setAlertModalVisible(true);
    } else {
      setShowPaymentModal(true);
    }
  };
  const onAndroidBack = () => {
    dispatch(getSelectedTab(0));
    navigation.goBack();
    return true;
  };
  return (
    <_Screen
      header={
        <CstHeader
          isBack={true}
          GoBack={() => {
            dispatch(getSelectedTab(0));
            navigation.goBack();
          }}
          Screen={storeScreen.Store}
          isLogout={false}
        />
      }
      onAndroidBack={onAndroidBack}
      hideTopSafeArea
      hideBottomSafeArea
      backgroundColor={whiteThemeColors.background}
      flex={1}
    >
      {isLoading ? (
        <_ActivityIndicator
          size='large'
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      ) : (
        <>
          <TopTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
            showTabName={true}
            cartItems={cartItems}
            setitem={(value) => console.log(value)}
          />
          <_View
            style={{
              flex: 1,
              zIndex: 1,
            }}
          >
            {totalCartCost || totalCartPoints >= 1 ? (
              <CartFloatingButton
                onProceedToPayment={onProceedToPayment}
                totalCartCost={totalCartCost}
                totalCartPoints={totalCartPoints}
              />
            ) : null}
            {isItemsFetching ? (
              <_ActivityIndicator
                size='large'
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ) : (
              <>
                {inventoryItems.length > 0 ? (
                  <FlatList
                    data={inventoryItems}
                    style={{
                      marginTop: 10,
                      backgroundColor: whiteThemeColors.background,
                    }}
                    contentContainerStyle={{ paddingBottom: 70 }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                      <>
                        {!isUserAdmin && (
                          <StoreFlatlistHeader
                            onValueChange={onValueChange}
                            userTotalPoints={userTotalPoints}
                            isUserParent={isUserParent}
                            children={children}
                            selectedChild={selectedChild}
                            totalCartPoints={totalCartPoints}
                          />
                        )}
                      </>
                    }
                    renderItem={({ item }: any) => {
                      return (
                        <InventoryCard
                          onPressAddtoCart={(payWith: string) => {
                            setPaymentWith(payWith);
                            setModalVisible(true);
                            setItemSelected(item);
                          }}
                          deleteInventory={() => deleteInventory(item)}
                          data={item}
                          // isOwner={isOwner}
                          // totalCartCost={totalCartCost}
                          allCategories={tabs}
                          // navigation={navigation}
                          cartItems={cartItems}
                          activeTab={activeTab?.name}
                          isUserParent={isUserParent}
                          getAllCategories={getAllCategories}
                          isUserStudent={isUserStudent}
                          setFlag={setFlag}
                          flag={flag}
                          getAllInventories={getAllInventories}
                        />
                      );
                    }}
                  />
                ) : (
                  <_View style={styles.emptyList}>
                    <_VectorIcons
                      type='FontAwesome5'
                      name={
                        Platform.OS == 'android'
                          ? 'store-alt'
                          : 'store-alt-slash'
                      }
                      size={80}
                      color={whiteThemeColors.primary + 90}
                    />
                    <_Text style={styles.emptyListText}>No Item Found</_Text>
                  </_View>
                )}
              </>
            )}
            {isUserParent || isUserStudent ? null : (
              <AddFloatingButton
                onPress={() =>
                  navigation.navigate('store-add-new-item', {
                    allCategories: tabs,
                    getAllCategories: getAllCategories,
                    getAllInventories: getAllInventories,
                  })
                }
              />
            )}
            <AddtoCartModal
              modalVisible={modalVisible}
              paymentWith={paymentWith}
              setModalVisible={setModalVisible}
              selectedItem={itemSelected}
              onAddtoCartWithPayment={onAddtoCartWithPayment}
              onAddtoCartWithPoints={onAddtoCartWithPoints}
              cartItems={cartItems}
              removePointsCartItem={removePointsCartItem}
              removePaymentCartItem={removePaymentCartItem}
              userTotalPoints={userTotalPoints}
            />
          </_View>
          <PaymentSuccessModal
            visible={showPaymentSuccessModal}
            setVisible={setShowPaymentSuccessModal}
            getAllInventories={getAllInventories}
          />
          <PaymentConfirmationModal
            visible={showPaymentModal}
            setVisible={setShowPaymentModal}
            handleInventoryPayment={handleInventoryPayment}
            totalCartCost={totalCartCost}
            isPaymentLoading={isPaymentLoading}
            totalCartPoints={totalCartPoints}
          />
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
