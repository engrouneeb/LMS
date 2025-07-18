import React, { FC, useEffect, useReducer, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { _Screen, _Text, _VectorIcons, _View } from '../../../components';
import { TopMiniTabs } from '../../../components/TopMiniTabs';
import CstHeader from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
import {
  convertUTCDateToLocalDateStringFormat,
  CustomAlert,
  whiteThemeColors,
} from '../../../Utilities';
import { ActionMenu } from '../StoreHome/components/ActionMenu/ActionMenu';
import { AddRedeemCodeModal } from './components/AddRedeemCodeModal';
import { styles } from './styles';
import { NavigationProps } from '../../../navigation';
import { useNavigation } from '@react-navigation/native';
import { SingleTab, Tab, EndpointType } from '../../../interfaces';
import { initialState, reducer, stateConstants } from './States';
type redeemCodeType = {
  redeemCode?: string;
  redeemCodeId?: number;
  createdDate?: Date;
};
type EditingItemType = {
  redeemCode: string;
  redeemCodeId: number;
};
export const AddRedeemCode: FC<any> = ({ route }) => {
  const tabs = [
    { id: 0, name: 'Unused' },
    { id: 1, name: 'Used' },
  ];
  const inventoryItem = route?.params?.inventoryitem;
  const [activeTab, setActiveTab] = useState<SingleTab>({
    id: 0,
    name: 'Unused',
  });
  const [state, setState] = useReducer(reducer, initialState);
  const _setState = (type: any, data: any) => setState({ type, data });
  const navigation = useNavigation<NavigationProps>();
  const { PostSecuredWithParams, Get } = DataAccess();
  useEffect(() => {
    getAllRedeemCodes();
  }, [activeTab]);

  const onAndroidBack = () => {
    navigation.goBack();
    return true;
  };
  const onPressEdit = (EditingItem: EditingItemType) => {
    _setState(stateConstants.SHOW_EDITING_MODAL, {
      showModal: true,
      isEditing: true,
      editingItem: EditingItem,
    });
  };

  const getAllRedeemCodes = async () => {
    var EndPoint: EndpointType = ApiEndpoints.GetAllRedeemCode;
    EndPoint.params = `?inventoryId=${inventoryItem?.inventoryId}`;
    _setState(stateConstants.IS_LOADING, true);
    Get(EndPoint)
      .then((res: any) => {
        if (res) {
          if (activeTab.name == 'Unused') {
            let codes = res.filter((item: any) => item.isUsed == false);
            _setState(stateConstants.REDEEM_CODES, codes);
          } else {
            let codes = res.filter((item: any) => item.isUsed == true);
            _setState(stateConstants.REDEEM_CODES, codes);
          }
        }
      })
      .finally(() => _setState(stateConstants.IS_LOADING, false));
  };

  const DeleteRedeemCode = async (redeemCodeId: string) => {
    _setState(stateConstants.IS_LOADING, true);
    let url: EndpointType = ApiEndpoints.DeleteRedeemCode;
    var params = `?id=${redeemCodeId}`;
    PostSecuredWithParams(url, params).then((res: any) => {
      getAllRedeemCodes();
    });
  };

  const DeletionAlert = (redeemCodeId: string) => {
    _setState(stateConstants.SHOW_ALERT_MESSAGE, {
      showAlert: true,
      alertMessage: 'Are you sure you want to delete this redeem code?',
    });
    _setState(stateConstants.DELETING_ITEM, redeemCodeId);
  };

  const showModal = (show: boolean) => {
    _setState(stateConstants.SHOW_MODAL, show);
  };
  const setEditing = (isEditing: boolean) => {
    _setState(stateConstants.IS_EDITING, isEditing);
  };

  return (
    <_Screen
      header={
        <CstHeader
          isBack
          GoBack={() => navigation.goBack()}
          Screen={inventoryItem?.inventory}
        />
      }
      onAndroidBack={onAndroidBack}
      hideTopSafeArea
      flex={1}
      backgroundColor={whiteThemeColors.background}
    >
      <_View style={{ flex: 1 }}>
        <TopMiniTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {state.isLoading ? (
          <_ActivityIndicator
            size={'large'}
            color={whiteThemeColors.primary}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          />
        ) : state.redeemCodes.length == 0 ? (
          <_View style={styles.emptyList}>
            <_VectorIcons
              type='AntDesign'
              name={'gift'}
              size={80}
              color={whiteThemeColors.primary}
            />
            <_Text style={styles.emptyText}>{'No Redeem Code Found!'}</_Text>
          </_View>
        ) : (
          <FlatList
            data={state.redeemCodes}
            renderItem={({ item }) => (
              <_View style={styles.card}>
                <_View style={styles.cardInner}>
                  <_Text style={styles.RedeemText}>{'Redeem'}</_Text>
                </_View>
                <_View style={styles.redemCodeText}>
                  <ActionMenu
                    onDelete={() => DeletionAlert(item.redeemCodeId)}
                    onEdit={() => onPressEdit(item)}
                  />
                  <_View style={styles.codeContainer}>
                    <_Text style={styles.headText}>{'Redeem Code'}</_Text>
                    <_Text style={styles.codeText}>{item.redeemCode}</_Text>
                  </_View>
                  <_View style={styles.codeContainer}>
                    <_Text
                      style={styles.headText}
                    >{`Created Date: ${convertUTCDateToLocalDateStringFormat(
                      item.createdDate,
                    )}`}</_Text>
                  </_View>
                </_View>
              </_View>
            )}
          />
        )}
        <AddRedeemCodeModal
          modalVisible={state.showModal}
          setModalVisible={showModal}
          isEditing={state.isEditing}
          editingItem={state.editingItem}
          setIsEditing={setEditing}
          inventoryId={inventoryItem?.inventoryId}
          getAllRedeemCodes={getAllRedeemCodes}
        />
        {activeTab.name == 'Unused' && (
          <_View style={{ position: 'absolute', bottom: 15, right: 15 }}>
            <TouchableOpacity
              style={styles.addContainer}
              onPress={() => _setState(stateConstants.SHOW_MODAL, true)}
            >
              <_VectorIcons
                type='MaterialCommunityIcons'
                name={'plus'}
                size={30}
                color={whiteThemeColors.white}
              />
            </TouchableOpacity>
          </_View>
        )}

        {state.showAlert && (
          <CustomAlert
            visible={state.showAlert}
            title={'Warning'}
            msg={state.alertMessage}
            firstBtn={'Yes'}
            secondBtn={'No'}
            firstBtnFunc={() => {
              DeleteRedeemCode(state.deletingitem);
              _setState(stateConstants.SHOW_ALERT_MESSAGE, {
                showAlert: false,
                alertMessage: '',
              });
            }}
            secondBtnFunc={() => {
              _setState(stateConstants.SHOW_ALERT_MESSAGE, {
                showAlert: false,
                alertMessage: '',
              });
              _setState(stateConstants.DELETING_ITEM, '');
            }}
          />
        )}
      </_View>
    </_Screen>
  );
};
