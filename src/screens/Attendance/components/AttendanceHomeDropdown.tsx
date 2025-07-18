import React, { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
  DropdownSauces,
  getTerminologyLabel,
  isParent,
  isStudent,
  TerminologyMap,
  whiteThemeColors,
} from '../../../Utilities';
import { _Text, _View } from '../../../components';
import Screens from '../../../screenNames';
import CommonStyles from '../../CommonStyles';
import { Appstate } from '../../../reducers/Appstate';
import { useAppModulePermission, useFindPermissions } from '../../../customHooks';
import { UserPermissionsEnums } from '../../values/english';
interface props {
  showDropDown: any;
  setShowDropDown: any;
  UserInfo: any;
  navigation: any;
}
const AttendanceHomeDropdown: React.FC<props> = ({
  showDropDown,
  setShowDropDown,
  UserInfo,
  navigation,
}) => {
  const selectedLanguage = useSelector((state: Appstate) => state.language);
  const { filterMenuOptions } = useAppModulePermission();
  const [permission] = useFindPermissions(
    UserPermissionsEnums.CreateMakeupClass,
  );
  const isAddMakeUpClass=filterMenuOptions("AddMakeUpClass");
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

  const handleClick = (variant: any) => {
    setShowDropDown(false);
    if (typeof variant === 'string')
      navigation.navigate(Screens.attendanceViewByClass.name, {
        variant,
      });
    else
      navigation.navigate(Screens.addMakeupClass.name, {
        refresh: variant,
      });
  };

  return (
    <DropdownSauces
      display={showDropDown ? 'flex' : 'none'}
      top={54}
      left={18}
      role_Name={UserInfo.roleName}
      hideIt={() => setShowDropDown(false)}
    >
      <_View style={styles.mainContainer}>
        <Pressable
          style={[CommonStyles.mL0, { padding: 5 }]}
          onPress={() => handleClick('viewByClass')}
        >
          <_Text style={styles.text}>
            {selectedLanguage.markAttendenceDateWiseScreen.ViewbyClass.replace(
              'Class',
              terminologies['Class']?.label,
            )}
          </_Text>
        </Pressable>
        {!isStudent(UserInfo.roleName) && !isParent(UserInfo.roleName) ? (
          <_View>
            <Pressable
              style={[CommonStyles.mL0, { padding: 5 }]}
              onPress={() => handleClick('cancelClass')}
            >
              <_Text style={styles.text}>
                {selectedLanguage.markAttendenceDateWiseScreen.CancelClass.replace(
                  'Class',
                  terminologies['Class']?.label,
                )}
              </_Text>
            </Pressable>
            {permission?.view &&
            <Pressable
              style={[CommonStyles.mL0, { padding: 5 }]}
              onPress={() => handleClick(true)}
            >
              <_Text style={styles.text}>
                {selectedLanguage.markAttendenceDateWiseScreen.AddMakeupClass.replace(
                  'Class',
                  terminologies['Class']?.label,
                )}
              </_Text>
            </Pressable>}
          </_View>
        ) : null}
      </_View>
    </DropdownSauces>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: whiteThemeColors.background,
    borderRadius: 20,

    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: Platform.OS == 'android' ? 1 : 0.5,
    shadowRadius: 6.0,
    elevation: 15,
    zIndex: 1,
    padding: 7,
  },
  text: {
    fontFamily: CommonStyles.fonts.medium,
    fontSize: 13,
    paddingLeft: 10,
  },
});
export default AttendanceHomeDropdown;
