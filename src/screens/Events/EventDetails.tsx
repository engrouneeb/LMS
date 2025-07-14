import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  CustomAlert,
  dateStringFormatToDisplay,
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
  isAdmin, 
  isCoordinator, 
  isExecutive 
} from 'utilities';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import {
  _Screen,
  _Text,
  _VectorIcons,
  _View,
  eventDetailsInterface,
} from '../../components';
import { Appstate } from '../../reducers/Appstate';
import MasterHeader from '../Headers';
import { _ActivityIndicator } from '../Loader';
import Search from '../Search';
import { useAppModulePermission } from '../../customHooks';

import CommonStyles from 'screens/CommonStyles';

const { width, height } = Dimensions.get('screen');

export const EventDetails: React.FC<eventDetailsInterface> = ({
  navigation,
  route,
}) => {
  let searchRef: any = useRef();
 let { roleName } = useSelector((state: any) => state.User.UserInfo);
  const { selectedDate, eventIds } = route.params;
  const { show, message } = useSelector((state: Appstate) => state.CustomAlert);
  const [eventDetails, setEventDetails] = useState([]);
  const [EventDetailSearch, setEventDetailSearch] = useState([]);
  const [alertModalVisible, setAlertModalVisible] = useState(show || false);
  const [alertTitle, setAlertTitle] = useState('Warning');
  const [alertText, setAlertText] = useState<any>(message);
  const [loader, setLoader] = useState(false);
  const [footerLoader, setFooterLoader] = useState(false);
  const [showMore, setShowMore] = useState();
  const [textExtend, setTextExtend] = useState(false);
  const [pages, setPages] = useState(0);
  const [isVisible, setisVisible] = useState(false);
  const { PostSecured } = DataAccess();
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {},
  );
  const { filterMenuOptions } = useAppModulePermission();
  const isShowEventRoster=filterMenuOptions("EventRoster")
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
    };
    fetchTerminologies();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = (skipRecords = 0) => {
    skipRecords == 0 ? setLoader(true) : setFooterLoader(true);
    let EndPoint = ApiEndpoints.GetCalanderEventDetails;
    let obj = {
      eventIds,
      selectedDate,
      page: skipRecords,
    };
    PostSecured(EndPoint, obj)
      .then((res: any) => {
        if (res?.data) {
          if (res.data.length > 0) {
            setPages(pages + 1);
            setEventDetails(res.data);
            setEventDetailSearch(res.data);
          } else {
            setPages(-1);
          }
        } else {
          console.log('Something went wrong');
        }
      })
      .catch((e) => {
        console.log(e, '---->ERROR');
      })
      .finally(() => {
        setLoader(false);
        setFooterLoader(false);
      });
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <Pressable
        disabled={item?.eventDescription.length == 0}
        onPress={() => {
          setShowMore(index);
          setTextExtend(!textExtend);
        }}
        style={styles.cardContainer}
      >
          {isShowEventRoster && 
         <Pressable style={{ position: "absolute", top: 5, right: 5, zIndex: 10, backgroundColor: whiteThemeColors.primary + 90, height: 30, width: 110, borderRadius: 8 }}
                    onPress={() => {
                      navigation.navigate("EventRoster", { eventId: item.eventId })
                    }}>
                      <_Text
                      style={styles.rosterBtn}
                    >{`${terminologies['Event']?.label} Roster`}</_Text>
                  
                    </Pressable>
        }
        <_View style={styles.stickyIcon}>
          <_VectorIcons
            type={'Ionicons'}
            name='calendar-outline'
            size={70}
            color={whiteThemeColors.primary + 10}
          />
        </_View>
        <_View style={styles.cardHeaderContainer}>
          <_View style={styles.cardHeaderIconContainer}>
            <_VectorIcons
              type={'FontAwesome'}
              name={'calendar-o'}
              size={25}
              color={whiteThemeColors.primary}
            />
          </_View>
          <_View style={styles.cardHeaderTxtContainer}>
            <_Text style={styles.headerDateTxt}>{item.formatedDate}</_Text>
            <_Text style={styles.headerTimeTxt}>{`${item.formatedTime}`}</_Text>
          </_View>
        </_View>

        <_View style={styles.detialsContainer}>
          <_View style={styles.detailsFirstRowContainer}>
            <_View style={styles.eventNameContainer}>
              <_View style={styles.eventNameTitleContainer}>
                <_VectorIcons
                  type={'MaterialIcons'}
                  name={'event'}
                  size={16}
                  color={whiteThemeColors.primary}
                />
                <_Text
                  style={styles.titleAfterIconTxt}
                >{`${terminologies['Event']?.label} Name`}</_Text>
              </_View>
              <_View style={styles.eventValueContainer}>
                <_Text style={styles.eventValueTxt} numberOfLines={2}>
                  {item.displaytitle}
                </_Text>
              </_View>
            </_View>
            <_View style={styles.feePriceContainer}>
              <_Text style={styles.feePriceTitleTxt}>Price</_Text>
              <_Text style={styles.feePriceValueTxt}>${item.eventPrice}</_Text>
            </_View>
            <_View style={styles.feePriceContainer}>
              <_Text style={styles.feePriceTitleTxt}>Fee</_Text>
              <_Text style={styles.feePriceValueTxt}>${item.eventFee}</_Text>
            </_View>
          </_View>

          <_View>
            <_View style={styles.locationTitleContainer}>
              <_VectorIcons
                type={'MaterialIcons'}
                name={'location-on'}
                size={16}
                color={whiteThemeColors.primary}
              />
              <_Text style={styles.locationDescriptionTitleTxt}>Location</_Text>
            </_View>
            <_Text style={styles.locationValueTxt}>{item.eventLocation}</_Text>
          </_View>

          <_View style={{ marginTop: 3 }}>
            <_View flexDirection='row' alignItems={'center'}>
              <_VectorIcons
                type={'MaterialCommunityIcons'}
                name={'clipboard-text-outline'}
                size={16}
                color={whiteThemeColors.primary}
              />
              <_Text style={styles.locationDescriptionTitleTxt}>
                Description
              </_Text>
            </_View>
            <_Text
              numberOfLines={showMore == index && textExtend ? 10 : 1}
              style={styles.descriptionValueTxt}
            >
              {item.eventDescription}
            </_Text>
            {(showMore == index && textExtend) ||
            item.eventDescription == '' ||
            item.eventDescription.length < 60 ? null : (
              <_Text style={styles.seeMoreTxt}>See more...</_Text>
            )}
          </_View>
        </_View>
      </Pressable>
    );
  };

  const onAndroidBack = () => {
    navigation.goBack();
    return true;
  };
  const onChangeText = (data: any) => {
    let array = [];
    data.forEach((element: any) => {
      array.push(element);
    });
    setEventDetails(data);
  };

  const ListFooterComponent = () => (
    <_View style={styles.footerComponent}>
      {footerLoader && (
        <ActivityIndicator size={'small'} color={whiteThemeColors.greyDark} />
      )}
    </_View>
  );

  const ListHeaderComponent = () => <_View style={styles.headerComponent} />;

  const ItemSeparatorComponent = () => <_View style={{ height: 15 }} />;

  const openSearch = () => setisVisible(true);

  const goBack = () => navigation.goBack();
  const onEndReachedHandler = async () => {
    if (pages != -1) await fetchEvents(pages);
    return null;
  };

  return (
    <_Screen
      header={
        <MasterHeader
          isBack
          isSearchBtn
          OpenSearch={openSearch}
          Screen={moment(selectedDate).format(dateStringFormatToDisplay())}
          GoBack={goBack}
          background={whiteThemeColors.background}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={onAndroidBack}
    >
      {isVisible && (
        <Search
                  onInputChange={onChangeText}
                  onClose={() => {
                      setisVisible(false);
                  } }
                  animSpeed={100}
                  data={EventDetailSearch}
                  searchKey='displaytitle,eventLocation'
                  isVisible={isVisible}
                  outPos={-110}
                  inPos={-10}
                  height={60} showCross        />
      )}
      <_View style={styles.mainContainer}>
        {loader ? (
          <_ActivityIndicator size='large' />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={eventDetails}
            ListHeaderComponent={() => <ListHeaderComponent />}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.eventId}
            onEndReachedThreshold={0.5}
            onEndReached={onEndReachedHandler}
            ItemSeparatorComponent={() => <ItemSeparatorComponent />}
            ListFooterComponent={ListFooterComponent}
            ListEmptyComponent={ListEmptyComponent}
          />
        )}
      </_View>
      {alertModalVisible && (
        <CustomAlert
          visible={alertModalVisible}
          title={alertTitle}
          msg={alertText}
          firstBtn={'Okay'}
          secondBtn={alertTitle != 'Error' && 'Close'}
          firstBtnFunc={() => {
            setAlertModalVisible(false);
          }}
          secondBtnFunc={() => {
            setAlertModalVisible(false);
          }}
        />
      )}
    </_Screen>
  );
};


