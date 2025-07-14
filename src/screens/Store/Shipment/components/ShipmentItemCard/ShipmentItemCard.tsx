import { TouchableOpacity } from 'react-native';
import React, { FC, useState } from 'react';
import {
  whiteThemeColors,
  convertUTCDateToLocalDateStringFormat,
} from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../components';
import { useDispatch } from 'react-redux';
import { getSelectedTab } from '../../../StoreHome/helper';
import { styles } from './styles';
import { CustomAlert } from 'utilities';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'navigation';
import { EndpointType } from 'interfaces';
import {
  ShipmentProps,
  ShipmentCardItemProps,
} from '../../../../../interfaces';
const ShipmentItemCard: FC<ShipmentProps> = ({
  item,
  tabId,
  isUserAdmin,
  GetAllShippedItems,
}) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const onEdit = (item: ShipmentCardItemProps) => {
    dispatch(getSelectedTab(tabId));
    navigation.navigate('store-add-new-item', {
      allCategories: [],
      isEditing: true,
      Id: item.inventoryId,
      isShipmentItem: true,
      storeId: item.storeId,
    });
  };
  const { PostSecured } = DataAccess();
  const onDetailsView = (item: ShipmentCardItemProps, tab: string) => {
    navigation.navigate('store-add-new-item', {
      allCategories: [],
      isEditing: true,
      Id: item.inventoryId,
      isShipmentItem: true,
      storeId: item.storeId,
      Showtab: tab,
    });
  };

  const UpdateStoreItemStatus = (item: ShipmentCardItemProps) => {
    let url: EndpointType = ApiEndpoints.UpdateStoreItemStatus;
    const obj = {
      InventoryId: item?.inventoryId,
      StoreId: item?.storeId,
      IsReceived: true,
    };
    PostSecured(url, obj).then((res: any) => {
      if (res.status) {
        GetAllShippedItems && GetAllShippedItems();
      }
    });
  };

  return (
    <_View style={styles.container}>
      <_View style={styles.container2}>
        <_View style={styles.cardItem}>
          <_Text style={styles.cardItemKey_Text}>{'ID'}</_Text>
          <_Text style={styles.cardItemValue_Text}>{item.id}</_Text>
        </_View>
        <_View style={styles.cardItem}></_View>
        <_Text
          style={{ ...styles.cardItemValue_Text, fontSize: 14, marginLeft: 0 }}
        >
          {item.inventory}
        </_Text>
        {!isUserAdmin && (
          <_View style={{ flexDirection: 'row' }}>
            <_View style={styles.cardItem}>
              <_Text style={styles.cardItemKey_Text}>{'Cost'}</_Text>
              <_Text style={styles.cardItemValue_Text}>{item.cost}</_Text>
            </_View>
            <_View style={{ ...styles.cardItem, marginLeft: 10 }}>
              <_Text style={styles.cardItemKey_Text}>{'Achieve Points'}</_Text>
              <_Text style={styles.cardItemValue_Text}>
                {item.achivePointsCost}
              </_Text>
            </_View>
          </_View>
        )}
        <_View style={styles.cardItem}>
          <_Text style={styles.cardItemKey_Text}>
            {isUserAdmin ? 'Orderd Quantity' : 'Quantity'}
          </_Text>
          <_Text style={styles.cardItemValue_Text}>{item.quantity}</_Text>
        </_View>

        <_View style={styles.cardItem}>
          <_Text style={styles.cardItemKey_Text}>
            {isUserAdmin ? 'Amount Paid' : 'Total Cost'}
          </_Text>
          <_Text style={styles.cardItemValue_Text}>{`${
            item.totlaCost || 0
          }$`}</_Text>
        </_View>
        <_View style={styles.cardItem}>
          <_Text style={styles.cardItemKey_Text}>
            {isUserAdmin ? 'Achieve Points' : 'Total Achieve Points'}
          </_Text>
          <_Text style={styles.cardItemValue_Text}>
            {item.totalAchivedPoints || 0}
          </_Text>
        </_View>
        {isUserAdmin ? (
          <_View style={styles.cardItem}>
            <_Text style={styles.cardItemKey_Text}>{'Purchased by'}</_Text>
            <_Text style={styles.cardItemValue_Text}>
              {item?.purchasedByName}
            </_Text>
          </_View>
        ) : null}

        {isUserAdmin && (
          <_View style={styles.cardItem}>
            <_Text style={styles.cardItemKey_Text}>
              {'Last Purchase Date'}
            </_Text>
            <_Text style={styles.cardItemValue_Text}>
              {convertUTCDateToLocalDateStringFormat(
                item.purshasedDate,
                'MMM DD, YYYY h:mm A',
              )}
            </_Text>
          </_View>
        )}
        {!isUserAdmin ? (
          <_View style={styles.cardItem}>
            <_Text style={styles.cardItemKey_Text}>{'Shipment Date'}</_Text>
            <_Text style={styles.cardItemValue_Text}>
              {convertUTCDateToLocalDateStringFormat(
                item.shipmentDate,
                'MMM DD, YYYY h:mm A',
              )}
            </_Text>
          </_View>
        ) : null}
      </_View>
      <_View style={styles.statusContainer}>
        {isUserAdmin ? (
          <>
            <_View style={styles.textContainer}>
              <_Text
                style={{
                  ...styles.cardActiveKey_Text,
                  color: whiteThemeColors.primary,
                }}
              >
                {'Status'}
              </_Text>
              <_Text style={styles.cardActiveValue_Text}>{item.status}</_Text>
            </_View>
            {item.isShipmentNeeded ? (
              <TouchableOpacity
                onPress={() => onEdit(item)}
                style={styles.changeStatusCont}
              >
                <_Text style={styles.changeStatusText}>{'Change Status'}</_Text>
                <_VectorIcons
                  type={'MaterialIcons'}
                  name='chevron-right'
                  size={15}
                  color={whiteThemeColors.white}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setShowAlert(true)}
                style={styles.markBtn}
              >
                <_Text style={styles.markText}>{'Mark as Received'}</_Text>
                <_VectorIcons
                  type={'MaterialIcons'}
                  name='chevron-right'
                  size={26}
                  color={whiteThemeColors.white}
                />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            <_View style={styles.header}>
              {item?.isShipmentNeeded ? (
                <>
                  <_Text style={styles.statusText}>{'Pending For'}</_Text>
                  <_Text style={styles.statusText}>{'Shipped'}</_Text>
                </>
              ) : (
                <_Text style={{ ...styles.statusText }}>{'Not Received'}</_Text>
              )}
              <_View style={styles.countView}>
                <_Text style={styles.countText}>
                  {item.pendingShippedItems}
                </_Text>
              </_View>
              {item?.isShipmentNeeded ? (
                <_Text style={styles.statusText}>{'Shipped'}</_Text>
              ) : (
                <_Text style={styles.statusText}>{'Received'}</_Text>
              )}
              <_View
                style={[
                  styles.countView,
                  { backgroundColor: whiteThemeColors.green },
                ]}
              >
                <_Text style={styles.countText}>{item.shippedItems}</_Text>
              </_View>
            </_View>
            <_View style={styles.bottom}>
              <TouchableOpacity onPress={() => onDetailsView(item, 'form')}>
                <_VectorIcons
                  type={'MaterialCommunityIcons'}
                  name='file-eye'
                  size={18}
                  color={whiteThemeColors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onDetailsView(item, 'discussion')}
              >
                <_VectorIcons
                  type={'Ionicons'}
                  name='chatbox-ellipses'
                  size={18}
                  color={whiteThemeColors.primary}
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onDetailsView(item, 'attachment')}
              >
                <_VectorIcons
                  type={'Ionicons'}
                  name='document-attach-outline'
                  size={18}
                  color={whiteThemeColors.primary}
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </_View>
          </>
        )}
      </_View>
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={'Mark as Received'}
          msg={'Do you want to Mark as Received'}
          firstBtn={'Yes'}
          firstBtnFunc={() => {
            UpdateStoreItemStatus(item);
            setShowAlert(false);
          }}
          secondBtn={'No'}
          secondBtnFunc={() => setShowAlert(false)}
        />
      )}
    </_View>
  );
};

export default ShipmentItemCard;
