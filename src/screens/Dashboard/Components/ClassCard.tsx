import React, { FC, useEffect, useState } from 'react';

import { _Screen, _Text, _VectorIcons, _View } from '../../../components';

import { AppState, StyleSheet, TouchableOpacity } from 'react-native';
import {
  getTerminologyLabel,
  isParent,
  isStudent,
  TerminologyMap,
  whiteThemeColors,
} from '../../../Utilities';
import CommonStyles from '../../CommonStyles';
import { useSelector } from 'react-redux';
interface Props {
  item: any;
  cancelConfirmation: (item: any) => void;
  startClass: (item: any) => void;
}
export const ClassCard: FC<Props> = ({
  item,
  cancelConfirmation,
  startClass,
}) => {
  const { roleName }: any = useSelector(
    (state: AppState) => state.User.UserInfo,
  );
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
  return (
    <_View style={_styles.cardContainer}>
      <_View style={_styles.cardLeftContainer}>
        <_View style={{ position: 'absolute', left: -18, top: 13 }}>
          <_VectorIcons
            type={'AntDesign'}
            name='clockcircleo'
            size={60}
            color={whiteThemeColors.white + 10}
          />
        </_View>
        <_View style={[_styles.cardLeftTxtContainer, _styles.shadow]}>
          <_Text style={_styles.cardLeftTxt}>{`${item?.timeFrom}`}</_Text>
          <_VectorIcons
            type='Entypo'
            name='dot-single'
            color='gray'
            size={10}
            style={{ marginTop: 5 }}
          />
          <_VectorIcons
            type='Entypo'
            name='dot-single'
            color='gray'
            size={10}
          />
          <_VectorIcons
            type='Entypo'
            name='dot-single'
            color='gray'
            size={10}
            style={{ marginBottom: 5 }}
          />

          <_Text style={_styles.cardLeftTxt}>{`${item?.timeTo}`}</_Text>
          {item?.isLocalTime && (
            <_Text
              style={[
                _styles.cardLeftTxt,
                { fontSize: 10, color: whiteThemeColors.greyDark },
              ]}
            >{`(Local)`}</_Text>
          )}
        </_View>
      </_View>
      <_View style={_styles.cardRightContainer}>
        {item?.isMakeUpClass && (
          <_View style={[_styles.makeupclassContainer, _styles.shadow]}>
            <_Text
              numberOfLines={1}
              style={[
                _styles.instructorText,
                { color: whiteThemeColors.black, marginLeft: 0 },
              ]}
            >
              {`Makeup ${terminologies['Class']?.label}`}
            </_Text>
          </_View>
        )}
        <_View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <_VectorIcons
            type='Entypo'
            name='dot-single'
            color={whiteThemeColors.primary}
            size={30}
          />
          <_Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              fontFamily: CommonStyles.fonts.semiBold,
              color: whiteThemeColors.black,
              width: '90%',
            }}
          >
            {item?.courseName}
          </_Text>
        </_View>

        <_Text
          numberOfLines={1}
          style={{
            fontSize: 11,
            fontFamily: CommonStyles.fonts.regular,
            color: whiteThemeColors.black,
            width: '90%',
            marginLeft: 30,
          }}
        >
          {item?.className}
        </_Text>

        <_View style={{ marginLeft: 20 }}>
          {item?.instructorName.length > 0 ? (
            <>
              <_Text
                numberOfLines={1}
                style={{
                  fontSize: 10,
                  fontFamily: CommonStyles.fonts.regular,
                  color: whiteThemeColors.greyDark,
                  width: '90%',
                  marginLeft: 10,
                }}
              >
                {`By  `}
              </_Text>
              <_Text
                numberOfLines={1}
                style={{
                  fontSize: 10,
                  fontFamily: CommonStyles.fonts.regular,
                  color: whiteThemeColors.black,
                  width: '90%',
                  textTransform: 'capitalize',
                  marginLeft: 10,
                }}
              >
                {item?.instructorName}
              </_Text>
            </>
          ) : (
            <_Text
              numberOfLines={1}
              style={{
                fontSize: 10,
                fontFamily: CommonStyles.fonts.regular,
                color: whiteThemeColors.greyDark,
                width: '90%',
                marginLeft: 10,
              }}
            >
              {'No Instructor Assigned'}
            </_Text>
          )}
        </_View>

        <_View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          {!isParent(roleName) && <TouchableOpacity
            onPress={() => {
              startClass(item);
            }}
            style={[
              _styles.btn,

              {
                width:
                  isStudent(roleName) || isParent(roleName) ? '80%' : '35%',
              },
            ]}
          >
           <_Text style={_styles.btnTxt}>
              {isStudent(roleName)
                ? `Join ${terminologies['Class']?.label}`
                : `Start ${terminologies['Class']?.label}`}
            </_Text>
          </TouchableOpacity>
          }
          {!isStudent(roleName) && !isParent(roleName) && (
            <TouchableOpacity
              onPress={() => cancelConfirmation(item)}
              style={[_styles.btn, { backgroundColor: whiteThemeColors.red }]}
            >
              <_Text style={_styles.btnTxt}>
                {`Cancel ${terminologies['Class']?.label}`}
              </_Text>
            </TouchableOpacity>
          )}
        </_View>
      </_View>
    </_View>
  );
};

const _styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 9,
    width: '100%',
    height: 120,
    borderRadius: 0,
    backgroundColor: whiteThemeColors.white + 90,
    borderWidth: 0,

    alignSelf: 'center',
    flexDirection: 'row',
  },
  cardLeftContainer: {
    height: '100%',
    width: '25%',
    backgroundColor: whiteThemeColors.white + 90,
  },
  cardRightContainer: {
    height: '100%',
    width: '75%',
    backgroundColor: whiteThemeColors.primary + 30,
    borderLeftWidth: 3,
    borderColor: whiteThemeColors.primary,
    padding: 10,
  },
  cardLeftTxtContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLeftTxt: {
    color: whiteThemeColors.black,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.regular,
    textAlign: 'center',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.green,
    width: '35%',
    height: 23,
    borderRadius: 8,
  },
  btnTxt: {
    fontSize: 11,
    color: whiteThemeColors.white,

    fontFamily: CommonStyles.fonts.semiBold,
  },
  shadow: {
    shadowColor: whiteThemeColors.greyDark,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  makeupclassContainer: {
    width: 80,
    height: 17,
    backgroundColor: whiteThemeColors.white,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    zIndex: 10,
    position: 'absolute',
    right: 5,
    top: 10,
  },
  instructorText: {
    color: whiteThemeColors.white,
    fontSize: 10,

    marginLeft: 10,
  },
});
