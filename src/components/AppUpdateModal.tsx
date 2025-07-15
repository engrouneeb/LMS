import React, { FC, useEffect, useState } from 'react';
import {
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getHeight,
  getWidth,
  LoadLogoImage,
} from '../Utilities';
import {whiteThemeColors} from "../Utilities/colors"
import { _VectorIcons } from '.';
import CommonStyles from '../screens/CommonStyles';
interface Props {
  url: string;
  hideUpdateAlert: () => void;
}
export const AppUpdateModal: FC<Props> = ({ url, hideUpdateAlert }) => {
  const [link, setLink] = useState<string>('');
  useEffect(() => {
    if (url) {
      getUrl();
    }
  }, [url]);
  function getUrl() {
    setLink(url);
  }
  const closePopUp = () => {
    hideUpdateAlert();
  };
  async function updateapp() {
    try {
      Linking.canOpenURL(url)
        .then((supported) => {
          if (!supported) {
            return;
          } else {
            return Linking.openURL(url);
          }
        })
        .catch((err) => {});
    } catch (error) {}
  }
  return (
    <SafeAreaView style={[{ flex: 1 }, CommonStyles.appBackgroundColor]}>
      <View style={{ flex: 1, marginTop: getHeight(15) }}>
        <LoadLogoImage showLogo={false} />
        <View
          style={{
            marginTop: getHeight(10),
            paddingHorizontal: getWidth(5),
          }}
        >
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
            }}
          >
            <_VectorIcons
              type='MaterialCommunityIcons'
              name='update'
              size={30}
              color={whiteThemeColors.primary}
              style={{ marginRight: getWidth(3) }}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.mainHeading}>
              A newer version is available. You must update to continue.
            </Text>
          </View>
        </View>
        <Pressable onPress={updateapp} style={styles.buttonstyle}>
          <Text style={styles.buttonTxtstyle}>Update</Text>
        </Pressable>
      </View>
      <TouchableOpacity
        onPress={closePopUp}
        style={{
          position: 'absolute',
          right: 20,
          top: 80,
          backgroundColor: whiteThemeColors.primary + 90,
          width: 30,
          height: 30,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <_VectorIcons
          type='AntDesign'
          name='closecircleo'
          size={22}
          color={whiteThemeColors.white}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonTxtstyle: {
    fontSize: 16,
    fontWeight: '400',
    color: whiteThemeColors.white,

    textAlign: 'justify',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  buttonstyle: {
    width: '45%',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 50,
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 5,
    marginTop: getHeight(10),
  },
  mainHeading: {
    textAlign: 'center',
    fontSize: 16,

    fontWeight: '600',
  },
  smallheading: {
    textAlign: 'center',
    fontSize: 10,

    fontWeight: '600',
    marginTop: getHeight(1),
    color: 'grey',
  },
});
