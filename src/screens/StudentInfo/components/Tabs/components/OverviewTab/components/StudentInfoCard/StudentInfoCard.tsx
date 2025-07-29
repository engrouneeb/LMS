import {StudentInfoCardInterface} from '../../../../../../../../interfaces';
import moment from 'moment';
import React, {FC, useState} from 'react';
import {Modal, Pressable, StyleSheet} from 'react-native';
import {whiteThemeColors, isParent} from '../../../../../../../../Utilities';
import ApiEndpoints from '../../../../../../../../../data/ApiEndpoints';
import {
  _Button,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../../../../../components';
import {UserImg} from '../../../../../../../ThumbNail';
import {Row} from '../FamilyInfoCard/components';
import {StudentInfoUpdateModal} from '../StudentInfoUpdateModal/StudentInfoUpdateModal';

import {useAppModulePermission} from '../../../../../../../../customHooks';
import {styles} from './styles';
import {DataAccess} from '../../../../../../../../../data/DAL';
import {StudentInfoType} from '../../../../../../../../interfaces/screensInterfaces/StudentInfoInterfaces/TabsInterfaces/OverviewInterfaces/StudentInfoCardInterfaces';
import {string} from 'prop-types';

type StudentInfoWithPinStatus = StudentInfoCardInterface & {
  kioskPin?: string;
  status?: 'Active' | 'Inactive';
};

const GenderLookup = {
  '1': 'Male',
  '0': 'Female',
  '3': 'Other',
  '4': 'Prefer not to say',
};

export const StudentInfoCard: FC<
  StudentInfoCardInterface & {quickLinkConfig?: any[]; roleName?: string}
> = ({studentInfo, onPress, quickLinkConfig = [], roleName = ''}) => {
  const {filterMenuOptions} = useAppModulePermission();
  let isUpdateStudentInfo = filterMenuOptions('UpdateStudentInfo');
  let isShowContacts = filterMenuOptions('ShowContacts');
  // Show Kiosk PIN only for parent role and if Kiosk PINs quick link is enabled
  const isShowKioskPin =
    isParent(roleName) &&
    quickLinkConfig.some(
      (item: any) => item.name === 'Kiosk PINs' && item.status === true,
    );
  const [studentInfoModal, setStudentInfoModal] = useState(false);
  const [stdInfo, setStdInfo] = useState<StudentInfoType>(studentInfo);
  const [showKioskPinModal, setShowKioskPinModal] = useState(false);
  const [kioskPin, setKioskPin] = useState<string | null>(null);
  const [pinLoading, setPinLoading] = useState(false);
  const {Get} = DataAccess();
  const onCloseModal = () => {
    setStudentInfoModal(false);
  };
  const submittUpdate = async (stdInfo: any) => {
    setStdInfo(stdInfo);
    setStudentInfoModal(false);
  };
  const handleViewKioskPin = async () => {
    setShowKioskPinModal(true);
    setPinLoading(true);
    setKioskPin(null);
    try {
      const Endpoint = {
        ...ApiEndpoints.GetPinDetailByUserId,
        params: `?userId=${studentInfo?.userId ?? studentInfo?.studentId}`,
      };
      const res = await Get(Endpoint);
      setKioskPin(res?.user?.pinCode ?? '------');
    } catch (e) {
      setKioskPin('------');
    }
    setPinLoading(false);
  };
  console.log({stdInfo});

  return studentInfo === undefined ? null : (
    <_View style={styles.cardContainer}>
      <_View style={styles.imageContainer}>
        <UserImg
          UserInfo={{
            FirstName: stdInfo?.firstName,
            LastName: stdInfo?.lastName,
            UserImage: stdInfo.userImage,
            UserImageColor: whiteThemeColors.primary,
          }}
          size={86}
        />
      </_View>
      <_Text
        style={
          styles.headerText
        }>{`${stdInfo?.firstName} ${stdInfo?.lastName}`}</_Text>
      {isShowKioskPin && (
        <Pressable
          onPress={handleViewKioskPin}
          style={{
            ...styles.showBtn,
            backgroundColor: whiteThemeColors.white,
            marginBottom: 10,
            marginTop: 0,
          }}>
          <_VectorIcons
            style={{alignSelf: 'center'}}
            type={'MaterialCommunityIcons'}
            name="account-arrow-left"
            color={whiteThemeColors.primaryDark}
            size={20}
          />
          <_Text style={styles.showBtnTxt}>{'View Kiosk PIN'}</_Text>
        </Pressable>
      )}

      {/* Kiosk PIN Modal */}
      <Modal
        visible={showKioskPinModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowKioskPinModal(false)}>
        <_View style={modalStyles.overlay}>
          <_View style={modalStyles.modalContainer}>
            <_Text style={modalStyles.modalTitle}>Kiosk PIN</_Text>
            <_Text
              style={
                modalStyles.modalName
              }>{`${stdInfo?.firstName} ${stdInfo?.lastName}`}</_Text>
            {pinLoading ? (
              <_Text style={modalStyles.modalPin}>Loading...</_Text>
            ) : (
              <_Text style={modalStyles.modalPin}>{kioskPin ?? '------'}</_Text>
            )}
            <_View style={modalStyles.statusRow}>
              <_Text style={modalStyles.statusLabel}>Status: </_Text>
              <_Text
                style={[
                  modalStyles.statusValue,
                  {
                    color:
                      stdInfo?.status === 'Active'
                        ? whiteThemeColors.green
                        : whiteThemeColors.red,
                  },
                ]}>
                {stdInfo?.status || ''}
              </_Text>
            </_View>
            <_Button
              btnText="Close"
              style={modalStyles.closeBtn}
              BtnTxt={modalStyles.closeBtnText}
              borderRadius={6}
              width={120}
              callback={() => setShowKioskPinModal(false)}
              submitting={true}
            />
          </_View>
        </_View>
      </Modal>
      {/* End Kiosk PIN Modal */}

      <_View
        style={{
          paddingVertical: 15,
          width: '90%',
          borderRadius: 25,
          backgroundColor: whiteThemeColors.white + 90,
        }}>
        <Row
          label1="Name"
          value1={`${stdInfo?.firstName} ${stdInfo?.lastName}`}
          label2={'Gender'}
          value2={GenderLookup[stdInfo?.gender] || 'not specified'}
        />
        <Row
          label1="Email"
          value1={stdInfo?.email}
          label2={'Birth Date'}
          value2={moment(stdInfo?.dob).format('DD MMM, YYYY')}
        />

        <_View style={{paddingHorizontal: 10}}>
          {isUpdateStudentInfo && (
            <Pressable
              onPress={() => setStudentInfoModal(true)}
              style={styles.updateInfoBtn}>
              <_VectorIcons
                style={{alignSelf: 'center'}}
                type={'FontAwesome'}
                name="edit"
                color={whiteThemeColors.primary}
                size={18}
              />
              <_Text style={styles.updateInfoTxt}>{'Update Info'}</_Text>
            </Pressable>
          )}

          {isShowContacts && (
            <Pressable onPress={onPress} style={styles.showBtn}>
              <_VectorIcons
                style={{alignSelf: 'center'}}
                type={'MaterialCommunityIcons'}
                name="account-details"
                color={whiteThemeColors.primaryDark}
                size={20}
              />
              <_Text style={styles.showBtnTxt}>{'Show Contacts'}</_Text>
            </Pressable>
          )}
        </_View>
      </_View>

      {studentInfo && (
        <StudentInfoUpdateModal
          studentInfo={stdInfo}
          onPress={onCloseModal}
          showModal={studentInfoModal}
          onSubmitt={submittUpdate}
        />
      )}
    </_View>
  );
};

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: whiteThemeColors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: whiteThemeColors.primary,
  },
  modalName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: whiteThemeColors.lightBlack,
  },
  modalPin: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 12,
    color: whiteThemeColors.primaryDark,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  statusLabel: {
    fontSize: 15,
    color: whiteThemeColors.lightBlack,
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  closeBtn: {
    backgroundColor: whiteThemeColors.primary,
    marginTop: 8,
    alignSelf: 'center',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    color: whiteThemeColors.white,
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
  },
});
