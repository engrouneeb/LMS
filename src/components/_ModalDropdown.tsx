import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {StyleSheet, Text} from 'react-native';
import {whiteThemeColors} from '../Utilities';
import {_View, _VectorIcons} from '.';

interface props {
  isdisable?: boolean;
  item?: any[];
  label?: string;
  style?: any;
  height?: number | string;
  dropdownStyle?: any;
  onselected?: (value: string | number) => void;
  textStyle?: any;
  isRow?: boolean;
  renderRow?: any;
  defaultTextStyle?: any;
  multipleSelect?: boolean;
  isborder?: boolean;
  defaultIndex?: number;
  dropdownTextStyle?: any;
  bgColor?: string;
  dropdownTextHighlightStyle?: any;
  ref?: any;
  width?: number | string;
  selectedValue?: string | number;
  showIconBackground?: boolean;
}

export const _ModalDropdown: React.FC<props> = ({
  isdisable,
  item = [],
  label,
  style, 
  height,
  dropdownStyle,
  onselected,
  textStyle,
  isRow,
  renderRow,
  defaultTextStyle,
  multipleSelect = false,
  isborder,
  defaultIndex,
  dropdownTextStyle,
  bgColor,
  dropdownTextHighlightStyle,
  width,
  selectedValue,
  showIconBackground = true,
  ref,
}) => {
  const data = item.map((option, index) => {
    if (
      typeof option === 'object' &&
      option.label &&
      option.value !== undefined
    ) {
      return option;
    }
    return {label: String(option), value: index};
  });

  const selectedItem = data.find(d => d.value === selectedValue) || null;

  return (
    <_View
      style={{
        height: 40,
        width: '100%',
        borderRadius: 5,
        backgroundColor: bgColor ? bgColor : whiteThemeColors.white,
        alignSelf: 'center',
        borderWidth: isborder ? 0.5 : undefined,
        borderColor: whiteThemeColors.greyLite,
        justifyContent: 'center',
      }}>
      <Dropdown
        ref={ref}
        data={data}
        disable={isdisable}
        labelField="label"
        valueField="value"
        value={selectedItem?.value}
        placeholder={label}
        style={[styles.dropdown, textStyle]}
        placeholderStyle={[styles.placeholderStyle, defaultTextStyle]}
        selectedTextStyle={[styles.selectedTextStyle, textStyle]}
        containerStyle={[styles.dropdownContainer, dropdownStyle, {height}]}
        itemTextStyle={[styles.itemTextStyle, dropdownTextStyle]}
        activeColor={whiteThemeColors.greyLight}
        onChange={item => onselected?.(item.value)}
        renderRightIcon={() =>
          showIconBackground ? (
            <_View style={styles.iconContainer}>
              <_VectorIcons
                type="Feather"
                name="chevron-down"
                size={25}
                color={whiteThemeColors.black}
              />
            </_View>
          ) : (
            <_VectorIcons
              type="Feather"
              name="chevron-down"
              size={25}
              color={whiteThemeColors.black}
            />
          )
        }
        renderItem={(item, selected) =>
          isRow && renderRow ? (
            renderRow(item, selected)
          ) : (
            <_View
              style={[
                styles.dropdownItemContainer,
                selected && styles.dropdownHighlightStyle, // Apply your highlight style here
              ]}>
              <Text
                style={[
                  styles.dropdownItemText,
                  selected && styles.dropdownItemTextHighlight, // Apply white color here
                ]}>
                {item.label}
              </Text>
            </_View>
          )
        }
      />
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    height: '100%',
    paddingHorizontal: 16,
  },
  dropdownItemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownHighlightStyle: {
    backgroundColor: whiteThemeColors.primary + 'c0',
    color: whiteThemeColors.white,
    textAlign: 'justify',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderStyle: {
    color: whiteThemeColors.greyDark,
  },
  selectedTextStyle: {
    color: whiteThemeColors.white,
  },
  dropdownContainer: {
    borderRadius: 5,
    marginTop: 8,
    backgroundColor: whiteThemeColors.white,
  },
  itemTextStyle: {
    color: whiteThemeColors.black,
  },
  itemContainer: {
    padding: 16,
  },
  itemText: {
    color: whiteThemeColors.black,
  },

  iconContainer: {
    width: 51,
    height: 45,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -16,
  },
  dropdownItemTextHighlight: {
    color: whiteThemeColors.white,
    textAlign: 'justify',
  },
});
