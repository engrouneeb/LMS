import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../components';
const NoDataFound = () => {
  return (
    <_View style={styles.emptyList}>
      <_VectorIcons
        type='FontAwesome5'
        name={'clipboard-list'}
        size={60}
        color={whiteThemeColors.primary}
      />
      <_Text style={styles.statusNameText}>{'No Approvals Yet!'}</_Text>
    </_View>
  );
};

export { NoDataFound };

const styles = StyleSheet.create({
  statusNameText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginTop: 10,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
