import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import {
  getTerminologyLabel,
  TerminologyMap,
  isParent,
  isStudent,
  whiteThemeColors,
} from 'utilities';
import { AssesmentSvg } from '../../../assets/Icons';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import { assignStudentsFailed } from '../../actions/CourseAssignStudentsAction';
import {
  _Button,
  _Screen,
  _Text,
  _View,
  endpoint,
  studentExamnterface,
} from '../../components';
import DrawerScreen from '../../navigation/Drawer/DrawerScreenNames';
import Screens from '../../screenNames';
import Header from '../Headers';
import { _ActivityIndicator } from '../Loader';
import Search from '../Search';
import { styles } from './style';
import { useFocusEffect } from '@react-navigation/native';
const StudentAssessments: React.FC<studentExamnterface> = ({
  navigation,
  route,
}) => {
  const [loading, setLoading] = useState(true);
  const [assessment, setAssessment] = useState([]);
  const [filteredAssessment, setFilteredAssessment] = useState([]);
  let searchRef: any = useRef();
  const { quickLinks, goBackScreen, stdId } = route.params;
  const dispatch = useDispatch();
  const { Get } = DataAccess();
  const [isVisible, setisVisible] = useState(false);
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
  useFocusEffect(
    useCallback(() => {
      // Clear previous data and show loader immediately when student changes
    setLoading(true);
    setAssessment([]);
    setFilteredAssessment([]);
      let url: endpoint = ApiEndpoints.GetStudentAssessments;
      url.params = `?studentId=${stdId}&isFromReports=false&AssessmentType=Student`;
      Get(url)
        .then((res: any) => {
          setLoading(false);
          if (!res.error) {
            setAssessment(res);
            setFilteredAssessment(res);
          }
        })
        .catch(() => {
          setLoading(false);
          return dispatch(assignStudentsFailed());
        });
    }, [navigation,stdId])
  );
  const RenderList = (assessmentObject: any, index: number) => (
    <_View key={index} style={styles.mainContainer}>
      <_View style={styles.assessmentCardContainer}>
        <_View style={styles.headerContainer}>
          <_Text style={styles.headerText}>
            {assessmentObject.templateName}
          </_Text>
        </_View>
        <_View style={styles.innerContainer}>
          <_View style={styles.infoContainer}>
            <_Text style={styles.labelText}>{'Template Name : '}</_Text>
            <_Text style={styles.text}>{assessmentObject.templateName}</_Text>
          </_View>
          <_View style={styles.infoContainer}>
            <_Text style={styles.labelText}>{'Template Type : '}</_Text>
            <_Text style={styles.text}>{assessmentObject.templateType}</_Text>
          </_View>
          <_View style={styles.infoContainer}>
            <_Text style={styles.labelText} numberOfLines={1}>
              {'Start Date : '}
            </_Text>
            <_Text style={styles.text}>{assessmentObject.dueDate}</_Text>
          </_View>
          <_View style={styles.infoContainer}>
            <_Text style={styles.labelText} numberOfLines={1}>
              {'Due Date : '}
            </_Text>
            <_Text style={styles.text}>{assessmentObject.startDate}</_Text>
          </_View>
        </_View>
      </_View>
      <_View style={styles.btnContainer}>
        {assessmentObject.isReTakeEnabled && assessmentObject.isAttempted && (
          <_Button
            borderRadius={10}
            width={'45%'}
            submitting={true}
            loaderColor={whiteThemeColors.white}
            BtnTxt={[
              styles.btnTextStyle,
              { alignSelf: 'center', color: 'white' },
            ]}
            style={[
              {
                marginRight: assessmentObject.isAttempted ? 40 : 10,
              },
              styles.btn,
            ]}
            btnText={`Re-Take ${terminologies['Assessment']?.label}`}
            callback={() => {
              navigation.navigate(Screens.onlineAssessment.name, {
                header: assessmentObject.templateName,
                isFromStudentAssessment: true,
                assessmentID: assessmentObject.assessmentId,
                assessmentUserId: assessmentObject.assessmentUserId
              });
            }}
          />
        )}
        <_Button
          borderRadius={10}
          width={terminologies['Assessment']?.label ? '35%' : '30%'}
          submitting={true}
          loaderColor={whiteThemeColors.white}
          BtnTxt={[
            styles.btnTextStyle,
            { color: 'white', alignSelf: 'center' },
          ]}
          style={{
            borderRadius: 7,
            height: 35,
            zIndex: 1,
            backgroundColor: whiteThemeColors.primary,
            justifyContent: 'center',
          }}
          btnText={assessmentObject.ifSessionIsInProgress ? `Resume Session` :
            assessmentObject.isAttempted
              ? 'View Result' :
              `Take ${terminologies['Assessment']?.label}`
          }
          callback={() => {
            {
              assessmentObject.ifSessionIsInProgress || !assessmentObject.isAttempted ?
                navigation.navigate(Screens.onlineAssessment.name, {
                  header: assessmentObject.templateName,
                  isFromStudentAssessment: true,
                  assessmentID: assessmentObject.assessmentId,
                  assessmentUserId: assessmentObject.assessmentUserId
                }) :
                navigation.navigate(Screens.StudentAssessmentDetials.name, {
                  header: assessmentObject.templateType,
                  name: assessmentObject.templateName,
                  assessmentId: assessmentObject.assessmentId,
                  assessmentUserId: assessmentObject.assessmentUserId,
                })

            }
          }}
        />
      </_View>
    </_View>
  );
  const NoDataFound = () => {
    return (
      <_View style={styles.nodataContainer}>
        <AssesmentSvg size={80} color={whiteThemeColors.primary} />
        <_Text style={styles.nodataTxt}>
          {`No ${terminologies['Assessment']?.label} found`}
        </_Text>
      </_View>
    );
  };

  const onChangeText = (data: any) => {
    let array = [];
    data.forEach((element: any) => {
      array.push(element);
    });
    setFilteredAssessment(data);
  };
  const handleBack = () => {
    navigation.navigate(DrawerScreen.dashboard.name);
    return true;
  };
  return (
    <_Screen
      header={
        <Header
          Screen={terminologies['Assessment']?.label}
          isBack={quickLinks}
          isMenu={!quickLinks}
          GoBack={() => {
            navigation.navigate(goBackScreen);
          }}
          OpenMenu={() => {
            navigation.toggleDrawer();
          }}
          isSearchBtn={true}
          OpenSearch={() => {
            setisVisible(true);
          }}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          onClose={() => {
            setisVisible(false);
          }}
          animSpeed={100}
          data={assessment}
          searchKey='templateName'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      <_View style={{ flex: 1, backgroundColor: whiteThemeColors.background }}>
        {filteredAssessment.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            data={filteredAssessment}
            renderItem={({ item, index }) => RenderList(item, index)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => <_View style={{ height: 30 }} />}
          />
        ) : loading ? (
          <_ActivityIndicator
            size={'large'}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          />
        ) : (
          <NoDataFound />
        )}
      </_View>
    </_Screen>
  );
};
export default StudentAssessments;
