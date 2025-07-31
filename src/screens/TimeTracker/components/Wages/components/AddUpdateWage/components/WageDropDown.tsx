import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {whiteThemeColors} from '../../../../../../../Utilities';
import {_Text, _VectorIcons, _View} from '../../../../../../../components';
import CommonStyles from '../../../../../../../screens/CommonStyles';
import {WagesWageDropDownInterface} from '../../../../../../../interfaces';

export const WageDropDown: React.FC<WagesWageDropDownInterface> = ({
  heading,
  options,
  defaultValue,
  onSelect,
  disabled = false,
  type,
}) => {
  const isUpdate = useCallback(() => type === 'update wage', [type]);
  const [selected, setSelected] = useState<string | null>(defaultValue ?? null);

  useEffect(() => {
    setSelected(defaultValue ?? null);
  }, [defaultValue]);

  const DropDownIcon = () => (
    <_VectorIcons
      type="Feather"
      name="chevron-down"
      size={25}
      color={whiteThemeColors.primary}
    />
  );

  const renderItem = (item: {label: string; value: string}, index: number) => {
    const isSelected = selected === item.value;
    return (
      <_View
        key={index}
        style={[
          styles.rowContainer,
        
        ]}>
        <_Text style={[styles.rowTxt, isSelected && styles.highlightText]}>
          {item.label}
        </_Text>
      </_View>
    );
  };

  return (
    <_View style={styles.miniContainer}>
      <_View style={styles.titleContainer}>
        <_Text style={styles.titleTxt}>{heading}</_Text>
      </_View>
      <_View style={styles.dataCapturingContainer}>
        <_View style={styles.styledContainer}>
          <Dropdown
            showsVerticalScrollIndicator={false}
            disable={disabled}
            data={options.map(item => ({label: item, value: item}))}
            value={selected}
            placeholder={defaultValue}
            labelField="label"
            valueField="value"
            style={styles.dropdown}
            containerStyle={styles.dropdownStyle}
            itemTextStyle={styles.dropdownTextStyle}
            selectedTextStyle={[
              styles.textStyle,
              {
                color: isUpdate()
                  ? whiteThemeColors.black
                  : whiteThemeColors.greyDark,
              },
            ]}
            placeholderStyle={[
              styles.defaultTextStyle,
              {
                color: isUpdate()
                  ? whiteThemeColors.black
                  : whiteThemeColors.greyDark,
              },
            ]}
            renderItem={renderItem}
            onChange={item => {
              setSelected(item.value);
              const index = options.indexOf(item.value);
              onSelect(index);
            }}
            renderRightIcon={DropDownIcon}
          />
        </_View>
      </_View>
    </_View>
  );
};

const styles = StyleSheet.create({
  miniContainer: {
    height: 90,
    justifyContent: 'center',
  },
  titleContainer: {
    marginLeft: 23,
    marginBottom: 5,
  },
  titleTxt: {
    fontSize: 13,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.regular,
  },
  dataCapturingContainer: {
    width: '90%',
    alignSelf: 'center',
    height: 45,
  },
  styledContainer: {
    height: 45,
    borderColor: whiteThemeColors.greyDark,
    backgroundColor: whiteThemeColors.primary + '10',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    width: '100%',
    height: 45,
    paddingHorizontal: 10,
  },
  dropdownStyle: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 13,
  },
  dropdownTextStyle: {
    width: '93%',
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 13,
    color: whiteThemeColors.black,
  },
  defaultTextStyle: {
    width: '93%',
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 12,
  },
  textStyle: {
    width: '93%',
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 13,
  },
  rowContainer: {
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 10,
  },
  rowTxt: {
    fontSize: 13,
    fontFamily: CommonStyles.fonts.regular,
    color: whiteThemeColors.black,
  },
  highlightText: {
    color: whiteThemeColors.primary,
    fontWeight: 'bold',
  },
});
