import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import {
  CustomAlert,
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import { AssessmentNodata } from '../../../../../../assets/Icons';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import {
  _Button,
  _Screen,
  _Text,
  _View,
  studentAdminListInterface,
} from '../../../../../components';
import { Appstate } from '../../../../../reducers/Appstate';
import ScreensNames from '../../../../../screenNames';
import Header from '../../../../Headers';
import Loader from '../../../../Loader/loader';
import Search from '../../../../Search';
import { Styles } from './style';
const StudentAssessmentListForAdmin: React.FC<studentAdminListInterface> = ({
  navigation,
  route,
}) => {
  const [stdList, setStdList] = useState([]);
  const [filterdStdList, setFilterdStdList] = useState([]);
  const { studentAssessmentScreen } = useSelector(
    (state: Appstate) => state.language,
  );
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  let searchRef: any = useRef();
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
    setLoading(true);
    var EndPoint = ApiEndpoints.GetAssignedOnlineAssessmentsStudents;
    Get(EndPoint).then((res: any) => {
      setLoading(false);
      if (!res.error) {
        setStdList(res);
        setFilterdStdList(res);
        return;
      }
      setShowAlert(true);
      setAlertMessage('Students are not available');
      setAlertTitle('Warning');
    });
  }, []);
  const onChangeText = (data: any) => {
    setFilterdStdList(data);
  };

  const RenderList = (Obj: any) => (
    <_View style={Styles.cardContainer}>
      <_View style={Styles.headerContainer}>
        <_Text style={Styles.headerText}>{Obj.studentName}</_Text>
      </_View>
      <_View style={Styles.innerContainer}>
        <_View style={Styles.infoContainer}>
          <_Text style={Styles.labelText} numberOfLines={1}>
            {`Online ${terminologies['Assessment']?.label} :`}
          </_Text>
          <_Text style={Styles.text}>{Obj.assessmentsCountText}</_Text>
        </_View>
        <_View style={Styles.infoContainer}>
          <_Text style={Styles.labelText} numberOfLines={1}>
            {'Assigned but not completed : '}
          </_Text>
          <_Text style={Styles.text}>{Obj.assignedButNotCompleted}</_Text>
        </_View>
        <_Button
          borderRadius={7}
          width={'27%'}
          submitting={true}
          style={Styles.viewBtn}
          BtnTxt={Styles.viewBtnTxt}
          btnText={'View Reports'}
          callback={() => {
            navigation.navigate(ScreensNames.StudentAssessment.name, {
              stdId: Obj.studentId,
              stdName: Obj.studentName,
              goBackScreen: ScreensNames.StudentAssessmentList.name,
            });
          }}
        />
      </_View>
    </_View>
  );

  const onBackPress = () => {
    navigation.navigate(route.params.goBackScreen);
    return true;
  };

  const NoDataFound = () => {
    return (
      <_View style={Styles.noDataFoundContainer}>
        <AssessmentNodata />
        <_Text style={Styles.noDataFoundTxt}>No data found</_Text>
      </_View>
    );
  };

  return (
    <_Screen
      header={
        <Header
          isBack={true}
          isSearchBtn={true}
          OpenSearch={() => {
            setisVisible(true);
          }}
          GoBack={() => {
            navigation.navigate(route.params.goBackScreen);
          }}
          Screen={studentAssessmentScreen.StudentAssessment}
        />
      }
      hideTopSafeArea
      onAndroidBack={onBackPress}
      flex={1}
      backgroundColor={whiteThemeColors.background}
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          onClose={() => {
            setisVisible(false);
          }}
          animSpeed={100}
          data={stdList}
          searchKey='studentName,assessmentsCountText'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      {loading ? (
        <Loader />
      ) : stdList.length > 0 ? (
        <_View flex={1}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={Styles.flatelist}
            data={filterdStdList}
            renderItem={(Obj: any) => (
              <_View style={Styles.List}>{RenderList(Obj.item)}</_View>
            )}
          />
        </_View>
      ) : (
        <NoDataFound />
      )}
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
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
export { StudentAssessmentListForAdmin };
