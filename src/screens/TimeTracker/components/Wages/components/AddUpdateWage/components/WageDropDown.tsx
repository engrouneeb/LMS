import { WagesWageDropDownInterface } from 'interfaces';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';
import ModalDropdown from 'react-native-modal-dropdown';
import CommonStyles from 'screens/CommonStyles';

export const WageDropDown: React.FC<WagesWageDropDownInterface> = ({
  heading,
  options,
  defaultValue,
  onSelect,
  disabled = false,
  type,
}) => {
  const isUpdate = useCallback(() => type === 'update wage', []);

  const DropDownIcon = useCallback(
    () => (
      <_VectorIcons
        type={'Feather'}
        name={'chevron-down'}
        size={25}
        color={whiteThemeColors.primary}
      />
    ),
    []
  );

  const DropDownRow = useCallback((option: any) => {
    return (
      <_View style={styles.rowContainer}>
        <_Text style={styles.rowTxt}>{option}</_Text>
      </_View>
    );
  }, []);

  return (
    <_View style={styles.miniContainer}>
      <_View style={styles.titleContainer}>
        <_Text style={styles.titleTxt}>{heading}</_Text>
      </_View>
      <_View style={styles.dataCapturingContainer}>
        <_View style={[styles.styledContainer]}>
          <_View style={styles.dropdownContainer}>
            <ModalDropdown
              showsVerticalScrollIndicator={false}
              disabled={disabled}
              options={options}
              defaultValue={defaultValue}
              dropdownTextStyle={styles.dropdownTextStyle}
              dropdownStyle={styles.dropdownStyle}
              defaultTextStyle={[
                {
                  color: isUpdate()
                    ? whiteThemeColors.black
                    : whiteThemeColors.greyDark,
                },
              ]}
              onSelect={(index: number) => onSelect(index)}
              textStyle={styles.textStyle}
              renderRow={DropDownRow}
              renderRightComponent={DropDownIcon}
            />
          </_View>
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
    backgroundColor: whiteThemeColors.primary + 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    height: 40,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dropdownTextStyle: {
    width: '70%',
  },
  dropdownStyle: {
    width: '85%',
    height: -1,
    marginTop: 13,
    borderRadius: 10,
    paddingVertical: 10,
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
  },
});
