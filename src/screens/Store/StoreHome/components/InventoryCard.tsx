import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'navigation';
import React, { FC, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import ActionButton from 'react-native-action-button';
import { CustomAlert, whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../components';
import { ActionMenu } from './ActionMenu';
import { PaymentOptionsModal } from './PaymentOptionsModal';
import { InventoryCardInterface } from '../../../../interfaces';

export const InventoryCard: FC<InventoryCardInterface> = ({
  data,
  onPressAddtoCart,
  allCategories,
  cartItems,
  deleteInventory,
  isUserParent,
  isUserStudent,
  activeTab,
  setFlag,
  flag,
  getAllInventories,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentOptionsModal, setPaymentOptionsModal] =
    useState<boolean>(false);
  let inCartItem: any = cartItems?.find((x) => x.id === data.id);
  const navigation = useNavigation<NavigationProps>();
  const [alertTitle, setAlertTitle] = useState<string>('');
  const [alertMsg, setAlertMsg] = useState<string>('');
  const onCartIcon = () => {
    setFlag(!flag);
    {
      isUserParent || isUserStudent
        ? setPaymentOptionsModal(true)
        : onPressAddtoCart();
    }
  };
  const onPressEdit = () => {
    navigation.navigate('store-add-new-item', {
      Id: data?.inventoryId,
      allCategories: allCategories,
      isEditing: true,
      getAllInventories: getAllInventories,
    });
  };

  const deletionAlert = () => {
    //?alert msg in case of need === 'You have already added item(s) in cart from previous category,Please remove or pay for those item(s) to proceed.'
    setModalVisible(true);
    setAlertTitle('warning');
    setAlertMsg('Are you sure you want to delete this item?');
  };

  return (
    <_View style={styles.parentContainer}>
      {!isUserParent && !isUserStudent ? (
        <_View style={styles.container}>
          <_View style={styles.adminCard}>
            <_View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <_View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <_Text style={styles.titleText}>ID</_Text>
                <_Text style={[styles.valueText, { marginLeft: 5 }]}>
                  {data?.id}
                </_Text>
              </_View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#f1f1f1',
                  width: 100,
                  height: 30,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}
                onPress={() =>
                  navigation.navigate('add-redeem-code-screen', {
                    inventoryitem: data,
                  })
                }
              >
                <_Text
                  style={[
                    styles.valueText,
                    { color: whiteThemeColors.primary },
                  ]}
                >
                  Add Redeem Code
                </_Text>
              </TouchableOpacity>
            </_View>
            <_View style={{ marginTop: 10, flexDirection: 'row' }}>
              <_View>
                <_Text style={styles.titleText}>Name</_Text>
                <_Text style={styles.nameText}>{data?.inventory}</_Text>
              </_View>
            </_View>
            <_View style={{ marginTop: 3, flexDirection: 'row' }}>
              <_Text style={styles.titleText}>Cost</_Text>
              <_Text style={{ ...styles.valueText, marginLeft: 5 }}>
                {`$${data.cost || 0}`}
              </_Text>
            </_View>
            <_View style={{ flexDirection: 'row', marginTop: 3 }}>
              <_Text style={styles.titleText}>{`Achieve Points Cost`}</_Text>
              <_Text style={{ ...styles.valueText, marginLeft: 5 }}>
                {data?.achivePointsCost || 0}
              </_Text>
            </_View>

            <_View style={{}}>
              <_View style={{ marginTop: 5, flexDirection: 'row' }}>
                <_Text style={styles.titleText}>Available Items</_Text>
                <_Text style={{ ...styles.valueText, marginLeft: 5 }}>
                  {data?.available || 'No Items'}
                </_Text>
              </_View>
              <_View style={{ marginTop: 3, flexDirection: 'row' }}>
                <_Text style={styles.titleText}>Category </_Text>
                <_Text style={styles.valueText}>
                  {activeTab || 'No Category'}
                </_Text>
              </_View>
              {/* {data?.redeemCode != null && (
                <_View style={{ marginTop: 3, flexDirection: 'row' }}>
                  <_Text style={styles.titleText}>Redeem Code </_Text>
                  <_Text style={styles.valueText}>{data?.redeemCode}</_Text>
                </_View>
              )} */}
            </_View>
          </_View>
          <_View
            style={{
              ...styles.costContainer,
              elevation: data?.imageURL == null ? 0 : 5,
            }}
          >
            {data?.imageURL !== null ? (
              <Image
                source={{ uri: data?.imageURL, cache: 'force-cache' }}
                style={styles.itemImage}
              />
            ) : (
              <_VectorIcons
                type={'MaterialCommunityIcons'}
                name='store-outline'
                size={55}
              />
            )}
            <ActionMenu onDelete={() => deletionAlert()} onEdit={onPressEdit} />
          </_View>
        </_View>
      ) : (
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
              paddingVertical: 10,
              flex: 0.6,
            }}
          >
            <_View style={{ flexDirection: 'row' }}>
              <_Text style={styles.titleText}>ID</_Text>
              <_Text style={[styles.valueText, { marginLeft: 5 }]}>
                {data.id}
              </_Text>
            </_View>
            <_View style={{ marginTop: 5 }}>
              <_Text style={styles.titleText}>Name</_Text>
              <_Text style={styles.nameText}>{data.inventory}</_Text>
            </_View>
            <_View style={{ marginTop: 5, flexDirection: 'row' }}>
              <_Text style={styles.titleText}>Cost</_Text>
              <_Text style={{ ...styles.valueText, marginLeft: 5 }}>
                {`$${data.cost || 0}`}
              </_Text>
            </_View>
            <_View style={{ marginTop: 5, flexDirection: 'row' }}>
              <_Text style={[styles.titleText, {}]}>Achieve Points Cost</_Text>
              <_Text style={{ ...styles.valueText, marginLeft: 5 }}>
                {data?.achivePointsCost || 0}
              </_Text>
            </_View>
            <_View style={{ justifyContent: 'space-between' }}>
              <_View style={{ marginTop: 5, flexDirection: 'row' }}>
                <_Text style={styles.titleText}>Category </_Text>
                <_Text style={{ ...styles.valueText, marginLeft: 5 }}>
                  {activeTab || 'No Category'}
                </_Text>
              </_View>
              <_View style={{ marginTop: 5, flexDirection: 'row' }}>
                <_Text style={styles.titleText}>Available Items</_Text>
                <_Text style={[styles.valueText, { marginLeft: 5 }]}>
                  {data?.available || 'No Items'}
                </_Text>
              </_View>
              {data?.redeemCode != null && (
                <_View
                  style={{
                    paddingVertical: 8,
                    marginTop: 3,
                    width: '90%',
                    paddingHorizontal: 5,
                    borderRadius: 3,
                    backgroundColor: '#d4af37',
                  }}
                >
                  <_View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <_VectorIcons
                      type={'MaterialIcons'}
                      name='card-giftcard'
                      color={whiteThemeColors.white}
                      size={17}
                    />
                    <_Text
                      style={[
                        {
                          color: whiteThemeColors.white,
                          fontSize: 11,
                          fontWeight: '500',
                          marginLeft: 5,
                          marginTop: 2,
                        },
                      ]}
                    >
                      Redeem Code{' '}
                    </_Text>
                    <_Text
                      numberOfLines={1}
                      style={{
                        color: whiteThemeColors.white,
                        fontSize: 12,
                        marginTop: 1.2,
                        fontWeight: '700',
                      }}
                    >
                      {data?.redeemCode}
                    </_Text>
                  </_View>
                </_View>
              )}
            </_View>
            {inCartItem?.ordered_Quantity > 0 && (
              <_View style={{ flexDirection: 'row' }}>
                <_View style={styles.inCartView}>
                  <_VectorIcons
                    type={'Entypo'}
                    name='shopping-cart'
                    size={15}
                  />
                  <_Text
                    style={{
                      ...styles.valueText,
                      textAlign: 'center',
                      color: whiteThemeColors.white,
                      marginLeft: 6,
                    }}
                  >
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
                      <_Text
                        style={{
                          ...styles.valueText,
                          textAlign: 'center',
                          color: whiteThemeColors.white,
                          marginLeft: 5,
                        }}
                      >
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
                      <_VectorIcons
                        type={'MaterialIcons'}
                        name='stars'
                        size={13}
                      />
                      <_Text
                        style={{
                          ...styles.valueText,
                          textAlign: 'center',
                          color: whiteThemeColors.white,
                          marginLeft: 5,
                        }}
                      >
                        {data?.totalAcheivementPointsCost}
                      </_Text>
                    </_View>
                  )}
              </_View>
            )}
          </_View>
          <TouchableOpacity
            onPress={onCartIcon}
            style={styles.cartIconContainer}
          >
            <_VectorIcons
              type={'Entypo'}
              name='shopping-cart'
              size={14}
              style={{ padding: 8 }}
            />
          </TouchableOpacity>
          {/* <_View style={{ zIndex: 1, position: 'absolute', right: 30, top: 1 }}> */}
          <ActionButton
            size={30}
            position={'right'}
            verticalOrientation={'down'}
            degrees={180}
            buttonColor={whiteThemeColors.primary}
            style={{
              marginTop: -18,
              marginRight: -20,
              elevation: 10,
              zIndex: 10,
            }}
            useNativeFeedback={false}
            spacing={10}
            renderIcon={() => (
              <_VectorIcons
                type={'Entypo'}
                name='dots-three-vertical'
                size={14}
              />
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
          {/* </_View> */}
          <_View
            style={{
              ...styles.costContainer,
              elevation: data.imageURL == null ? 0 : 5,
            }}
          >
            {data?.imageURL !== null ? (
              <Image
                source={{ uri: data?.imageURL }}
                style={styles.itemImage}
              />
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
      )}
      {modalVisible && (
        <CustomAlert
          visible={modalVisible}
          title={alertTitle}
          msg={alertMsg}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            deleteInventory();
            setModalVisible(false);
          }}
          secondBtn={'Cancel'}
          secondBtnFunc={() => {
            setModalVisible(false);
          }}
        />
      )}
    </_View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    justifyContent: 'center',
    paddingBottom: 10,
    flex: 1,
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: whiteThemeColors.white,
    marginHorizontal: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 0.4,
  },
  titleText: {
    fontSize: 10,
    color: 'gray',
  },
  valueText: {
    fontSize: 10,
  },
  nameText: {
    fontSize: 17,
  },
  costContainer: {
    height: '85%',
    borderRadius: 5,
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 10,
    flex: 0.45,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cartIconContainer: {
    backgroundColor: '#08a6a3',
    borderRadius: 16,
    position: 'absolute',
    zIndex: 5,
    right: 10,
    bottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inCartView: {
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor: whiteThemeColors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: '100%',
    height: '110%',
    borderRadius: 5,
  },
  adminCard: {
    marginLeft: 10,
    justifyContent: 'center',
    paddingVertical: 10,
    flex: 0.6,
  },
  redemcode: {
    width: 90,
    height: 20,
    backgroundColor: '#f3f3f3',
    // position: 'absolute',
    // right: 10,
    // top: -5,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
});