const ListEmptyComponent = () => {
  return (
    <_View style={styles.emptyListContainer}>
      <_VectorIcons
        type='FontAwesome5'
        name={'store-alt-slash'}
        size={80}
        color={whiteThemeColors.primary}
      />
      <_Text style={styles.emptyListTxt}>{'No Data Found!'}</_Text>
    </_View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: whiteThemeColors.background,
    paddingHorizontal: 10,
  },

  cardContainer: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: whiteThemeColors.primary + 10,
    alignSelf: 'center',
    padding: 15,
  },
  cardHeaderContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderIconContainer: {
    width: 38,
    height: 38,
    backgroundColor: whiteThemeColors.primary + 30,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderTxtContainer: {
    justifyContent: 'center',
    paddingLeft: 10,
    marginRight:2,
    width:Platform.OS=="android"? "57%":"60%"
  },
  headerDateTxt: {
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 13,
    color: whiteThemeColors.black,
  },
  headerTimeTxt: {
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 13,
    color: whiteThemeColors.greyDark,
  },
  detialsContainer: {
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  detailsFirstRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  eventNameContainer: {
    width: '40%',
  },
  eventNameTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventValueContainer: {
    marginLeft: 3,
    marginTop: 3,
  },
  eventValueTxt: {
    fontSize: 11,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.black,
  },
  titleAfterIconTxt: {
    fontSize: 12,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.regular,
    marginLeft: 3,
  },
  feePriceContainer: {
    width: '30%',
  },
  feePriceTitleTxt: {
    marginLeft: 0,
    fontSize: 12,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.regular,
  },
  feePriceValueTxt: {
    fontSize: 11,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.black,
    marginTop: 3,
  },
  locationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDescriptionTitleTxt: {
    fontSize: 12,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.regular,
    marginLeft: 3,
  },
  locationValueTxt: {
    fontSize: 11,
    marginLeft: 5,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.black,
  },
  descriptionValueTxt: {
    fontSize: 10,
    color: whiteThemeColors.black,
    textAlign: 'justify',
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.semiBold,
    marginLeft: 3,
  },
  seeMoreTxt: {
    color: whiteThemeColors.greyDark,
    fontSize: 10,
    fontFamily: CommonStyles.fonts.regular,
    marginLeft: 3,
  },
  stickyIcon: {
    position: 'absolute',
    right: 8,
    top: 33,
  },
  emptyListContainer: {
    width,
    height: height - 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListTxt: {
    marginTop: 20,
    alignSelf: 'center',
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.greyDark,
  },

  headerComponent: {
    width: '100%',
    height: 10,
  },
  footerComponent: {
    height: 220,
    width: '100%',
    paddingVertical: 30,
  },
  rosterBtn: {
    fontSize: 12,
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.white,
    marginVertical: 5,
    textAlign: "center"
  }
});
