import { WagesDetailModalHeaderInterface } from '../../../../../../../interfaces';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';
import CommonStyles from '../../../../../../../screens/CommonStyles';

export const ModalHeader: React.FC<WagesDetailModalHeaderInterface> = ({
  onCloseModal,
}) => {
  return (
    <_View style={styles.headerContainer}>
      <_Text style={styles.headText}>Wage Details</_Text>
      <TouchableOpacity onPress={onCloseModal} style={styles.crossIcon}>
        <_VectorIcons
          type={'Entypo'}
          name='cross'
          size={15}
          color={whiteThemeColors.black}
          style={{ padding: 5 }}
        />
      </TouchableOpacity>
    </_View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  headText: {
    color: whiteThemeColors.black,
    fontSize: 18,
    fontFamily: CommonStyles.fonts.semiBold,
    // textAlign: 'center',
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.white,
    borderRadius: 10,
    zIndex: 10,
    marginRight: 15,
    marginTop: 10,
    position: 'absolute',
    right: 10,
  },
});
