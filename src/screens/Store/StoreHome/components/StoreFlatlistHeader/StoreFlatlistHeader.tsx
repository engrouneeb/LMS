import React, { FC, useState } from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import { CustomAlert, whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../components';
import { StoreFlastlistHeader } from '../../../../../interfaces';
import { styles } from '../../style';

export const StoreFlatlistHeader: FC<StoreFlastlistHeader> = ({
  children,
  isUserParent,
  selectedChild,
  onValueChange,
  userTotalPoints,
  totalCartPoints,
}) => {
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const onPress = (val: string) => {
    totalCartPoints > 0 ? setAlertModalVisible(true) : onValueChange(val);
  };

  return (
    <_View style={styles.flatlistHeader}>
      {isUserParent && (
        <_View style={styles.dropContainer}>
          <ModalDropdown
            defaultIndex={0}
            showsVerticalScrollIndicator={false}
            options={children.map((item: any) => item.name)}
            defaultValue={children[0]?.name || 'Select Child'}
            style={styles.dropdownContainer}
            dropdownTextStyle={styles.dropdownTextStyle}
            dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
            dropdownStyle={styles._dropdownStyle}
            defaultTextStyle={styles.defaultTextStyle}
            onSelect={(index: string) => onPress(index)}
            textStyle={styles._textStyle}
            renderRow={(rowData: string) => (
              <_View style={styles.rowContainer}>
                <_Text style={styles.rowTxt}>{rowData}</_Text>
              </_View>
            )}
            renderRightComponent={() => (
              <_VectorIcons
                type={'Feather'}
                name={'chevron-down'}
                size={25}
                color={whiteThemeColors.primary}
                style={{}}
              />
            )}
          />

          {alertModalVisible && (
            <CustomAlert
              visible={alertModalVisible}
              title={'Error'}
              msg={'Kindly Remove items from cart to change student'}
              firstBtn={'Okay'}
              firstBtnFunc={() => {
                setAlertModalVisible(false);
              }}
            />
          )}
        </_View>
      )}
      <_View style={styles.cartView2}>
        <_VectorIcons
          type='MaterialIcons'
          name='stars'
          color={whiteThemeColors.primary}
          size={20}
        />
        <_Text
          style={styles.balanceText}
        >{` Balance Points: ${userTotalPoints}`}</_Text>
      </_View>
    </_View>
  );
};
