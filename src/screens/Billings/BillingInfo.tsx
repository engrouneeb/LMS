import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import { _ActivityIndicator } from 'screens/Loader';
import { CustomAlert, whiteThemeColors } from 'utilities';
import PaymentSvg from '../../../assets/noPaymentSvg';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import { _Screen, _Text, _VectorIcons, _View } from '../../components';
import ScreensNames from '../../navigation/Drawer/DrawerScreenNames';
import BillItem from '../StudentInfo/components/Tabs/components/BillingTab/components/BillItems';
import { styles } from './styles';
import { useAppModulePermission } from '../../customHooks';
import Header from "../Headers"
import Loader from 'screens/Loader/loader';
interface props {
}
export const BillingInfo: React.FC<props> = ({
}) => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const { selectedStudentId } = route.params
  console.log({ selectedStudentId });
  const { Get, PostSecuredWithParams, PostSecured } = DataAccess();
  const { filterMenuOptions } = useAppModulePermission();
  let isAddPaymentMethod = filterMenuOptions("AddPaymentMethod");
  const [billingList, setBillingList] = useState([]);
  const [primarySelected, setPrimarySelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [plaidToken, setPlaidToken] = useState('');
  const [stripeKey, setStripeKey] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const domainUrl: any = useSelector(
    (state: Appstate) => state.User.UserInfo?.companyUrl,
  );

  useFocusEffect(
    useCallback(() => {
      getBillingInfo();
    }, []),
  );

  const onAddPaymentPress = () => {
    navigation.navigate(ScreensNames.addbillings.name, {
      onClose: { onClose },
      stripeKey: stripeKey,
      plaidToken: plaidToken,
      studentId: selectedStudentId,
      domainUrl: domainUrl,
      studentName: "studentName",
    });
  };

  const onClose = (check: any) => {
    check && getBillingInfo();
  };
  const [width] = useState(
    Dimensions.get('window').width < Dimensions.get('window').height
      ? Dimensions.get('window').width
      : Dimensions.get('window').height,
  );

  const onDeletePress = async (id: any) => {
    RemovePaymentMethod(id);
  };

  const updateBillingStatus = async (id: any, status: any) => {
    setLoading(true);
    const Endpoint = ApiEndpoints.UpdateBillingStatus;
    // const params = `?isActive=${!status}&billingId=${id}&studentIds=${selectedStudentId}&domainUrl=${domainUrl}`;
    const params = `?isActive=${!status}&billingId=${id}${selectedStudentId != null ? `&studentIds=${selectedStudentId}` : ''}&domainUrl=${domainUrl}`;
    const res = await PostSecuredWithParams(Endpoint, params);
    if (res) {
      setShowAlert(true);
      setAlertMessage('Status of Payment method updated Successfully');
      setAlertTitle('Success');
    }
  };

  const RemovePaymentMethod = async (id: any) => {
    setLoading(true);
    const Endpoint = ApiEndpoints.DeletePaymentMethod;
    // const params = `?billingId=${id}&studentIds=${selectedStudentId}&domainURL=${domainUrl}`;
    const params = `?billingId=${id}${selectedStudentId != null ? `&studentIds=${selectedStudentId}` : ''}&domainURL=${domainUrl}`;
    const res = await PostSecuredWithParams(Endpoint, params);
    if (res) {
      setShowAlert(true);
      setAlertMessage('Payment method deleted Successfully');
      setAlertTitle('Success');
    }
  };
  const getTokens = async () => {
    setLoading(true);
    let Endpoint = ApiEndpoints.GetPlaidToken;
    let res = await PostSecured(Endpoint, {});
    if (res) {
      res?.value?.link_token && setPlaidToken(res.value.link_token);
      res?.key && setStripeKey(res.key);
    }
    setLoading(false);
  };

  const getBillingInfo = async () => {
    setLoading(true);
    const Endpoint = ApiEndpoints.GetBillingInfo;
    let res = await Get({
      url: Endpoint.url,
      params: selectedStudentId ? `?studentId=${selectedStudentId.toString()}` : '',
    });
    if (res) {
      setBillingList(res);
      if (res.length > 0) {
        let activeList = res.map((data: any) => data.isActive);
        let isActiveIndex = activeList.indexOf(true);
        setPrimarySelected(isActiveIndex);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getTokens();
  }, []);

  return (
    <_Screen
      header={
        <Header
          isBack={true}
          Screen={'Billing Methods'}
          GoBack={() => { navigation.goBack() }}
          onAndroidBack={() => {
            navigation.goBack(); return true;
          }}
        />
      }
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={() => {
        navigation.goBack();
        return true;
      }}
      hideTopSafeArea
      flex={1}
    >
      <_View style={styles.safeView}>
        <_View style={styles.mainView}>
          <_View style={styles.headingView}>
            <_Text style={styles.heading}>Payment Details</_Text>
          </_View>
          {loading && <Loader size='large' />}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={billingList}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.scrollContentView}
            renderItem={({ item, index }) => (
              <BillItem
                item={item}
                index={index}
                primary={primarySelected}
                onPrimaryPress={updateBillingStatus}
                deletePayment={onDeletePress}
              />
            )}
            ListEmptyComponent={() => (
              <_View flex={1} justify={'center'} alignItems='center'>
                {!loading && <Fragment><PaymentSvg size={width - 150} />
                  <_Text
                    style={[styles.headText, { fontSize: 18, marginTop: 20 }]}
                  >
                    No Payment Details
                  </_Text></Fragment>}
              </_View>
            )}
          />
          {isAddPaymentMethod && (
            <TouchableOpacity
              disabled={loading}
              onPress={onAddPaymentPress}
              style={styles.floatingButton}
            >
              <_View style={styles.stretchedView}>
                <_VectorIcons
                  name={'plus'}
                  type={'AntDesign'}
                  size={18}
                  color={whiteThemeColors.white}
                />
              </_View>
            </TouchableOpacity>
          )}

          {showAlert && (
            <CustomAlert
              visible={showAlert}
              title={alertTitle}
              msg={alertMessage}
              firstBtn={'Okay'}
              firstBtnFunc={() => {
                getBillingInfo();
                setShowAlert(false);
              }}
            />
          )}
        </_View>
      </_View>
    </_Screen>
  );
};
