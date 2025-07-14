import React, { FC, Fragment, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import { whiteThemeColors } from 'utilities';
import {
  ContactListModal,
  FamilyInfoCard,
  StudentInfoCard,
} from './components';
import { _ActivityIndicator } from 'screens/Loader';
import { NoDataFound } from '../NoDataFound';
import { _View, _Text, _VectorIcons, endpoint } from 'components';
import { DataAccess } from '../../../../../../../data/DAL';
const { width, height } = Dimensions.get('screen');
import * as StudentInfoStuff from '../../../../../../actions/StudentInfoAction';
import ApiEndpoints from '../../../../../../../data/ApiEndpoints';
import { useDashboard } from 'screens/Dashboard/Hooks/useDashboard';
const _OverviewTab: FC = () => {
  const {
    overview: { familyInfo, studentInfo, contactInfo },
    loading,
  }: any = useSelector((state: Appstate) => ({
    overview: state.StudentInfoReducer.overview,
    loading: state.StudentInfoReducer.isOverviewLoading,
  }));
  const dispatch = useDispatch();
  const [noData, setNoData] = useState(false);
  const { Get } = DataAccess();
  const { getParentQuickLinkConfiguration } = useDashboard();
  const [quickLinkConfig, setQuickLinkConfig] = useState<any[]>([]);
  let { roleName } = useSelector((state: any) => state.User.UserInfo);
  useEffect(() => {
    !loading &&
      setNoData(
        (familyInfo && Boolean(Object.keys(familyInfo).length)) ||
          Boolean(studentInfo?.length) ||
          Boolean(contactInfo?.length)
      );
  }, [studentInfo, familyInfo, contactInfo]);
  useEffect(() => {
    if (studentInfo[0]?.studentId) {
      loadStudentData(studentInfo[0]?.studentId);
    }
  }, [studentInfo[0]?.studentId]);
  useEffect(() => {
    // Fetch quickLinkConfig for parent quick links
    const fetchQuickLinks = async () => {
      try {
        const quickLinksData = await getParentQuickLinkConfiguration();
        if (quickLinksData) {
          setQuickLinkConfig(quickLinksData.filter((item: any) => item.status));
        }
      } catch (error) {
        // handle error
      }
    };
    fetchQuickLinks();
  }, []);
  const [showContacts, setShowContacts] = useState(false);
  const showContactList = () => setShowContacts(true);
  const hideContactList = () => setShowContacts(false);
  const getSuccessAction = (actionType: string) => {
    const successActions: any = {
      skills: StudentInfoStuff.studentInfoSkillsSuccess,
      enrolledEvents: StudentInfoStuff.studentInfoEnrolledEventsSuccess,
      medical: StudentInfoStuff.studentInfoMedicalSuccess,
      feedback: StudentInfoStuff.studentInfoFeedbackSuccess,
      classes: StudentInfoStuff.studentInfoClassesSuccess,
    };
    return successActions[actionType];
  };
  const loadStudentData = async (studentId: string) => {
    console.log('loadStudentData');

    try {
      const endpoints: endpoint[] = [
        {
          url: ApiEndpoints.GetStudentSkills.url,
          params: `?studentId=${studentId}`,
        },
        {
          url: ApiEndpoints.GetUserEnrolledEvents.url,
          params: `?studentId=${studentId}`,
        },
        {
          url: ApiEndpoints.GetStudentMedical.url,
          params: `?studentId=${studentId}`,
        },
        {
          url: ApiEndpoints.GetStudentFeedback.url,
          params: `?studentId=${studentId}`,
        },
        {
          url: ApiEndpoints.StudentGetClasses.url,
          params: `?studentId=${studentId}&skip=0&take=-1`,
        },
      ];
      const responses = await Promise.allSettled(
        endpoints.map((endpoint) => Get(endpoint))
      );

      responses.forEach((result, index) => {
        const res = result.status === 'fulfilled' ? result.value : null;
        const actionType = getActionType(index);
        const successAction = getSuccessAction(actionType);
        const failureAction = getFailureAction(actionType);

        if (result.status === 'fulfilled' && !res.error) {
          Boolean(actionType == 'classes')
            ? dispatch(successAction(res))
            : dispatch(successAction(res));
        } else {
          dispatch(failureAction());
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const getFailureAction = (actionType: string) => {
    const failureActions: any = {
      skills: StudentInfoStuff.studentInfoSkillsFailed,
      enrolledEvents: StudentInfoStuff.studentInfoEnrolledEventsFailed,
      medical: StudentInfoStuff.studentInfoMedicalFailed,
      feedback: StudentInfoStuff.studentInfoFeedbackFailed,
      classes: StudentInfoStuff.studentInfoClassesFailed,
    };
    return failureActions[actionType];
  };
  const getActionType = (index: number): string => {
    const actionTypes = [
      'skills',
      'enrolledEvents',
      'medical',
      'feedback',
      'classes',
    ];
    return actionTypes[index];
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {loading ? (
        <_View style={styles.loaderContainer}>
          <_ActivityIndicator size='large' />
        </_View>
      ) : !noData ? (
        <NoDataFound />
      ) : (
        <Fragment>
          <StudentInfoCard
            onPress={showContactList}
            studentInfo={studentInfo && studentInfo[0]}
            onSubmitt={() => {}}
            quickLinkConfig={quickLinkConfig}
            roleName={roleName}
          />
          <FamilyInfoCard familyInfo={familyInfo} />
          <ContactListModal
            show={showContacts}
            close={hideContactList}
            contacts={contactInfo}
            familyInfo={familyInfo}
          />
        </Fragment>
      )}
    </ScrollView>
  );
};
export const OverviewTab = React.memo(_OverviewTab);

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteThemeColors.background,
    flex: 1,
    flexGrow: 1,
  },
  loaderContainer: {
    width,
    height: height - 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
