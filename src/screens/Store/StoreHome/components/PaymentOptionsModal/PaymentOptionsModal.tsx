import { PaymentOptionsModalProps } from '../../../../../interfaces';
import React, { FC, useEffect, useState } from 'react';
import { Dimensions, Modal, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { isParent, payWith } from '../../../../../Utilities';
import {
  _Text,
  _VectorIcons,
  _View,
  isPortrait,
} from '../../../../../components';
import { Appstate } from '../../../../../reducers/Appstate';
import { styles } from './styles';

const PaymentOptionsModal: FC<PaymentOptionsModalProps> = ({
  visible,
  totalCost,
  setVisible,
  onPressAddtoCart,
  achievePointsCost,
}) => {
  const { roleName }: any = useSelector(
    (state: Appstate) => state.User.UserInfo,
  );
  const [isLandscape, setIsLandscape] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const onPayWithPoints = () => {
    setVisible(false);
    onPressAddtoCart(payWith.points);
  };
  const onPayWithAmount = () => {
    setVisible(false);
    onPressAddtoCart(payWith.amount);
  };

  useEffect(() => {
    const subs = Dimensions.addEventListener('change', () => {
      setIsLandscape(isPortrait() ? false : true);
    });
    return () => subs.remove();
  });
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      transparent={true}
      visible={visible}
    >
      <_View style={styles.centeredView}>
        <_View
          style={{
            ...styles.modalView,
            height: isLandscape ? '55%' : '25%',
            width: windowWidth - 50,
          }}
        >
          <_View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.crossIcon}
            >
              <_VectorIcons
                type='Entypo'
                name='cross'
                size={15}
                color={'black'}
                style={{ padding: 5 }}
              />
            </TouchableOpacity>
          </_View>
          <_View style={styles.webViewContainer}>
            <_View style={styles.modalInsideView}>
              <_View style={styles.mainIcon}>
                <_VectorIcons
                  type='Entypo'
                  name='shopping-cart'
                  size={25}
                  style={{ padding: 12, borderRadius: 10 }}
                />
              </_View>
              <_Text style={styles.headText}>{'Buy Item with'}</_Text>
              <_View style={styles.parentView}>
                {isParent(roleName) ? (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => onPayWithAmount()}
                  >
                    <_View style={styles.iconView}>
                      <_VectorIcons
                        type='FontAwesome'
                        name='dollar'
                        size={20}
                        style={styles.icon}
                      />
                    </_View>
                    <_View style={{ marginLeft: 10 }}>
                      <_Text style={styles.innerText}>Amount</_Text>
                      <_Text style={styles.innerText}>{`$${totalCost}`}</_Text>
                    </_View>
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  style={[styles.card, { marginLeft: 10 }]}
                  onPress={() => onPayWithPoints()}
                >
                  <_View style={styles.iconView}>
                    <_VectorIcons
                      type='MaterialIcons'
                      name='stars'
                      size={20}
                      style={styles.iconStyle}
                    />
                  </_View>
                  <_View style={{ marginLeft: 10 }}>
                    <_Text style={styles.innerText}>Achieve Points</_Text>
                    <_Text style={styles.innerText}>{achievePointsCost}</_Text>
                  </_View>
                </TouchableOpacity>
              </_View>
            </_View>
          </_View>
        </_View>
      </_View>
    </Modal>
  );
};

export { PaymentOptionsModal };
