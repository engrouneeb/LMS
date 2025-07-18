import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
  CustomAlert,
  getTerminologyLabel,
  isStudent,
  StudentInterface,
  TerminologyMap,
  whiteThemeColors,
} from '../../../../Utilities';
import EndPoints from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import { _Screen, _Text, _View, endpoint } from '../../../../components';
import Header from '../../../Headers';
import { _ActivityIndicator } from '../../../Loader';
import { TabViewComponent } from '../common';
import { ChallengeDetailInterface } from '../../../../interfaces';
import { Appstate } from '../../../../reducers/Appstate';
import { useNavigation } from '@react-navigation/native';

const backlogColumnName = {
  courseContent: 0,
  Attachments: 12,
  Discussion: 11,
  WhiteBoardAttachments: 103,
  ParentCommunication: 121,
  CourseReviews: 120,
  Instructions: 8,
};

const _ChallengeDetail: React.FC<ChallengeDetailInterface> = ({ route }) => {
  const { Get } = DataAccess();
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [challengeData, setChallengeData] = useState<any>();
  const selectedStudent: any = useSelector(
    (state: Appstate) => state.courseAssignStudentsReducer.data,
  );
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
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

  useEffect(() => {
    let studentId = user.userID;
    if (!isStudent(route.params.role as StudentInterface)) {
      if (selectedStudent == null) {
        studentId = 0;
      } else {
        studentId = selectedStudent.id;
      }
    }

    let url: endpoint = EndPoints.GetChallengeDetail;
    url.params = `?ChallengeId=${route.params.challengeId}&StudentId=${studentId}`;
    Get(url).then((res: any) => {
      setLoading(false);
      if (res) {
        let newTabList = res.backlogTabElementsList;
        let instructionData = {};
        newTabList = newTabList.filter((tab: any) => {
          if (tab.backlogColumnName !== backlogColumnName.Instructions) {
            return true;
          } else {
            instructionData = tab;
            return false;
          }
        });
        newTabList.splice(0, 0, instructionData);
        res.backlogTabElementsList = newTabList;
        setChallengeData(res);
      } else {
        setShowAlert(true);
        setAlertMessage(res.error_description);
      }
    });
  }, []);
  const handleBack = () => {
    navigation.goBack();
    return true; //disable back button
  };
  return (
    <_Screen
      header={
        <Header
          isBack={true}
          isMenu={false}
          isLogout={false}
          Screen={route?.params?.header.replace(
            'Challenge',
            terminologies['Challenge']?.label || 'Challenge',
          )}
          ScreenName={' '}
          GoBack={() => {
            navigation.goBack();
          }}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
    >
      {loading && (
        <_View style={styles.loadingView}>
          <_ActivityIndicator size='large' />
        </_View>
      )}
      <TabViewComponent
        navigation={navigation}
        routePath={route}
        tabBar={challengeData?.backlogTabElementsList}
        challengeStepsLst={challengeData?.challengeSteps}
        isCourse={false}
        role={route.params.role}
      />
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={'Error'}
          msg={alertMessage}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setShowAlert(false);
          }}
        />
      )}
    </_Screen>
  );
};

export const ChallengeDetail = React.memo(_ChallengeDetail);

const styles = StyleSheet.create({
  loadingView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: whiteThemeColors.greyLite + 'eee50',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
});
