import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, { FC } from 'react';
import { whiteThemeColors } from 'utilities';

interface ErrorComponentTypes {
  resetError: () => void;
}
const ErrorComponent: FC<ErrorComponentTypes> = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.oopTxt}>{'Oops!'}</Text>
          <Text style={styles.errorTxt}>{"There's an Error"}</Text>
        </View>
        {/* <Text style={styles.error}>{props.error.toString()}</Text> */}
        <TouchableOpacity style={styles.button} onPress={props.resetError}>
          <Text style={styles.btnText}>{'Try again'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ErrorComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.white,
    justifyContent: 'center',
  },
  textContainer: { width: '60%', alignSelf: 'center' },
  oopTxt: { textAlign: 'left', fontSize: 25, lineHeight: 30 },
  errorTxt: {
    fontSize: 27,
    lineHeight: 30,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  error: {
    color: whiteThemeColors.red,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    marginVertical: 7,
    alignItems: 'center',
    alignSelf: 'center',
    height: 65,
    borderRadius: 35,
    width: '70%',
  },
  btnText: {
    color: whiteThemeColors.white,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});
