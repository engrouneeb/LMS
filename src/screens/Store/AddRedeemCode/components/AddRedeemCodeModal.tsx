import React, { FC, useState } from 'react';
import {
  _Text,
  _View,
  _Button,
  _TextInput,
  _VectorIcons,
} from '../../../../components';
import { styles } from './styles';
import { whiteThemeColors } from 'utilities';
import CommonStyles from '../../../CommonStyles';
import { CustomAlert } from 'utilities';
import { DataAccess } from '../../../../../data/DAL';
import { Modal, TouchableOpacity } from 'react-native';
import ApiEndpoints from '../../../../../data/ApiEndpoints';
import { EndpointType } from 'interfaces';
import { AddRedeemCodeModalProps } from '../../../../interfaces';

export const AddRedeemCodeModal: FC<AddRedeemCodeModalProps> = ({
  isEditing,
  editingItem,
  inventoryId,
  setIsEditing,
  modalVisible,
  setModalVisible,
  getAllRedeemCodes,
}) => {
  const [redeemCode, setRedeemCode] = useState<string | undefined>(
    isEditing ? editingItem?.redeemCode : '',
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const { PostSecuredWithParams } = DataAccess();
  const onCloseModal = () => {
    setModalVisible(false);
    setIsEditing(false);
    setRedeemCode('');
  };

  const AddUpdateRedeemCode = async () => {
    setLoading(true);
    let url: EndpointType = ApiEndpoints.AddUpdateRedeemCode;
    var params = `?inventoryId=${inventoryId}&redeemCode=${redeemCode}&id=${
      isEditing ? editingItem?.redeemCodeId : 0
    }`;
    try {
      PostSecuredWithParams(url, params).then((res: any) => {
        if (res.isSuccess) {
          setLoading(false);
          setModalVisible(false);
          getAllRedeemCodes();
          setRedeemCode('');
        } else {
          setLoading(false);
          setShowAlert(true);
          setAlertMessage(res.message);
        }
      });
    } catch (error) {}
  };

  return (
    <Modal
      transparent
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      visible={modalVisible}
    >
      <_View style={styles.centeredView}>
        <_View style={styles.modalView}>
          <_View style={styles.headerContainer}>
            <_Text style={styles.headText}>Add Redeem Code</_Text>
            <TouchableOpacity onPress={onCloseModal} style={styles.crossIcon}>
              <_VectorIcons
                type={'Entypo'}
                name='cross'
                size={18}
                color={whiteThemeColors.black}
              />
            </TouchableOpacity>
          </_View>
          <_View style={styles.textInputContainer}>
            <_TextInput
              style={styles.textInput}
              value={redeemCode}
              autoFocus
              placeholderTextColor={whiteThemeColors.greyDark}
              placeholder={isEditing ? editingItem?.redeemCode : 'Redeem Code'}
              clearButtonMode={'while-editing'}
              secureTextEntry={false}
              onChange={(text) => {
                setRedeemCode(text.nativeEvent.text);
              }}
            />
          </_View>
          <_View style={styles.buttonContainer}>
            <_Button
              isBlock={redeemCode?.length == 0}
              borderRadius={5}
              width={isLoading ? '42%' : '22%'}
              submitting={!isLoading}
              loaderColor={whiteThemeColors.white}
              BtnTxt={[
                CommonStyles.className,
                {
                  color: whiteThemeColors.white,
                  fontFamily: CommonStyles.fonts.semiBold,
                },
              ]}
              style={[
                styles.button,
                {
                  backgroundColor:
                    redeemCode?.length == 0
                      ? whiteThemeColors.greyDark
                      : whiteThemeColors.primary,
                },
              ]}
              btnText={isEditing ? 'Update' : 'Add'}
              callback={() => {
                AddUpdateRedeemCode();
              }}
            />
          </_View>
          {showAlert && (
            <CustomAlert
              visible={showAlert}
              title={'Error'}
              msg={alertMessage}
              firstBtn={'Okay'}
              firstBtnFunc={() => {
                setShowAlert(false);
              }}
            />
          )}
        </_View>
      </_View>
    </Modal>
  );
};
