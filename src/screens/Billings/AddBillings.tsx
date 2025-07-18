import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import PlaidLink from 'react-native-plaid-link-sdk';
import { CustomAlert, whiteThemeColors } from '../../Utilities';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import { _Screen, _Text, _TextInput, _VectorIcons, _View } from '../../components';
import Header from '../Headers';
import Loader from '../Loader/Loading';
import { Radio, StripeModal } from '../StudentInfo/components/AddPaymentMethod/components';
import { styles } from './styles';

let adminMsgAlert = 'Unable to process your request Please contact your admin';
interface props {
}
export const AddBillings: React.FC<props> = () => {
  const navigation = useNavigation();
  const route: any = useRoute();
  const { plaidToken, stripeKey, studentId, domainUrl } = route.params;
  const { PostSecured } = DataAccess();
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [loader, setLoader] = useState(false);
  const [showStripe, setShowStripe] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [checkError, setCheckError] = useState({ name: '', email: '' });
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const openStripe = () => setShowStripe(true);
  const closeStripe = () => {
    setShowStripe(false);
  };
  const onSuccess = async (data: any) => {
    setLoader(true);
    let details = JSON.parse(data.metadata.metadataJson);
    let id = details.accounts[0]?.id;
    let token = details.public_token;
    let EndPoint = ApiEndpoints.GetPlaidAccessToken;
    let payload = {
      PaidbyEmail: email,
      AccountId: id,
      PublicToken: token.toString(),
      DomailUrl: domainUrl,
    };  
    if (studentId != null) {
      payload.StudentIds = studentId;
    }
    let res = await PostSecured(EndPoint, payload);
    console.log({ res });
    if (res) {
      setLoader(false);
      setShowAlert(true);
      setAlertMessage('Bank Card added Successflly');
      setAlertTitle('Success');
      navigation.goBack();
    } else {
      setShowAlert(true);
      setAlertMessage(res.value);
      setAlertTitle('Error');
      setLoader(false);
    }
  };

  const onNameEnter = (name: any) => {
    setCheckError((prev) => {
      return { ...prev, name: '' };
    });
    setFullName(name);
  };
  const onEmailEnter = (email: any) => {
    setCheckError((prev) => {
      return { ...prev, email: '' };
    });
    setEmail(email);
  };

  const nameCheckValidation = () => {
    !fullName.trim() &&
      setCheckError((prev) => {
        return { ...prev, name: '*Full name is required' };
      });
  };
  const emailCheckValidation = () => {
    !emailRegex.test(email) &&
      setCheckError((prev) => {
        return { ...prev, email: '*Valid email is required' };
      });
  };

  const checkValidation = () => {
    let check = false;
    !fullName.trim() && !emailRegex.test(email)
      ? [
        setShowAlert(true),
        setAlertMessage('Full name and email is Required'),
        setAlertTitle('Error'),
      ]
      : !fullName.trim()
        ? [
          setShowAlert(true),
          setAlertMessage('Full name is Required'),
          setAlertTitle('Error'),
        ]
        : !emailRegex.test(email)
          ? [
            setShowAlert(true),
            setAlertMessage('Email is Required'),
            setAlertTitle('Error'),
          ]
          : (check = true);
    return check;
  };

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
      {loader && <Loader />}
      <_View style={styles.safeView}>
        <_View style={styles.mainView}>
          <ScrollView contentContainerStyle={styles.scrollviewContainer}>
            <_View style={[styles.modalContainer]}>
              <_Text style={[styles.heading, { marginBottom: 10 }]}>
                Payment By
              </_Text>
              <_View style={styles.inputContainer}>
                <_Text style={styles.headText}>Full Name</_Text>
                <_TextInput
                  textAlignVertical='top'
                  style={styles.inputStyle}
                  onChangeText={onNameEnter}
                  onBlur={nameCheckValidation}
                  placeholder={'Enter your full name'}
                  placeholderTextColor={'gray'}
                />

                {checkError.name != '' && (
                  <_Text style={styles.errorText}>{checkError.name}</_Text>
                )}
              </_View>
              <_View style={styles.inputContainer}>
                <_Text style={styles.headText}>{'Email'}</_Text>
                <_TextInput
                  textAlignVertical='top'
                  style={styles.inputStyle}
                  onChangeText={onEmailEnter}
                  placeholder={'Enter your email'}
                  placeholderTextColor={'gray'}
                  onBlur={emailCheckValidation}
                />
                {checkError.email != '' && (
                  <_Text style={styles.errorText}>{checkError.email}</_Text>
                )}
              </_View>
            </_View>
            <_View style={styles.paymentMethodContainer}>
              <_Text
                style={[styles.heading, { marginBottom: 10, fontSize: 18 }]}
              >
                Payment Method
              </_Text>
              <TouchableOpacity
                onPress={() => setPaymentMethod(0)}
                activeOpacity={0.8}
                style={styles.btnWithIcon}
              >
                <Radio selected={paymentMethod == 0} />
                <_Text
                  style={[
                    styles.paymentText,
                    {
                      color:
                        paymentMethod == 0
                          ? whiteThemeColors.primaryTextColor
                          : whiteThemeColors.greyDark,
                    },
                  ]}
                >
                  Credit Card
                </_Text>
                <_VectorIcons
                  name={'creditcard'}
                  type={'AntDesign'}
                  size={18}
                  color={
                    paymentMethod == 0
                      ? whiteThemeColors.primaryTextColor
                      : whiteThemeColors.greyDark
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setPaymentMethod(1)}
                style={styles.btnWithIcon}
              >
                <Radio selected={paymentMethod == 1} />
                <_Text
                  style={[
                    styles.paymentText,
                    {
                      color:
                        paymentMethod == 1
                          ? whiteThemeColors.primaryTextColor
                          : whiteThemeColors.greyDark,
                    },
                  ]}
                >
                  Bank Account
                </_Text>
                <_VectorIcons
                  name={'money'}
                  type={'FontAwesome'}
                  size={18}
                  color={
                    paymentMethod == 1
                      ? whiteThemeColors.primaryDark
                      : whiteThemeColors.greyDark
                  }
                />
              </TouchableOpacity>
            </_View>
          </ScrollView>
          {paymentMethod == 0 &&
            (stripeKey == '' ||
              stripeKey == null ||
              !stripeKey ||
              !fullName.trim() ||
              !emailRegex.test(email)) ? (
            <_View style={styles.floatingButton}>
              <TouchableOpacity
                activeOpacity={0.2}
                onPress={() => {
                  let check = checkValidation();
                  check && [
                    setShowAlert(true),
                    setAlertMessage(adminMsgAlert),
                    setAlertTitle('Error'),
                  ];
                }}
                style={styles.stretchedView}
              >
                <_VectorIcons
                  name={'arrowright'}
                  type={'AntDesign'}
                  color={whiteThemeColors.white}
                  size={26}
                />
              </TouchableOpacity>
            </_View>
          ) : paymentMethod == 0 ? (
            <_View style={styles.floatingButton}>
              <TouchableOpacity
                activeOpacity={0.2}
                onPress={() => {
                  let check = checkValidation();
                  check && openStripe();
                }}
                style={styles.stretchedView}
              >
                <_VectorIcons
                  name={'arrowright'}
                  type={'AntDesign'}
                  size={26}
                  color={whiteThemeColors.white}
                />
              </TouchableOpacity>
            </_View>
          ) : plaidToken == '' ||
            plaidToken == null ||
            !plaidToken ||
            !fullName.trim() ||
            !emailRegex.test(email) ? (
            <_View style={styles.floatingButton}>
              <TouchableOpacity
                activeOpacity={0.2}
                onPress={() => {
                  let check = checkValidation();
                  check && [
                    setShowAlert(true),
                    setAlertMessage(adminMsgAlert),
                    setAlertTitle('Error'),
                  ];
                }}
                style={styles.stretchedView}
              >
                <_VectorIcons
                  name={'arrowright'}
                  type={'AntDesign'}
                  size={26}
                  color={whiteThemeColors.white}
                />
              </TouchableOpacity>
            </_View>
          ) : (
            <_View style={styles.floatingButton}>
              <PlaidLink
                tokenConfig={{
                  token: plaidToken,
                }}
                onSuccess={onSuccess}
                onExit={(exit) => { }}
              >
                <_View style={styles.arrowRight}>
                  <_VectorIcons
                    name={'arrowright'}
                    type={'AntDesign'}
                    size={26}
                    color={whiteThemeColors.white}
                  />
                </_View>
              </PlaidLink>
            </_View>
          )}
        </_View>
        {showStripe && (
          <StripeModal
            fullName={fullName}
            email={email}
            domainUrl={domainUrl}
            visible={showStripe}
            stripeKey={stripeKey}
            onClose={closeStripe}
            navigation={navigation}
            studentId={studentId}
          />
        )}
      </_View>
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            if (alertTitle == 'Success') {
              setShowAlert(false);
              navigation.goBack();
            }
            setShowAlert(false);
          }}
        />
      )}
    </_Screen>
  );
};
