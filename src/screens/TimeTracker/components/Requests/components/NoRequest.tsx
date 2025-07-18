import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../components';
import CommonStyles from '../../../../../screens/CommonStyles';

export const NoRequest = () => {
  return (
    <_View style={styles.container}>
      <_VectorIcons
        type='FontAwesome5'
        name={'clipboard-list'}
        size={70}
        color={whiteThemeColors.primary}
      />
      <_Text style={styles.text}>No Requests Found!</_Text>
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    marginTop: 10,
    fontFamily: CommonStyles.fonts.medium,
  },
});
