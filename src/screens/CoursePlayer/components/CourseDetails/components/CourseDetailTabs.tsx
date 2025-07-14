import React, { useEffect, useState } from 'react';
import { styles } from '../styles';
import { TouchableOpacity } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import ModalDropdown from 'react-native-modal-dropdown';
import { _ModalDropdown, _VectorIcons, _View } from '../../../../../components';
import {
  getTerminologyLabel,
  isStudent,
  StudentInterface,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import { CourseSvg2, OnlineClassSvg } from '../../../../../../assets/Icons';
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
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
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
          style={styles.topViewButton}
        >
          <OnlineClassSvg size={20} color={whiteThemeColors.white} />
        </TouchableOpacity>
      </_View>

      {isStudent(roleName as StudentInterface) ? (
        <_View style={styles.border}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress1}
            style={styles.topViewButton}
          >
            <_VectorIcons
              name='ios-easel-outline'
              type='Ionicons'
              color={whiteThemeColors.icons.whiteIcon}
              size={25}
            />
          </TouchableOpacity>
        </_View>
      ) : (
        <_View style={styles.border}>
          <TouchableOpacity activeOpacity={0.9} style={styles.topViewButton}>
            <ModalDropdown
              // scrollEnabled={false}
              saveScrollPosition={false}
              options={[
                'Student White Board',
                'Class White Board'.replace(
                  'Class',
                  terminologies['Class']?.label || 'Class',
                ),
              ]}
              dropdownStyle={[styles.dropDownList, CommonStyles.shadow]}
              dropdownTextStyle={styles.dropDownItemTxt}
              onSelect={onPress2}
              textStyle={{ fontSize: 13 }}
            >
              <_VectorIcons
                type={'Ionicons'}
                name='ios-easel-outline'
                color={whiteThemeColors.icons.whiteIcon}
                size={20}
                style={{
                  flex: 1,
                  padding: 15,
                }}
              />
            </ModalDropdown>
          </TouchableOpacity>
        </_View>
      )}
      <_View style={styles.border}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.topViewButton}
          onPress={() => {
            handleClassesAssignToCourse('onlineNotes');
          }}
        >
          <_VectorIcons
            name='clipboard-notes'
            type='Foundation'
            size={20}
            color={whiteThemeColors.white}
          />
        </TouchableOpacity>
      </_View>
      <_View style={styles.border}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.topViewButton}
          onPress={onPress3}
        >
          <CourseSvg2 size={20} color={whiteThemeColors.white} />
        </TouchableOpacity>
      </_View>
    </_View>
  );
};
