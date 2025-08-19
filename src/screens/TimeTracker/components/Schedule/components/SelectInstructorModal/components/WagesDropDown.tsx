import {SelectInstructorModalWagesDropDownInterface} from '../../../../../../../interfaces';
import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {whiteThemeColors} from '../../../../../../../Utilities';
import {_Text, _View, _VectorIcons} from '../../../../../../../components';
import CommonStyles from '../../../../../../../screens/CommonStyles';
import {Dropdown} from 'react-native-element-dropdown';

const DropdownArrowIcon = () => (
  <_View style={styles.dropdownArrowContainer}>
    <_VectorIcons
      type={'Feather'}
      name={'chevron-down'}
      size={25}
      color={whiteThemeColors.black}
    />
  </_View>
);

const DropdownItem = (item: {label: string; value: string | number}) => {
  return (
    <_View style={styles.dropContainer}>
      <_Text style={styles.dropdownText}>{item.label}</_Text>
    </_View>
  );
};

export const WagesDropDown: FC<SelectInstructorModalWagesDropDownInterface> = ({
  show,
  data,
  onValueChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const dropdownData = data.map((item, index) => ({
    label: item,
    value: index.toString(),
  }));

  const handleOnSelect = (item: {label: string; value: string}) => {
    setSelectedValue(item.value);
    onValueChange(+item.value);
  };

  return show ? (
    <_View style={styles.container}>
      <_View style={styles.subContainer}>
        <Dropdown
          data={dropdownData}
          labelField="label"
          valueField="value"
          value={selectedValue}
          placeholder="Select a Wage"
          style={styles.dropdownStrip}
          placeholderStyle={styles.dropdownDefaultTxtStyle}
          selectedTextStyle={styles.selectedItemTxtStyle}
          containerStyle={styles.dropdownListContainer}
          itemTextStyle={styles.dropdownText}
          onChange={handleOnSelect}
          renderRightIcon={DropdownArrowIcon}
          renderItem={DropdownItem}
          showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 16,
  },
  dropdownDefaultTxtStyle: {
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.semiBold,
    paddingLeft: 15,
  },
  selectedItemTxtStyle: {
    paddingLeft: 15,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.black,
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
