import moment from 'moment';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { _Text, _View } from '../../../components';
import CommonStyles from '../../CommonStyles';
import { whiteThemeColors } from 'utilities';
import { _ActivityIndicator } from '../../Loader';
import { AvatarOnly, Constants, Status, TitleWithValue, UserName } from './';

export const FeePaymentCard = ({ item, onPress, showBtnPayLoader }) => {
  const PayBtn = ({ id }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[styles.payBtn]}
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

  const Header = ({ name, status }) => {
    return (
      <_View style={styles.headerContainer}>
        <_View style={styles.avatarNameContainer}>
          <AvatarOnly
            name={name}
            size={35}
            backgroundColor={whiteThemeColors.primaryDark + 40}
            textColor={whiteThemeColors.primary}
            textSize={12}
          />
          <_View
            style={{
              marginLeft: 5,
            }}
          >
            <UserName name={name} />
          </_View>
        </_View>
        <_View style={styles.statusContainer}>
          <Status status={status} />
        </_View>
      </_View>
    );
  };

  const BodyFirstRow = ({ details }) => {
    const { totalAmt, orginalDiscAmt, origClassFee } = details;
    return (
      <_View style={styles.bodyRowContainer}>
        <_View style={styles.rowCellContainer}>
          <TitleWithValue
            title={Constants.TotalAmount + '\t'}
            titleSize={9}
            value={`$${totalAmt}`}
            valueSize={12}
          />
        </_View>
        <_View style={styles.rowCellContainer}>
          <TitleWithValue
            title={Constants.DiscountAmount}
            titleSize={9}
            value={`$${orginalDiscAmt}`}
            valueSize={12}
          />
        </_View>
        <_View width={'34%'} style={styles.rowCellContainer}>
          <TitleWithValue
            title={Constants.FeeAmount}
            titleSize={9}
            value={`$${origClassFee}`}
            valueSize={12}
          />
        </_View>
      </_View>
    );
  };
  const BodySecondRow = ({ details }) => {
    const { origAmt, billingCycle, autoDeduct } = details;
    return (
      <_View style={styles.bodyRowContainer}>
        <_View style={styles.rowCellContainer}>
          <TitleWithValue
            title={Constants.OrginalAmount + '\t'}
            titleSize={9}
            value={`$${origAmt}`}
            valueSize={12}
          />
        </_View>
        <_View style={styles.rowCellContainer}>
          <TitleWithValue
            title={Constants.BillingCycle + '\t\t'}
            titleSize={9}
            value={billingCycle.length < 1 ? `-` : `${billingCycle}`}
            valueSize={12}
          />
        </_View>
        <_View width={'34%'} style={styles.rowCellContainer}>
          <TitleWithValue
            title={Constants.AutoDeduct}
            titleSize={9}
            value={`${autoDeduct}`}
            valueSize={12}
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
    const { shoppingCartId, nextTransactionDateTime } = details;
    return (
      <_View style={styles.footerContainer}>
        <_View style={styles.footerLeftContainer}>
          <TitleWithValue
            title={Constants.NextScheduleDate}
            value={
              nextTransactionDateTime == ''
                ? 'null'
                : moment(nextTransactionDateTime, 'MMM D, YYYY').format(
                    'ddd, MMM D YYYY',
                  )
            }
          />
        </_View>
        <PayBtn id={shoppingCartId} />
      </_View>
    );
  };

  const CardTemplate = ({ details }) => {
    return (
      <_View style={[styles.mainCardContainer]}>
        <Header name={details?.studentName} status={details?.paymentStatus} />
        <Body details={details} />
        <Footer details={details} />
      </_View>
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
    borderRadius: 10,
    padding: 20,
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
    width: '100%',
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
  payBtn: {
    width: '35%',
    height: '60%',
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 10,
  },
  footerLeftContainer: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
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
