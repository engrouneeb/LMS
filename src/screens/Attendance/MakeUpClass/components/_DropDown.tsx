import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../Utilities';
import { _DropDownProps, _ModalDropdown,  _Text, _View, } from '../../../../components';

export const _DropDown: FC<_DropDownProps> = ({
  _options,
  _defaultValue,
  _onSelect,
  _selectedValue,
}) => {
  return (
    <><_ModalDropdown
      item={_options}
      label={_selectedValue != undefined && _selectedValue >= 0
        ? _options[+_selectedValue]
        : _defaultValue}
      isdisable={false}
      isborder={false}
      style={styles.dropDownContainer}
      dropdownStyle={[styles.dropdownStyle]}
      dropdownTextStyle={styles.dropDownTxt}
      onselected={_onSelect}
      textStyle={{ color: whiteThemeColors.black, fontSize: 13 }} /><_View><_Text>Drop Down</_Text></_View></>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    width: '95%',
    height: -1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dropdownStyle: {
    width: '83%',
    marginTop: 10,
    borderRadius: 10,
    numberOfLines: 1,
  },
  dropDownTxt: {
    marginLeft: 5,
    width: '90%',
    color: whiteThemeColors.black,
    fontSize: 13,
  },
});
