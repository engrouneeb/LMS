import { useNavigation } from '@react-navigation/native';
import {
  _Screen,
  _Text,
  _TextInput,
  _VectorIcons,
  _View,
  endpoint,
} from 'components';
import CstHeader from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
import React, { useEffect, useState } from 'react';
import {
  getTerminologyLabel,
  RemoveHTML,
  removeStyling,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import { styles } from './styles';
import { ScrollView, TouchableOpacity } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { ClassOverviewDetail, EditClassOverview } from './ClassOverviewDetails';
import Search from 'screens/Search';
import { NoCourse } from '../../../../assets/NoCourse';

interface ClassOverviewProps {}
interface classDetails {
  additionalNotes: string;
  age: string;
  timings: any[];
  classCycle: string;
  className: string;
  courseModule: string;
  dateFrom: string;
  dateTo: string;
  daysOfTheWeek: string;
  location: string;
  partner: string;
  staffNames: [];
  timingfrom: string;
  timingTo: string;
}

export const ClassOverview: React.FC<ClassOverviewProps> = ({}) => {
  const weekDays = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
  const navigation = useNavigation();
  const { Get } = DataAccess();
  const [classesList, setClassesList] = useState<classDetails[]>([]);
  const [selectedItem, setSelectedItem] = useState<classDetails | {}>({});
  const [filteredClassesList, setFilteredClassesList] = useState<
    classDetails[]
  >([]);
  const [Loading, setLoading] = useState<Boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
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
    getInstructorClasses();
  }, []);

  const generateDaysArray = (days: string) => {
    if (Boolean(days)) {
      let lastIndex = days.lastIndexOf(',');
      // Remove the trailing comma using slice
      let resultString = days.slice(0, lastIndex) + days.slice(lastIndex + 1);
      return resultString.split(',');
    } else return [];
  };
  const getInstructorClasses = () => {
    setLoading(true);
    var EndPoint: endpoint = ApiEndpoints.GetInstructorClasses;
    Get(EndPoint)
      .then((res: any) => {
        if (res) {
          setClassesList(res);
          setFilteredClassesList(res);
        }
      })
      .catch((e: any) => console.log('Error: ', e))
      .finally(() => {
        setLoading(false);
      });
  };
  const backPress = () => {
    navigation.goBack();
    return true;
  };
  return (
    <_Screen
      header={
        <CstHeader
          isBack
          isSearchBtn
          OpenSearch={() => {
            setisVisible(true);
          }}
          GoBack={backPress}
          Screen={`${terminologies['Class']?.label} Overview`}
        />
      }
      hideTopSafeArea
      flex={1}
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={backPress}
    >
      {isVisible && (
        <Search
          onInputChange={(data: any) => setFilteredClassesList(data)}
          onClose={() => {
            setisVisible(false);
          }}
          animSpeed={100}
          data={classesList && classesList}
          searchKey='className,courseModule,staffName'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
          showCross
        />
      )}
      {Loading ? (
        <_View flex={1} justifyContent='center'>
          <_ActivityIndicator />
        </_View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredClassesList.length > 0 ? (
            filteredClassesList?.map((singleClass) => {
              let days: any[] = [];
              if (singleClass.timings.length > 0)
                days = generateDaysArray(singleClass.timings[0].daysOfTheWeek);
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedItem(singleClass);
                    setShowEditModal(true);
                  }}
                  style={{ paddingHorizontal: 15, marginBottom: 10 }}
                >
                  <_View style={styles.inner}>
                    <_Text
                      style={{
                        ...styles.key,
                        marginTop: 0,
                      }}
                    >
                      {`${terminologies['Course']?.label} Name`}
                    </_Text>
                    <_Text
                      style={{
                        fontFamily: CommonStyles.fonts.medium,
                        fontSize: 14,
                      }}
                    >
                      {singleClass.courseModule}
                    </_Text>
                    <_Text
                      style={styles.key}
                    >{`${terminologies['Course']?.label} Name`}</_Text>
                    <_Text style={styles.value}>{singleClass?.className}</_Text>
                    <_View style={styles.week}>
                      {weekDays.map((obj, index) => {
                        return (
                          <_View
                            style={{
                              ...styles.days,
                              backgroundColor: days.includes(weekDays[index])
                                ? whiteThemeColors.primary + 90
                                : whiteThemeColors.white,
                            }}
                          >
                            <_Text
                              style={{
                                fontSize: 10,
                                fontFamily: CommonStyles.fonts.medium,
                                color: days.includes(weekDays[index])
                                  ? whiteThemeColors.white
                                  : whiteThemeColors.black,
                              }}
                            >{`${obj}`}</_Text>
                          </_View>
                        );
                      })}
                    </_View>
                    <_View
                      style={{
                        backgroundColor: whiteThemeColors.primary + 20,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingBottom: 10,
                      }}
                    >
                      <_View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <_View>
                          <_Text
                            style={styles.key2}
                          >{`${terminologies['Class']?.label} Cycle`}</_Text>
                          <_Text style={styles.value2}>
                            {singleClass.classCycle}
                          </_Text>
                        </_View>
                        <_View
                          style={{ justifyContent: 'flex-start', width: '50%' }}
                        >
                          <_Text style={styles.key2}>Partner</_Text>
                          <_Text style={styles.value2}>
                            {singleClass.partner}
                          </_Text>
                        </_View>
                      </_View>
                      <_Text style={styles.key2}>Location</_Text>
                      <_Text style={styles.value2}>
                        {singleClass.location}
                      </_Text>
                      <_View style={styles.fromCont}>
                        <_View style={styles.fromInn}>
                          <_Text style={styles.key2}>Age </_Text>
                          <_Text style={[styles.value2]}>
                            {singleClass.age}
                          </_Text>
                        </_View>
                        <_View style={styles.fromInn}>
                          <_Text style={styles.key2}>Timing </_Text>
                          <_Text style={[styles.value2]}>
                            {singleClass.timings.length > 0 &&
                              singleClass.timings[0].timing}
                          </_Text>
                        </_View>
                      </_View>
                      <_View style={styles.fromCont}>
                        <_View style={styles.fromInn}>
                          <_Text style={styles.key2}>Date From </_Text>
                          <_Text style={[styles.value2]}>
                            {singleClass.dateFrom}
                          </_Text>
                        </_View>
                        <_View style={styles.fromInn}>
                          <_Text style={styles.key2}>Date To</_Text>
                          <_Text style={[styles.value2]}>
                            {singleClass.dateTo}
                          </_Text>
                        </_View>
                      </_View>
                      <_Text style={styles.key2}>Staff Name(s)</_Text>
                      <_View style={styles.staffCon}>
                        {singleClass?.staffNames.length == 0 ? (
                          <_Text
                            style={{
                              ...styles.valueText,
                              fontSize: 10,
                              marginLeft: 5,
                            }}
                          >
                            No instructor assigned
                          </_Text>
                        ) : singleClass?.staffNames.length < 10 ? (
                          singleClass?.staffNames.map((inst, index) => (
                            <_View style={styles.inst}>
                              <_Text
                                style={{
                                  ...styles.valueText,
                                  fontSize: 10,
                                  marginLeft: 5,
                                  color: whiteThemeColors.white,
                                }}
                              >{`${inst}`}</_Text>
                            </_View>
                          ))
                        ) : (
                          singleClass?.staffNames.length > 15 &&
                          singleClass?.staffNames
                            .slice(0, 15)
                            .map((inst, index) =>
                              index == 14 ? (
                                <_View style={styles.inst}>
                                  <_Text
                                    style={{
                                      ...styles.valueText,
                                      fontSize: 10,
                                      marginLeft: 5,
                                      color: whiteThemeColors.white,
                                    }}
                                  >{`  ...+${
                                    singleClass?.staffNames.length - 10
                                  } more`}</_Text>
                                </_View>
                              ) : (
                                <_View style={styles.inst}>
                                  <_Text
                                    style={{
                                      ...styles.valueText,
                                      fontSize: 10,
                                      marginLeft: 5,
                                      color: whiteThemeColors.white,
                                    }}
                                  >
                                    {`${inst}`}
                                  </_Text>
                                </_View>
                              ),
                            )
                        )}
                      </_View>
                      <_Text style={styles.key2}>Aditional Information </_Text>
                      <_View style={styles.notes}>
                        <_Text
                          style={[
                            styles.key2,
                            { marginTop: 0, color: 'black' },
                          ]}
                        >
                          {Boolean(singleClass.additionalNotes) &&
                            removeStyling(singleClass.additionalNotes)}
                        </_Text>
                      </_View>
                    </_View>
                  </_View>
                </TouchableOpacity>
              );
            })
          ) : (
            <_View
              style={{
                paddingTop: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <NoCourse />
              <_Text
                style={{
                  fontFamily: CommonStyles.fonts.bold,
                  fontSize: 16,
                  color: 'gray',
                }}
              >
                {`No ${terminologies['Class']?.label} found`}
              </_Text>
            </_View>
          )}
        </ScrollView>
      )}
      {showEditModal && (
        <ClassOverviewDetail
          item={selectedItem}
          showModal={showEditModal}
          setShowModal={setShowEditModal}
        />
      )}
    </_Screen>
  );
};
