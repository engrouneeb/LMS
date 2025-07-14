import React from 'react';
import { _View, _VectorIcons, _Text } from '../../../../../../components';
import { style2 } from './Style';
import { whiteThemeColors } from 'utilities';
interface props {
  Details: any;
}
export const DetailCard: React.FC<props> = ({ Details }) => {
  return (
    <_View style={{ padding: 20 }}>
      <_View style={style2.addressContainer}>
        <_Text style={style2.addressTitle}>{'Address'}</_Text>
        <_View style={{ marginTop: 10, marginBottom: 5 }}>
          <_View style={style2.adressInfo}>
            <_VectorIcons
              name={'location'}
              type='EvilIcons'
              color={whiteThemeColors.primary}
              size={16}
            />
            <_Text style={style2.adressInfoText}>{Details?.sd_Address}</_Text>
          </_View>
          <_View style={style2.otherAddress}>
            <_View style={[style2.adressInfo, { width: '40%' }]}>
              <_VectorIcons
                name={'city'}
                type='MaterialCommunityIcons'
                color={whiteThemeColors.primary}
                size={16}
              />
              <_Text style={style2.adressInfoText}>{Details?.sd_City}</_Text>
            </_View>
            <_View style={[style2.adressInfo, { width: '35%' }]}>
              <_VectorIcons
                name={'location'}
                type='Entypo'
                color={whiteThemeColors.primary}
                size={16}
              />
              <_Text style={style2.adressInfoText}>{Details?.sd_State}</_Text>
            </_View>
            <_View style={[style2.adressInfo, { width: '30%' }]}>
              <_VectorIcons
                name={'local-post-office'}
                type='MaterialIcons'
                color={whiteThemeColors.primary}
                size={16}
              />
              <_Text style={style2.adressInfoText}>{Details?.sd_Zip}</_Text>
            </_View>
          </_View>
        </_View>
      </_View>

      <_View style={[style2.addressContainer, { marginTop: 15 }]}>
        <_Text style={style2.addressTitle}>{'Contact Information'}</_Text>
        <_View style={style2.detailscon}>
          <_Text style={style2.keyText}>{'Primary Phone Number:'}</_Text>
          <_Text style={style2.valueText}>
            {Details?.sd_Primary_Phone_Number}
          </_Text>
        </_View>
        <_View style={style2.detailscon}>
          <_Text style={style2.keyText}>{'Mobile Number:'}</_Text>
          <_Text style={style2.valueText}>{Details?.sd_Mobile_Number}</_Text>
        </_View>
        <_View style={style2.detailscon}>
          <_Text style={style2.keyText}>{'Emergency Contact:'}</_Text>
          <_Text style={style2.valueText}>
            {Details?.sd_Emergency_Contact_Number}
          </_Text>
        </_View>
      </_View>

      <_View style={[style2.addressContainer, { marginTop: 15 }]}>
        <_Text style={style2.addressTitle}>{'Other Information'}</_Text>
        <_View style={style2.otherInfo}>
          {Details?.sd_Current_Employment && (
            <_Text style={style2.CurrentEmployment} numberOfLines={1}>
              {Details?.sd_Current_Employment}
            </_Text>
          )}
          <_View style={{ paddingHorizontal: 10 }}>
            <_View style={style2.payRange}>
              <_VectorIcons
                name='dollar-bill'
                type='Foundation'
                size={15}
                color={whiteThemeColors.green}
              />
              <_Text style={style2.payRangeText}>{Details?.sd_Pay_Range}</_Text>
            </_View>
            <_View style={style2.detailscon}>
              <_Text style={style2.keyText}>{'Education:'}</_Text>
              <_Text style={style2.valueText}>{Details?.sd_Education}</_Text>
            </_View>
            <_View style={[style2.detailscon, { borderBottomWidth: 0 }]}>
              <_Text style={style2.keyText}>{'Background Information:'}</_Text>
            </_View>
            <_Text style={[style2.valueText]}>
              {Details?.sd_Background_Info}
            </_Text>
          </_View>
        </_View>
      </_View>
    </_View>
  );
};
