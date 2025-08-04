import { DropDownPropsInterface, optionsType } from '../../../../../../../interfaces';
import CommonStyles from '../../../../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _ModalDropdown, _Text, _View } from '../../../../../../../components';
import { StateConstants } from '../States';
import { styles } from '../style';
import { useState } from 'react';

export const ApplyForItem: React.FC<DropDownPropsInterface> = ({
  data,
  _setState,
}) => {
  const options = data.map((item: optionsType, index: number) => ({
    label: item.lable,
    value: index, 
  }));
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  return (
    <_ModalDropdown
      item={options}
      isdisable={options[0]?.label === 'No wage available'}
      label={
        selectedValue !== null
          ? options[selectedValue]?.label
          : 'Select item...'
      }
      selectedValue={selectedValue}
      height={-1}
      dropdownStyle={{
        width: '90%',
        marginTop: 2,
        borderRadius: 12,
      }}
      dropdownTextStyle={{
        marginLeft: 10,
        color: whiteThemeColors.greyDark,
        fontSize: 13,
        fontFamily: CommonStyles.fonts.regular,
      }}
      textStyle={{
        marginLeft: 10,
        color:
          selectedValue !== null
            ? whiteThemeColors.black
            : whiteThemeColors.greyDark,
        fontFamily: CommonStyles.fonts.regular,
        fontSize: 13,
      }}
      defaultTextStyle={{
        color: whiteThemeColors.greyDark,
        fontSize: 13,
        fontFamily: CommonStyles.fonts.regular,
      }}
      onselected={value => {
        setSelectedValue(value); 
        _setState(StateConstants.applyForItem, value); 
      }}
      isborder={false}
      renderRow={(item: any) => {
        return (
          <_View style={styles.modalListSingleItemContainer}>
            <_Text
              style={[
                styles.modalSingleItemTxt,
                {
                  color:
                    item.label === 'No wage available'
                      ? whiteThemeColors.greyDark
                      : whiteThemeColors.lightBlack,
                },
              ]}>
              {item.label}
            </_Text>
          </_View>
        );
      }}
    />
  );
};
