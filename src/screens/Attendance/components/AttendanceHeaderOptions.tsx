import React, { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import {
  DropdownSauces,
  getTerminologyLabel,
  isParent,
  isStudent,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../components';
import { AttendanceEnum, AttendanceTypes } from './AttendanceConstants';
import CommonStyles from 'screens/CommonStyles';

const getColor = (flag: any, colorFor: string) => {
  if (colorFor == 'bg') {
    return flag ? whiteThemeColors.primary + 25 : whiteThemeColors.white + 90;
  } else if (colorFor == 'txt') {
    return flag ? whiteThemeColors.primary : whiteThemeColors.black;
  } else if (colorFor == 'icon') {
    return flag ? whiteThemeColors.primary : whiteThemeColors.greyDark;
  }
};
interface props {
  selected: any;
  setShowDropDown: any;
  UserInfo: any;
  selectedOptionHeader: any;
  setSelectedOptionHeader: any;
  setAllAttendanceType: any;
  setSelectedAttendanceTypeAll: any;
}
const AttendanceHeaderOptions: React.FC<props> = ({
  selected,
  setShowDropDown,
  UserInfo,
  selectedOptionHeader,
  setSelectedOptionHeader,
  setAllAttendanceType,
  setSelectedAttendanceTypeAll,
}) => {
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
  const applyTerminologyLabel = (obj: string) => {
    // Loop through the terminology data and return the label if a match is found
    for (let key in terminologies) {
      if (obj === key) {
        return terminologies[key]?.label || obj; // Fallback to the original `obj` if no label is found
      } else if (obj.includes(key)) {
        return obj.replace(key, terminologies[key]?.label || key); // Replace a part of `obj` if a match is found
      }
    }
    return obj; // Return the original if no match
  };
  return (
    <DropdownSauces
      top={53}
      left={-19}
      role_Name={UserInfo.roleName}
      hideIt={() => setShowDropDown(false)}
    >
      <_View style={styles.mainContainer}>
        {AttendanceTypes.slice(2).map((obj, index) => {
          return (
            <Pressable
              disabled={
                isStudent(UserInfo.roleName) || isParent(UserInfo.roleName)
              }
              style={[
                styles.btnContainer,
                {
                  backgroundColor: getColor(selectedOptionHeader == obj, 'bg'),
                },
              ]}
              onPress={() => {
                setSelectedAttendanceTypeAll != undefined &&
                  setSelectedAttendanceTypeAll(selected ? '' : obj);
                setAllAttendanceType(AttendanceEnum[obj]);
                setSelectedOptionHeader(obj == selectedOptionHeader ? '' : obj);
                setShowDropDown(false);
              }}
            >
              <_VectorIcons
                type={'MaterialIcons'}
                name={
                  selectedOptionHeader == obj
                    ? 'radio-button-checked'
                    : 'radio-button-unchecked'
                }
                size={16}
                color={getColor(selectedOptionHeader == obj, 'icon')}
              />
              <_Text
                style={[
                  styles.text,
                  {
                    color: getColor(selectedOptionHeader == obj, 'txt'),
                  },
                ]}
              >
                {applyTerminologyLabel(obj)}
              </_Text>
            </Pressable>
          );
        })}
      </_View>
    </DropdownSauces>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: whiteThemeColors.background,
    shadowColor: whiteThemeColors.isBlock,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: Platform.OS == 'android' ? 1 : 0.5,
    shadowRadius: 16.0,
    elevation: 15,
    zIndex: 1,
    padding: 15,
  },
  text: {
    fontSize: 12,
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.medium,
    marginLeft: 10,
  },
  btnContainer: {
    width: '100%',
    height: 30,
    borderRadius: 10,

    marginBottom: 7,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
});
export default AttendanceHeaderOptions;
