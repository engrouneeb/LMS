import { StyleSheet } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../../components';
import { whiteThemeColors } from 'utilities';

export const EmptyList = () => {
  return (
    <_View style={styles.container}>
      <_VectorIcons
        name='exception1'
        type='AntDesign'
        size={70}
        color={whiteThemeColors.primary}
      />
      <_Text style={styles.noDataTxt}>No Data found</_Text>
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 80,
  },
  noDataTxt: {
    fontSize: 14,
    marginTop: 10,
    color: whiteThemeColors.greyDark,
  },
});
