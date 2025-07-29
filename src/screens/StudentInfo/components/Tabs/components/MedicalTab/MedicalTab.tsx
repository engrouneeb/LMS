import {
  AllergyCardInterface,
  HIC_CardInterface,
  SpecialN_CardInterface,
} from '../../../../../../interfaces';
import React, {FC} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {Appstate} from '../../../../../../reducers/Appstate';
import {_ActivityIndicator} from '../../../../../Loader/_ActivityIndicator';
import {RemoveHTML} from '../../../../../../Utilities';
import {NoInfoSvg} from '../../../../../../../assets/Icons';
import {_Text, _View} from '../../../../../../components';
import {styles} from './styles';
import {whiteThemeColors} from '../../../../../../Utilities';

const {width, height} = Dimensions.get('screen');
const _MedicalTab = () => {
  const {
    medical: {allergies, specialNeeds, healthInsuranceCarrier},
    loading,
  } = useSelector((state: Appstate) => ({
    medical: state.StudentInfoReducer.medical,
    loading: state.StudentInfoReducer.isMedicalLoading,
  }));

  return (
    <_View
      style={{width, height, backgroundColor: whiteThemeColors.background}}>
      {loading ? (
        <_View flex={1} justify="center" alignItems="center">
          <_ActivityIndicator size="large" />
        </_View>
      ) : (
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
          <AllergyCard text={allergies} />
          <SpecialN_Card text={specialNeeds} />
          <HIC_Card text={healthInsuranceCarrier} />
        </ScrollView>
      )}
    </_View>
  );
};

const AllergyCard: FC<AllergyCardInterface> = ({text}) => {
  return (
    <_View style={styles.cardContainer}>
      <_View style={styles.headerContainer}>
        <_Text style={styles.headerText}>{'Allergy'}</_Text>
      </_View>
      <_View style={styles.innerContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={styles.textContainer}>
          {!text && (
            <_View style={styles.noInfoView}>
              <NoInfoSvg size={50} opacity={0.5} />
              <_Text style={styles.noInfo}>No information</_Text>
            </_View>
          )}
          <_Text style={styles.text}>{RemoveHTML(text)}</_Text>
        </ScrollView>
      </_View>
    </_View>
  );
};

const SpecialN_Card: FC<SpecialN_CardInterface> = ({text}) => {
  return (
    <_View style={styles.cardContainer}>
      <_View style={styles.headerContainer}>
        <_Text style={styles.headerText}>{'Special Needs'}</_Text>
      </_View>
      <_View style={styles.innerContainer}>
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={styles.textContainer}>
          {!text && (
            <_View style={styles.noInfoView}>
              <NoInfoSvg size={50} opacity={0.5} />
              <_Text style={styles.noInfo}>No information</_Text>
            </_View>
          )}
          <_Text style={styles.text}>{RemoveHTML(text)}</_Text>
        </ScrollView>
      </_View>
    </_View>
  );
};

const HIC_Card: FC<HIC_CardInterface> = ({text}) => {
  return (
    <_View style={[styles.cardContainer, {marginBottom: 190}]}>
      <_View style={styles.headerContainer}>
        <_Text style={styles.headerText}>{'Health Insurance Center'}</_Text>
      </_View>
      <_View style={styles.innerContainer}>
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={styles.textContainer}>
          {!text && (
            <_View style={styles.noInfoView}>
              <NoInfoSvg size={50} opacity={0.5} />
              <_Text style={styles.noInfo}>No information</_Text>
            </_View>
          )}
          <_Text style={styles.text}>{RemoveHTML(text)}</_Text>
        </ScrollView>
      </_View>
    </_View>
  );
};
export const MedicalTab = React.memo(_MedicalTab);
