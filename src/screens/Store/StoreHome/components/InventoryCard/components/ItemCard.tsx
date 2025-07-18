import React, { FC } from 'react';
import { styles } from '../styles';
import { whiteThemeColors } from '../../../../../../Utilities';
import ActionButton from 'react-native-action-button';
import { Image, TouchableOpacity } from 'react-native';

import { _Text, _VectorIcons, _View } from '../../../../../../components';
import { PaymentOptionsModal } from '../../PaymentOptionsModal';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../../../../navigation';
import { ItemCardProps } from '../../../../../../interfaces';

export const ItemCard: FC<ItemCardProps> = ({
  data,
  activeTab,
  inCartItem,
  onCartIcon,
  allCategories,
  onPressAddtoCart,
  getAllInventories,
  paymentOptionsModal,
  setPaymentOptionsModal,
}) => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('store-add-new-item', {
          Id: data?.inventoryId,
          allCategories: allCategories,
          isEditing: true,
          isShipmentItem: false,
          Showtab: 'form',
          getAllInventories: getAllInventories,
        });
      }}
      style={styles.container}
    >
      <_View
        style={{
          marginLeft: 10,
          justifyContent: 'center',
          padding: 10,
          flex: 0.6,
        }}
      >
        <_View style={{ flexDirection: 'row' }}>
          <_Text style={styles.titleText}>{'ID'}</_Text>
          <_Text style={[styles.valueText, { marginLeft: 5 }]}>{data.id}</_Text>
        </_View>
        <_View style={{ marginTop: 5 }}>
          <_Text style={styles.nameText}>{data.inventory}</_Text>
        </_View>
        <_View style={{ marginTop: 5, flexDirection: 'row' }}>
          <_Text style={styles.titleText}>{'Cost'}</_Text>
          <_Text style={{ ...styles.valueText, marginLeft: 5 }}>
            {`$${data.cost || 0}`}
          </_Text>
        </_View>
        <_View style={{ marginTop: 5, flexDirection: 'row' }}>
          <_Text style={[styles.titleText, {}]}>{'Achieve Points Cost'}</_Text>
          <_Text style={{ ...styles.valueText, marginLeft: 5 }}>
            {data?.achivePointsCost || 0}
          </_Text>
        </_View>
        <_View style={{ justifyContent: 'space-between' }}>
          <_View style={{ marginTop: 5, flexDirection: 'row' }}>
            <_Text style={styles.titleText}>{'Category'} </_Text>
            <_Text style={{ ...styles.valueText, marginLeft: 5 }}>
              {activeTab || 'No Category'}
            </_Text>
          </_View>
          <_View style={{ marginTop: 5, flexDirection: 'row' }}>
            <_Text style={styles.titleText}>{'Available Items'}</_Text>
            <_Text style={[styles.valueText, { marginLeft: 5 }]}>
              {data?.available || 'No Items'}
            </_Text>
          </_View>
          {data?.redeemCode != null && (
            <_View style={styles.redeemCodeContainer}>
              <_View style={styles.redeemCodeSubContainer}>
                <_VectorIcons
                  type={'MaterialIcons'}
                  name='card-giftcard'
                  color={whiteThemeColors.white}
                  size={17}
                />
                <_Text style={styles.redeemCodeTitle}>{'Redeem Code'} </_Text>
                <_Text numberOfLines={1} style={styles.redeemCode}>
                  {data?.redeemCode}
                </_Text>
              </_View>
            </_View>
          )}
        </_View>
        {inCartItem?.ordered_Quantity! > 0 && (
          <_View style={{ flexDirection: 'row' }}>
            <_View style={styles.inCartView}>
              <_VectorIcons type={'Entypo'} name='shopping-cart' size={15} />
              <_Text style={styles.quantityWithPayment}>
                {data?.quantityWithPoints == undefined
                  ? data?.quantityWithPayment
                  : data?.quantityWithPayment == undefined
                  ? data?.quantityWithPoints
                  : data.quantityWithPayment + data.quantityWithPoints}
              </_Text>
            </_View>
            {data?.totalPaymentCost !== undefined &&
              data?.totalPaymentCost > 0 && (
                <_View style={{ ...styles.inCartView, marginLeft: 5 }}>
                  <_VectorIcons
                    type={'FontAwesome5'}
                    name='dollar-sign'
                    size={13}
                  />
                  <_Text style={styles.totalPaymentCost}>
                    {`${
                      data?.totalPaymentCost !== null
                        ? Math.round(data?.totalPaymentCost * 10) / 10
                        : 0
                    }`}
                  </_Text>
                </_View>
              )}
            {data?.totalAcheivementPointsCost !== undefined &&
              data?.totalAcheivementPointsCost > 0 && (
                <_View style={{ ...styles.inCartView, marginLeft: 5 }}>
                  <_VectorIcons type={'MaterialIcons'} name='stars' size={13} />
                  <_Text style={styles.achievementPoints}>
                    {data?.totalAcheivementPointsCost}
                  </_Text>
                </_View>
              )}
          </_View>
        )}
      </_View>
      <TouchableOpacity onPress={onCartIcon} style={styles.cartIconContainer}>
        <_VectorIcons
          type={'Entypo'}
          name='shopping-cart'
          size={14}
          style={{ padding: 8 }}
        />
      </TouchableOpacity>
      <ActionButton
        size={30}
        position={'right'}
        verticalOrientation={'down'}
        degrees={180}
        buttonColor={whiteThemeColors.primary}
        style={styles.actionBtn}
        useNativeFeedback={false}
        spacing={10}
        renderIcon={() => (
          <_VectorIcons type={'Entypo'} name='dots-three-vertical' size={14} />
        )}
      >
        <ActionButton.Item
          buttonColor={'#679267'}
          useNativeFeedback={false}
          onPress={() => {
            navigation.navigate('store-add-new-item', {
              Id: data?.inventoryId,
              isEditing: true,
              isShipmentItem: false,
              Showtab: 'discussion',
            });
          }}
        >
          <_VectorIcons type={'Ionicons'} name='chatbox-ellipses' />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={'#D60265'}
          useNativeFeedback={false}
          onPress={() => {
            navigation.navigate('store-add-new-item', {
              Id: data?.inventoryId,
              isEditing: true,
              isShipmentItem: false,
              Showtab: 'attachment',
            });
          }}
        >
          <_VectorIcons type={'Ionicons'} name='attach' />
        </ActionButton.Item>
      </ActionButton>
      <_View
        style={{
          ...styles.costContainer,
          elevation: data.imageURL == null ? 0 : 5,
        }}
      >
        {data?.imageURL !== null ? (
          <Image source={{ uri: data?.imageURL }} style={styles.itemImage} />
        ) : (
          <_VectorIcons
            type={'MaterialCommunityIcons'}
            name='store-outline'
            size={55}
          />
        )}
      </_View>

      <PaymentOptionsModal
        visible={paymentOptionsModal}
        setVisible={setPaymentOptionsModal}
        onPressAddtoCart={onPressAddtoCart}
        achievePointsCost={data?.achivePointsCost}
        totalCost={data?.cost}
      />
    </TouchableOpacity>
  );
};
