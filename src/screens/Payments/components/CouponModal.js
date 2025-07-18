import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { _Text, _TextInput, _VectorIcons, _View } from '../../../components';
import CommonStyles from '../../CommonStyles';
import { whiteThemeColors } from '../../../Utilities';
import { _ActivityIndicator } from '../../Loader';
import { Constants } from './';

const CouponModal = ({
  visibleModal,
  setVisibleModal,
  details,
  onCouponDelete,
  couponDeleteLoader,
  cartId,
  RefreshCoupons,
  reloadCoupon,
}) => {
  const [newCoupon, setNewCoupon] = useState('');
  const [showTxtField, setShowTxtField] = useState(false);
  const [invalidCoupon, setInvalidCoupon] = useState(false);
  const [errorMsg, setErrormsg] = useState(Constants.PleaseEnterAValidCoupon);
  const [addCouponLoader, setAddCouponLoader] = useState(false);
  const { PostSecuredWithParams } = DataAccess();
  const DeleteCoupon = (item) => {
    onCouponDelete(item?.couponKey);
  };

  const InsertCoupon = async () => {
    setAddCouponLoader(true);
    try {
      var EndPoint = ApiEndpoints.InsertCoupon;
      var params = `?couponName=${newCoupon}&cartId=${cartId}`;
      var response = await PostSecuredWithParams(EndPoint, params);
      if (response.key) {
        RefreshCoupons();
        setNewCoupon('');
        setShowTxtField(false);
      } else {
        setInvalidCoupon(true);
        setErrormsg(response.value || 'Something went wrong!');
        console.log('Something went wrong!');
      }
    } catch (error) {
      console.log(error, '----->error');
    }
  };

  const handleCloseOrSaveCoupon = async () => {
    if (showTxtField == true && newCoupon.length > 0) {
      await InsertCoupon();
    } else {
      setShowTxtField(false);
    }
    setAddCouponLoader(false);
  };

  const TextInput = () => {
    return (
      <_TextInput
        autoFocus
        width={'100%'}
        onChangeText={(text) => {
          // if (invalidCoupon) setInvalidCoupon(false);
          setNewCoupon(text);
        }}
        value={newCoupon}
        placeholder={Constants.InsertCoupon}
        clearButtonMode={'while-editing'}
        style={{
          height: '100%',
          fontSize: 14,
        }}
        placeholderTextColor={whiteThemeColors.greyDark}
      />
    );
  };

  const Header = () => {
    return (
      <_View style={styles.modalCouponHeaderContainer}>
        <_Text style={styles.modalCouponHeaderTxt}>{Constants.AddCoupon}</_Text>
        <TouchableOpacity
          onPress={() => setVisibleModal(false)}
          style={styles.modalCouponCloseBtn}
        >
          <_VectorIcons
            type={'Entypo'}
            name='cross'
            size={22}
            color={whiteThemeColors.primary}
          />
        </TouchableOpacity>
      </_View>
    );
  };

  const TotalAmountDue = ({ amount = 0 }) => {
    return (
      <_View style={styles.totalAmountContainer}>
        <_Text style={styles.totalAmtTitleTxt}>
          {Constants.TotalAmountDue + ':'}
        </_Text>
        <_Text style={styles.totalAmtValueTxt}>${amount}</_Text>
      </_View>
    );
  };

  const NoCoupon = () => {
    return (
      <_View style={styles.noCouponContainer}>
        <_VectorIcons
          type={'Fontisto'}
          name={'ticket'}
          size={40}
          color={whiteThemeColors.primaryDark + 70}
        />
        <_Text style={styles.noCouponTxt}>{Constants.NoCoupon}</_Text>
      </_View>
    );
  };

  const DefaultHeader = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => setShowTxtField(true)}
          style={styles.defaultHeaderContainer}
        >
          <_VectorIcons
            type={'MaterialCommunityIcons'}
            name={'plus'}
            size={25}
            color={whiteThemeColors.white}
          />
        </TouchableOpacity>
        <TotalAmountDue amount={details?.discountedTotalAmount || 0} />
      </>
    );
  };

  const CouponApplyComp = () => {
    return (
      <_View style={styles.couponApplyContainer}>
        <_View style={styles.couponApplyTopContainer}>
          <_Text
            numberOfLines={2}
            style={[
              styles.applyCouponTxt,
              {
                color: invalidCoupon
                  ? whiteThemeColors.red
                  : whiteThemeColors.greyDark,
                width: '90%',
              },
            ]}
          >
            {invalidCoupon ? errorMsg : Constants.ApplyCoupon}
          </_Text>
          <TouchableOpacity
            onPress={() => handleCloseOrSaveCoupon()}
            disabled={addCouponLoader}
            style={[
              styles.applyCouponToggleBtn,
              {
                backgroundColor: addCouponLoader
                  ? whiteThemeColors.white
                  : newCoupon.length > 0
                  ? whiteThemeColors.green
                  : whiteThemeColors.primary,
              },
            ]}
          >
            {addCouponLoader ? (
              <_ActivityIndicator
                size={'small'}
                color={whiteThemeColors.primary}
              />
            ) : (
              <_VectorIcons
                type={'MaterialCommunityIcons'}
                name={newCoupon.length > 0 ? 'content-save' : 'close'}
                size={13}
                color={whiteThemeColors.white}
              />
            )}
          </TouchableOpacity>
        </_View>
        <_View style={styles.applyCouponTxtInpContainer}>
          <TextInput />
        </_View>
      </_View>
    );
  };

  const AppliedCouponCard = ({ item }) => {
    const { couponName, couponDetailsDescription } = item;
    return (
      <_View style={[styles.appliedCouponContainer, styles.cardShadow]}>
        <_View style={styles.appliedCouponDetailsContainer}>
          <_View style={styles.detailsLeftIconContainer}>
            <_VectorIcons
              type={'Fontisto'}
              name={'ticket'}
              color={whiteThemeColors.white}
              size={25}
            />
          </_View>
          <_View style={styles.detailsMiddleContainer}>
            <_View justify={'center'}>
              <_Text style={styles.couponCodeTxt}>{'Coupon Code'}</_Text>
              <_Text style={styles.couponCodeValueTxt}>{couponName}</_Text>
            </_View>
            <_View justify={'center'}>
              <_Text style={styles.couponStatusTxt}>{'Status'}</_Text>
              <_Text style={styles.couponStatusValueTxt}>
                {couponDetailsDescription}
              </_Text>
            </_View>
          </_View>
        </_View>
        <TouchableOpacity
          onPress={() => DeleteCoupon(item)}
          style={styles.detailsRightContainer}
        >
          {couponDeleteLoader ? (
            <_ActivityIndicator
              size={'small'}
              color={whiteThemeColors.primaryDark}
            />
          ) : (
            <_VectorIcons
              type={'MaterialCommunityIcons'}
              name={'delete'}
              size={23}
              color={whiteThemeColors.red}
            />
          )}
        </TouchableOpacity>
      </_View>
    );
  };

  const Body = () => {
    return (
      <_View style={[styles.bodyContainer]}>
        <_View
          style={[
            styles.bodyTopContainer,

            { height: invalidCoupon ? '50%' : '35%' },
          ]}
        >
          <_View style={styles.toggleContainer}>
            {!showTxtField ? <DefaultHeader /> : <CouponApplyComp />}
          </_View>
        </_View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.listScrollContainer}
        >
          {reloadCoupon ? (
            <_ActivityIndicator
              size={'large'}
              color={whiteThemeColors.primaryDark}
            />
          ) : (
            details?.classCoupons?.length < 1 && <NoCoupon />
          )}
          {details?.classCoupons.map((item) => (
            <AppliedCouponCard item={item} />
          ))}
        </ScrollView>
      </_View>
    );
  };

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      transparent={true}
      visible={visibleModal}
      onRequestClose={() => setVisibleModal(false)}
    >
      <_View style={styles.modalCouponContainer}>
        <_View style={[styles.modalCouponBodyContainer]}>
          <Header />
          <_View style={[styles.bodyContainer]}>
            <_View
              style={[
                styles.bodyTopContainer,

                { height: invalidCoupon ? '50%' : '35%' },
              ]}
            >
              <_View style={styles.toggleContainer}>
                {!showTxtField ? (
                  <DefaultHeader />
                ) : (
                  <_View style={styles.couponApplyContainer}>
                    <_View style={styles.couponApplyTopContainer}>
                      <_Text
                        numberOfLines={2}
                        style={[
                          styles.applyCouponTxt,
                          {
                            color: invalidCoupon
                              ? whiteThemeColors.red
                              : whiteThemeColors.greyDark,
                            width: '90%',
                          },
                        ]}
                      >
                        {invalidCoupon ? errorMsg : Constants.ApplyCoupon}
                      </_Text>
                      <TouchableOpacity
                        onPress={() => handleCloseOrSaveCoupon()}
                        disabled={addCouponLoader}
                        style={[
                          styles.applyCouponToggleBtn,
                          {
                            backgroundColor: addCouponLoader
                              ? whiteThemeColors.white
                              : newCoupon.length > 0
                              ? whiteThemeColors.green
                              : whiteThemeColors.primary,
                          },
                        ]}
                      >
                        {addCouponLoader ? (
                          <_ActivityIndicator
                            size={'small'}
                            color={whiteThemeColors.white}
                            style={{
                              margin: 10,
                            }}
                          />
                        ) : (
                          <_VectorIcons
                            type={'MaterialCommunityIcons'}
                            name={
                              newCoupon.length > 0 ? 'content-save' : 'close'
                            }
                            size={13}
                            color={whiteThemeColors.white}
                          />
                        )}
                      </TouchableOpacity>
                    </_View>
                    <_View style={styles.applyCouponTxtInpContainer}>
                      <_TextInput
                        autoFocus
                        width={'100%'}
                        onChangeText={(text) => setNewCoupon(text)}
                        value={newCoupon}
                        placeholder={Constants.InsertCoupon}
                        clearButtonMode={'while-editing'}
                        style={{
                          height: '100%',
                          fontSize: 14,
                        }}
                        placeholderTextColor={whiteThemeColors.greyDark}
                      />
                    </_View>
                  </_View>
                )}
              </_View>
            </_View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.listScrollContainer}
            >
              {reloadCoupon ? (
                <_ActivityIndicator
                  size={'small'}
                  color={whiteThemeColors.primaryDark}
                />
              ) : (
                details?.classCoupons?.length < 1 && <NoCoupon />
              )}
              {details?.classCoupons.map((item) => (
                <AppliedCouponCard item={item} />
              ))}
            </ScrollView>
          </_View>
        </_View>
      </_View>
    </Modal>
  );
};

