import { useNavigation } from '@react-navigation/native';
import { StudentDetialsInterface } from 'interfaces';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import { getTerminologyLabel, isStudent, TerminologyMap, whiteThemeColors } from 'utilities';
import { _Screen } from '../../../components';
import DrawerScreen from '../../../navigation/Drawer/DrawerScreenNames';
import Headers from '../../Headers';
import TabView from './InfoTabs';
import { useStudentInfoTabs } from '../hooks';
export const StudentDetials: FC<StudentDetialsInterface> = ({ route }) => {
  const navigation: any = useNavigation();
  const [classTerminology, setClassTerminology] = useState([{}]);
  const [courseTerminology, setCourseTerminology] = useState([{}]);
  const [levelTerminology, setLevelTerminology] = useState([{}]);
  const studentInfo: any = useSelector(
    (state: Appstate) => state.StudentInfoReducer.stdInfo,
  );
  const { roleName, fullName }: any = useSelector(
    (state: Appstate) => state.User.UserInfo,
  );
  const { routes } = useStudentInfoTabs();
  const billingTabIndex = routes.findIndex(tab => tab.key === 'billing');
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {},
  );
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setClassTerminology([{ label: 'Classes', name: terms['Class']?.pluralLabel }]);
      setCourseTerminology([{ label: 'Course', name: terms['Course']?.pluralLabel }]);
      setLevelTerminology([{ label: 'Level', name: terms["Level"]?.label }]);
      setTerminologies(terms);
    };
    fetchTerminologies();
  }, [route]);

  const handleBack = () => {
    console.log("test");
    !isStudent(roleName)
      ? navigation.navigate('Student Info')
      : navigation.navigate(DrawerScreen.dashboard.name);
    return true;
  };
  return (
    <_Screen
      style={{ backgroundColor: whiteThemeColors.white }}
      header={
        <Headers
          isBack
          GoBack={handleBack}
          Screen={`${studentInfo?.studentName != undefined
              ? studentInfo?.studentName
              : fullName
            }'s Info`}
        />
      }
      hideTopSafeArea
      hideBottomSafeArea
      onAndroidBack={handleBack}
    >
      <TabView
        studetName={studentInfo?.studentName}
        studentId={studentInfo?.studentId}
        classTerminology={classTerminology}
        courseTerminology={courseTerminology}
        levleTerminology={levelTerminology}
        billing={route.params.billing}
        initialIndex={route.params.billing&&billingTabIndex >= 0 ? billingTabIndex : 0}
      />
    </_Screen>
  );
};

export const StudentInfoDetials = React.memo(StudentDetials);
