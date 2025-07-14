import { TouchableOpacity, Text } from 'react-native';
import React, { FC } from 'react';
import { styles } from '../../style';
import { _View, _Text, _VectorIcons } from '../../../../../components';
import { whiteThemeColors } from 'utilities';
import { CartFloatingButtonInterface } from '../../../../../interfaces';

export const CartFloatingButton: FC<CartFloatingButtonInterface> = ({
  onProceedToPayment,
  totalCartCost,
  totalCartPoints,
}) => {
  return (
    <_View style={styles.cartContainer}>
      <TouchableOpacity style={styles.cartView} onPress={onProceedToPayment}>
        {totalCartCost >= 1 ? (
          <>
            <_VectorIcons
              type='FontAwesome5'
              name='dollar-sign'
              style={{ marginLeft: 4 }}
              color={whiteThemeColors.white}
              size={13}
            />
            <_Text style={styles.cartText}>{`${
              Math.round(totalCartCost * 10) / 10
            }`}</_Text>
          </>
        ) : null}
        {totalCartPoints >= 1 ? (
          <>
            <_VectorIcons
              type='MaterialIcons'
              name='stars'
              color={whiteThemeColors.white}
              size={15}
              style={{ marginLeft: 10 }}
            />
            <Text style={styles.cartText}>{totalCartPoints}</Text>
          </>
        ) : null}
        <_VectorIcons
          type='Entypo'
          name='shopping-cart'
          color={whiteThemeColors.white}
          size={20}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    </_View>
  );
};
