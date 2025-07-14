import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
let options: any = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
    mediaType: 'photo',
  },
};
export async function requestCameraPermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            'Camera Permission',
            'Allow application to access the device camera.',
            [
              {
                text: 'Denied',
                onPress: () => false,
                style: 'cancel',
              },
              { text: 'Allow', onPress: () => Linking.openSettings() },
            ],
          );
        }
      }
    } catch (err) {
      return false;
    }
  } else {
    const result = await request(PERMISSIONS.IOS.CAMERA);
    if (result == RESULTS.GRANTED) {
      return true;
    } else if (result == RESULTS.UNAVAILABLE) {
      return false;
    } else if (result == RESULTS.DENIED) {
      return false;
    } else if (result == RESULTS.BLOCKED) {
      Alert.alert(
        'Camera Permission',
        'Allow application to access the device camera.',
        [
          {
            text: 'Denied',
            onPress: () => false,
            style: 'cancel',
          },
          { text: 'Allow', onPress: () => Linking.openSettings() },
        ],
      );
    } else if (result == RESULTS.LIMITED) {
      return false;
    } else return false;
  }
}
export const _Camera = () =>
  launchCamera(options, (response) => {
    if (response.didCancel) {
      return false;
    } else if (response.errorCode) {
      return false;
    } else {
      return response.assets;
    }
  });
