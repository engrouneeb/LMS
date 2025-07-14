import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { _Text, _View } from '../../../components';
import CommonStyles from '../../CommonStyles';
import { whiteThemeColors } from 'utilities';
import { _ActivityIndicator } from '../../Loader';
import { AvatarOnly, Constants, Status, TitleWithValue, UserName } from './';

export const EnrollPaymentCard = ({
  item,
  onDetailsPress,
  onPayPress,
  showBtnPayLoader,
  showBtnCouponLoader,
  onPressCoupon,
}) => {
  const CouponBtn = ({ id, width = '40%', toBeRed = false }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressCoupon}
        style={[
          {
            width: width,
            backgroundColor: toBeRed
              ? whiteThemeColors.red + 15
              : whiteThemeColors.greyDark + 20,
          },
          styles.couponBtn,
          styles.btnCouponShadow,
        ]}
      >
        {showBtnCouponLoader == id ? (
          <_ActivityIndicator
            size={'small'}
            color={whiteThemeColors.primaryDark}
            showText={false}
          />
        ) : (
          <_Text
            style={[
              styles.couponBtnTxt,
              {
                color: toBeRed
                  ? whiteThemeColors.red
                  : whiteThemeColors.primaryDark,
              },
            ]}
          >
            {Constants.Coupon}
          </_Text>
        )}
      </TouchableOpacity>
    );
  };

  const PayBtn = ({ id, toBeRed = false }) => {
    return (
      <TouchableOpacity
        onPress={onPayPress}
        activeOpacity={0.7}
        style={[
          styles.payBtn,
          styles.btnShadow,
          {
            backgroundColor: toBeRed
              ? whiteThemeColors.red
              : whiteThemeColors.primaryDark,
          },
        ]}
      >
        {showBtnPayLoader == id ? (
          <_ActivityIndicator
            size={'small'}
            color={whiteThemeColors.white}
            showText={false}
          />
        ) : (
          <_Text style={styles.payBtnTxt}>{Constants.Pay}</_Text>
        )}
      </TouchableOpacity>
    );
  };

  const Header = ({ name, status, toBeRed }) => {
    return (
      <_View style={styles.headerContainer}>
        <_View style={styles.avatarNameContainer}>
          <AvatarOnly
            name={name}
            size={35}
            backgroundColor={
              toBeRed
                ? whiteThemeColors.red + 40
                : whiteThemeColors.primaryDark + 40
            }
            textColor={
              toBeRed ? whiteThemeColors.red : whiteThemeColors.primary
            }
            textSize={12}
          />
          <_View
            style={{
              marginLeft: 5,
            }}
          >
            <UserName name={name} toBeRed={toBeRed} />
          </_View>
        </_View>
        <_View style={styles.statusContainer}>
          <Status status={status} toBeRed={toBeRed} />
        </_View>
      </_View>
    );
  };

  const BodyFirstRow = ({ details }) => {
    const { totalAmt, orginalDiscAmt, origClassFee, isPaymentDue } = details;
    return (
      <_View style={styles.bodyRowContainer}>
        <_View style={styles.rowCellContainer}>
          <TitleWithValue
            title={Constants.TotalAmount + '\t'}
            titleSize={9}
            value={`$${totalAmt}`}
            valueSize={12}
            toBeRed={isPaymentDue}
          />
        </_View>
        <_View style={styles.rowCellContainer}>
          <TitleWithValue
            title={Constants.DiscountAmount}
            titleSize={9}
            value={`$${orginalDiscAmt}`}
            valueSize={12}
            toBeRed={isPaymentDue}
          />
        </_View>
        <_View width={'34%'} style={styles.rowCellContainer}>
          <TitleWithValue
            title={Constants.FeeAmount}
            titleSize={9}
            value={`$${origClassFee}`}
            valueSize={12}
            toBeRed={isPaymentDue}
          />
        </_View>
      </_View>
    );
  };
  const BodySecondRow = ({ details }) => {
    const { origAmt, billingCycle, autoDeduct, isPaymentDue } = details;
    return (
      <_View style={styles.bodyRowContainer}>
        <_View style={styles.rowCellContainer}>
          <TitleWithValue
            title={Constants.OrginalAmount + '\t'}
            titleSize={9}
            value={`$${origAmt}`}
            valueSize={12}
            toBeRed={isPaymentDue}
          />
        </_View>
        <_View style={styles.rowCellContainer}>
          <TitleWithValue
            title={Constants.BillingCycle + '\t\t'}
            titleSize={9}
            value={`${billingCycle}`}
            valueSize={12}
            toBeRed={isPaymentDue}
          />
        </_View>
        <_View width={'34%'} style={styles.rowCellContainer}>
          <TitleWithValue
            title={Constants.AutoDeduct}
            titleSize={9}
            value={`${autoDeduct}`}
            valueSize={12}
            toBeRed={isPaymentDue}
          />
        </_View>
      </_View>
    );
  };

  const Body = ({ details }) => {
    return (
      <_View style={styles.bodyContainer}>
        <BodyFirstRow details={details} />
        <BodySecondRow details={details} />
      </_View>
    );
  };
  const Footer = ({ details }) => {
    const { shoppingCartId, paymentStatus, isPaymentDue } = details;
    return (
      <_View style={styles.footerContainer}>
        {paymentStatus == Constants.Unpaid ? (
          <>
            <PayBtn toBeRed={isPaymentDue} id={shoppingCartId} />
            <CouponBtn toBeRed={isPaymentDue} width={'40%'} />
          </>
        ) : (
          <CouponBtn toBeRed={isPaymentDue} id={shoppingCartId} />
        )}
      </_View>
    );
  };

  const CardTemplate = ({ details }) => {
    const { isPaymentDue } = details;
    return (
      <TouchableOpacity
        onPress={onDetailsPress}
        activeOpacity={0.8}
        style={[
          isPaymentDue ? styles.mainCardContainerRed : styles.mainCardContainer,
          // styles.cardShadow,
        ]}
      >
        <Header
          name={details?.studentName}
          status={details?.paymentStatus}
          toBeRed={isPaymentDue}
        />
        <Body details={details} />
        <Footer details={details} />
      </TouchableOpacity>
    );
  };

  return <CardTemplate details={item} />;
};

