import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { Calander } from '../../../../../assets/Icons';
import { getStudentForAttendance } from '../../../../actions/AttendanceActions';
import { _Text, _View, _VectorIcons } from '../../../../components';
import CommonStyles from '../../../CommonStyles';
import { styles } from '../../AttendanceClassTimings/components/style';

import {
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import CardButton from '../../AttendanceClassTimings/components/CardButton';
const formatDate = (date: any) => {
  return (
    (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
    '-' +
    (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
    '-' +
    date.getFullYear()
  );
};
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
const CancelledClassCard: React.FC<props> = ({
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
  const dispatch = useDispatch();
  let id = Obj.classId,
    isBtch = Obj.isBatch,
    timeId = Obj.timeId,
    makeUpClassId = Obj.makeUpClassId;
  var dt = new Date(Obj.attendanceDate);
  var date = formatDate(dt);
  let TodayTag, makeup;
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

  if (
    new Date(Obj.attendanceDate).toDateString() == new Date().toDateString()
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
    dispatch(getStudentForAttendance(id, isBtch, timeId, date, makeUpClassId))
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
  const onPressUndo = () => {
    setSelectedClass([]);
    setSelectedClass(Obj);
    setIndex(index);
    setAlert({
      show: true,
      title: 'warning',
      message: `Are you sure you want to Undo the ${terminologies['Class']?.label}`,
      firstBtn: 'Okay',
    });
  };

  return (
    <Pressable
      style={styles.cardComponent}
      disabled={screenVariant == 'cancelClass' ? true : false}
      onPress={() => {
        getAllStudents(id, isBtch, timeId, date, makeUpClassId);
      }}
    >
      {Obj?.isMakeUpClass && (
        <_View style={styles.makeup}>
          <_Text
            style={{
              color: whiteThemeColors.greyDark,
              fontSize: 12,
              fontFamily: CommonStyles.fonts.semiBold,
            }}
          >
            Makeup
          </_Text>
        </_View>
      )}
      <_View
        flexDirection='row'
        style={{
          borderRadius: 15,
          backgroundColor: whiteThemeColors.primary + 30,
        }}
        justifyContent='space-between'
        width={'100%'}
        alignItems='center'
      >
        <_View flexDirection='row' width={'70%'}>
          <_View
            style={{
              width: 80,
              height: 100,
              backgroundColor: whiteThemeColors.white,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
            }}
          >
            <Calander size={55} color={whiteThemeColors.primary} />
          </_View>

          <_View
            style={{
              width: '75%',

              justifyContent: 'center',
            }}
          >
            <_Text
              numberOfLines={2}
              style={{
                fontFamily: CommonStyles.fonts.medium,
                marginLeft: 10,

                color: whiteThemeColors.primary,
              }}
            >
              {Obj?.className}
            </_Text>
            <_Text
              style={{
                color: whiteThemeColors.greyDark,
                marginLeft: 10,
                fontSize: 12,
                fontFamily: CommonStyles.fonts.regular,
                marginTop: 5,
              }}
            >
              {Obj?.startTime}
            </_Text>
            <_Text
              style={{
                fontSize: 12,
                color: whiteThemeColors.greyDark,
                marginLeft: 10,
                fontFamily: CommonStyles.fonts.medium,
                marginTop: 5,
              }}
            >
              {Obj?.attendanceDate}
            </_Text>
          </_View>
        </_View>
        <_View marginRight={10} style={{ width: 60 }}>
          <CardButton title={'Undo'} Obj={Obj} onPress={onPressUndo} />
        </_View>
      </_View>
    </Pressable>
  );
};
export default CancelledClassCard;
