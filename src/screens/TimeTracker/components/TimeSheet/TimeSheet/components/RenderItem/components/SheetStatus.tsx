import { TimeSheetSheetStatusInterface } from '../../../../../../../../interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../../components';
import CommonStyles from '../../../../../../../../screens/CommonStyles';

export const SheetStatus: React.FC<TimeSheetSheetStatusInterface> = ({
  status,
}) => {
  return (
    <_View style={styles.sheetStatusContainer}>
      <_VectorIcons
        type={'MaterialCommunityIcons'}
        name={'progress-check'}
        size={18}
        color={whiteThemeColors.greyDark}
      />
      <_View
        style={[
          styles.statusCont,
          {
            backgroundColor: ['Submitted', 'Approved'].includes(status)
              ? whiteThemeColors.green
              : whiteThemeColors.primary,
          },
        ]}
      >
        <_Text style={styles.detailsHeadValue}>{status}</_Text>
      </_View>
    </_View>
  );
};
const styles = StyleSheet.create({
  sheetStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  statusCont: {
    // width: '25%',
    height: 15,
    backgroundColor: 'green',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    paddingHorizontal: 10,
  },
  detailsHeadValue: {
    color: whiteThemeColors.white,
    fontSize: 10,
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
