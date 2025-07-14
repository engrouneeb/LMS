import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import {
  _TextInput,
  _VectorIcons,
  _View,
} from '../../../../../../../components';
import { whiteThemeColors } from 'utilities';
import { SelectInstructorModalSearchInptInterface } from 'interfaces';

export const SearchTextInput: FC<SelectInstructorModalSearchInptInterface> = ({
  setSearchName,
}) => {
  return (
    <_View style={styles.searchBox}>
      <_VectorIcons
        type={'AntDesign'}
        name='search1'
        size={20}
        color={whiteThemeColors.black}
        style={styles.iconStyle}
      />
      <_TextInput
        onChangeText={(text) => setSearchName(text)}
        placeholder='Search'
      />
    </_View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: whiteThemeColors.greyDark + 30,
    width: '95%',
    height: 50,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconStyle: {
    padding: 10,
  },
});
