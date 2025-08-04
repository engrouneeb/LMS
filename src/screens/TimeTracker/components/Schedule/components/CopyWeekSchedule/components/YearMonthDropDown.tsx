import React from 'react';
import {YearMonthDropdownInterface} from '../../../../../../../interfaces';
import {whiteThemeColors} from '../../../../../../../Utilities';
import {_Text, _View, _ModalDropdown} from '../../../../../../../components';
import {styles} from '../style';
import {DropDownRow} from './DropDownRow';
import CommonStyles from '../../../../../../../screens/CommonStyles';

export const YearMonthDropDown: React.FC<YearMonthDropdownInterface> = ({
  yearName,
  monthsNameList,
  monthName,
  onSelect,
}) => {
  const formattedMonths = monthsNameList.map((month, index) => ({
    label: String(month),
    value: index,
  }));

  const selectedValue = formattedMonths.find(
    item => item.label === monthName,
  )?.value;

  return (
    <_View style={styles.yeadMonthsDDContainer}>
      <_View style={styles.monthContainer}>
        <_Text style={styles.yearText}>
          Year
          <_Text style={styles.yearNameText}>{`  ${yearName}`}</_Text>
        </_Text>
      </_View>

      <_View style={styles.ddSubContainer}>
        <_ModalDropdown
          item={formattedMonths}
          selectedValue={selectedValue}
          label={monthName}
          onselected={index => onSelect(index)}
          isdisable={false}
          isborder={false}
          isRow
          renderRow={(option: any, isSelected: boolean) => (
            <DropDownRow isSelected={isSelected} option={option.label} />
          )}
          style={{
            paddingLeft: 5,
            backgroundColor: whiteThemeColors.background,
            borderRadius: 10,
            width: 150,
            marginTop: 15,
          }}
          dropdownStyle={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            width: '83%',
            marginTop: 10,
            borderRadius: 20,
            backgroundColor: whiteThemeColors.background,
            ...CommonStyles.shadow,
          }}
          dropdownTextStyle={{
            marginLeft: 10,
            width: '97%',
            color: whiteThemeColors.greyDark,
            fontSize: 13,
            fontFamily: CommonStyles.fonts.regular,
          }}
          textStyle={{
            color: whiteThemeColors.greyDark,
            fontFamily: CommonStyles.fonts.regular,
            fontSize: 13,
            width: '97%',
          }}
          defaultTextStyle={{
            color: whiteThemeColors.greyDark,
            fontSize: 13,
            fontFamily: CommonStyles.fonts.regular,
            width: '97%',
          }}
        />
      </_View>
    </_View>
  );
};
