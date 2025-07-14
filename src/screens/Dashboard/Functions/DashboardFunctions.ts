import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import ApiEndPoint from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { KJUR } from 'jsrsasign';
const { PostSecured } = DataAccess();
import DrawerScreens from '../../../navigation/Drawer/DrawerScreenNames';
export const ms_checkPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    await GetFcmToken();
  } else {
    requestPermission();
  }
};
export function generateSignature(zoomConfig,role=0) {
  // const {sdkClientKey,sdkClientSecret}=zoomConfig;
  const iat = Math.round(new Date().getTime() / 1000) - 30; // Issued at time
  const exp = iat + 3600; // Token expiry time (1 hour)
  const oHeader = { alg: 'HS256', typ: 'JWT' }; // Header for the JWT
  // const sdkKey = '6Azv_AAJRLed1XRnrlvWkQ'; // Replace with your SDK key
  // const secret = 'f6t4Pdry6IvWye3revhBjsS1l4sW9nut'; // Replace with your secret key
  const sdkClientKey = 'xrFPRqtkSnWiGP0JZwaB3w'; // Replace with your SDK key
  const sdkClientSecret = 'F18V3ot33rTvcgwHGP9zQ8KOQryfDjRH'; // Replace with your secret key

  // Payload for the JWT
  const oPayload = {
    // sdkKey: sdkClientKey,
    // appKey: sdkClientKey,
    sdkKey: sdkClientKey,
    appKey: sdkClientKey,
    role: role,
    iat: iat,
    exp: exp,
    tokenExp: exp,
  };

  const sHeader = JSON.stringify(oHeader); // Stringify header
  const sPayload = JSON.stringify(oPayload); // Stringify payload
  // Sign the JWT
  const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkClientSecret);
  return sdkJWT;
}

export const requestPermission = async () => {
  try {
    if (Platform.OS == 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (err) {
        console.warn('requestNotificationPermission error: ', err);
      }
    }
  } catch (error) {
    console.error('Token Permission Error[311]:', error);
  }
};
async function GetFcmToken() {
  let FirebaseToken = await AsyncStorage.getItem('FirebaseToken');
  console.log('----FirebaseToken', FirebaseToken);
  // if (
  //   FirebaseToken === '' ||
  //   FirebaseToken === null ||
  //   FirebaseToken === undefined
  // ) {
  messaging()
    .getToken()
    .then(async (token) => {
      if (token)
        await AsyncStorage.setItem('FirebaseToken', token)

          .then(() => {
            let SaveFirebaseTokenEndpoint = ApiEndPoint.SavefireBasetoken;
            let deviceId = getUniqueId();
            PostSecured(SaveFirebaseTokenEndpoint, {
              DeviceToken: token,
              DeviceId: deviceId,
            }).then((res) => {
              console.log('----firebase token response', res);
            });
          })
          .catch((err) => {
            console.error('firebase token set item', err.message);
            return;
          });
    })
    .catch((err) => {
      console.error('firebase get token call', err.message);
      return;
    });
  // }
}
export const getGreetings = () => {
  const hour = new Date().getHours();
  return hour < 12
    ? 'Morning'
    : hour >= 12 && hour <= 17
    ? 'Afternoon'
    : 'Evening';
};

export const getVectorIconName = () => {
  const hour = new Date().getHours();
  return hour < 12
    ? 'md-partly-sunny-outline'
    : hour >= 12 && hour <= 17
    ? 'sunny-sharp'
    : 'moon-outline';
};

export const messageListener = async (
  navigation: any,
  _getChatUser: (val1: any, val2: any) => void,
) => {
  messaging()
    .getInitialNotification()
    .then(async (remoteMessage) => {
      if (remoteMessage == null) return;
      else {
        if (remoteMessage?.data?.receiverObj == undefined) {
          navigation.navigate(DrawerScreens.notificationsTab.name);
        } else {
          const receiverObj = await JSON.parse(
            remoteMessage?.data?.receiverObj,
          );
          _getChatUser(receiverObj.userID, remoteMessage);
        }
      }
    });
  messaging().onNotificationOpenedApp(async (remoteMessage) => {
    if (remoteMessage == null) {
      return;
    } else {
      if (remoteMessage?.data?.receiverObj == undefined) {
        navigation.navigate(DrawerScreens.notificationsTab.name);
      } else {
        const receiverObj = await JSON.parse(remoteMessage?.data?.receiverObj);
        console.log('receiverObj.userID', receiverObj.userID);
        _getChatUser(receiverObj.userID, remoteMessage);
      }
    }
  });
};
