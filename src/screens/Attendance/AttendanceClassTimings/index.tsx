import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  convertLocalDateTimeToStringFormat,
  CustomAlert,
  getTerminologyLabel,
  isParent,
  isStudent,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import { NoData } from '../../../../assets/Icons';
import { doCancelClass } from '../../../actions/ClassActions';
import {
  attendanceClassTimeInterface,
  _Screen,
  _Text,
  _View,
  _VectorIcons,
} from '../../../components';
import CstHeader from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
import Search from '../../Search';
import ClassTimingCard from './components/ClassTimingCard';
import { EndpointType } from 'interfaces';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { error } from './../../../actions/AsyncStorage';
import CommonStyles from 'screens/CommonStyles';
import { useIsFocused } from '@react-navigation/native';

const AttendanceClassTimings: React.FC<attendanceClassTimeInterface> = ({
  navigation,
  route,
}) => {
  const [dateList, setDateList] = useState();
  const [fileterdDateList, setFileterdDateList] = useState<[]>([]);
  const language = useSelector((state: any) => state.language);
  const [selectedClass, setSelectedClass] = useState<any>([]);
  const [index, setIndex] = useState(undefined);
  // const [isPressedCancel, setIsPressedCancel] = useState(null);
  const [loading, setLoading] = useState(false);
  const { classDateList } = language;
  const [screenVariant] = useState(route?.params?.screenVariant);
  const ClassDetais = route?.params?.ClassDetais;
  const [startDate] = useState(new Date().toDateString());
  const dispatch = useDispatch();
  const [isVisible, setisVisible] = useState(false);
  let { roleName } = useSelector((state: any) => state.User.UserInfo);
  const [alert, setAlert] = useState<any>({
    show: false,
    title: '',
    message: '',
    firstBtn: undefined,
  });
  const isFocus = useIsFocused();
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
    getClassDate();
  }, [isFocus]);
  const { Get } = DataAccess();

  const convertToLocalDate = (dateString: string) => {
    const [datePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const localDate = new Date(year, month - 1, day, 0, 0, 0);
    return localDate;
  };

  const getClassDate = async () => {
    try {
      setLoading(true);
      const oneMonth = getOneMonth();
      var EndPoint: EndpointType = ApiEndpoints.AttendenceDate;
      EndPoint.params = `?ClassIdOrBatch=${ClassDetais?.classId}&StartDate=${startDate}&EndDate=${oneMonth}`;
      let response = await Get(EndPoint);
      if (response.error || response.message == 'Network request failed') {
        response.error_description = response.message;

        dispatch(error(response || 'ERROR'));
      } else {
        var formatedArray = response.map((Obj: any) => {
          let day = Obj;
          day.attendanceDateTime = day.attendanceDate;
          const localDate = convertToLocalDate(Obj?.attendanceDate);
          day.attendanceDate = convertLocalDateTimeToStringFormat(localDate);
          return day;
        });

        setDateList(formatedArray);
        setFileterdDateList(formatedArray);
      }
    } catch (err) {
      // dispatch(false);
      dispatch(error('Something Went Wrong' || 'ERROR'));
    } finally {
      setLoading(false);
    }
  };
  const getOneMonth = () => {
    var Today = new Date();
    var ValidityDayNo = 30;
    return new Date(
      Today.setDate(Today.getDate() + ValidityDayNo),
    ).toDateString();
  };
  const onChangeText = (data: any) => {
    let array: any = [];
    data.forEach((element: any) => {
      array.push(element);
    });
    setFileterdDateList(array);
  };
  const searchRef: any = React.useRef();
  const cancelClass = () => {
    dispatch(
      doCancelClass(
        selectedClass?.isBatch
          ? selectedClass?.batchId
          : selectedClass?.classId,
        selectedClass?.isBatch,
        selectedClass?.timeId,
        selectedClass?.attendanceDate,
        selectedClass?.makeUpClassId,
        index,
        // classDateList,
      ),
    )
      .then(() => {
        setAlert({
          show: true,
          title: classDateList.Success,
          message: classDateList.ClassHasBeenCancelled,
        });
        getClassDate();
      })
      .catch(() => {
        setAlert({
          show: true,
          title: classDateList.Error,
          message: classDateList.SomethingWentWrong,
        });
      });
  };
  const onAndroidBack = () => {
    navigation.goBack();
    return true;
  };

  const handleGoBack = () => navigation.goBack();
  const handleOpenCloseSearch = () => setisVisible(true);

  const NoItemFound = () => {
    return (
      <_View style={styles.flatlistEmpty}>
        <NoData />
        <_Text style={styles.text}>
          {classDateList.NoTimingisFound.replace(
            'Class',
            terminologies['Class']?.label,
          )}
        </_Text>
      </_View>
    );
  };
  const _RenderItem = ({ item, index }: any) => (
    <ClassTimingCard
      Obj={item}
      index={index}
      classDateList={classDateList}
      navigation={navigation}
      screenVariant={screenVariant}
      setAlert={setAlert}
      setSelectedClass={setSelectedClass}
      setIndex={setIndex}
      // setIsPressedCancel={setIsPressedCancel}
      setLoading={setLoading}
    />
  );
  return (
    <_Screen
      header={
        <CstHeader
          isBack
          isSearchBtn
          Screen={`${terminologies['Class']?.label} Timings`}
          GoBack={handleGoBack}
          OpenSearch={handleOpenCloseSearch}
        />
      }
      onAndroidBack={onAndroidBack}
      hideTopSafeArea
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          onClose={() => setisVisible(false)}
          animSpeed={100}
          data={dateList}
          searchKey='className'
          outPos={-110}
          inPos={-10}
          height={60}
          isVisible={isVisible}
        />
      )}
      <_View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: whiteThemeColors.background,
        }}
      >
        {!isStudent(roleName) && !isParent(roleName) && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddMakeupClass', {
                refresh: true,
                isFromCancelClass: true,
                ClassDetais: ClassDetais,
                getClassDate: getClassDate,
              })
            }
            style={styles.addNewBtn}
          >
            <_View style={styles.buttonIconCon}>
              <_VectorIcons
                type={'AntDesign'}
                name={'pluscircleo'}
                size={20}
                color={whiteThemeColors.primary}
              />
            </_View>

            <_Text
              style={{
                fontFamily: CommonStyles.fonts.semiBold,
                marginLeft: 30,
                color: whiteThemeColors.primary,
              }}
            >
              {`Add Makeup/Unscheduled ${terminologies['Class']?.label}`}
            </_Text>
          </TouchableOpacity>
        )}

        {loading ? (
          <_ActivityIndicator size={'large'} />
        ) : fileterdDateList?.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            data={fileterdDateList}
            renderItem={({ item, index }) => (
              <_RenderItem item={item} index={index} />
            )}
            keyExtractor={(item: any) => {
              item.$id;
            }}
          />
        ) : (
          <NoItemFound />
        )}

        {alert.show && (
          <CustomAlert
            visible={alert.show}
            title={alert.title}
            msg={alert.message}
            firstBtn={alert.firstBtn}
            secondBtn={alert.firstBtn ? 'Cancel' : 'Okay'}
            secondBtnFunc={() => {
              setAlert({ show: false });
            }}
            firstBtnFunc={() => {
              if (alert.firstBtn) {
                cancelClass();
                // isPressedCancel ? cancelClass() : undoCancelClass();
              } else {
                setAlert({ show: false });
              }
            }}
          />
        )}
      </_View>
    </_Screen>
  );
};
const styles = StyleSheet.create({
  flatlistContainer: {
    margin: 0,
    paddingHorizontal: 8,
  },
  flatlistEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 16,

    color: whiteThemeColors.greyDark,
    top: -20,
  },
  addNewBtn: {
    width: '97%',
    height: 55,
    backgroundColor: whiteThemeColors.white,
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
  },
  buttonIconCon: {
    width: 50,
    height: '100%',
    backgroundColor: whiteThemeColors.primary + 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
});
export { AttendanceClassTimings };
