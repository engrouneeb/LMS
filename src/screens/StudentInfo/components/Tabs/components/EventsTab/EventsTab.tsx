import { EventCardInterface, EventListInterface } from 'interfaces';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import {
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../components';
import { _ActivityIndicator } from 'screens/Loader';
import { styles } from './styles';

const _EventsTab = () => {
  const { eventList, loading }: any = useSelector((state: Appstate) => ({
    eventList:
      state.StudentInfoReducer.enrolledEvents != undefined
        ? state.StudentInfoReducer.enrolledEvents
        : [],
    loading: state.StudentInfoReducer.isEnrolledEventslLoading,
  }));
  const [labels, setLabels] = useState<string[]>([]);
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

  const EventCard: FC<EventCardInterface> = ({ data }) => {
    return (
      <_View style={styles.cardContainer}>
        <_View style={styles.innerContainer}>
          <_View style={styles.textTimeContainer}>
            <_View style={styles.textContainer}>
              <_View style={styles.titleContainer}>
                <_Text
                  style={styles.eventTxt}
                >{`${terminologies['Event']?.label}`}</_Text>
                <_Text numberOfLines={2} style={styles.eventName}>
                  {data.eventName}
                </_Text>
              </_View>
              <_View style={styles.timeContainer}>
                <_View
                  style={{
                    backgroundColor: whiteThemeColors.primary + 30,
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                >
                  <_Text style={styles.dateTimeTxt}>
                    {moment(data.eventStartDate).format('DD MMM, YYYY')}
                    {moment(data.eventStartDate).format(' hh:mm a')}
                  </_Text>
                </_View>

                <_VectorIcons
                  name={'dots-two-horizontal'}
                  type={'Entypo'}
                  size={10}
                  color={whiteThemeColors.primaryDark}
                  style={{
                    textAlign: 'center',
                  }}
                />
                <_View
                  style={{
                    backgroundColor: whiteThemeColors.primary + 30,
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                >
                  <_Text style={styles.dateTimeTxt}>
                    {moment(data.eventEndDate).format('DD MMM, YYYY')}
                    {moment(data.eventEndDate).format(' hh:mm a')}
                  </_Text>
                </_View>
              </_View>
              <_View style={styles.subTxtContainer}>
                <_View style={styles.titleContainer}>
                  <_Text style={styles.amountTxt}>Amount</_Text>
                  <_Text style={styles.amount}>{data.amount}</_Text>
                </_View>
                <_View>
                  <_View style={styles.titleContainer}>
                    <_Text style={styles.couponTxt}>Coupon</_Text>
                    <_Text style={styles.couponExistTxt}>
                      {data.couponExist}
                    </_Text>
                  </_View>
                </_View>
              </_View>
            </_View>
          </_View>
          <_View style={styles.watermarkCircle1} />
          <_View style={styles.watermarkCircle2} />
        </_View>
      </_View>
    );
  };
  return (
    <_View flex={1}>
      {loading ? (
        <_ActivityIndicator size='large' />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={eventList[0]?.userEnrollments}
          renderItem={({ item }) => <EventCard data={item} />}
          keyExtractor={(item) => item?.enrollmentID.toString()}
          style={{ paddingTop: 10 }}
          ListEmptyComponent={() => (
            <_View style={styles.noDataContainer}>
              <_Text
                style={styles.noDataTxt}
              >{`No ${terminologies['Event']?.label} data are found`}</_Text>
            </_View>
          )}
        />
      )}
    </_View>
  );
};

export const EventsTab = React.memo(_EventsTab);
