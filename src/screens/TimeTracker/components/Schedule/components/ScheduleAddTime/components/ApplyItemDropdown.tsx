import {ScheduleAddTimeApplyItemDropDownInterface} from '../../../../../../../interfaces';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {whiteThemeColors} from '../../../../../../../Utilities';
import {_ModalDropdown, _Text, _View} from '../../../../../../../components';
import CommonStyles from '../../../../../../CommonStyles';

export const ApplyItemDropdown: React.FC<
  ScheduleAddTimeApplyItemDropDownInterface
> = ({data, isEdit, selectedItem, onValueChange}) => {
  const option = data.map((item, index) => ({
    label: item.lable,
    value: index,
  }));

  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  useEffect(() => {
    if (isEdit && selectedItem) {
      const index = data.findIndex(item => item.lable === selectedItem);
      setSelectedValue(index !== -1 ? index : null);
    }
  }, [isEdit, selectedItem]);

  return (
    <_View style={styles.container}>
      <_View style={styles.labelTxtContainer}>
        <_Text style={styles.headText}>Apply for item</_Text>
      </_View>
      <_View style={styles.dropDownContainer}>
        <_ModalDropdown
          isdisable={option.length === 0}
          item={option}
          selectedValue={selectedValue}
          label={
            selectedValue !== null
              ? option[selectedValue]?.label
              : 'Select item..'
          }
          onselected={(index: number) => {
            setSelectedValue(index);
            onValueChange(index); 
          }}
          style={{paddingLeft: 5}}
          dropdownStyle={{
            width: '83%',
            marginTop: 10,
            borderRadius: 10,
            numberOfLines: 1,
            padding: 20,
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
          isborder={false}
          renderRow={(option: any) => (
            <_View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                marginBottom: 5,
                alignItems: 'center',
              }}>
              <_Text
                style={{
                  color: whiteThemeColors.lightBlack,
                  paddingLeft: 5,
                  fontSize: 16,
                }}>
                {option.label}
              </_Text>
            </_View>
          )}
        />
      </_View>
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  labelTxtContainer: {
    paddingHorizontal: 5,
  },
  headText: {
    color: whiteThemeColors.primary,
    fontSize: 14,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: whiteThemeColors.greyDark,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 5,
    height: 55,
  },
});
