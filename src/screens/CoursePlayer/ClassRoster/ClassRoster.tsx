import { useNavigation, useRoute } from '@react-navigation/native';
import { EndpointType } from '../../../interfaces';
import React, { FC, useEffect, useState } from 'react';
import { CustomAlert, TerminologyMap, getTerminologyLabel,whiteThemeColors} from '../../../Utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { _Screen, _View } from '../../../components';
import CstHeader from "../../Headers";
import { _ActivityIndicator } from '../../Loader';
import Search from '../../Search';
import { ClassItem, EmptyList } from './Components';
import { FlatList } from 'react-native';

interface ClassRosterProps { }
interface studentDetails {
  policiesStatus: string;
  age: string;
  timings: any[];
  contactName: string;
  className: string;
  courseModule: string;
  dateFrom: string;
  dateTo: string;
  daysOfTheWeek: string;
  location: string;
  contactPhone: string;
  contactEmail: string;
  staffNames: string;
  specialNeeds: string;
  timingfrom: string;
  timingTo: string;
}
export const ClassRoster: FC<ClassRosterProps> = () => {
  const navigation = useNavigation();
  const { Get } = DataAccess();
  const [studentList, setStudentList] = useState<studentDetails[]>([]);
  const [filteredStudentList, setFilteredStudentList] = useState<
    studentDetails[]
  >([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [isVisible, setisVisible] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState({ showAlert: false, alertMsg: '' });
  const { params }: any = useRoute();
  const { classId } = params;
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
    setSkip(0); // Reset skip
    setHasMore(true); // Reset hasMore flag
    getClassRoster();
  }, [classId]);

  const getClassRoster = async () => {
    if (loading || !hasMore) return;
    var EndPoint: EndpointType = ApiEndpoints.GetClassRoaster;
    EndPoint.params = `?classId=${classId}&skip=${skip}&take=20`;
    setLoading(true);
    try {

      const res = await Get(EndPoint);
            if (res?.data?.length < 20) {
        setHasMore(false); // Stop fetching when less than `take` items are returned
      }
      if (!Boolean(res?.error)) {
        setStudentList((prevList) => [...prevList, ...res?.data]); // Concatenate new data with the existing list
        setFilteredStudentList((prevList) => [...prevList, ...res?.data]); // Concatenate new data with the existing list
        setSkip((prevSkip) => prevSkip + 20); // Update skip for the next batch
      }
      else {
        setError({
          showAlert: true,
          alertMsg: res?.error_description
        });
        setHasMore(false);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
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
          Screen={`${terminologies['Class']?.label} Roster`}
        />
      }
      hideTopSafeArea
      flex={1}
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={backPress}
    >
      {isVisible && (
        <Search
          onInputChange={(data: any) => setFilteredStudentList(data)}
          onClose={() => {
            setisVisible(false);
          }}
          animSpeed={100}
          data={studentList && studentList}
          searchKey='className,courseModule,staffName'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
          showCross
        />
      )}
      {loading ? (
        <_View flex={1} justifyContent='center'>
          <_ActivityIndicator />
        </_View>
      ) : error.showAlert ? <CustomAlert
        title='Error'
        visible={error.showAlert}
        msg={error.alertMsg}
        firstBtn={'Okay'}
        firstBtnFunc={() => { setError({ showAlert: false, alertMsg: "" });navigation.goBack() }} /> : (
        <FlatList
          data={
            filteredStudentList &&
            filteredStudentList.filter((singleClass) => Array.isArray(singleClass?.dayTimeSubLists) && singleClass.dayTimeSubLists.length > 0)
          }
          renderItem={({ item }) => (
            <ClassItem
              singleClass={item}
              terminologies={terminologies}
              whiteThemeColors={whiteThemeColors}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={getClassRoster}
          onEndReachedThreshold={0.8}
          ListEmptyComponent={<EmptyList loading={loading} />}
        />
      )}
    </_Screen>
  );
}