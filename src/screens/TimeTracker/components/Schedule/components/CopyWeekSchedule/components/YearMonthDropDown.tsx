import { YearMonthDropdownInterface } from 'interfaces';
import React from 'react';
import { whiteThemeColors } from 'utilities';
import {
  _ModalDropdown,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../../../../components';
import { styles } from '../style';
import { DropDownRow } from './DropDownRow';
import CommonStyles from 'screens/CommonStyles';

export const YearMonthDropDown: React.FC<YearMonthDropdownInterface> = ({
  yearName,
  monthsNameList,
  monthName,
  onSelect,
}) => {
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
          item={monthsNameList}
          label={monthName}
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
            numberOfLines: 1,
            backgroundColor: whiteThemeColors.background,

            ...CommonStyles.shadow,
            fontFamily: CommonStyles.fonts.regular,
          }}
          dropdownTextStyle={{
            marginLeft: 10,
            width: '97%',
            color: whiteThemeColors.greyDark,
            fontSize: 13,
            fontFamily: CommonStyles.fonts.regular,
          }}
          textStyle={[
            {
              color: whiteThemeColors.greyDark,
              fontFamily: CommonStyles.fonts.regular,
              fontSize: 13,
              width: '97%',
            },
          ]}
          defaultTextStyle={{
            color: whiteThemeColors.greyDark,
            fontSize: 13,
            fontFamily: CommonStyles.fonts.regular,
            width: '97%',
          }}
          onselected={(index: string) => onSelect(index)}
          isborder={false}
          isRow
          isdisable={false}
          renderRow={(option: any, index: number, isSelected: boolean) => (
            <DropDownRow isSelected={isSelected} option={option} />
          )}
        />
      </_View>
    </_View>
  );
};
