import { CommonActions, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CommonStyles from 'screens/CommonStyles';
import { CustomAlert, whiteThemeColors } from 'utilities';
import {
  getTodayAttendence,
  getTodayAttendenceDB,
} from '../../../actions/AttendanceActions';
import {
  _Button,
  _Screen,
  _View,
  attendanceInterface,
} from '../../../components';
import DrawerScreen from '../../../navigation/Drawer/DrawerScreenNames';
import { Appstate } from '../../../reducers/Appstate';
import CstHeader from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
import Search from '../../Search';
import AttendanceHomeHeader from '../components/AttendanceHomeHeader';
import { SetAllClasses } from '../components/SetClasses';
import StudentsList from '../components/StudentsList';

const AttendanceHomeScreen: React.FC<attendanceInterface> = ({
  navigation,
  route,
}) => {
  const language = useSelector((state: Appstate) => state?.language);
  const studentList = useSelector(
    (state: Appstate) => state.attendence.TodayAttendence,
  );
  const UserInfo: any = useSelector((state: Appstate) => state.User.UserInfo);
  const [loading, setLoading] = useState(false);
  const [markedAttendance, setMarkedAttendance] = useState([]);
  const [sumbitLoading, setSubmitLoading] = useState(false);
  const [filteredStudentList, setFilteredStudentList] = useState([]);
  const [selected, setSelected] = useState(false);
  const [isAllAbsent, setIsAllAbsent] = useState(false);
  const [isAllPresent, setIsAllPresent] = useState(false);
  const [selectedAttendanceTypeAll, setSelectedAttendanceTypeAll] =
    useState('');
  let date = new Date();
  date.setHours(0, 0, 0, 0);
  const [chosenDate, setChosenDate] = useState(date.toISOString());

  const [isVisible, setisVisible] = useState(false);
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const { getClasses, getCourses } = SetAllClasses();
  const [alert, setAlert] = useState({
    show: false,
    title: '',
    message: '',
  });
  const fetchBefore = async () => {
    setMarkedAttendance([]);
    try {
      let date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      const res: any = await getTodayAttendence(
        UserInfo.userID,
        date.toISOString(),
        0,
        10,
        dispatch,
      );
      if (res.error) {
        console.log(res.err);
      } else {
        setFilteredStudentList(addShowModal(res?.data));
        fetchAll();
      }
    } catch (e: any) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (route?.params?.refresh) {
      navigation.dispatch(CommonActions.setParams({ refresh: false }));
    }
    if (isFocus && !route?.params?.refresh) {
      !studentList?.length && setLoading(true);
      if (studentList?.length > 0) {
        setFilteredStudentList(addShowModal(studentList));
        fetchAll();
      } else fetchBefore();
    }
    return () => {
      let date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      setChosenDate(date.toISOString());
    };
  }, [isFocus]);
  useEffect(() => {
    getCourses();
    getClasses();
  }, []);
  useEffect(() => {
    fetchAll();
  }, [isFocus]);
  const fetchAll = async (today?: any) => {
    setLoading(true);
    let date = new Date();
    if (today)
      date = today;
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
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
        setFilteredStudentList(addShowModal(res?.data));
      }
    } catch (e: any) { }
  };
  const addShowModal = (response: any) => {
    const res = response?.map((item: any) => {
      return { ...item, showDropDown: false };
    });
    return res;
  };
  const submitAttendance = async () => {
    // setSubmitLoading(true);
    let attendance: any = [];

    markedAttendance?.map((Obj: any) => {
      attendance.push({
        student_id: Obj.studentID,
        class_id: Obj.classId,
        batch_id: Obj.batchID,
        timing_id: Obj.timeId,
        makeup_class_id: Obj.makeUpClassId,
        is_present: Obj.isPresent,
        Status: Obj.status,
        isDelete: Obj.isDelete ? true : false,
      });
    });
    // return;
    try {
      setSubmitLoading(true);
      const res: any = await getTodayAttendenceDB(
        { attendances: attendance, date: chosenDate },
        dispatch,
      );
      if (res!.err) {
        setAlert({ show: true, title: 'Error', message: res.data!.value });
      } else {
        setAlert({ show: true, title: 'Success', message: res.data!.value });
        setMarkedAttendance([]);
      }
      setSubmitLoading(false);
    } catch (e: any) {
      setSubmitLoading(false);
    }
  };
  const onAndroidBack = () => {
    navigation.navigate(DrawerScreen.dashboard.name);
    return true;
  };
  return (
    <_Screen
      header={
        <CstHeader
          isMenu
          isSearchBtn
          OpenMenu={() => navigation?.toggleDrawer()}
          Screen={language.viewByClass.Attendance}
          OpenSearch={() => setisVisible(true)}
        />
      }
      onAndroidBack={onAndroidBack}
      hideTopSafeArea
      hideBottomSafeArea
      style={{ zIndex: -1 }}
      backgroundColor={whiteThemeColors.background}
    >
      {isVisible && (
        <Search
          onInputChange={(data) => {
            setFilteredStudentList(data);
          }}
          onClose={() => setisVisible(false)}
          animSpeed={100}
          data={studentList}
          searchKey='className,firstName,lastName'
          outPos={-110}
          inPos={-10}
          height={60}
          isVisible={isVisible}
          showCross
        />
      )}
      {filteredStudentList && (
        <AttendanceHomeHeader
          filteredStudentlist={filteredStudentList}
          setFilteredStudentlist={setFilteredStudentList}
          setMarkedAttendence={setMarkedAttendance}
          markedAttendance={markedAttendance}
          UserInfo={UserInfo}
          setLoading={setLoading}
          setChosenDate={setChosenDate}
          chosenDate={chosenDate}
          navigation={navigation}
          setSelectedAttendanceTypeAll={setSelectedAttendanceTypeAll}
          // setSelectedAttendanceTypeAll={selectedAttendanceTypeAll}
          setSelected={setSelected}
          selected={selected}
          setIsAllAbsent={setIsAllAbsent}
          isAllAbsent={isAllAbsent}
          setIsAllPresent={setIsAllPresent}
          isAllPresent={isAllPresent}
          fetchAll={fetchAll}
        />
      )}
      {loading ? (
        <_ActivityIndicator size={'large'} />
      ) : filteredStudentList ? (
        <StudentsList
          selected={selected}
          isAllAbsent={isAllAbsent}
          isAllPresent={isAllPresent}
          filteredStudentlist={filteredStudentList}
          setFilteredStudentlist={setFilteredStudentList}
          setMarkedAttendence={setMarkedAttendance}
          markedAttendance={markedAttendance}
          setSelectedAttendanceTypeAll={setSelectedAttendanceTypeAll}
          selectedAttendacneTypeAll={selectedAttendanceTypeAll}
          onEndReached={true}
          fetchingParams={{
            id: UserInfo.userID,
            date: new Date().toISOString(),
          }}
        />
      ) : null}
      {markedAttendance.length > 0 && (
        <_View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <_Button
            submitting={!sumbitLoading}
            callback={() => submitAttendance()}
            BtnTxt={styles.buttonText}
            btnText={'Submit Attendance'}
            borderRadius={15}
            style={[styles.button]}
          />
        </_View>
      )}
      {alert.show && (
        <CustomAlert
          visible={alert.show}
          title={alert.title}
          msg={alert.message}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setAlert({ ...alert, show: false });
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
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.white,
  },
});

export { AttendanceHomeScreen };
