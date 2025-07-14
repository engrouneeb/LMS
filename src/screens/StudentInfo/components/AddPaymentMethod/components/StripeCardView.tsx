import { CardField, useStripe } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { whiteThemeColors } from 'utilities';
import DebitCardSvg from '../../../../../../assets/debitCardSvg';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import { _Button, _Text, _View } from '../../../../../components';
import { styles } from '../../../styles';
interface props {
  fullName: string;
  email: string;
  domainUrl: string;
  stripeKey: string;
  studentId: number;
  navigation: any;
  loader: boolean;
  setLoader: (load: boolean) => void;
  close: () => void;
}
export const StripeCardView: React.FC<props> = ({
  fullName,
  domainUrl,
  setLoader,
  email,
  close,
  studentId,
  navigation,
  stripeKey,
  loader,
}) => {
  const { createToken } = useStripe();
  const [cardDetails, setCardDetails] = useState<any>();
  const [errorStatement, setErrorStatement] = useState('');
  const blueCardFront = '../../../../../../assets/blueCardFront.png';
  const blueCardBack = '../../../../../../assets/blueCardBack.png';
  const { PostSecuredWithParams } = DataAccess();
  const handleIOS_Payment = async () => {
    setLoader(true);
    if ('type' in cardDetails) cardDetails.type = 'Card';
    else {
      let cDetails = cardDetails;
      cDetails.type = 'Card';
      setCardDetails(cDetails);
    }
    var { token } = await createToken(cardDetails);
  
    if (token?.id) {
      let EndPoint = ApiEndpoints.CreateNewPaymentMethod;
      let params = `?Token=${
        token.id
      }&paidByName=${fullName}&paidByEmail=${email}&domainUrl=${domainUrl}`;
      if (studentId != null) {
        params = `?StudentIds=${studentId}&` + params.slice(1);
      }
     
      let res = await PostSecuredWithParams(EndPoint, params);
      console.log({res});
      setLoader(false);
      if (res) {
        if (res.key) {
          Alert.alert('Credit Card added Successfully');
          close();
          navigation.goBack();
        }
        else {
          console.log(res);  
          if(res.error)
          Alert.alert("Error",res.error_description);
          close();
        } 
      }
    }
  };

  const handleAndroid_Payment = async () => {
    setLoader(true);
    var token = await getCreditCardToken(cardDetails);
    let EndPoint = ApiEndpoints.CreateNewPaymentMethod;
    let params = `?Token=${
      token.id
    }&paidByName=${fullName}&paidByEmail=${email}&domainUrl=${domainUrl}`;
    if (studentId != null) {
      params = `?StudentIds=${studentId}&` + params.slice(1);
    }
    let res = await PostSecuredWithParams(EndPoint, params);
    if (res) {
      setLoader(false);
      if (res.key) {
        navigation.goBack();
      }
    }
  };
  const getCreditCardToken = (creditCardData: any) => {
    const card: any = {
      'card[number]': creditCardData.values.number.replace(/ /g, ''),
      'card[exp_month]': creditCardData.values.expiry.split('/')[0],
      'card[exp_year]': creditCardData.values.expiry.split('/')[1],
      'card[cvc]': creditCardData.values.cvc,
    };
    return fetch('https://api.stripe.com/v1/tokens', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${stripeKey}`,
      },
      method: 'post',
      body: Object.keys(card)
        .map((key) => key + '=' + card[key])
        .join('&'),
    }).then((response) => response.json());
  };

  const checkIOS_Inputs = () => {
    let check = false;

    cardDetails?.last4.length != 4
      ? setErrorStatement('Your card number is invalid')
      : !cardDetails?.expiryMonth || !cardDetails?.expiryYear
      ? setErrorStatement('Your expiry date is invalid')
      : !cardDetails?.complete
      ? setErrorStatement('Your card details are invalid')
      : (check = true);
    return check;
  };

  const checkAndroidInputs = () => {
    let check = false;
    !cardDetails || cardDetails?.status?.number == 'incomplete'
      ? setErrorStatement('Your card number is incomplete')
      : cardDetails?.status?.number == 'invalid'
      ? setErrorStatement('Your card number is invalid')
      : cardDetails?.status?.expiry == 'incomplete'
      ? setErrorStatement('Your expiry date is incomplete')
      : cardDetails?.status?.expiry == 'invalid'
      ? setErrorStatement('Your card number is invalid')
      : cardDetails?.status?.cvc == 'incomplete'
      ? setErrorStatement('Your CVC is incomplete')
      : cardDetails?.status?.cvc == 'invalid'
      ? setErrorStatement('Your CVC is invalid')
      : (check = true);

    return check;
  };

  const handlePaymentPress = () => {
    if (Platform.OS == 'android') {
      let check = checkAndroidInputs();
      check && handleAndroid_Payment();
    } else {
      let check = checkIOS_Inputs();
      check && handleIOS_Payment();
    }
  };
  return (
    <_View>
      <_View style={styles.container}>
        {Platform.OS != 'android' && (
          <_View style={styles.debitCard}>
            <DebitCardSvg size={styles.debitCardIcon} />
          </_View>
        )}
        {Platform.OS != 'android' ? (
          <CardField
            cardStyle={{
              backgroundColor: whiteThemeColors.white,
              textColor: whiteThemeColors.greyDark,
              borderRadius: 10,
              fontSize: 12,
            }}
            style={styles.cardField}
            onCardChange={(details) => {
              setErrorStatement('');
              setCardDetails(details);
            }}
            postalCodeEnabled={false}
          />
        ) : (
          <CreditCardInput
            onChange={(cardDetail: any) => {
              setErrorStatement('');
              setCardDetails(cardDetail);
            }}
            cardImageFront={require(blueCardFront)}
            allowScroll={true}
            cardImageBack={require(blueCardBack)}
            inputContainerStyle={styles.inputCon}
            // cardFontFamily={CommonStyles.textFont.fontFamily}
            inputStyle={styles.input}
            labelStyle={styles.label}
            placeholderColor={whiteThemeColors.greyDark + '90'}
          />
        )}
        {errorStatement != '' && (
          <_Text style={styles.errorStatement}>*{errorStatement}</_Text>
        )}
      </_View>
      <_Button
        width={'90%'}
        submitting={!loader}
        borderRadius={10}
        style={styles.btn}
        callback={handlePaymentPress}
        BtnTxt={styles.btnText}
        btnText={'Add Credit Card'}
      />
    </_View>
  );
};