export { CouponModal };

const styles = StyleSheet.create({
  modalCouponContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.3)',
    paddingHorizontal: 10,
  },
  modalCouponBodyContainer: {
    width: '100%',
    height: 250,
    backgroundColor: whiteThemeColors.background,
    borderRadius: 30,
  },
  defaultHeaderContainer: {
    width: 35,
    height: 35,
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  modalCouponHeaderContainer: {
    width: '100%',
    height: 53,
    backgroundColor: whiteThemeColors.background,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalCouponHeaderTxt: {
    fontSize: 18,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.semiBold,
    marginLeft: 10,
  },
  modalCouponCloseBtn: {
    width: 25,
    height: 25,
    backgroundColor: whiteThemeColors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  bodyContainer: {
    width: '100%',
    height: 230,
    padding: 5,
    backgroundColor: whiteThemeColors.background,
    borderRadius: 30,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  bodyTopContainer: {
    width: '99%',
    height: '35%',
    marginTop: 5,
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 15,
    padding: 2,
    paddingBottom: 5,
  },
  toggleContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  listScrollContainer: {
    width: '100%',
    height: '55%',
    marginTop: 10,
  },
  totalAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  noCouponContainer: {
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  noCouponTxt: {
    fontSize: 10,
    color: whiteThemeColors.greyDark,
    marginTop: 10,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  appliedCouponContainer: {
    width: '98%',
    height: 70,
    marginTop: 5,
    backgroundColor: whiteThemeColors.white,
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  appliedCouponDetailsContainer: {
    width: '80%',
    height: '100%',
    backgroundColor: whiteThemeColors.primaryDark,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: 'row',
  },
  detailsLeftIconContainer: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsMiddleContainer: {
    width: '75%',
    height: '100%',
    justifyContent: 'space-around',
    paddingLeft: 5,
    paddingVertical: 5,
  },
  couponCodeTxt: {
    fontSize: 8,
    color: whiteThemeColors.greyDark,
  },
  couponCodeValueTxt: {
    fontSize: 13,
    color: whiteThemeColors.white,
  },
  couponStatusTxt: {
    fontSize: 8,
    color: whiteThemeColors.greyDark,
  },
  couponStatusValueTxt: {
    fontSize: 9,
    color: whiteThemeColors.white,
  },
  detailsRightContainer: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalAmtTitleTxt: {
    fontSize: 10,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  totalAmtValueTxt: {
    fontSize: 12,
    color: whiteThemeColors.primaryDark,
    marginLeft: 5,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  couponApplyContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    paddingHorizontal: 5,
  },
  couponApplyTopContainer: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 4,
  },
  applyCouponTxt: {
    fontSize: 10,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  applyCouponToggleBtn: {
    width: 20,
    height: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyCouponTxtInpContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: whiteThemeColors.primary + 20,
    borderRadius: 6,
    marginRight: 10,

    // marginTop: 7,
  },
  couponCardShadow: {
    shadowColor: whiteThemeColors.white,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  cardShadow: {
    shadowColor: whiteThemeColors.greyDark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
