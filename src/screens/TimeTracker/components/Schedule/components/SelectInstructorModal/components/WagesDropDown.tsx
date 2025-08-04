import { SelectInstructorModalWagesDropDownInterface } from '../../../../../../../interfaces';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Text, _View, _VectorIcons } from '../../../../../../../components';
import CommonStyles from '../../../../../../../screens/CommonStyles';
import {
  _ModalDropdown,
} from '../../../../../../../components';
const DropdownArrowIcon = () => (
  <_View style={styles.dropdownArrowContainer}>
    <_VectorIcons
      type={'Feather'}
      name={'chevron-down'}
      size={25}
      color={whiteThemeColors.black}
      style={{}}
    />
  </_View>
);

const DropdownItem = (option: string) => {
  return (
    <_View style={styles.dropContainer}>
      <_Text style={styles.dropdownText}>{option}</_Text>
    </_View>
  );
};

export const WagesDropDown: FC<SelectInstructorModalWagesDropDownInterface> = ({
  show,
  data,
  onValueChange,
}) => {
  const handleOnSelect = (index: number) => {
    onValueChange(+index);
  };
  return show ? (
    <_View style={styles.container}>
      <_View style={styles.subContainer}>
        <_ModalDropdown
          showsVerticalScrollIndicator={false}
          options={data}
          defaultValue={'Select a Wage'}
          style={styles.dropdownStrip}
          dropdownStyle={[styles.dropdownListContainer]}
          defaultTextStyle={styles.dropdownDefaultTxtStyle}
          textStyle={styles.selectedItemTxtStyle}
          onSelect={handleOnSelect}
          renderRow={DropdownItem}
          renderRightComponent={DropdownArrowIcon}
        />
      </_View>
    </_View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    height: 30,
    marginVertical: 10,
  },
  subContainer: {
    height: 40,
    width: '100%',
    borderRadius: 5,
    backgroundColor: whiteThemeColors.white,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dropdownListContainer: {
    width: '83%',
    marginTop: 15,
    borderRadius: 10,
  },
  dropdownStrip: {
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  dropdownDefaultTxtStyle: {
    width: '100%',
  },
  selectedItemTxtStyle: {
    paddingLeft: 15,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  dropContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dropdownText: {
    fontSize: 15,
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  dropdownArrowContainer: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
  },
});
