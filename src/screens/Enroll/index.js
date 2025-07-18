import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ClassSvg from '../../../assets/classSvg';
import EventSvg from '../../../assets/eventSvg';
import { _Screen, _View, isTablet } from '../../components';
import drawerScreens from '../../navigation/Drawer/DrawerScreenNames';
import ScreensNames from '../../screenNames';
import { getTerminologyLabel, Orientation, whiteThemeColors } from '../../Utilities';
import CommonStyles from '../CommonStyles';
import CstHeader from '../Headers';
import Card from './components/Card';

let mobileImg = require('../../../assets/enroll.png');
let tabImg = require('../../../assets/tab-enroll.png');

const EnrollmentScreen = ({ navigation }) => {
  const [height, setHeight] = useState(Dimensions.get('screen').height);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [secureSett, setSecureSett] = useState({});
  const [labels, setLabels] = useState([]);
  const { companySecureUrl, licenseCmpKey } = useSelector(
    (state) => state.User.UserInfo,
  );
   const [terminologies, setTerminologies] = useState(
      {},
    );
    useEffect(() => {
      const fetchTerminologies = async () => {
        const terms = await getTerminologyLabel();
        setTerminologies(terms);
        setLabels([
         {name:"Classes",label: terms['Class']?.pluralLabel || 'Classes'},
         {name:"Events",label:terms['Event']?.pluralLabel || 'Events'},
        ]);
      };
      fetchTerminologies();
    }, []);

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

  const handleNavigate = (type) => {
    console.log({type});
    navigation.navigate(ScreensNames.selectTypes.name, {
      type: type,
      title: type,
      secureUrl: companySecureUrl,
      companyKey: licenseCmpKey,
    });
  };

  const getSvg = (item) => {
    if (item == 'Classes') return <ClassSvg size={40} />;
    return <EventSvg size={40} />;
  };

  const ToggleImage = () =>
    orientation == 'PORTRAIT' && (
      <_View style={styles.imgContainer}>
        <Image
          style={{ width: '100%', height: '100%' }}
          resizeMode='cover'
          source={isTablet ? tabImg : mobileImg}
        />
      </_View>
    );
    const backPress = () => {
      navigation.navigate( drawerScreens.dashboard.name);
      return true;
    };
  return (
    <_Screen
      header={
        <CstHeader
          isMenu={true}
          OpenMenu={() => {
            navigation.toggleDrawer();
          }}
          Screen={'Enroll'}
        />
      }
      backgroundColor={whiteThemeColors.background}
      hideTopSafeArea
      onAndroidBack={backPress}
      topSafeAreaColor={whiteThemeColors.primary}
      bottomSafeAreaColor={whiteThemeColors.background}
      style={[{ flex: 1 }, CommonStyles.white]}
    >
      <Orientation getOrientation={setOrientation}>
        <_View flex={1}>
          <ToggleImage />
          <_View style={styles.subContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {labels.map((item) => {
                return (
                  <Card
                    title={item.label}
                    onPress={() => handleNavigate(item.name)}
                    SvgIcon={getSvg(item)}
                    height={height}
                    orientation={orientation}
                  />
                );
              })}
            </ScrollView>
          </_View>
        </_View>
      </Orientation>
    </_Screen>
  );
};

export default EnrollmentScreen;

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    paddingVertical: 15,
    justifyContent: 'space-between',
    marginTop: isTablet ? 10 : 0,
  },
  imgContainer: {
    height: isTablet ? 420 : 276,
    marginBottom: 20,
  },
});
