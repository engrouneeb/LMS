import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CustomAlert, whiteThemeColors } from '../../../Utilities';
import {
  getTodayAttendenceDB,
  getTodayAttendence,
} from '../../../actions/AttendanceActions';
import {
  markAttendanceInterface,
  _Button,
  _Screen,
  _View,
} from '../../../components';
import CstHeader from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
import Search from '../../Search';
import AttendanceHomeHeader from '../components/AttendanceHomeHeader';
import StudentsList from '../components/StudentsList';
import { Appstate } from '../../../reducers/Appstate';

const MarkClassAttendance: React.FC<markAttendanceInterface> = ({
  navigation,
  route,
}) => {
  const { language } = useSelector((state: Appstate) => state);
  const UserInfo = useSelector((state: Appstate) => state.User.UserInfo);
  const [loading, setLoading] = useState(false);
  const [markedAttendance, setMarkedAttendence] = useState([]);
  const [chosenDate, setChosenDate] = useState(
    Boolean(route?.params.day)
      ? new Date(route?.params.day).toISOString()
      : new Date().toISOString(),
  );

  const [sumbitLoading, setSumbitLoading] = useState(false);
  const studentList = useSelector(
    (state: Appstate) => state.attendence.AttendenceByClass,
  );
  const [isVisible, setisVisible] = useState(false);
  const [filteredStudentlist, setFilteredStudentlist] = useState(
    studentList && studentList,
  );
  const [selectedAttendacneTypeAll, setSelectedAttendanceTypeAll] =
    useState('');
  const [selected, setSelected] = useState(false);
  const [isAllAbsent, setIsAllAbsent] = useState(false);
  const [isAllPresent, setIsAllPresent] = useState(false);
  const [alert, setAlert] = useState<any>({
    show: false,
    title: '',
    message: '',
  });

  const searchRef: any = React.useRef();
  const dispatch = useDispatch();
  const onChangeText = (studentList: any) => {
    setFilteredStudentlist(studentList);
  };
  const submitAttendence = async () => {
    setSumbitLoading(true);
    let attendance: any = [];
    markedAttendance?.map((Obj: any) => {
      attendance.push({
        student_id: Obj.userId ? Obj.userId : Obj.studentID,
        class_id: Obj.classId,
        batch_id: Obj.batchId,
        timing_id: Obj.timeId,
        makeup_class_id: Obj.makeUpClassId,
        is_present: Obj.isPresent,
        Status: Obj.status,
        isDelete: Obj.isDelete,
      });
    });

    try {
      setSumbitLoading(true);
      const res: any = await getTodayAttendenceDB(
        { attendances: attendance, Date: route.params.day },
        dispatch,
      );
      if (res!.err) {
        setAlert({ show: true, title: 'Error', message: res.data!.value });
      } else {
        setAlert({ show: true, title: 'Success', message: res.data!.value });
        setMarkedAttendence([]);
      }
      setSumbitLoading(false);
    } catch (e: any) {
      setSumbitLoading(false);
    }
  };
  const fetchAll = async (today?: any) => {
    setLoading(true);
    let date = new Date();
    if (today)
      date = today;
    date.setHours(0, 0, 0, 0);
    try {
      const res: any = await getTodayAttendence(
        UserInfo.userID,
        date.toISOString(),
        0,
        -1,
        dispatch,
      );
      setLoading(false);
      if (res.error) {
        console.log(res.err);
      } else {
        setFilteredStudentlist(res?.data);
      }
    } catch (e: any) {
      setLoading(false);
    }
  };

  const onAndroidBack = () => {
    navigation.goBack();
    return true;
  };
  return (
    <_Screen
      header={
        <CstHeader
          isBack={true}
          goBack={() => {
            navigation.goBack();
          }}
          Screen={language.viewByClass.Attendance}
          isLogout={false}
          isSearchBtn={true}
          OpenSearch={() => {
            setisVisible(true);
          }}
        />
      }
      onAndroidBack={onAndroidBack}
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
          data={studentList}
          searchKey='className,firstName'
          outPos={-110}
          inPos={-10}
          height={60}
          isVisible={isVisible}
        />
      )}
      <AttendanceHomeHeader
        filteredStudentlist={filteredStudentlist}
        setFilteredStudentlist={setFilteredStudentlist}
        setMarkedAttendence={setMarkedAttendence}
        markedAttendance={markedAttendance}
        UserInfo={UserInfo}
        setLoading={setLoading}
        setChosenDate={setChosenDate}
        chosenDate={chosenDate}
        navigation={navigation}
        showMenu={false}
        classId={route.params.classId}
        setSelectedAttendanceTypeAll={setSelectedAttendanceTypeAll}
        // selectedAttendacneTypeAll={selectedAttendacneTypeAll}
        setSelected={setSelected}
        selected={selected}
        setIsAllAbsent={setIsAllAbsent}
        isAllAbsent={isAllAbsent}
        setIsAllPresent={setIsAllPresent}
        isAllPresent={isAllPresent}
        fetchAll={fetchAll}
      />
      {loading ? (
        <_ActivityIndicator size={'large'} />
      ) : (
        <StudentsList
          filteredStudentlist={filteredStudentlist}
          setFilteredStudentlist={setFilteredStudentlist}
          setMarkedAttendence={setMarkedAttendence}
          setSelectedAttendanceTypeAll={setSelectedAttendanceTypeAll}
          selectedAttendacneTypeAll={selectedAttendacneTypeAll}
          markedAttendance={markedAttendance}
          selected={selected}
          isClassAttendance={true}
          onEndReached={false}
        />
      )}
      {markedAttendance.length > 0 && (
        <SafeAreaView style={{ flex: 1 }}>
        <_View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <_Button
            submitting={!sumbitLoading}
            callback={() => submitAttendence()}
            BtnTxt={styles.buttonText}
            btnText={'Submit Attendance'}
            borderRadius={25}
            style={[styles.button]}
          />
        </_View>
        </SafeAreaView>
      )}
      {alert.show && (
        <CustomAlert
          visible={alert.show}
          title={alert.title}
          msg={alert.message}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setAlert({ show: false });
          }}
        />
      )}
    </_Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    padding: 0,
    marginRight: 10,
    height: 50,
    position: 'absolute',
    bottom: 30,
    left: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.primary,
  },
  buttonText: {
    fontSize: 14,

    color: whiteThemeColors.white,
  },
});

export { MarkClassAttendance };
