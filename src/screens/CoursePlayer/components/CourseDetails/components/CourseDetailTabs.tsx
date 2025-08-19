import React, {useEffect, useState} from 'react';
import {styles} from '../styles';
import {Text, TouchableOpacity} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import {Dropdown} from 'react-native-element-dropdown';
import {_VectorIcons, _View} from '../../../../../components';
import {
  getTerminologyLabel,
  isStudent,
  StudentInterface,
  TerminologyMap,
  whiteThemeColors,
} from '../../../../../Utilities';
import {CourseSvg2, OnlineClassSvg} from '../../../../../../assets/Icons';

interface props {
  handleClassesAssignToCourse: any;
  roleName: string;
  onPress1: any;
  onPress2: any;
  onPress3: any;
}

export const CourseDetailTabs: React.FC<props> = ({
  handleClassesAssignToCourse,
  roleName,
  onPress1,
  onPress2,
  onPress3,
}) => {
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {},
  );
  const [dropdownItems, setDropdownItems] = useState<
    Array<{label: string; value: string}>
  >([]);

  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
      setDropdownItems([
        {label: 'Student White Board', value: '0'},
        {
          label: 'Class White Board'.replace(
            'Class',
            terms['Class']?.label || 'Class',
          ),
          value: '1',
        },
      ]);
    };
    fetchTerminologies();
  }, []);

  return (
    <_View style={styles.topView}>
      <_View style={styles.border}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            handleClassesAssignToCourse('onlineClass');
          }}
          style={styles.topViewButton}>
          <OnlineClassSvg size={20} color={whiteThemeColors.white} />
        </TouchableOpacity>
      </_View>

      {isStudent(roleName as StudentInterface) ? (
        <_View style={styles.border}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress1}
            style={styles.topViewButton}>
            <_VectorIcons
              name="easel-outline"
              type="Ionicons"
              color={whiteThemeColors.icons.whiteIcon}
              size={25}
            />
          </TouchableOpacity>
        </_View>
      ) : (
        <_View style={styles.border}>
          <TouchableOpacity activeOpacity={0.9}>
            <Dropdown
              data={dropdownItems}
              labelField="label"
              valueField="value"
              onChange={item => onPress2(item.value)}
              style={[styles.topViewButton, {justifyContent: 'center'}]}
              placeholder=""
              renderRightIcon={() => null}
              renderItem={(item, selected) => (
               <_View style={{padding: 10, borderBottomColor: whiteThemeColors.greyDark + 30, borderBottomWidth: 0.4}}>
                  <Text style={styles.dropDownItemTxt}>{item.label}</Text>
                </_View>
              )}
              dropdownPosition="bottom"
              containerStyle={[styles.dropDownList, CommonStyles.shadow]}
              itemTextStyle={{color: whiteThemeColors.black}}
              itemContainerStyle={{backgroundColor: 'transparent'}}
              activeColor="transparent"
              selectedTextStyle={{}}
              showsVerticalScrollIndicator={false}
              renderLeftIcon={() => (
                <_VectorIcons
                  type={'Ionicons'}
                  name="easel-outline"
                  color={whiteThemeColors.icons.whiteIcon}
                  size={20}
                  style={{padding: 15}}
                />
              )}
            />
          </TouchableOpacity>
        </_View>
      )}
      <_View style={styles.border}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.topViewButton}
          onPress={() => {
            handleClassesAssignToCourse('onlineNotes');
          }}>
          <_VectorIcons
            name="clipboard-notes"
            type="Foundation"
            size={20}
            color={whiteThemeColors.white}
          />
        </TouchableOpacity>
      </_View>
      <_View style={styles.border}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.topViewButton}
          onPress={onPress3}>
          <CourseSvg2 size={20} color={whiteThemeColors.white} />
        </TouchableOpacity>
      </_View>
    </_View>
  );
};
