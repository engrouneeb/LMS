import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  getTerminologyLabel,
  isAdmin,
  isCoordinator,
  isExecutive,
  TerminologyMap,
  whiteThemeColors,
} from '../../../../../Utilities';
import { TouchableOpacity } from 'react-native';
import { _Text, _View } from '../../../../../components';
import { hp } from '../../../../../Helpers/Responsiveness';
import CommonStyles from '../../../../CommonStyles';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../../../reducers/Appstate';
import { useAppModulePermission } from '../../../../../customHooks';

export const IosMenu = (props: any) => {
  const userRole: any = useSelector((state: Appstate) => state.User.UserInfo);
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {},
  );
  const [menuOption,setMenuOption]=useState<any[]>(props.header);
  const { filterMenuOptions } = useAppModulePermission(); 
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
    };
    fetchTerminologies();
  }, []);
  useEffect(()=>{
    const {roleName} = userRole;
    if(!(isAdmin(roleName)||isExecutive(roleName)||isCoordinator(roleName))){
      const newArray = menuOption.slice(0, -1);
      setMenuOption(newArray); // Update the state
    } else {
      const newArray = filterMenuOptions(menuOption);
      setMenuOption(newArray); // Update the state
    }
  },[userRole.roleName])
  return (
    <_View style={{ ...styles.container, display: props.display }}>
      {menuOption&&menuOption.map((obj: any, index: number) => {
        return (
          <TouchableOpacity
            onPress={() => {
              props.handelPopUpMenu(false, 0);
              props.selectCategory(props.item.courseId, index);
            }}
            style={styles.valueCon}
          >
            <_Text
              style={{
                textAlign: 'left',
                fontFamily: CommonStyles.fonts.regular,
                fontSize: 12,
                paddingLeft:20
              }}
            >
             {`${obj.value.replace(/Class(es)?/gi, terminologies['Class']?.label || 'Class')}`}
            </_Text>
          </TouchableOpacity>
        );
      })}
    </_View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteThemeColors.background,
    shadowColor: whiteThemeColors.black,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: hp(2),
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: 200,
    borderRadius: 15,
    position: 'absolute',
    right: 10,
    top: 30,
    zIndex:100
  },
  valueCon: {
    height: 30,
    justifyContent: 'center',
  },
});
