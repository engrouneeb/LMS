import { ScheduleAddTimeApplyItemDropDownInterface } from 'interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import {
  _ModalDropdown,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../../../../components';
import CommonStyles from '../../../../../../CommonStyles';

export const ApplyItemDropdown: React.FC<
  ScheduleAddTimeApplyItemDropDownInterface
> = ({ data, isEdit, selectedItem, onValueChange }) => {
  var option = data.map((data: any) => {
    return data.lable;
  });
  return (
    <_View style={styles.container}>
      <_View style={styles.labelTxtContainer}>
        <_Text style={styles.headText}>Apply for item</_Text>
      </_View>
      <_View style={styles.dropDownContainer}>
        <_ModalDropdown
          isdisable={option?.length === 0}
          item={option}
          style={{
            paddingLeft: 5,
          }}
          label={isEdit ? selectedItem : 'Select item..'}
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
          onselected={(index) => {
            onValueChange(index);
          }}
          isborder={false}
          renderRow={(option: any) => {
            return (
              <_View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  marginBottom: 5,
                  alignItems: 'center',
                }}
              >
                <_Text
                  style={{
                    color: whiteThemeColors.lightBlack,
                    paddingLeft: 5,
                    fontSize: 16,
                  }}
                >
                  {option}
                </_Text>
              </_View>
            );
          }}
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
  padding10: {
    padding: 10,
  },
});
