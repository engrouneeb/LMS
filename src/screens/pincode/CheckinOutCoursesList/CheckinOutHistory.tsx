import { useNavigation, useRoute } from '@react-navigation/native';
import { _Button, _Screen, _Text, _View, _VectorIcons } from '../../../components';
import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import {
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from '../../../Utilities';
import Header from '../../Headers';
import { styles } from './styles';
import CommonStyles from '../../../screens/CommonStyles';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { EndpointType } from '../../../interfaces';
import Loader from '../../../../Loader/loader';
import { HistoryItemCard, NoHistory } from './components';

interface CheckinOutCoursesListProps {}
interface CheckinOutCoursesList {
  checkinDate: string;
  checkinTime: string;
  checkoutTime: string;
  subjects: [string];
  classes: [string];
}
export const CheckinOutHistory: FC<CheckinOutCoursesListProps> = ({}) => {
  const navigation: any = useNavigation();
  const { Get } = DataAccess();
  const [checkInList, setCheckinList] = useState<[CheckinOutCoursesList] | []>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { params }: any = useRoute();
  const { isClass, user } = params;
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {}
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
    getCheckinHistory();
  }, [user.userId]);
  const getCheckinHistory = async () => {
    if (loading || !hasMore) return;
    let EndPoint: EndpointType = Boolean(isClass)
      ? ApiEndpoints.GetUserCheckinClassesHistory
      : ApiEndpoints.GetUserCheckinSubjectHistory;
    EndPoint.params = `?userId=${user.userId}&skip=${skip}&take=20`;

    try {
      setLoading(true);
      const res = await Get(EndPoint);  
      if (res.length < 20) {
        setHasMore(false); // Stop fetching when less than `take` items are returned
      }
      if (!res?.error) {
        setCheckinList((prevList) => [...prevList, ...res]); // Concatenate new data with the existing list
        setSkip((prevSkip) => prevSkip + 20); // Update skip for the next batch
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleBack: () => boolean = () => {
    navigation.goBack();
    return true;
  }

  return (
    <_Screen
      header={
        <Header
          isClose
          onPressClose={() => navigation.goBack()}
          Screen={'Check-In/Out History'}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
      backgroundColor={whiteThemeColors.background}
    >
      <_View style={styles.container}>
        <_View style={styles.messageContianer}>
          <_Text
            style={{
              fontFamily: CommonStyles.fonts.bold,
              fontSize: 18,
              color: whiteThemeColors.primary,
            }}
          >{`${params.user.firstName} ${params.user.lastName}`}</_Text>
        </_View>
        <_View flex={1}>
          <FlatList
            data={checkInList}
            renderItem={(item) => (
              <HistoryItemCard isClass={isClass} item={item.item} />
            )}
            ListEmptyComponent={<NoHistory loading={loading} />}
            onEndReached={getCheckinHistory}
            onEndReachedThreshold={0.8}
          />
        </_View>
      </_View>
      {loading && <Loader />}
    </_Screen>
  );
};
