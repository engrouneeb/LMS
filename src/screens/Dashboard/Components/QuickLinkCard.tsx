import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../components';
import { whiteThemeColors } from '../../../Utilities';
interface props {
  Icon: any;
  name: string;
  onPress: () => void;
}
const QuickLinkCard: React.FC<props> = ({ Icon, name, onPress }) => {
  return (
    <TouchableHighlight
      underlayColor={whiteThemeColors.primary + '10'}
      style={styles.btnView}
      onPress={onPress}
    >
      <_View style={styles.container}>
        <_View style={{ marginTop: 0 }}>{Icon}</_View>
        <_Text style={styles.title}>{name}</_Text>
      </_View>
    </TouchableHighlight>
  );
};

export default QuickLinkCard;

const styles = StyleSheet.create({
  btnView: {
    borderColor: whiteThemeColors.primary + '50',
    backgroundColor: whiteThemeColors.white,
    borderStyle: 'dashed',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
    borderWidth: 0.75,
    borderRadius: 8,
    height: 90,
    width: 85,
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 15,
    fontSize: 12,
    textAlign: 'center',
    color: whiteThemeColors.black,
  },
});
