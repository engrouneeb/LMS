import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CustomAlert, whiteThemeColors, width } from '../../../Utilities';
import {
  GropCheckInOut,
  indCheckIn,
  message,
  SubmitClassUserCheckIn,
  SubmitGroupCheckIn,
} from '../../../actions/PinCodeActions';
import { _Button, _Screen, _Text, _View } from '../../../components';
import DrawerScreen from '../../../navigation/Drawer/DrawerScreenNames';
import Screens from '../../../screenNames';
import CommonStyles from '../../CommonStyles';
import CstHeader from '../../Headers';
import LoadingSc from '../../Loader/Loading';
import { UserImg } from '../../ThumbNail';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { NoData } from '../../../../Pincode/CheckinOutCoursesList/components';
import { NoApprovels } from '../../../../assets/Icons';
import { loading } from '../../../actions/AsyncStorage';
import Loader from '../../Loader/loader';

export const GroupCheckIn = () => {
  const navigation = useNavigation();
  const [refreshingLogic, setRefreshingLogic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [firstBtn, setFirstBtn] = useState(undefined);
  const selectedLanguage = useSelector((state) => state.language);
  const { Students, ClassName, ClassID, CourseID } = useSelector(
    (state) => state.token.Students
  );
  const [studentList, setstudentList] = useState(Students);
  const dispatch = useDispatch();
  const RenderItem = ({ item, index }) => {
    const stdName = `${item.firstName} ${item.lastName}`;
    return (
      <_View style={styles.checkInBtn} key={index}>
        <_View flexDirection='row' alignItems='center'>
          <UserImg
            UserInfo={{
              FirstName: item.firstName,
              LastName: item.lastName,
              UserImage: item.userImage,
              UserImageColor:
                item.userImageColor === null
                  ? whiteThemeColors.primary
                  : item.userImageColor,
            }}
            size={40}
          />
          <_Text
            numberOfLines={2}
            style={{
              fontSize: 12,
              marginLeft: 10,
              color: whiteThemeColors.primary,
              width: '60%',
            }}
          >
            {stdName}
          </_Text>
        </_View>
        <_Button
          submitting={true}
          callback={() => {
            DoCheckIn(!item.isCheckedIn, item.userId, index);
          }}
          BtnTxt={{
            textTransform: 'capitalize',
            fontSize: 12,
            color: 'white',
          }}
          btnText={item.isCheckedIn ? 'Check-Out' : 'Check-In'}
          width={'25%'}
          borderRadius={8}
          style={{
            ...styles.checkInOutBtn,
            backgroundColor: item.isCheckedIn
              ? whiteThemeColors.primary
              : whiteThemeColors.green,
          }}
        />
      </_View>
    );
  };
  const NoStudent = () => {
    return (
      <_View height={350} alignItems='center'>
        <NoApprovels />
        <_Text style={{ marginTop: 280, fontSize: 16, fontWeight: '500' }}>
          No Student enroll
        </_Text>
      </_View>
    );
  };

  const groupCheckInOut = (isCheckedIn) => {
    dispatch(GropCheckInOut(isCheckedIn));
  };

  const DoCheckIn = (ischk, studentId, index) => {
    setLoading(true);
    const arr = [...studentList];
    dispatch(SubmitClassUserCheckIn(studentId, ClassID, ischk)).then((res) => {
      arr[index].isCheckedIn = !arr[index].isCheckedIn;
      setstudentList(arr);
      setShowAlert(true);
      setAlertTitle('Success');
      setAlertMessage(res?.msg);
      setFirstBtn('Close');
      setRefreshingLogic(true);
      setLoading(false);
    });
  };

  const GroupCheckInOutBtn = () => {
    return (
      <_View style={styles.groupCheckInOutBtnWrapper}>
        <_Button
          submitting={true}
          callback={() => submitGroupCheck(true)}
          BtnTxt={{
            textTransform: 'capitalize',
            color: whiteThemeColors.white,
          }}
          btnText={'Check-in All'}
          width={130}
          borderRadius={12}
          style={styles.checkInAllBtn}
        />
        <_Button
          submitting={true}
          width={130}
          borderRadius={12}
          style={styles.checkOutAllBtn}
          BtnTxt={{
            textTransform: 'capitalize',
            color: whiteThemeColors.white,
          }}
          btnText={'Check-Out All'}
          callback={() => submitGroupCheck(false)}
        />
      </_View>
    );
  };

  const submitGroupCheck = (isCheckedIn) => {
    const { groupCheckinScreen } = selectedLanguage;
    setLoading(true);
    dispatch(SubmitGroupCheckIn(getStudents(), ClassID, isCheckedIn))
      .then(async (res) => {
        const dt = new Date();
        const chkdOut = !isCheckedIn
          ? groupCheckinScreen.CheckOut
          : groupCheckinScreen.CheckIn;
        await dispatch(
          message({
            MainMsg: groupCheckinScreen.HaveAGreatDay,
            TimeMsg: `${groupCheckinScreen.StudentsChecked} ${chkdOut} ${
              groupCheckinScreen.successfuly
            } ${groupCheckinScreen.at} ${dt.toLocaleTimeString()} ${
              groupCheckinScreen.on
            } ${dt.toDateString()}`,
            isGroup: true,
            isCheckIn: isCheckedIn,
          })
        );

        setLoading(false);
        navigation.pop();
        navigation.navigate(Screens.message.name);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getStudents = () => {
    const stuIDs = Students.map((obj, index) => {
      if (obj.IsCheck === true) {
        return `&Students=${obj.UserId}`;
      } else {
        return '';
      }
    });

    return stuIDs.join('');
  };
  const handleBack = () => {
    navigation.goBack();
    return true;
  };

  return (
    <_Screen
      header={
        <CstHeader
          isBack={true}
          GoBack={() => handleBack()}
          Screen={ClassName}
          isLogout={false}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={() => handleBack()}
      backgroundColor={whiteThemeColors.background}
    >
      {loading && <Loader />}
      {studentList?.length > 0 && (
        <_View style={styles.checkInOutBtnWrapper}>
          <GroupCheckInOutBtn />
        </_View>
      )}

      <FlatList
        style={{ paddingTop: 4 }}
        data={studentList}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} />
        )}
        keyExtractor={(item) => {
          item.userId;
        }}
        ListEmptyComponent={<NoStudent />}
      />
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={firstBtn ? firstBtn : 'Okay'}
          firstBtnFunc={() => {
            setShowAlert(false);
          }}
        />
      )}
    </_Screen>
  );
};
