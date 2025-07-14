import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { isAdmin, isStudent, whiteThemeColors } from 'utilities';
import { wp } from '../../../Helpers/Responsiveness';
import { _Screen, _Text, _VectorIcons, _View } from '../../../components';
import DrawerScreens from '../../../navigation/Drawer/DrawerScreenNames';
import ScreensNames from '../../../screenNames';
import Header from '../../Headers';
import CommonStyles from 'screens/CommonStyles';
import WhiteLabelConfig from '../../../WhiteLabelConfig';
interface Props {
  navigation: any;
  route?: any;
}
const index: React.FC<Props> = ({ navigation }) => {
  const { reportScreen } = useSelector((state: any) => state.language);
  const { UserInfo } = useSelector((state: any) => state.User);
  // hide for stemtree
  let { Tabs } = reportScreen;
  // if (WhiteLabelConfig.APP_VARIANT_NAME !== 'steamInventors') Tabs.splice(2, 1);
  const Icon: any = {
    ['StudentProgressList']: (
      <_VectorIcons
        type={'AntDesign'}
        name={'star'}
        size={35}
        color={whiteThemeColors.primary + 50}
      />
    ),
    ['StudentAssessmentList']: (
      <_VectorIcons
        type={'MaterialIcons'}
        name={'assessment'}
        size={35}
        color={whiteThemeColors.primary + 50}
      />
    ),
    ['SystemReports']: (
      <_VectorIcons
        type={'MaterialCommunityIcons'}
        name={'file-document'}
        size={35}
        color={whiteThemeColors.primary + 50}
      />
    ),
  };

  const goToNexScreen = (ScreenName: any) => {
    if (ScreenName == 'SystemReports') {
      return navigation.navigate(ScreensNames.SystemReports.name);
    } else if (isStudent(UserInfo.roleName)) {
      if (ScreenName == 'StudentAssessmentList') {
        return navigation.navigate(
          ScreensNames.SingleStudentAssessmentList.name,
          {
            stdId: UserInfo.userID,
            goBackScreen: DrawerScreens.reportsTab.name,
          },
        );
      } else {
        navigation.navigate(ScreensNames.SingleStudentProgress.name, {
          goBackScreen: DrawerScreens.reportsTab.name,
          studentId: UserInfo.userID,
          studentName: UserInfo.fullName,
          header: 'Student progress',
        });
      }
    } else
      navigation.navigate(ScreenName, {
        isFromStudentProgress: true,
        goBackScreen: DrawerScreens.reportsTab.name,
        header: 'Student progress',
      });
  };

  const onBackPress = () => {
    navigation.navigate(DrawerScreens.dashboard.name);
    return true;
  };

  return (
    <_Screen
      header={
        <Header
          isMenu
          OpenMenu={() => navigation.toggleDrawer()}
          Screen={reportScreen.Reports}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={onBackPress}
      backgroundColor={whiteThemeColors.background}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {Tabs.map((Obj: any) => {
          return (
            <TouchableOpacity
              style={styles.btnContainer}
              activeOpacity={1}
              onPress={() => goToNexScreen(Obj.Navigation)}
            >
              <_View style={styles.icon}>{Icon[Obj.Navigation]}</_View>
              <_Text style={styles.btnTxt}>{Obj.TabName}</_Text>
              <_View style={styles.arrowIcon}>
                <_VectorIcons
                  type={'AntDesign'}
                  name={'right'}
                  size={17}
                  color={whiteThemeColors.white}
                />
              </_View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </_Screen>
  );
};

export const Reports = React.memo(index);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: whiteThemeColors.backgroundColor,
    flex: 1,
    paddingTop: 5,
  },
  btnContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    borderBottomColor: whiteThemeColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.white + 90,

    height: 90,
    borderRadius: 15,
  },
  btnTxt: {
    fontFamily: CommonStyles.fonts.medium,
    fontSize: 16,
    color: whiteThemeColors.black,
    marginLeft: wp(5),
  },
  icon: {
    height: '100%',
    width: 70,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: whiteThemeColors.primary + 30,
    backgroundColor: 'white',
  },
  arrowIcon: {
    position: 'absolute',
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: whiteThemeColors.primary + 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
