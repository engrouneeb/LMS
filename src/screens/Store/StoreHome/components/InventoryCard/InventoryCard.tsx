import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'navigation';
import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { CustomAlert, whiteThemeColors } from 'utilities';
import { _Image, _Text, _VectorIcons, _View } from '../../../../../components';
import { ActionMenu } from '../ActionMenu/ActionMenu';
import { ItemCard } from './components/ItemCard';
import { styles } from './styles';
import { InventoryCardInterface } from 'interfaces';
import CommonStyles from 'screens/CommonStyles';
interface Props extends InventoryCardInterface {
  getAllCategories: () => void;
}

export const InventoryCard: FC<Props> = ({
  data,
  flag,
  setFlag,
  cartItems,
  activeTab,
  // navigation,
  isUserParent,
  isUserStudent,
  allCategories,
  deleteInventory,
  onPressAddtoCart,
  getAllInventories,
  getAllCategories,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [paymentOptionsModal, setPaymentOptionsModal] =
    useState<boolean>(false);
  let inCartItem: { id: number } | undefined = cartItems?.find(
    (x) => x.id === data.id,
  );
  const [alertTitle, setAlertTitle] = useState<string>();
  const [alertMsg, setAlertMsg] = useState<string>();
  const navigation = useNavigation<NavigationProps>();
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
      getAllCategories: getAllCategories,
    });
  };

  const deletionAlert = () => {
    setModalVisible(true);
    setAlertTitle('warning');
    setAlertMsg('Are you sure you want to delete this item?');
  };

  return (
    <_View style={styles.parentContainer}>
      {!isUserParent && !isUserStudent ? (
        <TouchableOpacity onPress={onPressEdit} style={styles.container}>
          <_View style={styles.adminCard}>
            <_View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <_View style={styles.idView}>
                <_Text style={styles.titleText}>ID</_Text>
                <_Text style={[styles.valueText, { marginLeft: 5 }]}>
                  {data?.id}
                </_Text>
              </_View>
              <TouchableOpacity
                style={styles.redeemCodeBtn}
                onPress={() =>
                  navigation.navigate('add-redeem-code-screen', {
                    inventoryitem: data,
                  })
                }
              >
                <_Text
                  style={[
                    styles.valueText,
                    {
                      color: whiteThemeColors.primary,
                      fontFamily: CommonStyles.fonts.semiBold,
                    },
                  ]}
                >
                  {'Add Redeem Code'}
                </_Text>
              </TouchableOpacity>
            </_View>
            <_View style={{ marginTop: 10, flexDirection: 'row' }}>
              <_View>
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
                <_Text style={styles.titleText}>{'Category'} </_Text>
                <_Text style={styles.valueText}>
                  {activeTab || 'No Category'}
                </_Text>
              </_View>
            </_View>
          </_View>
          <_View
            style={{
              ...styles.costContainer,
              elevation: data?.imageURL == null ? 0 : 5,
            }}
          >
            {data?.imageURL !== null ? (
              <_Image uri={data?.imageURL} style={styles.itemImage} />
            ) : (
              <_VectorIcons
                type={'MaterialCommunityIcons'}
                name='store-outline'
                size={55}
                color={whiteThemeColors.primary}
              />
            )}
            <ActionMenu onDelete={() => deletionAlert()} onEdit={onPressEdit} />
          </_View>
        </TouchableOpacity>
      ) : (
        <ItemCard
          data={data}
          activeTab={activeTab}
          inCartItem={inCartItem}
          onCartIcon={onCartIcon}
          allCategories={allCategories}
          onPressAddtoCart={onPressAddtoCart}
          getAllInventories={getAllInventories}
          paymentOptionsModal={paymentOptionsModal}
          setPaymentOptionsModal={setPaymentOptionsModal}
        />
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
