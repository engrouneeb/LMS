import React from 'react';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Calander } from '../../../../../assets/Icons';
import { getStudentForAttendance } from '../../../../actions/AttendanceActions';
import { _Text, _View, _VectorIcons } from '../../../../components';

import { styles } from './style';

import { convertUTCDateToLocalDateStringFormat, isParent, isStudent, whiteThemeColors } from '../../../../Utilities';
import CardButton from './CardButton';
import CommonStyles from '../../../CommonStyles';

function convertToLocalDate(dateString: string) {
  const [datePart] = dateString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const localDate = new Date(year, month - 1, day, 0, 0, 0);
  return localDate;
}


interface props {
  Obj: any;
  index: number;
  classDateList: any;
  navigation: any;
  screenVariant: any;
  setAlert: any;
  setSelectedClass: any;
  setIndex: any;
  setLoading: any;
}
const ClassTimingCard: React.FC<props> = ({
  Obj,
  index,
  classDateList,
  navigation,
  screenVariant,
  setAlert,
  setSelectedClass,
  setIndex,
  setLoading,
}) => {
  const dispatch: any = useDispatch();
  let id = Obj.classId,
    isBtch = Obj.isBatch,
    timeId = Obj.timeId,
    makeUpClassId = Obj.makeUpClassId;
  var date = convertToLocalDate(Obj.attendanceDateTime);

  let TodayTag, makeup;
  let { roleName } = useSelector((state: any) => state.User.UserInfo);
  if (
    Obj.attendanceDate == convertUTCDateToLocalDateStringFormat(new Date())
  ) {
    TodayTag = classDateList.Today;
  }
  if (Obj.isMakeUpClass) {
    makeup = classDateList.Makeup;
  }
  const getAllStudents = (
    id: any,
    isBtch: any,
    timeId: any,
    date: any,
    makeUpClassId: any,
  ) => {
    setLoading(true);
    dispatch(
      getStudentForAttendance(
        id,
        isBtch,
        timeId,
        Obj?.attendanceDateTime,
        makeUpClassId,
      ),
    )
      .then(() => {
        setLoading(false);
        navigation.navigate('markClassAttendance', {
          day: date,
          classId: Obj.classId,
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onPressCancel = () => {
    setSelectedClass([]);
    setSelectedClass(Obj);
    setIndex(index);
    setAlert({
      show: true,
      title: 'warning',
      message: classDateList.AreYouSureYouWantToCancelTheClass,
      firstBtn: 'Okay',
    });
  };

  const badge = (count: number) => {
    return (
      <_View style={styles.badgeContainer}>
        <_Text style={styles.badgeCount}>{count}</_Text>
      </_View>
    );
  };

  return (
    <Pressable
      style={styles.cardComponent}
      disabled={screenVariant == 'cancelClass' ? true : false}
      onPress={() => {
        getAllStudents(id, isBtch, timeId, date, makeUpClassId);
      }}
    >
      <_View style={styles.leftContainer}>
        <_View style={styles.centeredView}>
          <_Text style={styles.timeTxt}>{Obj?.startTime.split(' ')[0]}</_Text>
          <_Text style={styles.AmText}>{Obj?.startTime.split(' ')[1]}</_Text>
        </_View>

        <_Text style={styles.toText}>To</_Text>
        <_View style={styles.centeredView}>
          <_Text style={styles.timeTxt}>{Obj?.startTime.split(' ')[3]}</_Text>
          <_Text style={styles.AmText}>{Obj?.startTime.split(' ')[4]}</_Text>
        </_View>
        {Obj?.isMakeUpClass && (
          <_View style={styles.makeupTag}>
            <_Text style={styles.makeupText}>Makeup</_Text>
          </_View>
        )}
      </_View>
      <_View style={styles.middleContainer}>
        <_Text
          style={{
            color: whiteThemeColors.primary,
            fontFamily: CommonStyles.fonts.semiBold,
          }}
        >
          {Obj?.attendanceDate}
        </_Text>
        <_Text numberOfLines={1} style={styles.classText}>
          {Obj?.className}
        </_Text>
        <_View style={{ marginTop: 15, width: 70 }}>
          {TodayTag !== undefined && (
            <CardButton title={TodayTag} isTag={true} />
          )}
        </_View>
        {!isStudent(roleName) && !isParent(roleName) && (
          <_View
            style={{
              width: 70,
              marginTop: 5,
            }}
          >
            <CardButton title={'Cancel'} Obj={Obj} onPress={onPressCancel} />
          </_View>
        )}
      </_View>
      <_View style={styles.rightContainer}>
        {!isStudent(roleName) && (
          <_View style={styles.container1}>
            <_View style={styles.container2}>
              <_VectorIcons
                type={'Feather'}
                name={'check-square'}
                size={18}
                color={whiteThemeColors.green}
              />
              {badge(Obj?.attendance[0]?.totalPresent || 0)}
            </_View>
            <_View style={styles.container3}>
              <_VectorIcons
                type={'AntDesign'}
                name={'closesquareo'}
                size={18}
                color={whiteThemeColors.red}
              />
              {badge(Obj?.attendance[0]?.totalAbsent || 0)}
            </_View>
            <_View style={styles.container3}>
              <_VectorIcons
                type={'AntDesign'}
                name={'down-square-o'}
                size={20}
                color={whiteThemeColors.primary}
              />

              {badge(Obj?.attendance[0]?.noOfOtherThenPresentAndAbsent || 0)}
            </_View>
          </_View>
        )}
      </_View>
    </Pressable>
  );
};
export default ClassTimingCard;
