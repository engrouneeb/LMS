import React from 'react';
import moment from 'moment';
import {
  Platform,
  StatusBar,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { _View } from '../components';
import DeviceInfo from 'react-native-device-info';
import WhiteLabelConfig from '../WhiteLabelConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiEndpoints from '../../data/ApiEndpoints';
import { DataAccess } from '../../data/DAL';
const globalDateFormat = 'MMM DD, YYYY';
const globalTimeFormat = 'h:mm A';
const { Get } = DataAccess();

export const convertLocalDateTimeToStringFormat = (date: Date, format = '') => {
  let dateFormat = format ? format : globalDateFormat;
  return moment(date).format(dateFormat);
};

export const convertUTCDateStringToLocalDate = (dateString: any) => {
  if (dateString == '' || dateString == undefined || dateString == null)
    return '';
  let utcDateStr = dateString.includes('Z')
    ? dateString
    : dateString.includes('.')
    ? `${dateString}Z`
    : `${dateString}.000Z`;
  return new Date(utcDateStr);
};

export const convertUTCDateToLocalDateStringFormat = (
  date: any,
  format = '',
) => {
  if (date == '' || date == undefined || date == null) return '';
  let utcDate =
    date instanceof Date || date.includes('Z')
      ? date
      : date.includes('.')
      ? `${date}Z`
      : `${date}.000Z`;
  let dateFormat = format ? format : globalDateFormat;
  return moment(new Date(utcDate)).format(dateFormat);
};

export const covertUTCDateTimeToLocalTimeStringFormat = (dateTime: any) => {
  if (dateTime == '' || dateTime == undefined || dateTime == null) return '';
  let utcDateTime =
    dateTime instanceof Date || dateTime.includes('Z')
      ? dateTime
      : dateTime.includes('.')
      ? `${dateTime}Z`
      : `${dateTime}.000Z`;
  return moment(new Date(utcDateTime)).format(globalTimeFormat);
};
const compare = (arr1: any, arr2: any) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((val: any, index: any) => val === arr2[index]);
};

export const compareArray = async (arr1: any, arr2: any) => {
  if (!arr1 || !arr2) return;

  let result;

  arr1.forEach((e1: any) =>
    arr2.forEach((e2: any) => {
      if (e1.length > 1 && e2.length) {
        result = compare(e1, e2);
      } else if (e1 !== e2) {
        result = false;
      } else {
        result = true;
      }
    }),
  );

  return result;
};

export const Arraydifference = async (arrayOne: any, arrayTwo: any) => {
  return await arrayOne.filter(
    (OBJ1: any) =>
      !arrayTwo.some(
        (OBJ2: any) => JSON.stringify(OBJ2) === JSON.stringify(OBJ1),
      ),
  );
};
export const isTablet = DeviceInfo.isTablet();
export const LoadLogoImage = (props: any) => {
  if (isTablet) {
    let tabLogin =
      Platform.OS == 'android' ? 'asset:/images/tabLogin.png' : 'tabLogin';
    let circleLogo =
      Platform.OS == 'android' ? 'asset:/images/circleLogo.png' : 'circleLogo';
    return (
      <_View>
        {props.showLogo ? (
          <Image
            style={{
              width: '100%',
              height: 450,
            }}
            source={{ uri: tabLogin }} //require("../../../assets/newLogin.png")}
          />
        ) : (
          <_View style={{ paddingTop: Platform.OS !== 'ios' ? '10%' : '10%' }}>
            <Image
              source={{ uri: circleLogo }} //require("../../../assets/circleLogo.png")}
              style={[
                {
                  alignSelf: 'center',
                  justifyContent: 'flex-end',
                  height: 200,
                  width:
                    WhiteLabelConfig.APP_VARIANT_NAME == 'compuchlid'
                      ? '80%'
                      : 200,
                },
                WhiteLabelConfig.APP_VARIANT_NAME == 'compuchild' && {
                  resizeMode: 'contain',
                },
              ]}
            />
          </_View>
        )}
      </_View>
    );
  } else {
    let mobileLogin =
      Platform.OS == 'android'
        ? 'asset:/images/mobileLogin.png'
        : 'mobileLogin';
    let circleLogo =
      Platform.OS == 'android' ? 'asset:/images/circleLogo.png' : 'circleLogo';
    return (
      <_View>
        {props.showLogo ? (
          <Image
            style={{
              width: '100%',
              height: 350,
            }}
            source={{ uri: mobileLogin }} //require("../../../assets/newLogin2.png")}
          />
        ) : (
          <_View style={{ marginTop: 10 }}>
            <Image
              source={{ uri: circleLogo }} //require("../../../assets/circleLogo.png")}
              style={{
                alignSelf: 'center',
                justifyContent: 'flex-end',
                height: props.height ? props.height : 100,
                width: props.width
                  ? props.width
                  : WhiteLabelConfig.APP_VARIANT_NAME == 'compuchild'
                  ? '98%'
                  : 100,
                resizeMode: 'contain',
              }}
            />
          </_View>
        )}
      </_View>
    );
  }
};
export const hideStatusBar = StatusBar.setHidden(true);

export const DismissKeyboard = ({ children }: any) => (
  <TouchableWithoutFeedback onPressIn={() => Keyboard.dismiss()}>
    <_View>{children}</_View>
  </TouchableWithoutFeedback>
);
/**
 * Returns true if the screen is in portrait mode
 */
export const isPortrait = () =>
  Dimensions.get('window').height >= Dimensions.get('window').width;

/**
 * Returns true of the screen is in landscape mode
 */
export const isLandscape = () =>
  Dimensions.get('window').width >= Dimensions.get('window').height;

type TerminologyItem = {
  name: string;
  label: string;
  pluralLabel: string;
};
// Function to save terminology to AsyncStorage
export const saveTerminologyToStorage = async () => {
  var EndPoint = ApiEndpoints.GetCompanyTerminologies;
  Get(EndPoint).then(async (res) => {
    // Convert array to Map
    try {
      const terminologyObject = res.reduce((acc, item) => {
        acc[item.name] = item;
        return acc;
      }, {} as Record<string, TerminologyItem>);

      await AsyncStorage.setItem(
        'terminologyData',
        JSON.stringify(terminologyObject),
      );
      console.log('Terminology saved successfully!');
    } catch (error) {
      console.error('Error saving terminology:', error);
    }
  });
};

// Utility function to get terminology label by name
// Define a union type of valid names based on your terminology data
type TerminologyName =
  | 'Assessment'
  | 'Question'
  | 'Type(Event)'
  | 'Category(Event)'
  | 'Type(Course)'
  | 'Category(Course)'
  | 'Course'
  | 'Level'
  | 'Class'
  | 'Challenge'
  | 'Template'
  | 'Franchise'
  | 'Coupon'
  | 'Family'
  | 'Step(Challenge)'
  | 'Session'
  | 'Event'
  | 'Activity'
  | 'Announcement';

export type TerminologyMap = Record<
  TerminologyName,
  { label: string; pluralLabel: string }
>;

export const getTerminologyLabel = async (): Promise<
  Partial<TerminologyMap>
> => {
  try {
    const terminologyData = await AsyncStorage.getItem('terminologyData');
    if (terminologyData) {
      return JSON.parse(terminologyData);
    }
    return {};
  } catch (error) {
    console.error('Error fetching terminologies:', error);
    return {};
  }
};
