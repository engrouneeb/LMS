import React from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../components';
import CommonStyles from '../../CommonStyles';
import { whiteThemeColors } from 'utilities';
import { Constants } from './';

const PayNowModal = ({
  totalAmount,
  balance,
  visibleModalPay,
  setVisbleModalPay,
}) => {
  const BalanceCard = ({ title = '', value = 0 }) => {
    return (
      <_View style={styles.balanceCardContainer}>
        <_View
          style={[styles.balanceDetailsContainer, styles.balanceCardShadow]}
        >
          <_VectorIcons
            type={'SimpleLineIcons'}
            name={'wallet'}
            size={17}
            color={whiteThemeColors.white}
          />
          <_Text style={styles.balanceValueTxt}>{`$${value}`}</_Text>

          <_Text style={styles.balanceTitleTxt}>{title}</_Text>
        </_View>
      </_View>
    );
  };

  const Button = ({
    btnText = '',
    onPress = () => console.log(btnText + ' pressed'),
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.btn,
          styles.btnShadow,
          {
            backgroundColor: [Constants.Proceed].includes(btnText)
              ? whiteThemeColors.primaryDark
              : whiteThemeColors.greyDark + 40,
          },
        ]}
      >
        <_Text
          style={[
            styles.btnTxt,
            {
              color: [Constants.Proceed].includes(btnText)
                ? whiteThemeColors.white
                : whiteThemeColors.primaryDark,
            },
          ]}
        >
          {btnText}
        </_Text>
      </TouchableOpacity>
    );
  };

  const Header = () => {
    return (
      <_View style={styles.headerContainer}>
        <_View style={styles.headerDetailsContainer}>
          <_Text style={styles.headerTitleTxt}>
            {Constants.ProcessPayment}
          </_Text>
          <TouchableOpacity
            onPress={() => setVisbleModalPay(false)}
            style={[styles.headerCloseBtn, styles.modalBodyShadow]}
          >
            <_VectorIcons
              type={'Entypo'}
              name='cross'
              size={22}
              color={whiteThemeColors.primary}
            />
          </TouchableOpacity>
        </_View>
      </_View>
    );
  };

  const Body = () => {
    return (
      <_View style={[styles.bodyContainer, styles.modalBodyShadow]}>
        <_View style={styles.miniCardsContainer}>
          <BalanceCard title={Constants.Balance} value={balance} />
          <BalanceCard title={Constants.TotalAmountDue} value={totalAmount} />
        </_View>
        <_View style={styles.bodyRestContainer}>
          <_View style={styles.footerNoteContainer}>
            <_Text style={styles.footerNoteTxt}>{Constants.FooterNote}</_Text>
          </_View>
          <_View style={styles.bodyBtnContainer}>
            <Button btnText={Constants.Proceed} />
            <Button
              btnText={Constants.Cancel}
              onPress={() => setVisbleModalPay(false)}
            />
          </_View>
        </_View>
      </_View>
    );
  };

  const Content = () => {
    return (
      <_View style={styles.modalDetailsContainer}>
        <_View style={styles.modalDetailsBodyContainer}>
          <Header />
          <Body />
        </_View>
      </_View>
    );
  };

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      transparent={true}
      visible={visibleModalPay}
      onRequestClose={() => setVisbleModalPay(false)}
    >
      <Content />
    </Modal>
  );
};

export { PayNowModal };

const styles = StyleSheet.create({
  modalDetailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.3)',
    paddingHorizontal: 10,
  },
  headerContainer: {
    width: '100%',
    height: '17%',
    backgroundColor: whiteThemeColors.primaryDark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    padding: 10,
  },
  headerDetailsContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleTxt: {
    fontSize: 17,
    color: whiteThemeColors.white,
  },
  headerCloseBtn: {
    width: 25,
    height: 25,
    backgroundColor: whiteThemeColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  bodyContainer: {
    width: '100%',
    height: '83%',
    backgroundColor: whiteThemeColors.white,
    borderRadius: 20,
    paddingTop: 8,
    paddingBottom: 5,
    paddingHorizontal: 5,
  },
  miniCardsContainer: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bodyRestContainer: {
    width: '100%',
    height: '50%',
  },
  footerNoteContainer: {
    width: '90%',
    height: '37%',
    paddingTop: 5,
    paddingLeft: 13,
    alignItems: 'center',
  },
  footerNoteTxt: {
    fontSize: 11,
    color: whiteThemeColors.greyDark,
  },
  bodyBtnContainer: {
    width: '100%',
    height: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalDetailsBodyContainer: {
    width: '100%',
    height: 250,
    backgroundColor: whiteThemeColors.primaryDark,
    borderRadius: 20,
  },
  modalBodyShadow: {
    shadowColor: whiteThemeColors.white + 30,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  balanceCardContainer: {
    width: '45%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceDetailsContainer: {
    width: 150,
    height: 80,
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  balanceValueTxt: {
    fontSize: 20,
    color: whiteThemeColors.white,
  },
  balanceTitleTxt: {
    fontSize: 9,
    color: whiteThemeColors.white,
  },
  btn: {
    width: 80,
    height: 35,
    marginRight: 4,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 11,
  },

  balanceCardShadow: {
    shadowColor: whiteThemeColors.greyDark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  btnShadow: {
    shadowColor: whiteThemeColors.greyDark + 90,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
});
