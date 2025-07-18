import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useDispatch, useSelector } from 'react-redux';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  AnnouncemetsLoading,
  AnnouncemetsSuccess,
} from '../../../actions/AnnouncementActions';
import { _Text, _VectorIcons, _View } from '../../../components';
import { Appstate } from '../../../reducers/Appstate';
import ScreensNames from '../../../screenNames';
import { styles } from './styles';
import { getTerminologyLabel, removeStyling, TerminologyMap } from '../../../Utilities';

export const Announcements: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [Announcement, setAnnouncements] = useState([]);
  const announcement: any = useSelector(
    (state: Appstate) => state.AnnouncementsReducer.data,
  );
  const width = Dimensions.get('window').width;

  const { Get } = DataAccess();
  const fadeAnim = useRef(new Animated.Value(0)).current;
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
    announcement?.length > 2
      ? setAnnouncements(announcement.slice(0, 2))
      : setAnnouncements(announcement);
  }, [announcement]);

  useEffect(() => {
    dispatch(AnnouncemetsLoading());
    let Endpoint = ApiEndpoints.GetAnnouncements;
    Get(Endpoint).then((res) => {
      dispatch(AnnouncemetsSuccess(res.value));
      animateView();
    });
  }, []);

  const animateView = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  return Announcement?.length > 0 ? (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreensNames.Announcement.name);
        }}
        style={styles.mainAnnouncementView}
      >
        <_Text
          style={styles.announcementText}
        >{`${terminologies['Announcement']?.pluralLabel}`}</_Text>
        <_View style={styles.announcementArrow}>
          <_VectorIcons
            type='AntDesign'
            name='arrowright'
            color='gray'
            size={18}
          />
        </_View>
      </TouchableOpacity>
      <_View style={{ flex: 1 }}>
        <Carousel
          loop
          width={width}
          height={90}
          autoPlayInterval={900}
          autoPlay={true}
          data={Announcement}
          // mode='parallax'
          // mode={'stack'}

          scrollAnimationDuration={2000}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate(ScreensNames.Announcement.name);
              }}
              style={styles.announcementRender}
            >
              <_View style={styles.announcementImage}>
                <Image
                  style={styles.announcementimage}
                  source={require('../../../../assets/Icons/announcement.png')}
                />
              </_View>
              <_View marginLeft={15}>
                <_Text numberOfLines={1} style={styles.announcementTitle}>
                  {item?.title}
                </_Text>
                <_View style={{ width: '80%' }}>
                  <_Text
                    numberOfLines={3}
                    style={styles.announcementDiscription}
                  >
                    {removeStyling(item?.description)}
                  </_Text>
                </_View>
              </_View>
            </TouchableOpacity>
          )}
        />
      </_View>
    </>
  ) : null;
};
