import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from '../../../../../Utilities';
import { AssesmentSvg } from '../../../../../../assets/Icons';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import { assignStudentsFailed } from '../../../../../actions/CourseAssignStudentsAction';
import {
  _Button,
  _Screen,
  _Text,
  _View,
  endpoint,
} from '../../../../../components';
import { Appstate } from '../../../../../reducers/Appstate';
import Screens from '../../../../../screenNames';
import Header from '../../../../Headers';
import Loader from '../../../../Loader/loader';
import Search from '../../../../Search';
import { styles } from './style';
interface props {
  navigation: any;
}
const StudentAssessmentListForStudent: React.FC<props> = ({ navigation }) => {
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
  const [assessment, setAssessment] = useState([]);
  const [filterdAssessment, setFilterdAssessment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let searchRef: any = useRef();
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
  useEffect(() => {
    getStudentAssessment();
  }, [user.userID]);

  const getStudentAssessment = async () => {
    setIsLoading(true);
    let url: endpoint = ApiEndpoints.GetStudentAssessments;
    url.params = `?studentId=${user.userID}&isFromReports=false&AssessmentType=Student`;
    Get(url)
      .then((res: any) => {
        if (!res.error) {
          setAssessment(res);
          setFilterdAssessment(res);
          if (res?.length > 9) {
          }
        }
        setIsLoading(false);
      })
      .catch(() => {
        return dispatch(assignStudentsFailed());
      });
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
  const onBackPress = () => {
    navigation.goBack();
    return true;
  };


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
            <_View style={styles.infoRow}>
              <_View style={{ width: '50%', flexDirection: 'row' }}>
                <_Text style={styles.labelText} numberOfLines={1}>
                  {'Start Date : '}
                </_Text>
                <_Text style={styles.text}>{assessmentObject.dueDate}</_Text>
              </_View>
              <_View style={{ width: '50%', flexDirection: 'row' }}>
                <_Text style={styles.labelText} numberOfLines={1}>
                  {'Due Date : '}
                </_Text>
                <_Text style={styles.text}>{assessmentObject.startDate}</_Text>
              </_View>
            </_View>
          </_View>
          {/* 3 sticky circles on each card */}
        </_View>
      </_View>
      <_View style={styles.btnContainer}>
        <_Button
          width={'40%'}
          borderRadius={10}
          style={{
            height: 30,
            backgroundColor: whiteThemeColors.primary,
            justifyContent: 'center',
          }}
          callback={() => {
            navigation.navigate(Screens.StudentAssessment.name, {
              goBackScreen: Screens.SingleStudentAssessmentList.name,
              isFromStudentAssessment: true,
              stdId: user.userID,
              stdName: assessmentObject.templateName,
              assessmentId: assessmentObject.assessmentId,
            });
          }}
          submitting={true}
          BtnTxt={[
            styles.btnTextStyle,
            { color: 'white', alignSelf: 'center' },
          ]}
          btnText={`View ${terminologies['Assessment']?.label}`}
        />
      </_View>
    </_View>
  );
  const NoDataFound = () => {
    return (
      <_View style={styles.nodataContainer}>
        <AssesmentSvg size={150} color={whiteThemeColors.primary} />
        <_Text style={styles.nodataTxt}>
          {`No ${terminologies['Assessment']?.label} found`}
        </_Text>
      </_View>
    );
  };

  const onChangeText = (data: any) => setFilterdAssessment(data);
  return (
    <_Screen
      header={
        <Header
          isSearchBtn
          isBack
          Screen={terminologies['Assessment']?.label}
          GoBack={() => navigation.goBack()}
          OpenSearch={() => {
            setisVisible(true);
          }}
        />
      }
      onAndroidBack={onBackPress}
      hideTopSafeArea
      hideBottomSafeArea
      backgroundColor={whiteThemeColors.background}
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
      <_View flex={1}>
        {isLoading ? (
          <Loader />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.flatlist}
            contentContainerStyle={{ paddingBottom: 50 }}
            data={filterdAssessment}
            ListHeaderComponent={() => <_View style={{ height: 10 }} />}
            ItemSeparatorComponent={() => <_View style={{ height: 15 }} />}
            renderItem={({ item, index }) => RenderList(item, index)}
            // onEndReached={({ distanceFromEnd }) => {
            //   loadMore(skip);
            //   console.log('distance from end', distanceFromEnd);
            // }}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={<NoDataFound />}
          />
        )}
      </_View>
    </_Screen>
  );
};

export { StudentAssessmentListForStudent };
