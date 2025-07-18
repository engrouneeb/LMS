import { ViewOrEditInterface } from '../../../../../../interfaces';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../Utilities';
import { _Text, _View } from '../../../../../../components';

const ViewOrEdit: FC<ViewOrEditInterface> = ({ tabName, children }) => {
  return (
    <_View style={styles.container}>
      <_View style={[styles.modalPage]}>
        <_View style={styles.modalHeader}>
          <_Text style={styles.headerText}>{tabName}</_Text>
        </_View>
        {children}
      </_View>
    </_View>
  );
};
export { ViewOrEdit };

const styles = StyleSheet.create({
  modalPage: {
    flexDirection: 'column',
    borderRadius: 20,
    paddingTop: 30,
    alignSelf: 'center',
    width: '98%',
    height: '100%',
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: whiteThemeColors.primaryTextColor,
    fontSize: 22,
    marginLeft: 15,
    letterSpacing: 4,
  },
  container: {
    backgroundColor: whiteThemeColors.white,
    width: '100%',
    height: '100%',
  },
});
