import React, { useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  Linking,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BottomLeftButton,
  BottomRightButton,
  CustomAlert,
  Orientation,
  whiteThemeColors,
} from '../../../Utilities';
import ClassSvg from '../../../../assets/classSvg';
import CourseSvg from '../../../../assets/courseSvg';
import EventSvg from '../../../../assets/eventSvg';
import NotFoundSvg from '../../../../assets/notFoundSvg';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import WhiteLabelConfig from '../../../WhiteLabelConfig';
import { _Text, _VectorIcons, _View, endpoint } from '../../../components';
import ListView from './listView';
import { styles } from './styles';
interface props {
  navigation: any;
  route: any;
}
const FranchiseSelection: React.FC<props> = ({ navigation, route }) => {
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [companyList, setCompanyList] = useState([]);
  const [companyText, setCompanyText] = useState('');
  const [franchiseText, setFranchiseText] = useState('');
  const [franchiseList, setFranchiseList] = useState<any>([]);
  const [searchCompany, setSearchCompany] = useState<any>([]);
  const [validationMessage, setValidationMessage] = useState('');
  const [searchFranchise, setSearchFranchise] = useState<any>([]);
  const [selectedFranchise, setSelectedFranchise] = useState(
    route.params.defaultValues,
  );
  const [height, setHeight] = useState(Dimensions.get('screen').height);
  const [showCompanyList, setShowCompanyList] = useState(false);
  const [showFranchiseList, setShowFranchiseList] = useState(false);
  const [alertModalVisible, setAlertModal] = useState(false);
  const [alertText, setAlertText] = useState('');
  const cp_height = useState(new Animated.Value(0))[0];
  const fr_height = useState(new Animated.Value(0))[0];

  const type = route.params.type;
  const frTerminology = route.params.franchiseTerminology;
  const cmpTerminology = route.params.companyTerminology;
  const [loading, setLoading] = useState(true);
  const { GetUnSecured, Post } = DataAccess();
  useEffect(() => {
    setSize();
    getCompanySettings();
  }, [orientation]);

  const getCompanySettings = () => {
    let url: endpoint = ApiEndpoints.GetVariantCompany;
    url.params = `?cmpURL=${WhiteLabelConfig.APP_VARIANT_URL}&type=${type}`;
    GetUnSecured(url).then((res) => {
      if (res) {
        if (WhiteLabelConfig.APP_VARIANT_URL.toLowerCase() == 'default') {
          setCompanyList(res);

          setValidationMessage(`Please select ${cmpTerminology}`);
        } else {
          setFranchiseList(res);
          setSearchFranchise(res);

          setValidationMessage(`Please select ${frTerminology}`);
        }
      }
      setLoading(false);
    });
  };

  const setSize = () => {
    const size =
      orientation == 'PORTRAIT'
        ? Dimensions.get('screen').height
        : Dimensions.get('screen').width;
    setHeight(size);
  };

  const openCompanyList = () => {
    setSearchCompany([]);
    closeFranchiseList();
    setShowCompanyList(true);
    let height = searchCompany.length < 5 ? searchCompany.length * 45 : 225;
    setTimeout(() => {
      Animated.timing(cp_height, {
        toValue: height,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }, 50);
  };

  const closeCompanyList = () => {
    Animated.timing(cp_height, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setShowCompanyList(false);
      setSearchCompany([]);
    }, 500);
  };

  const openFranchiseList = () => {
    closeCompanyList();
    setShowFranchiseList(true);
    let listCount = franchiseList.length ?? 0;
    let height = listCount < 5 ? listCount * 45 : 225;
    setTimeout(() => {
      Animated.timing(fr_height, {
        toValue: height,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }, 50);
  };

  const closeFranchiseList = () => {
    Animated.timing(fr_height, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setShowFranchiseList(false);
      setSearchFranchise(franchiseList);
    }, 500);
  };

  const onCompanySelect = (index: number) => {
    setCompanyText(searchCompany[index].companyName);
    setFranchiseText('');
    setFranchiseList([]);
    setSearchFranchise([]);
    setSelectedFranchise(searchCompany[index]);
    let url: endpoint = ApiEndpoints.GetCompanyFranchise;
    url.params = `?cmpKey=${searchCompany[index].companyKey}`;
    GetUnSecured(url).then((res) => {
      if (res) {
        if (Array.isArray(res) && res.length > 0) {
          setFranchiseList(res);
          setSearchFranchise(res);
        }
        setValidationMessage('');
      }
    });

    closeCompanyList();
  };

  const onFranchiseSelection = (index: number) => {
    setSelectedFranchise(searchFranchise[index]);
    setFranchiseText(searchFranchise[index].companyName);
    setValidationMessage('');
    closeFranchiseList();
  };

  const searchCompanyName = (search: any) => {
    setCompanyText(search);
    if (search.length > 2) {
      var list = companyList.filter((company: any) =>
        company.companyName.toLowerCase().includes(search.trim().toLowerCase()),
      );
      if (list.length > 0) setShowCompanyList(true);
      setSearchCompany(list);
      let height = list.length < 5 ? list.length * 45 : 225;
      Animated.timing(cp_height, {
        toValue: height,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(cp_height, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      setSearchCompany([]);
    }
  };
  const searchFranchiseName = (search: any) => {
    setFranchiseText(search);
    var list = franchiseList.filter((company: any) =>
      company.companyName.toLowerCase().includes(search.trim().toLowerCase()),
    );
    setSearchFranchise(list);
  };

  const handleOnPressNext = () => {
    if (
      validationMessage &&
      WhiteLabelConfig.APP_VARIANT_URL.toLowerCase() == 'default'
    )
      setAlertModal(true);
    // Alert.alert(validationMessage);
    else {
      let url = selectedFranchise.companySecureURL;
      let cmpKey = selectedFranchise.companyKey;
      url = url?.split('/center')[0];
      if (type == 'Courses') {
        let endPoint = ApiEndpoints.GetCoursesEmbededCode;
        Post(endPoint.url, {
          CompanyKey: cmpKey,
        }).then((res) => {
          url = url + res;
        });
      } else {
        url =
          type == 'Classes'
            ? `${url}?FranchiseId=${cmpKey}`
            : `${url}/Events/SubscribeEvents?FranchiseId=${cmpKey}`;
      }
      Linking.canOpenURL(url).then((supported) => {
        if (supported) Linking.openURL(url);
        else Alert.alert('Error', 'Cannot open required url scheme');
      });
    }
    // navigation.navigate(ScreensNames.franchiseSecure.name, {
    //   title: selectedFranchise.companyName,
    //   secureUrl: selectedFranchise.companySecureURL,
    //   companyKey:selectedFranchise.companyKey,
    //   backScreenName: ScreensNames.franchiseSelection.name,
    //   type: type,
    // });
  };

  return (
    <Orientation
      getOrientation={(o: any) => {
        setOrientation(o);
      }}
    >
      <SafeAreaView style={[styles.safeViewWhite]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            closeCompanyList();
            closeFranchiseList();
            Keyboard.dismiss();
          }}
          style={styles.safeViewWhite}
        >
          <_View style={styles.headView}>
            <LinearGradient
              style={styles.gradientView}
              colors={[
                whiteThemeColors.background,
                whiteThemeColors.background,
                whiteThemeColors.background,
                whiteThemeColors.background,
              ]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              locations={[0, 0.6, 0.8, 1]}
            >
              <_View style={{ paddingLeft: 10 }}>
                <_Text
                  style={{ ...styles.enrollText, fontSize: height * 0.02 }}
                >
                  {'Enroll to'}
                </_Text>
                <_Text style={{ ...styles.headText, fontSize: height * 0.05 }}>
                  {route.params.name}
                </_Text>
              </_View>
              {type == 'Events' ? (
                <EventSvg size={height * 0.16} />
              ) : type == 'Classes' ? (
                <ClassSvg size={height * 0.16} />
              ) : (
                <CourseSvg size={height * 0.16} />
              )}
            </LinearGradient>
          </_View>

          <_View style={styles.contentContainer}>
            {!loading &&
              WhiteLabelConfig.APP_VARIANT_URL.toLowerCase() == 'default' &&
              companyList.length < 1 && (
                <_View style={styles.noFoundTxtView}>
                  <NotFoundSvg height={height * 0.15} width={height * 0.25} />
                  <_Text style={styles.noFoundTxt}>No Company Found</_Text>
                </_View>
              )}
            <_View style={styles.container}>
              {companyList.length > 0 && (
                <_View style={styles.ex_listcontainer}>
                  <_View style={{ height: 55 }}>
                    <TouchableOpacity
                      onPress={() => {
                        showCompanyList
                          ? closeCompanyList()
                          : openCompanyList();
                      }}
                      activeOpacity={0.8}
                      style={{
                        ...styles.ex_listOpenContainer,
                        elevation: 3,
                      }}
                    >
                      <TextInput
                        numberOfLines={1}
                        value={companyText}
                        onChangeText={searchCompanyName}
                        placeholder={`Search ${cmpTerminology}...(At least 3 characters)`}
                        onFocus={openCompanyList}
                        style={styles.textContainer}
                      />

                      <_VectorIcons
                        name={showCompanyList ? 'arrow-up' : 'arrow-down'}
                        type={'SimpleLineIcons'}
                        size={17}
                        color={whiteThemeColors.greenDark}
                        style={styles.ex_listopenIcon}
                      />
                    </TouchableOpacity>
                  </_View>

                  {showCompanyList && (
                    <Animated.View
                      style={[
                        // styles.animatedView,
                        {
                          padding: 0,
                          margin: 0,

                          // ...styles.ex_flatList,
                          // height: cp_height,
                        },
                      ]}
                    >
                      <ScrollView
                        style={{
                          backgroundColor: whiteThemeColors.white,
                          borderBottomRightRadius: 15,
                          borderBottomLeftRadius: 15,
                        }}
                        showsVerticalScrollIndicator={false}
                      >
                        {searchCompany.map((company: any, key: number) => {
                          return (
                            <ListView
                              key={key}
                              index={key}
                              selected={companyText}
                              onSelect={onCompanySelect}
                              text={company.companyName}
                            />
                          );
                        })}
                      </ScrollView>
                    </Animated.View>
                  )}
                </_View>
              )}
              {!(
                WhiteLabelConfig.APP_VARIANT_URL.toLowerCase() == 'Default'
              ) && (
                <_View style={styles.ex_listcontainer}>
                  <_View style={{ height: 55 }}>
                    <TouchableOpacity
                      onPress={() => {
                        showFranchiseList
                          ? closeFranchiseList()
                          : openFranchiseList();
                      }}
                      activeOpacity={0.8}
                      style={{
                        ...styles.ex_listOpenContainer,
                        elevation: showCompanyList ? 2 : 3,
                      }}
                    >
                      <TextInput
                        value={franchiseText}
                        numberOfLines={1}
                        onChangeText={searchFranchiseName}
                        placeholder={`Select a ${frTerminology}...`}
                        onFocus={openFranchiseList}
                        style={styles.textContainer}
                      />
                      <_VectorIcons
                        name={showFranchiseList ? 'arrow-up' : 'arrow-down'}
                        type={'SimpleLineIcons'}
                        size={17}
                        color={whiteThemeColors.greyDark}
                        style={styles.ex_listopenIcon}
                      />
                    </TouchableOpacity>
                  </_View>

                  {showFranchiseList && (
                    <Animated.View>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                          backgroundColor: whiteThemeColors.white,
                          borderBottomRightRadius: 15,
                          borderBottomLeftRadius: 15,
                        }}
                      >
                        {searchFranchise.map((franchise: any, key: number) => {
                          return (
                            <ListView
                              key={key}
                              index={key}
                              selected={franchiseText}
                              onSelect={(index: any) =>
                                onFranchiseSelection(index)
                              }
                              text={franchise.companyName}
                            />
                          );
                        })}
                      </ScrollView>
                    </Animated.View>
                  )}
                </_View>
              )}
            </_View>
            <_View style={styles.backBtnView}>
              <BottomLeftButton
                onPress={() => navigation.goBack()}
                iconName={'arrowleft'}
                iconType={'AntDesign'}
              />
            </_View>
            <_View
              style={[
                styles.nextBtnView,
                {
                  opacity: selectedFranchise ? 1 : 0.4,
                },
              ]}
            >
              <BottomRightButton
                loading={!selectedFranchise}
                text={'Next'}
                onPress={() => handleOnPressNext()}
                iconName={'arrowright'}
                iconType={'AntDesign'}
                size={undefined}
                iconSize={undefined}
              />
            </_View>
          </_View>
        </TouchableOpacity>
        {alertModalVisible && (
          <CustomAlert
            visible={alertModalVisible}
            title={'Error'}
            msg={validationMessage}
            firstBtn={'Okay'}
            firstBtnFunc={() => {
              setAlertModal(false);
            }}
          />
        )}
      </SafeAreaView>
    </Orientation>
  );
};
export default FranchiseSelection;
