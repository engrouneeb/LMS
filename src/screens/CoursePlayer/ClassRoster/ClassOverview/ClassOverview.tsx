import { useNavigation, useRoute } from '@react-navigation/native';
import { EndpointType } from '../../../../interfaces';
import React, { FC, useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { TerminologyMap, getTerminologyLabel } from '../../../../Utilities';
import ApiEndpoints from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import { _Screen, _View } from '../../../../components';
import { whiteThemeColors } from '../../../../Utilities/colors';
import CstHeader from "../../../Headers";
import { _ActivityIndicator } from '../../../Loader';
import Search from '../../../Search';
import { ClassCard } from './Components';
import { EmptyList } from '../Components';
import { useAppModulePermission } from '../../../../customHooks';

interface ClassOverviewProps {
}
interface classInterface {
  id: any;
  courseTitle: string;
  className: string;
  courseLevelName: string;
  dateFromTo: string;
  noOfEnrolled: number;
  amount: number;
  fee: number;
  isCouponExist: string;
  totalSlots: {
    noOfAvailableSlots: number,
    isSlotsSet: boolean,
    noOfUsedSlots: number,
    isSlotNull: boolean,
    remainingSlots: number
  },
  classDaysTimingList: any[];
  status: string;
  classType: string;
  instructors: string;
}

export const ClassOverview: FC<ClassOverviewProps> = () => {
  const [loading, setloading] = useState<boolean>(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [allDataFetched, setAllDataFetched] = useState(false); // Prevent further calls
  const { params } = useRoute();
  const navigation = useNavigation();
  const { courseId } = params;
  const { Get } = DataAccess();
  const [classesList, setClassesList] = useState<classInterface[]>([]);
  const [filteredClassesList, setFilteredClassesList] = useState<
    classInterface[]
  >([]);
  const [error, setError] = useState<Boolean>(false);
  const [isVisible, setisVisible] = useState(false);
  const { filterMenuOptions } = useAppModulePermission(); 
     const isShowRoster=filterMenuOptions("ClassRoster");
     
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
    getAssignedClasses();
  }, [courseId]);

  useEffect(() => {
    // Fetch all data on initial render
    fetchAllData();
  }, [courseId]);
  const fetchAllData = async () => {
    if (allDataFetched) return; // Avoid duplicate calls
    // Single call to fetch all data
    const EndPoint: EndpointType = ApiEndpoints.GetClassesAgainstCourse;
    EndPoint.params = `?courseId=${courseId}&skip=0&take=-1`;

    try {
      const res = await Get(EndPoint);
      if (!res.error) {
        // Filter data where `noOfEnrolled > 0`
        const filteredClasses = res?.filter(item => item.noOfEnrolled > 0) || [];
        // Set the data in state
        setFilteredClassesList(filteredClasses);
        setClassesList(filteredClasses);
        // Mark all data as fetched
      } else {
        throw new Error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching assigned classes:", error);
      setError(true);
    } finally {
      setAllDataFetched(true);
    }
  };

  const getAssignedClasses = async () => {
    if (loading || !hasMore || allDataFetched) return; // Avoid duplicate calls or unnecessary fetches
    setloading(true);
    // Endpoint with dynamic skip and take values for pagination
    const EndPoint: EndpointType = ApiEndpoints.GetClassesAgainstCourse;
    EndPoint.params = `?courseId=${courseId}&skip=${skip}&take=20`;

    try {
      const res = await Get(EndPoint);
      console.log("respone of assigned");

      // Check if less than `take` items are returned, indicating no more data
      if (res?.length < 20) {
        setHasMore(false);
      }

      if (!res.error) {
        // Filter the data to only include classes where `noOfEnrolled > 0`
        const filteredClasses = res?.filter(item => item.noOfEnrolled > 0) || [];
        if (skip == 0) {
          setClassesList(filteredClasses);
          setFilteredClassesList(filteredClasses);
        }
        else {
          // Append the new data to the existing lists
          setClassesList(prevList => [...prevList, ...filteredClasses]);
          setFilteredClassesList(prevList => [...prevList, ...filteredClasses]);
        }
        // Increment the `skip` value for the next batch
        setSkip(prevSkip => prevSkip + 20);
      }
    } catch (error) {
      console.error("Error fetching assigned classes:", error);
      setError(true); // Set error state for UI handling
    } finally {
      setloading(false); // Ensure loading state is reset
    }
  };

  const handleEndReached = () => {
    if (!allDataFetched && !loading) {
      getAssignedClasses(); // Only fetch if not all data is fetched and not already loading
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
          searchKey='className,classId,courseLevelName'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
          showCross
        />
      )}
      {loading &&
        <_View flex={1} justifyContent='center'>
          <_ActivityIndicator />
        </_View>
      }
      <FlatList
        data={filteredClassesList}
        keyExtractor={(item, index) => item.id || index.toString()} // Unique key
        renderItem={({ item }) => (
          <ClassCard
            singleClass={item}
            terminologies={terminologies}
            navigation={navigation}
            isShowRoster={isShowRoster}
          />
        )}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached} // Triggered when end of list is reached
        onEndReachedThreshold={0.8} // Trigger loadMore when the list is 50% scrolled
        ListEmptyComponent={<EmptyList loading={loading} />}
      />

    </_Screen>
  );
}