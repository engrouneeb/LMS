import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { forwardRef, useEffect, useState } from 'react';
import { Alert, FlatList, Linking, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import { _Screen, _View } from '../../components';
import screeNames from '../../navigation/Drawer/DrawerScreenNames';
import ScreensNames from '../../screenNames';
import Header from '../Headers';
import { _ActivityIndicator } from '../Loader';
import Search from '../Search';
import { CustomAlert, isAdmin, whiteThemeColors } from '../../Utilities';
import {
  Constants,
  CouponModal,
  DetailsModal,
  EnrollPaymentCard,
  FeePaymentCard,
  HeaderTabs,
  NewPaymentComponents,
  NoPaymentsFound,
  PayNowModal,
} from './components';

const Payments = (props) => {
  const UserInfo = useSelector((state) => state.User.UserInfo);
  const [visibleModalDetails, setVisibleModalDetails] = useState(false);
  const [visibleModalPay, setVisbleModalPay] = useState(false);
  const [visibleCouponModal, setVisibleCouponModal] = useState(false);
  const [activeTab, setActiveTab] = useState(Constants.Enrollment);
  const [tabs, setTabs] = useState(Constants.Tabs);
  const [loader, setLoader] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [footerLoader, setFooterLoader] = useState(false);
  const [enrollPayments, setEnrollPayments] = useState([]);
  const [feePayments, setFeePayments] = useState([]);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [alertTitle, setAlertTitle] = useState(Constants.Error);
  const [alertFlag, setAlertFlag] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [balanceDetails, setBalanceDetails] = useState({
    balance: 0,
    totalAmountDue: 0,
  });
  const [couponDetails, setCouponDetails] = useState();
  const [btnPayLoader, setBtnPayLoader] = useState(-1);
  const [btnCouponLoader, setBtnCouponLoader] = useState(-1);
  const [couponBeingDeleted, setCouponBeingDeleted] = useState(false);
  const [reloadCoupons, setReloadCoupons] = useState(false);
  const [billingInfo, setBillingInfo] = useState(false);
  const { PostSecured, Get, PostSecuredWithParams } = DataAccess();
  const searchRef = forwardRef();
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const getToken = (params) => {
    AsyncStorage.getItem('@UserAuth').then((res) => {
      let tokenRes = JSON.parse(res);
      if (tokenRes.token) {
        autoLogin(tokenRes.token, params);
      } else {
        console.log('error getting token');
      }
    });
  };

  const autoLogin = (token, args = {}) => {
    var url = ApiEndpoints.SaveAutoMobileLogin;
    let params = { Token: token, data: `${JSON.stringify(args)}` };
    PostSecured(url, params)
      .then((res) => {
        if (res) {
          let URL = `${UserInfo.companyUrl}/Account/ConfirmPayment?TokenGuid=${res?.guid}`;
          Linking.canOpenURL(URL).then((supported) => {
            if (supported) Linking.openURL(URL);
            else Alert('Error', 'cannot open open url');
          });
        } else Alert('Error', 'cannot open open url');
      })
      .catch((e) => console.log(e, '---->error in autoLogin'));
  };

  useEffect(() => {
    activeTab == Constants.Enrollment
      ? fetchEnrollPayments()
      : fetchFeePayments();
  }, [activeTab]);

  useEffect(() => {
    IsBilingInfoExist();
  }, []);

  const IsBilingInfoExist = async (take = 10) => {
    const { userID } = UserInfo;
    var EndPoint = ApiEndpoints.IsBilingInfoExist;
    EndPoint.params = `?studentId=${userID}`;
    Get(EndPoint)
      .then((res) => {
        if (res) {
          setBillingInfo(res);
        } else {
          console.log('***', res);
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };

  const fetchFeePayments = async (take = 10) => {
    if (take == 10) setLoader(true);
    else setFooterLoader(true);
    const { userID } = UserInfo;
    var EndPoint = ApiEndpoints.FeePayments;
    EndPoint.params = `?UserId=${userID}&displayLength=${take}&displayStart=${0}`;
    Get(EndPoint)
      .then((res) => {
        setLoader(false);
        setFooterLoader(false);
        if (res) {
          setFeePayments(res.value);
          setData(res.value);
        } else {
          console.log('Something went wrong!');
          setAlertFlag(true);
          setAlertMsg(res?.error_description);
        }
      })

      .catch((err) => {
        setLoader(false);
        setData([]);
        setFeePayments([]);
        console.log('Error: ', err);
      });
  };

  const fetchEnrollPayments = async (take = 10) => {
    setData([]);
    // setLoader(true);
    if (take == 10) setLoader(true);
    else setFooterLoader(true);
    const { userID } = UserInfo;
    var EndPoint = ApiEndpoints.EnrollPayments;
    EndPoint.params = `?UserId=${userID}&IsStudentNameLink=${false}&displayLength=${take}&displayStart=${0}`;
    Get(EndPoint)
      .then((res) => {
        setIsLoadMore(res?.key == 10);
        setLoader(false);
        setFooterLoader(false);
        if (res) {
          setLoader(false);
          setEnrollPayments(res.value);
          setData(res.value);
        } else {
          setLoader(false);
          console.log('Something went wrong!');
          setAlertFlag(true);
          setAlertMsg(res?.error_description);
        }
      })

      .catch((err) => {
        setLoader(false);
        console.log('Error: ', err);
      })
      .finally(() => setLoader(false));
  };

  const loadMore = (length) => {
    if (length !== 0 && isLoadMore) {
      activeTab == Constants.Enrollment
        ? fetchEnrollPayments(length + 10)
        : fetchFeePayments(length + 10);
    }
  };

  const GetCouponDetails = async (item) => {
    const { shoppingCartId } = item;
    try {
      setBtnCouponLoader(shoppingCartId);
      var EndPoint = ApiEndpoints.GetCouponDetails;
      var params = `?cartId=${shoppingCartId}`;
      var response = await PostSecuredWithParams(EndPoint, params);

      if (response) {
        setCouponDetails(response);
      } else {
        console.log('Something went wrong!');
      }
      setBtnCouponLoader(-1);
    } catch (error) {
      console.log(error, '----->error');
    }
  };

  const GetBalanceDetails = async (item) => {
    const { shoppingCartId, isRecurring } = item;
    const { GridTypeEnum, Enrollment } = Constants;
    try {
      setBtnPayLoader(shoppingCartId);
      var EndPoint = ApiEndpoints.GetBalanceDetails;
      var params = `?ShoppingCartId=${shoppingCartId}&type=${2}&GridType=${
        activeTab == Enrollment ? GridTypeEnum.Payments : GridTypeEnum.Fees
      }&isRecurring=${isRecurring}`;
      var response = await PostSecuredWithParams(EndPoint, params);
      if (response) {
        setBalanceDetails({
          balance: response?.balance,
          totalAmountDue: response?.totalAmountDue,
        });
      } else {
        console.log('Something went wrong!');
      }
      setBtnPayLoader(-1);
    } catch (error) {
      console.log(error, '----->error');
    }
  };

  const handlePayAction = async (selectedItem) => {
    // console.log(selectedItem, '---->');
    // await GetBalanceDetails(selectedItem);
    // console.log(billingInfo, '----->billingInfo');

    // if (billingInfo) {
    //   setVisbleModalPay(true);
    // } else {
    await handleProceed(selectedItem);

    // await addPaymentMethod(selectedItem);
    // }
  };

  const handleProceed = async (selectedItem) => {
    const {
      discAmt,
      shoppingCartId,
      paymentType,
      transactionType,
    } = selectedItem;
    await getToken({ discAmt, shoppingCartId, paymentType, transactionType });
  };

  const handleCoupon = async (item) => {
    setSelectedItem(item);
    await GetCouponDetails(item);
    setCouponBeingDeleted(false);
    setVisibleCouponModal(true);
  };

  const DeleteCouponApi = async (cartId, couponId) => {
    let url = ApiEndpoints.DeleteAppliedCoupon;
    let params = `?cartId=${cartId}&couponId=${couponId}`;
    try {
      let response = await PostSecuredWithParams(url, params);
      if (response.error) {
        console.log('Error', response);
      } else {
        if (response) handleCoupon(selectedItem);
      }
    } catch (error) {
      console.log('Error');
    }
  };

  const deleteCoupon = async (couponId) => {
    setCouponBeingDeleted(true);
    await DeleteCouponApi(selectedItem.shoppingCartId, couponId);
  };

  const RefreshCoupons = async () => {
    setReloadCoupons(true);
    await GetCouponDetails(selectedItem);
    setReloadCoupons(false);
  };

  const RenderItem = ({ item }) => {
    if (activeTab == Constants.Enrollment)
      return (
        <EnrollPaymentCard
          item={item}
          onDetailsPress={() => (
            setVisibleModalDetails(true), setSelectedItem(item)
          )}
          showBtnPayLoader={btnPayLoader}
          showBtnCouponLoader={btnCouponLoader}
          onPayPress={() => handlePayAction(item)}
          onPressCoupon={() => handleCoupon(item)}
        />
      );
    return (
      <FeePaymentCard
        item={item}
        onPress={() => handlePayAction(item)}
        showBtnPayLoader={btnPayLoader}
      />
    );
  };

  const onChangeText = (studentList) => {
    let array = [];
    studentList.forEach((element) => {
      array.push(element);
    });
    setData(array);
  };

  const getPlaidTokensAndStripeKey = async () => {
    let Endpoint = ApiEndpoints.GetPlaidToken;
    let res = await PostSecured(Endpoint);
    if (res) {
      if (res?.value?.link_token && res?.key)
        return {
          plaidToken: res?.value?.link_token,
          stripeKey: res?.key,
        };
    }
  };

  const onClose = () => {
    console.log('I am on close method');
  };

  const addPaymentMethod = async (details = '') => {
    const { studentName, studentId, shoppingCartId } = details;
    setBtnPayLoader(shoppingCartId);
    const { plaidToken, stripeKey } = await getPlaidTokensAndStripeKey();
    const { companyUrl } = UserInfo;
    setBtnPayLoader(-1);
    props.navigation.navigate(ScreensNames.addPaymentMethod.name, {
      navigation: props.navigation,
      onClose: onClose,
      stripeKey: stripeKey,
      plaidToken: plaidToken,
      studentId: studentId,
      domainUrl: companyUrl,
      studentName: studentName,
    });
  };

  return (
    <_Screen
      header={
        <Header
          isBack
          // isSearchBtn={true}
          // OpenSearch={() => {
          //   setSearchEnabled(true);
          //   setisVisible(true);
          // }}
          OpenMenu={() => {
            props.navigation.toggleDrawer();
          }}
          goBack={() => {
            props.navigation.goBack();
          }}
          Screen={screeNames.payments.name}
        />
      }
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={() => {
        props.navigation.goBack();
        return true;
      }}
      hideTopSafeArea
      flex={1}
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          onClose={() => {
            setSearchEnabled(false);
            setisVisible(false);
          }}
          animSpeed={100}
          data={
            activeTab == Constants.Enrollment ? enrollPayments : feePayments
          }
          searchKey='studentName,billingCycle'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      <_View style={styles.container}>
        {/* <HeaderTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={(activeTab) => {
            setIsLoadMore(true), setActiveTab(activeTab);
          }}
        />
        <_View
          style={{
            flex: 1,
            backgroundColor: whiteThemeColors.background,
            paddingHorizontal: 10,
          }}
        >
          {loader ? (
            <_ActivityIndicator size='large' />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => <RenderItem item={item} />}
              ListEmptyComponent={() => <NoPaymentsFound />}
              onEndReachedThreshold={0.8}
              onEndReached={() => !searchEnabled && loadMore(data.length)}
              ListFooterComponent={() => (
                <_View style={styles.footerContainer}>
                  {footerLoader ? (
                    <_ActivityIndicator
                      color={whiteThemeColors.greyDark}
                      showText={false}
                    />
                  ) : null}
                </_View>
              )}
            />
          )}
        </_View>
        {visibleModalDetails && (
          <DetailsModal
            details={selectedItem}
            visibleModalDetails={visibleModalDetails}
            setVisibleModalDetails={setVisibleModalDetails}
          />
        )}
        {visibleModalPay && (
          <PayNowModal
            totalAmount={balanceDetails.totalAmountDue}
            balance={balanceDetails.balance}
            visibleModalPay={visibleModalPay}
            setVisbleModalPay={setVisbleModalPay}
            handleProceedBtn={handleProceedBtn}
          />
        )}
        {visibleCouponModal && (
          <CouponModal
            visibleModal={visibleCouponModal}
            setVisibleModal={setVisibleCouponModal}
            details={couponDetails}
            onCouponDelete={deleteCoupon}
            couponDeleteLoader={couponBeingDeleted}
            cartId={selectedItem.shoppingCartId}
            RefreshCoupons={RefreshCoupons}
            reloadCoupon={reloadCoupons}
          />
        )}

        {alertFlag && (
          <CustomAlert
            visible={alertFlag}
            title={alertTitle}
            msg={alertMsg}
            firstBtn={Constants.Okay}
            firstBtnFunc={() => {
              setAlertFlag(false);
            }}
          />
        )} */}
        <NewPaymentComponents pageName='Payment' />
      </_View>
    </_Screen>
  );
};

export { Payments };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerContainer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
