import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Platform } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {
  getTerminologyLabel,
  Orientation,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import ClassSvg from '../../../assets/classSvg';
import CourseSvg from '../../../assets/courseSvg';
import EventSvg from '../../../assets/eventSvg';
import {
  _Button,
  _Text,
  _VectorIcons,
  _View,
  isTablet,
} from '../../components';
import ScreensNames from '../../screenNames';
import styles from './styles';
interface props {
  navigation: any;
}
const SecurePage: React.FC<props> = ({ navigation }) => {
  let logo =
    Platform.OS == 'android' ? 'asset:/images/circleLogo.png' : 'circleLogo';
  const [terminologies, setTerminologies] = useState<any>({});
  const [secureSett, setSecureSett] = useState<any>({});
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [terminology, setTerminolog] = useState<Partial<TerminologyMap>>({});
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminolog(terms);
    };
    fetchTerminologies();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('secureSett').then((res: any) => {
      let trminologs = JSON.parse(res);
      let trminologsObj: any = {};
      trminologs.secureTerminologies.map((value: any) => {
        trminologsObj[value.key] = value.value;
      });
      setTerminologies(trminologsObj);
      delete trminologs.secureTerminologies;

      setSecureSett(trminologs);
    });
  }, []);
  const [height, setHeight] = useState(Dimensions.get('screen').height);
  const getSize = () => {
    const size =
      orientation == 'PORTRAIT'
        ? Dimensions.get('screen').height
        : Dimensions.get('screen').width;
    setHeight(size);
  };
  useEffect(() => {
    getSize();
  }, [orientation]);

  const handleNavigate = (type: any, name: any) => {
    if (secureSett.isCompanyFranchises)
      navigation.navigate(ScreensNames.franchiseSelection.name, {
        type: type,
        name: name,
        companyTerminology: terminologies.Company,
        franchiseTerminology: terminologies.Franchise,
        defaultValues: {
          companyName: secureSett.companyName,
          companySecureURL: secureSett.companySecureURL,
          companyKey: secureSett.companyKey,
        },
      });
    else
      navigation.navigate(ScreensNames.franchiseSecure.name, {
        title: secureSett.companyName,
        secureUrl: secureSett.companySecureURL,
        companyKey: secureSett.companyKey,
        backScreenName: ScreensNames.SecurePage.name,
        type: type,
      });
  };
  return (
    <Orientation getOrientation={setOrientation}>
      <_View style={{ flex: 1, backgroundColor: whiteThemeColors.background }}>
        <_View style={styles.logoContainer}>
          <Image
            style={styles.logoImg}
            resizeMode='contain'
            source={{ uri: logo }}
          />
        </_View>
        <_View style={styles.subContainer}>
          <_View>
            {secureSett.isCoursesPage && (
              <TouchableHighlight
                style={{
                  paddingVertical: orientation == 'PORTRAIT' ? 0 : 10,
                }}
                onPress={() => handleNavigate('Courses', terminologies.Courses)}
                underlayColor={whiteThemeColors.primary + '10'}
              >
                <_View
                  style={{
                    width: '95%',
                    height: 120,
                    backgroundColor: whiteThemeColors.white + 90,
                    alignSelf: 'center',
                    marginTop: 10,
                    borderRadius: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}
                >
                  <_View
                    style={{
                      width: '30%',
                      height: 100,
                      backgroundColor: whiteThemeColors.primary + 10,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CourseSvg
                      size={
                        orientation == 'PORTRAIT'
                          ? height * 0.08
                          : height * 0.12
                      }
                    />
                  </_View>
                  <_View style={{ width: '50%', height: 100 }}>
                    <_View style={styles.textContainer}>
                      <_Text style={styles.enrollText}>{'Enroll in'}</_Text>
                      <_Text style={styles.enrollTitle}>
                        {terminology['Course']?.pluralLabel || 'Courses'}
                      </_Text>
                    </_View>
                  </_View>
                  <_View
                    style={{
                      width: '20%',
                      height: 100,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}
                  >
                    <_View style={styles.arrow}>
                      <_VectorIcons
                        name='arrowright'
                        type='AntDesign'
                        color={whiteThemeColors.white}
                        size={20}
                      />
                    </_View>
                  </_View>
                </_View>
              </TouchableHighlight>
            )}
            {secureSett.isEventsPage && (
              <TouchableHighlight
                style={{
                  paddingVertical: orientation == 'PORTRAIT' ? 0 : 10,
                }}
                onPress={() => handleNavigate('Events', terminologies.Events)}
                underlayColor={whiteThemeColors.primary + '10'}
              >
                <_View
                  style={{
                    width: '95%',
                    height: 120,
                    backgroundColor: whiteThemeColors.white + 90,
                    alignSelf: 'center',
                    marginTop: 10,
                    borderRadius: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}
                >
                  <_View
                    style={{
                      width: '30%',
                      height: 100,
                      backgroundColor: whiteThemeColors.primary + 10,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <EventSvg
                      size={
                        orientation == 'PORTRAIT'
                          ? height * 0.08
                          : height * 0.12
                      }
                    />
                  </_View>
                  <_View style={{ width: '50%', height: 100 }}>
                    <_View style={styles.textContainer}>
                      <_Text style={styles.enrollText}>{'Enroll in'}</_Text>
                      <_Text style={styles.enrollTitle}>
                        {terminology['Event']?.pluralLabel || 'Events'}
                      </_Text>
                    </_View>
                  </_View>
                  <_View
                    style={{
                      width: '20%',
                      height: 100,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}
                  >
                    <_View style={styles.arrow}>
                      <_VectorIcons
                        name='arrowright'
                        type='AntDesign'
                        color={whiteThemeColors.white}
                        size={20}
                      />
                    </_View>
                  </_View>
                </_View>
              </TouchableHighlight>
            )}
            {secureSett.isClassesPage && (
              <TouchableHighlight
                style={{
                  paddingVertical: orientation == 'PORTRAIT' ? 0 : 10,
                }}
                onPress={() => handleNavigate('Classes', terminologies.Classes)}
                underlayColor={whiteThemeColors.primary + '10'}
              >
                <_View
                  style={{
                    width: '95%',
                    height: 120,
                    backgroundColor: whiteThemeColors.white + 90,
                    alignSelf: 'center',
                    marginTop: 10,
                    borderRadius: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}
                >
                  <_View
                    style={{
                      width: '30%',
                      height: 100,
                      backgroundColor: whiteThemeColors.primary + 10,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ClassSvg
                      size={
                        orientation == 'PORTRAIT'
                          ? height * 0.08
                          : height * 0.12
                      }
                    />
                  </_View>
                  <_View style={{ width: '50%', height: 100 }}>
                    <_View style={styles.textContainer}>
                      <_Text style={styles.enrollText}>{'Enroll in'}</_Text>
                      <_Text style={styles.enrollTitle}>
                        {terminologies.Classes == undefined
                          ? ''
                          : terminologies.Classes}
                      </_Text>
                    </_View>
                  </_View>
                  <_View
                    style={{
                      width: '20%',
                      height: 100,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}
                  >
                    <_View style={styles.arrow}>
                      <_VectorIcons
                        name='arrowright'
                        type='AntDesign'
                        color={whiteThemeColors.white}
                        size={20}
                      />
                    </_View>
                  </_View>
                </_View>
              </TouchableHighlight>
            )}
          </_View>
          <_View style={styles.btnContainer}>
            <LinearGradient
              colors={[whiteThemeColors.primaryDark, whiteThemeColors.primary]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <_Button
                transparent={false}
                submitting={true}
                activeOpacity={0.8}
                loaderColor={whiteThemeColors.white}
                width='100%'
                style={styles.button}
                borderRadius={10}
                BtnTxt={styles.buttonTxt}
                btnText={'Login'}
                callback={() =>
                  navigation.navigate(ScreensNames.signInScreen.name)
                }
              />
            </LinearGradient>
          </_View>
        </_View>
      </_View>
    </Orientation>
  );
};
export default SecurePage;
