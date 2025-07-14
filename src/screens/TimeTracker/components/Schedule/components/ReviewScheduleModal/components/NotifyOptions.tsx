import { ReviewScheduleModalNotifyOptionsInterface } from 'interfaces';
import React, { Fragment } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';
import CommonStyles from 'screens/CommonStyles';

export const NotifyOptions: React.FC<
  ReviewScheduleModalNotifyOptionsInterface
> = ({ typeLists, onPress, selectedItem }) => {
  return (
    <Fragment>
      <_Text style={styles.titleText}>Notify</_Text>

      <_View style={styles.notifyListContainer}>
        {typeLists.map((item, index) => (
          <_View>
            <TouchableOpacity
              onPress={() => onPress(index, item)}
              style={styles.optionsContainer}
            >
              <_VectorIcons
                name={
                  selectedItem?.Value == item.Value
                    ? 'radio-button-checked'
                    : 'radio-button-unchecked'
                }
                type='MaterialIcons'
                size={18}
                color={
                  selectedItem?.Value == item.Value
                    ? whiteThemeColors.primary
                    : whiteThemeColors.black
                }
              />
              <_Text
                numberOfLines={3}
                style={[
                  selectedItem?.Value == item.Value
                    ? styles.optionsTextForSelected
                    : styles.optionsText,
                ]}
              >
                {item.Text}
              </_Text>
            </TouchableOpacity>
            {index !== typeLists.length - 1 && (
              <_View
                style={{
                  width: '90%',
                  height: 0.3,
                  backgroundColor: whiteThemeColors.greyDark,
                  alignSelf: 'center',
                }}
              />
            )}
          </_View>
        ))}
      </_View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 14,
    color: whiteThemeColors.black,
    marginVertical: 10,
    marginLeft: 5,
    fontFamily: CommonStyles.fonts.bold,
  },
  optionsContainer: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: whiteThemeColors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',

    paddingHorizontal: 20,
  },
  optionsText: {
    color: whiteThemeColors.black,
    paddingLeft: 5,
    fontFamily: CommonStyles.fonts.regular,
    textAlign: 'left',
    fontSize: 12,
  },
  optionsTextForSelected: {
    color: whiteThemeColors.primary,
    paddingLeft: 5,
    fontFamily: CommonStyles.fonts.semiBold,
    textAlign: 'left',
    fontSize: 13,
  },
  notifyListContainer: {
    width: '100%',
    height: '40%',
    backgroundColor: whiteThemeColors.white,
    justifyContent: 'center',
    borderRadius: 5,
  },
});
