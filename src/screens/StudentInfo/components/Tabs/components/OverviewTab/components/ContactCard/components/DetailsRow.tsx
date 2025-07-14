import { _Text, _View } from 'components';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';

interface DetailsRowProps {
  title: string;
  value: string;
  hideBottomBorder?: boolean;
}
const DetailsRow: FC<DetailsRowProps> = ({
  title,
  value,
  hideBottomBorder = false,
}) => {
  return (
    <_View
      style={[
        styles.detailRowContainer,
        {
          borderBottomWidth: hideBottomBorder ? 0 : StyleSheet.hairlineWidth,
        },
      ]}
    >
      <_Text style={styles.detailTitleTxt} numberOfLines={1}>
        {title}
      </_Text>
      <_Text numberOfLines={2} style={styles.detailValueTxt}>
        {value || 'N/A'}
      </_Text>
    </_View>
  );
};

export { DetailsRow };

const styles = StyleSheet.create({
  detailRowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    marginBottom: 10,
    borderColor: 'gray',
  },
  detailTitleTxt: {
    width: '40%',
    fontSize: 11,
    color: whiteThemeColors.greyDark,
    marginRight: 10,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  detailValueTxt: {
    width: '60%',
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.medium,
  },
});