const styles = StyleSheet.create({
  mainCardContainer: {
    width: '100%',
    height: 230,
    backgroundColor: whiteThemeColors.white + 90,
    marginTop: 10,
    borderRadius: 25,
    padding: 20,
  },
  mainCardContainerRed: {
    width: '100%',
    height: 230,
    backgroundColor: whiteThemeColors.red + 25,
    marginTop: 10,
    borderRadius: 25,
    padding: 10,
  },
  headerContainer: {
    width: '100%',
    height: '25%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarNameContainer: {
    width: '60%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusContainer: {
    width: '40%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 5,
  },
  bodyContainer: {
    width: '90%',
    height: '50%',
    padding: 4,
  },
  bodyRowContainer: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCellContainer: {
    width: '33%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  couponBtn: {
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponBtnTxt: {
    fontSize: 12,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  payBtn: {
    width: '27%',
    height: 38,
    backgroundColor: whiteThemeColors.primaryDark,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  payBtnTxt: {
    fontSize: 13,
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  footerContainer: {
    width: '100%',
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
  },
  cardShadow: {
    shadowColor: whiteThemeColors.greyDark,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  // btnCouponShadow: {
  //   shadowColor: whiteThemeColors.greyDark,
  //   shadowOffset: {
  //     width: 0,
  //     height: 5,
  //   },
  //   shadowOpacity: 0.36,
  //   shadowRadius: 6.68,
  //   elevation: 11,
  // },
  btnShadow: {
    shadowColor: whiteThemeColors.greyDark,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
});
