import React, {FC, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {CustomAlert, whiteThemeColors} from '../../../../../Utilities';
import {_Text, _VectorIcons, _View} from '../../../../../components';
import {StoreFlastlistHeader} from '../../../../../interfaces';
import {styles} from '../../style';

export const StoreFlatlistHeader: FC<StoreFlastlistHeader> = ({
  children,
  isUserParent,
  selectedChild,
  onValueChange,
  userTotalPoints,
  totalCartPoints,
}) => {
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [value, setValue] = useState(selectedChild?.name || null);

  const dropdownData = children.map((child: any, index: number) => ({
    label: child.name,
    value: index.toString(),
  }));

  const onChange = (item: {label: string; value: string}) => {
    if (totalCartPoints > 0) {
      setAlertModalVisible(true);
    } else {
      setValue(item.label);
      onValueChange(item.value);
    }
  };

  return (
    <_View style={styles.flatlistHeader}>
      {isUserParent && (
        <_View style={styles.dropContainer}>
          <Dropdown
            style={[
              styles.dropdownContainer,
              {paddingHorizontal: 10, borderWidth: 1, borderRadius: 8},
            ]}
            containerStyle={{borderRadius: 8}}
            data={dropdownData}
            labelField="label"
            valueField="value"
            value={value}
            placeholder="Select Child"
            placeholderStyle={{color: 'gray'}}
            selectedTextStyle={styles.defaultTextStyle}
            itemTextStyle={styles.dropdownTextStyle}
            onChange={onChange}
            renderRightIcon={() => (
              <_VectorIcons
                type="Feather"
                name="chevron-down"
                size={20}
                color={whiteThemeColors.primary}
              />
            )}
          />

          {alertModalVisible && (
            <CustomAlert
              visible={alertModalVisible}
              title="Error"
              msg="Kindly Remove items from cart to change student"
              firstBtn="Okay"
              firstBtnFunc={() => setAlertModalVisible(false)}
            />
          )}
        </_View>
      )}

      <_View style={styles.cartView2}>
        <_VectorIcons
          type="MaterialIcons"
          name="stars"
          color={whiteThemeColors.primary}
          size={20}
        />
        <_Text style={styles.balanceText}>
          {` Balance Points: ${userTotalPoints}`}
        </_Text>
      </_View>
    </_View>
  );
};
