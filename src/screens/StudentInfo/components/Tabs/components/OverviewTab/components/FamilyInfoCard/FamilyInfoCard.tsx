import { FamilyInfoCardInterface, FamilyInfoType } from 'interfaces';
import React, { FC, useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
  getTerminologyLabel,
  isParent,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../../components';
import { FamilyInfoUpdateModal } from '../FamilyInfoUpdateModal/FamilyInfoUpdateModal';
import { FullRow, Row } from './components';
import CommonStyles from 'screens/CommonStyles';
export const FamilyInfoCard: FC<FamilyInfoCardInterface> = ({ familyInfo }) => {
  const [familyInfoModal, setFamilyInfoModal] = useState(false);
  const [FamilyInfo, setFamilyInfo] = useState(familyInfo);
  let { roleName } = useSelector((state: any) => state.User.UserInfo);
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {},
  );
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
    };
    fetchTerminologies();
  }, []);
  const onCloseModal = (updataData: FamilyInfoType) => {
    setFamilyInfo(updataData);
    setFamilyInfoModal(false);
  };

  return (
    <_View style={styles.mainContainer}>
      <_Text style={styles.modalTitle}>{'Family information'}</_Text>

      <_View style={styles.subContainer}>
        <Row
          label1={`${terminologies['Family']?.label} Name`}
          value1={FamilyInfo?.familyName || 'N/A'}
          label2={'Primary Phone'}
          value2={FamilyInfo?.primaryPhone}
        />
        <FullRow
          label={'Home Address'}
          value={FamilyInfo?.homeAddress || 'N/A'}
        />
        <FullRow label={'City'} value={FamilyInfo?.city || 'N/A'} />
        <FullRow label={'State'} value={FamilyInfo?.state || 'N/A'} />

        <Row
          label1={'Zip'}
          value1={FamilyInfo?.zip || 'N/A'}
          label2={'Emergenct Contact#'}
          value2={FamilyInfo?.emergencyContactInfo || 'N/A'}
        />
        <_View style={{ paddingHorizontal: 10 }}>
          {isParent(roleName) && (
            <Pressable
              onPress={() => {
                setFamilyInfoModal(true);
              }}
              style={styles.updateBtn}
            >
              <_VectorIcons
                type={'FontAwesome'}
                name='edit'
                color={whiteThemeColors.white}
                size={20}
              />
              <_Text style={styles.updateBtnTxt}>{'Update info'}</_Text>
            </Pressable>
          )}
        </_View>
      </_View>
      {familyInfoModal && (
        <FamilyInfoUpdateModal
          onPress={onCloseModal}
          showModal={familyInfoModal}
          familyInfo={FamilyInfo}
        />
      )}
    </_View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: whiteThemeColors.background,
    paddingVertical: 10,
  },
  modalTitle: {
    fontSize: 21,
    color: whiteThemeColors.primaryTextColor,
    textTransform: 'capitalize',
    alignSelf: 'center',
    marginLeft: 30,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  subContainer: {
    paddingVertical: 15,
    marginTop: 10,
    width: '90%',
    borderRadius: 25,
    backgroundColor: whiteThemeColors.white + 90,
  },
  updateBtn: {
    backgroundColor: whiteThemeColors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 3,
    borderRadius: 5,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  updateBtnTxt: {
    color: whiteThemeColors.white,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '700',
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  rowSubContainer: {
    width: '50%',
    justifyContent: 'center',
  },
  titleTxt: {
    fontSize: 11,
    color: whiteThemeColors.greyDark,
    marginBottom: 3,
    fontFamily: CommonStyles.fonts.medium,
  },
  valueTxt: {
    fontSize: 13,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.medium,
  },
});
