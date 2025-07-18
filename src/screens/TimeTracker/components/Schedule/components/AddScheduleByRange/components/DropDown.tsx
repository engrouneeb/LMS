import { DropDownPropsInterface, optionsType } from '../../../../../../../interfaces';
import CommonStyles from '../../../../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _ModalDropdown, _Text, _View } from '../../../../../../../components';
import { StateConstants } from '../States';
import { styles } from '../style';

export const ApplyForItem: React.FC<DropDownPropsInterface> = ({
  data,
  _setState,
}) => {
  var option = data.map((data: optionsType) => {
    return data.lable;
  });

  return (
    <_ModalDropdown
      item={option}
      isdisable={option[0] === 'No wage available'}
      label={'Select item...'}
      height={-1}
      dropdownStyle={{
        width: '90%',
        marginTop: 2,
        borderRadius: 12,
        numberOfLines: 1,
      }}
      dropdownTextStyle={{
        marginLeft: 10,
        width: '95%',
        color: whiteThemeColors.greyDark,
        fontSize: 13,
        fontFamily: CommonStyles.fonts.regular,
      }}
      textStyle={[
        {
          marginLeft: 10,
          color: whiteThemeColors.greyDark,
          fontFamily: CommonStyles.fonts.regular,
          fontSize: 13,
          width: '95%',
        },
      ]}
      defaultTextStyle={{
        color: whiteThemeColors.greyDark,
        fontSize: 13,
        fontFamily: CommonStyles.fonts.regular,
        width: '94%',
      }}
      onselected={(value) => _setState(StateConstants.applyForItem, value)}
      isborder={false}
      renderRow={(option: any) => {
        return (
          <_View style={styles.modalListSingleItemContainer}>
            <_Text
              style={[
                styles.modalSingleItemTxt,
                {
                  color:
                    option == 'No wage available'
                      ? whiteThemeColors.greyDark
                      : whiteThemeColors.lightBlack,
                },
              ]}
            >
              {option}
            </_Text>
          </_View>
        );
      }}
    />
  );
};
