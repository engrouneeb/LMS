import React, { FC, useEffect, useState } from 'react';
import {
  Modal,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { CustomAlert, payWith, whiteThemeColors } from 'utilities';
import {
  _Text,
  _View,
  _Button,
  _TextInput,
  _VectorIcons,
} from '../../../../../components';
import { styles } from './styles';
import { AddToCardModalInterface } from '../../../../../interfaces';

type Item = {
  id?: number;
  isPayment?: boolean;
  quantityWithPayment?: number;
  quantityWithPoints?: number;
};
export const AddtoCartModal: FC<AddToCardModalInterface> = ({
  cartItems,
  paymentWith,
  modalVisible,
  selectedItem,
  setModalVisible,
  totalSingleItem,
  userTotalPoints,
  removePointsCartItem,
  removePaymentCartItem,
  onAddtoCartWithPoints,
  onAddtoCartWithPayment,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  let itemWithPoints: Item | undefined = cartItems.find(
    (x) => x.id === selectedItem.id && x.isPayment == false,
  );
  let itemWithPayment: Item | undefined = cartItems.find(
    (x) => x.id === selectedItem?.id && x?.isPayment == true,
  );
  const onChange = (text: string) => {
    const re = /^[0-9\b]+$/;
    if (text === '' || re.test(text)) {
      setQuantity(parseInt(text));
    }
  };
  const quantityCheck = () => {
    if (paymentWith == payWith.amount) {
      itemWithPayment?.quantityWithPayment! >= 1
        ? setQuantity(itemWithPayment?.quantityWithPayment!)
        : setQuantity(1);
    } else if (paymentWith == payWith.points) {
      itemWithPoints?.quantityWithPoints! >= 1
        ? setQuantity(itemWithPayment?.quantityWithPoints!)
        : setQuantity(1);
    }
  };
  useEffect(() => {
    quantityCheck();
  }, [modalVisible]);
  const onPressAddToCart = () => {
    if (totalSingleItem < quantity) {
    }
    if (paymentWith == payWith.amount) {
      onAddtoCartWithPayment(quantity, selectedItem);
      setModalVisible(false);
      setQuantity(0);
    } else if (paymentWith == payWith.points) {
      if (selectedItem?.achivePointsCost * quantity > userTotalPoints) {
        setShowAlert(true);
      } else {
        onAddtoCartWithPoints(quantity, selectedItem);
        setModalVisible(false);
        setQuantity(0);
      }
    }
    quantityCheck();
  };
  const onPressDelete = () => {
    if (paymentWith === payWith.points) {
      removePointsCartItem(selectedItem);
    } else {
      removePaymentCartItem(selectedItem);
    }
    setModalVisible(false);
    setQuantity(1);
  };
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='slide'
      transparent={true}
      visible={modalVisible}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
        style={styles.centeredView}
      >
        <_View style={styles.modalView}>
          <_View style={styles.headerContainer}>
            <_Text style={styles.headText}>{'Add Item to Cart'}</_Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.crossIcon}
            >
              <_VectorIcons
                type={'Entypo'}
                name='cross'
                size={15}
                color={whiteThemeColors.black}
              />
            </TouchableOpacity>
          </_View>
          <_View style={styles.section}>
            <_Text style={[styles.valueText, { fontSize: 18 }]}>
              {selectedItem?.inventory}
            </_Text>
          </_View>
          {paymentWith == payWith.points ? (
            <_View style={styles.section}>
              <_Text style={styles.titleText}>{'Cost Achieve Points'} </_Text>
              <_Text style={styles.valueText}>
                {selectedItem.achivePointsCost}
              </_Text>
            </_View>
          ) : (
            <_View style={styles.section}>
              <_Text style={styles.titleText}>Cost </_Text>
              <_Text style={styles.valueText}>{`$${selectedItem?.cost}`}</_Text>
            </_View>
          )}
          <_View style={styles.section}>
            <_Text style={styles.titleText}>{'Available Quantity'} </_Text>
            <_Text style={styles.valueText}>{selectedItem?.available}</_Text>
          </_View>
          <_View style={{ width: '100%' }}>
            <_Text style={styles.textboxTitle}>{'Quantity Needed'}</_Text>
            <_View style={styles.input}>
              <_TextInput
                style={styles.inputText}
                keyboardType='numeric'
                defaultValue={quantity?.toString()}
                value={quantity?.toString()}
                onChangeText={(text) => onChange(text)}
              />
            </_View>
          </_View>
          <_Button
            borderRadius={12}
            width='100%'
            callback={onPressAddToCart}
            btnText={
              paymentWith === payWith.amount
                ? itemWithPayment?.quantityWithPayment! >= 1
                  ? 'Update Cart'
                  : 'Add to Cart'
                : paymentWith === payWith.points
                ? itemWithPoints?.quantityWithPoints! >= 1
                  ? 'Update Cart'
                  : 'Add to Cart'
                : undefined
            }
            BtnTxt={styles.buttonText}
            submitting={true}
            style={[
              styles.button,
              {
                backgroundColor:
                  !quantity || quantity == 0
                    ? whiteThemeColors.greyDark
                    : whiteThemeColors.primary,
              },
            ]}
          ></_Button>
          {paymentWith === payWith.amount &&
          itemWithPayment?.quantityWithPayment! >= 1 ? (
            <_Button
              borderRadius={25}
              width='100%'
              callback={onPressDelete}
              btnText={'Remove From Cart'}
              BtnTxt={styles.buttonText}
              submitting={true}
              style={[
                styles.button,
                { marginTop: 8, backgroundColor: whiteThemeColors.red },
              ]}
            ></_Button>
          ) : paymentWith === payWith.points &&
            itemWithPoints?.quantityWithPoints! >= 1 ? (
            <_Button
              borderRadius={25}
              width='100%'
              callback={onPressDelete}
              btnText={'Remove From Cart'}
              BtnTxt={styles.buttonText}
              submitting={true}
              style={[
                styles.button,
                { marginTop: 8, backgroundColor: whiteThemeColors.red },
              ]}
            ></_Button>
          ) : null}
        </_View>
      </KeyboardAvoidingView>
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={'Error'}
          msg={'You Dont Have Enough Acheivement Points'}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setShowAlert(false);
          }}
        />
      )}
    </Modal>
  );
};
