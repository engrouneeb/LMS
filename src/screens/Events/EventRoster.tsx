import { useNavigation, useRoute } from '@react-navigation/native';
import { EndpointType } from 'interfaces';
import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Loader from 'screens/Loader/loader';
import { TerminologyMap, getTerminologyLabel } from 'utilities';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import { _Screen } from '../../components';
import { whiteThemeColors } from '../../Utilities/colors';
import CstHeader from "../Headers";
import Search from '../Search';
import { EmptyList, EventItem } from './Components';

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
export const EventRoster: FC<ClassRosterProps> = () => {
  const navigation = useNavigation();
  const { Get } = DataAccess();
  const [studentList, setStudentList] = useState<studentDetails[]>([]);
  const [filteredStudentList, setFilteredStudentList] = useState<
    studentDetails[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setisVisible] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { params }: any = useRoute();
  const { eventId } = params;
  console.log({ eventId });

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
  }, [1546]);

  const getClassRoster = async () => {
    if (loading || !hasMore) return;
    var EndPoint: EndpointType = ApiEndpoints.GetEventRoaster;
    EndPoint.params = `?eventTimingId=${eventId}&skip=${skip}&take=20`;
    try {
      setLoading(true);
      const res = await Get(EndPoint);
      if (res?.data?.length < 10) {
        setHasMore(false); // Stop fetching when less than `take` items are returned
      }
      if (!Boolean(res?.error)) {
        setStudentList((prevList) => [...prevList, ...res?.data]); // Concatenate new data with the existing list
        setFilteredStudentList((prevList) => [...prevList, ...res?.data]); // Concatenate new data with the existing list
        setSkip((prevSkip) => prevSkip + 20); // Update skip for the next batch
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
          Screen={`${terminologies['Event']?.label} Roster`}
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
          searchKey='eventName,studentFirstName,studentLastName,contactName,instructors'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
          showCross
        />
      )}
      {filteredStudentList && <FlatList
        data={
          filteredStudentList
        }
        renderItem={({ item }) => (
          <EventItem
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
      />}
      {loading && <Loader />}

    </_Screen>
  );
}