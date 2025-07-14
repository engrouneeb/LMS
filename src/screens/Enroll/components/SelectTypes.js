import React, { createRef, useEffect, useState } from 'react';
import {
  FlatList,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { _Screen, _Text, _VectorIcons, _View } from '../../../components';
import CommonStyles from '../../CommonStyles';
import Header from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
import Search from '../../Search';
import { isParent, isTablet, whiteThemeColors } from 'utilities';

export const SelectTypes = ({ navigation, route }) => {
  const {
    roleName,
    userID,
    licenseCmpKey,
    licenseFranchiseCmpKey,
    companySecureUrl
  } = useSelector((state) => state.User.UserInfo);
  const { type, title } = route.params;
  const [typesList, setTypesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { failed } = useSelector((state) => state.courseAssignStudentsReducer);
  const [filterdTypesList, setfilterdTypesList] = useState([]);
  const searchRef = createRef();
  const [token, setToken] = useState('');
  const { Get } = DataAccess();
  const [isVisible, setisVisible] = useState(false);
  useEffect(() => {
    if (title === 'Classes') {
      getClassesTypes();
    } else {
      getEventsTypes();
    }
  }, []);
  const getToken = () => {
    AsyncStorage.getItem('@UserAuth').then((res) => {
      if (res != null) {
        setToken(JSON.parse(res).token);
      } else {
        console.log('Error in fetching token', res);
      }
    });
  };

  useEffect(() => {
    getToken();
  }, []);

  const getClassesTypes = async () => {
    setIsLoading(true);
    const Endpoint = ApiEndpoints.GetCoursesTypes;
    Get(Endpoint)
      .then((res) => {
        setIsLoading(false);
        setTypesList(res);
        setfilterdTypesList(res);
      })
      .catch((er) => {
        setIsLoading(false);
        console.log('Something went wrong: ', er);
      });
  };

  const getEventsTypes = async () => {
    setIsLoading(true);
    const Endpoint = ApiEndpoints.GetEventsTypes;
    Get(Endpoint)
      .then((res) => {
        setIsLoading(false);
        setTypesList(res);
        setfilterdTypesList(res);
      })
      .catch((er) => {
        setIsLoading(false);
        console.log('Something went wrong: ', er);
      });
  };

  const onAndroidBackBtn = () => {
    navigation.goBack();
    return true;
  };

  const handleNavigate = (item) => {
    const typeID = title === 'Classes' ? item?.typeId : item?.typeKey;
    const parent = isParent(roleName);
    let url = companySecureUrl;
    // url = url.split('/center')[0];
    url =
      type == 'Classes'
        ? `${url}/?FranchiseId=${licenseFranchiseCmpKey}&Type=${item.typeName}&token=${token}`
        : `${url}/Events/SubscribeEvents?FranchiseId=${licenseFranchiseCmpKey}&Type=${typeID}&token=${token}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported)  Linking.openURL(url) 
      else console.log('Cannot open url');
    });
  };
  const onChangeText = (data) => setfilterdTypesList(data);

  const handleGoBack = () => navigation.goBack();

  handleSearch = () => {
    if (searchRef.current !== null) {
      searchRef.current.changeVisibleState();
    }
  };

  const FailedDataLoad = () => {
    return (
      <_View style={styles.failureContainer}>
        <_Text style={styles.failureMsgTxt}>{'Failed to load data'}</_Text>
      </_View>
    );
  };

  const NoDataFound = () => {
    return (
      <_View style={styles.foundText}>
        <_Text style={styles.noStdFoundTxt}>{'No Type found'}</_Text>
      </_View>
    );
  };

  const _RenderItem = ({ item }) => {
    return (
      <_View>
        <TouchableOpacity
          onPress={() => {
            handleNavigate(item);
          }}
          style={styles.typeCard}
        >
          <View style={styles.container}>
            <View style={styles.iconBox}>
              <_VectorIcons
                type='MaterialIcons'
                name={'class'}
                size={isTablet ? 40 : 30}
                color={whiteThemeColors.white}
              />
            </View>

            <View style={styles.textBox}>
              <Text style={styles.key}>Name </Text>
              <Text style={styles.title} numberOfLines={1}>
                {item?.typeName}
              </Text>
            </View>
          </View>
          <View style={styles.stickerBox}>
            <View style={styles.countSticker}>
              <Text style={styles.count}>
                {title === 'Classes'
                  ? item?.typeCategoryCount
                  : item?.typeWiseEventsCount}
              </Text>
            </View>

            <_VectorIcons
              type='Feather'
              name={'chevron-right'}
              size={isTablet ? 30 : 20}
              color={whiteThemeColors.greyDark}
              style={{ marginRight: 40 }}
            />
          </View>
        </TouchableOpacity>
      </_View>
    );
  };

  return (
    <_Screen
      header={
        <Header
          isBack
          isSearchBtn
          Screen={'Select Type'}
          GoBack={handleGoBack}
          OpenSearch={() => setisVisible(true)}
        />
      }
      flex={1}
      hideTopSafeArea
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={onAndroidBackBtn}
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          animSpeed={100}
          data={typesList && typesList}
          searchKey='typeName'
          outPos={-110}
          inPos={-10}
          onClose={() => {
            setisVisible(false);
          }}
          height={60}
          isVisible={isVisible}
        />
      )}
      {isLoading ? (
        <_ActivityIndicator size='large' />
      ) : failed ? (
        <FailedDataLoad />
      ) : (
        <_View style={{ padding: 15 }}>
          {typesList.length > 0 ? (
            <FlatList
              data={filterdTypesList}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <_RenderItem item={item} />}
              keyExtractor={(item) => item.index}
              ListFooterComponent={<_View height={100} />}
            />
          ) : (
            <NoDataFound />
          )}
        </_View>
      )}
    </_Screen>
  );
};

const styles = StyleSheet.create({
  typeCard: {
    backgroundColor: whiteThemeColors.white + 90,
    shadowColor: whiteThemeColors.greyDark,
    justifyContent: 'space-between',
    height: isTablet ? 100 : 90,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    borderRadius: 20,
  },
  title: {
    color: whiteThemeColors.greyDark,

    marginLeft: 1,
    fontSize: 13,
    fontFamily: CommonStyles.fonts.medium,
  },
  key: {
    color: whiteThemeColors.primary,

    fontSize: 11,
    fontFamily: CommonStyles.fonts.medium,
  },
  iconBox: {
    backgroundColor: whiteThemeColors.primary + 20,
    borderRadius: 20,
    width: isTablet ? 100 : 80,
    justifyContent: 'center',

    alignItems: 'center',
    height: '90%',
    marginLeft: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  count: {
    fontSize: isTablet ? 12 : 9,

    color: 'white',
    fontFamily: CommonStyles.fonts.semiBold,
  },
  countSticker: {
    backgroundColor: whiteThemeColors.red,
    height: isTablet ? 30 : 20,
    width: isTablet ? 30 : 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 70,
    marginRight: 3,
  },
  stickerBox: {
    width: isTablet ? 75 : 55,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingTxt: {
    color: whiteThemeColors.primaryTextColor,
  },
  failureContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  failureMsgTxt: {
    color: whiteThemeColors.primaryTextColor,
    textTransform: 'capitalize',
    fontSize: 16,
  },
  foundText: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '95%',
  },
  noStdFoundTxt: {
    color: whiteThemeColors.primaryTextColor,
    fontWeight: '600',
    fontSize: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textBox: {
    paddingHorizontal: 10,
    width: '65%',
  },
});
