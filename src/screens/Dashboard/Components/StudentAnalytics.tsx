import React, { useEffect, useState } from 'react';
import {
  Counter,
  isInstructor,
  isParent,
  isStudent,
  whiteThemeColors,
} from '../../../Utilities';
import {
  ClassroomSvg,
  GraduationCap,
  StudentIcon,
} from '../../../../assets/Icons';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { endpoint, _Text, _View, _Image } from '../../../components';
import CommonStyles from '../../CommonStyles';
import styles from '../style';
import { Image } from 'react-native';
import WhiteLabelConfig from '../../../WhiteLabelConfig';
interface props {
  firstCounterText?: string;
  secondCounterText?: string;
  thirdCounterText?: string;
  userRoleName: any;
  studentId: number | null;
}
const StudentAnalyticsComponent: React.FC<props> = ({
  firstCounterText,
  secondCounterText,
  thirdCounterText,
  userRoleName,
  studentId,
}) => {
  const [activeClasses, setActiveClasses] = useState(0);
  const [coursesCompleted, setCoursesCompleted] = useState(0);
  const [activeStudents, setActiveStudents] = useState(0);
  const { Get } = DataAccess();

  console.log({"fonts":CommonStyles.fonts});
const isValhallan = WhiteLabelConfig.APP_VARIANT_NAME?.toLowerCase() === 'valhallan';
console.log({"isValhallan":isValhallan});
  useEffect(() => {
    getStudentAnalytics();
  }, [userRoleName, studentId]);

  const getStudentAnalytics = async () => {
    var EndPoint: endpoint = ApiEndpoints.GetStudentAnalytics;
    EndPoint.params = `?studentId=${studentId}`;
    Get(EndPoint)
      .then((res: any) => {
        setActiveClasses(res.activeClasses);
        setActiveStudents(res.activeStudents);
        setCoursesCompleted(res.coursesCompleted);
        return;
      })
      .catch((err: any) => {
        console.log('err', err);
      });
  };

  const SingleTag_Text = ({ value, tagColor: backgroundColor }: any) => {
    return (
      <_View
        style={{
          flex: 1,
          borderBottomWidth: 0.3,
          borderBottomColor: 'gray',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginLeft: 10,
        }}
      >
        <_View
          style={{
            width: 18,
            height: 8,
            borderRadius: 5,
            backgroundColor,
          }}
        />
        <_Text
          style={{
            fontFamily: CommonStyles.fonts.medium,
            fontSize: 12,
            textAlign: 'left',
          }}
        >
          {value}
        </_Text>
      </_View>
    );
  };

  return (
    <_View style={[styles.topView, { flexDirection: 'row', marginBottom: 20 }]}>
      <_View style={{ width: '50%', height: '100%', zIndex: 10 }}>
        <_View
          style={{
            flex: 1,
            backgroundColor:
              whiteThemeColors.DashBoardCounters.assignedClassesBg,
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
            alignItems: 'center',
            paddingHorizontal: 10,
            flexDirection: 'row',
          }}
        >
          <_View
            style={{
              width: 60,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                tintColor: whiteThemeColors.white + 90,
              }}
              source={require('../../../../assets/Icons/assign.jpg')}
            />
          </_View>
          <_Text
            style={{
              fontSize: 16,
              fontFamily: CommonStyles.fonts.bold,
              marginLeft: 30,
              color: whiteThemeColors.white,
            }}
          >
            <Counter Count={activeClasses} />
          </_Text>
        </_View>
        {!isStudent(userRoleName) && !isParent(userRoleName) ? (
          <_View
            style={{
              flex: 1,
              backgroundColor:
                whiteThemeColors.DashBoardCounters.activeStudents,
              borderBottomEndRadius: isInstructor(userRoleName) ? 10 : 0,
              borderBottomStartRadius: isInstructor(userRoleName) ? 10 : 0,
              alignItems: 'center',
              paddingHorizontal: 10,
              flexDirection: 'row',
            }}
          >
            <_View
              style={{
                width: 60,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
            >
              <StudentIcon size={20} color={whiteThemeColors.white + 90} />
            </_View>
            <_Text
              style={{
                fontSize: 16,
                fontFamily: CommonStyles.fonts.bold,
                marginLeft: 30,
                color: whiteThemeColors.white,
              }}
            >
              <Counter Count={activeStudents} />
            </_Text>
          </_View>
        ) : null}
        {!isInstructor(userRoleName) && (
          <_View
            style={{
              flex: 1,
              backgroundColor:
                whiteThemeColors.DashBoardCounters.coursesCompleteBg,
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
              alignItems: 'center',
              paddingHorizontal: 10,
              flexDirection: 'row',
            }}
          >
            <_View
              style={{
                width: 60,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
            >
              <GraduationCap size={30} color={whiteThemeColors.white + 90} />
            </_View>
            <_Text
              style={{
                fontSize: 16,
                fontFamily: CommonStyles.fonts.bold,
                marginLeft: 30,
                color: whiteThemeColors.white,
              }}
            >
              <Counter Count={coursesCompleted} />
            </_Text>
          </_View>
        )}
      </_View>
      <_View style={{ width: '50%', height: '100%' }}>
        <SingleTag_Text
          value={firstCounterText}
          tagColor={whiteThemeColors.DashBoardCounters.assignedClassesBg}
        />

        {!isStudent(userRoleName) && !isParent(userRoleName) && (
          <SingleTag_Text
            value={secondCounterText}
            tagColor={whiteThemeColors.DashBoardCounters.activeStudents}
          />
        )}
        {!isInstructor(userRoleName) && (
          <SingleTag_Text
            value={thirdCounterText}
            tagColor={whiteThemeColors.DashBoardCounters.coursesCompleteBg}
          />
        )}
      </_View>
    </_View>
  );
};

export const StudentAnalytics = React.memo(StudentAnalyticsComponent);
