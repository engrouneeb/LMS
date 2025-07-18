import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomAlert,
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
  convertUTCDateToLocalDateStringFormat
} from '../../../Utilities';
import { NoData } from '../../../../assets/Icons';
import { UndoCancelClass } from '../../../actions/ClassActions';
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
import { EndpointType } from '../../../interfaces';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { error } from './../../../actions/AsyncStorage';
import CancelledClassCard from './components/CancelledClassCard';

const CancelledClassTimings: React.FC<attendanceClassTimeInterface> = ({
  navigation,
  route,
}) => {
  const [dateList, setDateList] = useState();
  const [fileterdDateList, setFileterdDateList] = useState();
  const language = useSelector((state: any) => state.language);
  const [selectedClass, setSelectedClass] = useState<any>([]);
  const [index, setIndex] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { classDateList } = language;
  const [screenVariant] = useState(route?.params?.screenVariant);
  const ClassDetais = route?.params?.ClassDetais;
  const dispatch = useDispatch();
  const { Get } = DataAccess();
  const [alert, setAlert] = useState<any>({
    show: false,
    title: '',
    message: '',
    firstBtn: undefined,
  });
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
  const [isVisible, setisVisible] = useState(false);
  useEffect(() => {
    getCancelledClasses();
  }, []);

  const getCancelledClasses = async () => {
    try {
      setLoading(true);
      var EndPoint: EndpointType = ApiEndpoints.GetCanceledClassTimings;
      EndPoint.params = `?ClassId=${ClassDetais?.classId}`;
      let response = await Get(EndPoint);
      if (response.error || response.message == 'Network request failed') {
        response.error_description = response.message;
        setLoading(false);
        return dispatch(error(response || 'ERROR'));
      } else {
        var formatedArray = response.map((Obj: any) => {
          let day = Obj;
          day.attendanceDate = convertUTCDateToLocalDateStringFormat(
            Obj?.attendanceDate,
          );
          return day;
        });
        setLoading(false);
        setDateList(formatedArray);
        setFileterdDateList(formatedArray);
      }
    } catch (err) {
      dispatch(error('Something Went Wrong' || 'ERROR'));
    }
  };

  const onChangeText = (data: any) => {
    let array: any = [];
    data.forEach((element: any) => {
      array.push(element);
    });
    setFileterdDateList(array);
  };
  const searchRef: any = React.useRef();

  const undoCancelClass = () => {
    setLoading(true);
    dispatch(UndoCancelClass(selectedClass?.makeUpClassId, index))
      .then(() => {
        setAlert({
          show: true,
          title: classDateList.Success,
          message:
            classDateList.ClassCancellationHasBeenSuccessfullyUndone.replace(
              'Class',
              terminologies['Class']?.label,
            ),
        });
        getCancelledClasses();
      })
      .catch(() => {
        setLoading(false);
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
  const handleOpenCloseSearch = () => setisVisible(false);

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
    <CancelledClassCard
      Obj={item}
      index={index}
      classDateList={classDateList}
      navigation={navigation}
      screenVariant={screenVariant}
      setAlert={setAlert}
      setSelectedClass={setSelectedClass}
      setIndex={setIndex}
      setLoading={setLoading}
    />
  );
  return (
    <_Screen
      header={
        <CstHeader
          isBack
          isSearchBtn
          Screen={`Cancelled ${terminologies['Class']?.label} Timings`}
          GoBack={handleGoBack}
          OpenSearch={() => setisVisible(true)}
        />
      }
      onAndroidBack={onAndroidBack}
      hideTopSafeArea
      backgroundColor={whiteThemeColors.background}
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          onClose={handleOpenCloseSearch}
          animSpeed={100}
          data={dateList}
          searchKey='className'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}

      <_View style={{ flex: 1, justifyContent: 'center' }}>
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
            keyExtractor={(item) => {
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
                undoCancelClass();
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
    marginTop: 10,
    marginBottom: 2,
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: whiteThemeColors.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4.84,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export { CancelledClassTimings };
