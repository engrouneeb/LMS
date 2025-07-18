import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import {
  getTerminologyLabel,
  RemoveHTML,
  removeStyling,
  TerminologyMap,
  whiteThemeColors,
} from '../../Utilities';
import { AnnouncementsIcon } from '../../../assets/Icons';
import { _Screen, _Text, _View } from '../../components';
import ScreensNames from '../../screenNames';
import Header from '../Headers';
import Search from '../Search';
import { Appstate } from '../../reducers/Appstate';
import { announcementInterface } from '../../interfaces';
import CommonStyles from '../CommonStyles';
export const Announcement: FC = () => {
  let searchRef: any = useRef();
  const announcement: announcementInterface | undefined = useSelector(
    (state: Appstate) => state.AnnouncementsReducer.data,
  );
  const [isVisible, setisVisible] = useState(false);
  const [filterdAnnouncements, setfilterdAnnouncements] =
    useState(announcement);
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {},
  );
  const navigation: any = useNavigation();
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
    };
    fetchTerminologies();
  }, []);

  const handleClick = (id = 0) =>
    navigation.navigate(ScreensNames.AnnouncementDetails.name, {
      id,
    });

  const RenderItem: ({
    item,
  }: {
    item: announcementInterface;
  }) => React.JSX.Element = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          handleClick(item.announcementID);
        }}
        style={styles.body_notification}
      >
        <_View style={styles.iconContainer}>
          <AnnouncementsIcon color={whiteThemeColors.white} size={35} />
        </_View>
        <_View style={styles.detailsContainer}>
          <_Text numberOfLines={1} style={styles.notification_name}>
            {item.title}
          </_Text>
          <_Text numberOfLines={2} style={styles.notification_text}>
            {removeStyling(item.description)}
          </_Text>
        </_View>
      </TouchableOpacity>
    );
  };

  const onAndroidBack = () => {
    navigation.goBack();
    return true;
  };

  const TopBottomSpace = () => <_View style={{ height: 20 }} />;
  return (
    <_Screen
      header={
        <Header
          isBack={true}
          isSearchBtn={true}
          OpenSearch={() => {
            setisVisible(true);
          }}
          Screen={
            terminologies['Announcement']?.label}
          goBack={() => navigation.goBack()}
        />
      }
      onAndroidBack={onAndroidBack}
      hideTopSafeArea
      flex={1}
      backgroundColor={whiteThemeColors.background}
    >
      {isVisible && (
        <Search
          onInputChange={(data) => setfilterdAnnouncements(data)}
          onClose={() => setisVisible(false)}
          animSpeed={100}
          data={announcement}
          searchKey='title'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      <_View style={styles.body}>
        <FlatList
          data={filterdAnnouncements}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={TopBottomSpace}
          ListFooterComponent={TopBottomSpace}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </_View>
    </_Screen>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  body_notification: {
    flexDirection: 'row',
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 15,
    marginBottom: 10,
    paddingVertical: 20,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },

  iconContainer: {
    marginLeft: 3,
    marginRight: 6,
    height: 52,
    width: 52,
    borderRadius: 10,
    backgroundColor: whiteThemeColors.primary + 30,
  },
  detailsContainer: { paddingRight: 20, paddingLeft: 10, width: '85%' },
  notification_name: {
    fontSize: 14,
    fontFamily: CommonStyles.fonts.semiBold,
    paddingRight: 75,
    color: whiteThemeColors.primaryTextColor,
  },
  notification_text: {
    fontSize: 12,
    marginTop: 3,
    color: whiteThemeColors.greyDark,
    textAlign: 'justify',
    fontFamily: CommonStyles.fonts.regular,
  },
});
