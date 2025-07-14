import React, { FC, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import {
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import {
  AssesmentSvg,
  JoinOnlineClassSvg,
  StudentIcon,
  StudentProgressSvg,
  WhiteBoardSvg,
} from '../../../../assets/Icons';

import { useNavigation } from '@react-navigation/native';
import CommonStyles from 'screens/CommonStyles';
import { _Text, _VectorIcons, _View } from '../../../components';
import DrawerScreens from '../../../navigation/Drawer/DrawerScreenNames';
import ScreensNames from '../../../screenNames';
import { HtmlWebView } from '../../CoursePlayer/components/common/HtmlWebView';
import styles from '../style';
import { useSideBarConfig } from 'screens/Sidebar/hooks';
import { useDashboard } from '../Hooks/useDashboard';
export const StudentQuickLink: FC = () => {
  const {sideBarConfig } = useSideBarConfig();
  const navigation = useNavigation<any>();
  const user = useSelector((state: any) => state.User.UserInfo);
  const [isWebview, setisWebview] = useState(false);
   const [quickLinkConfig, setQuickLinkConfig] = useState<{ name: string, labelName: string | null, status: boolean }[]>([]);
    const [homeWorkLabel, setHomeWorkLabel] = useState<string | object | null>(null);
    const { getParentQuickLinkConfiguration } = useDashboard();
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {},
  );
    useEffect(() => {
      setHomeWorkLabel(sideBarConfig && sideBarConfig.find(({ name }) => name == "Homework/Assignments"));
    }, [sideBarConfig]);
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
    };
    fetchTerminologies();
  }, []);
  useEffect(() => {
      const fetchAllData = async () => {
        try {
          const quickLinksData= await getParentQuickLinkConfiguration();
          setQuickLinkConfig(quickLinksData.filter((item: any) => item.status));
        } catch (error) {
          console.error("Error fetching dashboard data", error);
        }
      };
      fetchAllData();
    }, []);

    const isEnabled = (linkName: string) => {
      return quickLinkConfig.some(item => item.name === linkName && item.status);
    };
  return (
    <_View style={[styles.centerView]}>
      <_Text
        style={{
          fontFamily: CommonStyles.fonts.semiBold,
          height: 30,
          marginTop: 10,
        }}
      >
        Quick Links
      </_Text>
       <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight:5 }}>
      <_View
        style={{
          width: '100%',
          height: 70,
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        {isEnabled("Homework/Assignment") &&<_View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(DrawerScreens.HomeworkAssignment.name, {
                goBackScreen: DrawerScreens.dashboard.name,
                studentId: user.userID,
                studentName: user.fullName,
                header: homeWorkLabel?.labelName,
              });
            }}
            style={[
              styles.linksCard,
              { backgroundColor: whiteThemeColors.QuickLinks.linkOne },
            ]}
          >
            <_VectorIcons
              name={'book-open'}
              type={'SimpleLineIcons'}
              size={22}
              color={whiteThemeColors.whtie}
            />
          </TouchableOpacity>
          <_Text style={styles.linkText}>{homeWorkLabel?.labelName}</_Text>
        </_View>}
        {isEnabled("Assessments") &&<_View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(DrawerScreens.StudentAssessments.name, {
                quickLinks: true,
                stdId: user.userID,
                goBackScreen: DrawerScreens.dashboard.name,
              });
            }}
            style={[
              styles.linksCard,
              { backgroundColor: whiteThemeColors.QuickLinks.linkTwo },
            ]}
          >
            <AssesmentSvg size={22} color={whiteThemeColors.white} />
          </TouchableOpacity>
          <_Text style={styles.linkText}>
            {terminologies['Assessment']?.label}
          </_Text>
        </_View>}
        {isEnabled("Student Progress") &&<_View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreensNames.SingleStudentProgress.name, {
                goBackScreen: DrawerScreens.dashboard.name,
                studentId: user.userID,
                studentName: user.fullName,
              });
            }}
            style={[
              styles.linksCard,
              { backgroundColor: whiteThemeColors.QuickLinks.linkThree },
            ]}
          >
            <StudentProgressSvg size={25} color={whiteThemeColors.white} />
          </TouchableOpacity>
          <_Text style={styles.linkText}>Student Progress</_Text>
        </_View>}
        {isEnabled("White Board") &&<_View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              setisWebview(true);
            }}
            style={[
              styles.linksCard,
              { backgroundColor: whiteThemeColors.QuickLinks.linkFour },
            ]}
          >
            <WhiteBoardSvg size={25} color={whiteThemeColors.white} />
          </TouchableOpacity>
          <_Text style={styles.linkText}>White Board</_Text>
        </_View>}
        {isEnabled("Connect to Social Media") &&<_View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(DrawerScreens.SocailLogin.name);
            }}
            style={[
              styles.linksCard,
              { backgroundColor: whiteThemeColors.QuickLinks.linkOne },
            ]}
          >
            <StudentIcon size={22} color={whiteThemeColors.white} />
          </TouchableOpacity>
          <_Text style={styles.linkText}>Social Accounts</_Text>
        </_View>}
        {isEnabled("Profile") && <_View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(DrawerScreens.profile.name);
            }}
            style={[
              styles.linksCard,
              { backgroundColor: whiteThemeColors.QuickLinks.linkFive },
            ]}
          >
            <StudentIcon size={22} color={whiteThemeColors.white} />
          </TouchableOpacity>
          <_Text style={styles.linkText}>Profile</_Text>
        </_View>}
      </_View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreensNames.StudentOnlineClassesList.name);
        }}
        style={styles.joinContainer}
      >
        <_View style={{ marginLeft: 40 }}>
          <JoinOnlineClassSvg
            AssesmentSvg
            size={40}
            color={whiteThemeColors.primary + 90}
          />
        </_View>

        <_View style={{ marginLeft: 30 }}>
          <_Text
            style={{
              fontFamily: CommonStyles.fonts.semiBold,
              fontSize: 12,
            }}
          >
            Join Online Class
          </_Text>
          <_Text
            style={{
              fontFamily: CommonStyles.fonts.regular,
              fontSize: 10,
              color: 'gray',
              marginTop: 5,
              width: '99%',
            }}
          >
            Seamlessly connect to your virtual classroom
          </_Text>
        </_View>
        <_View style={styles.vectorIconCon}>
          <_VectorIcons
            type='AntDesign'
            name='arrowright'
            color='white'
            size={18}
          />
        </_View>
      </TouchableOpacity>
      {isWebview && (
        <HtmlWebView
          changeVisibleState={() => {
            // htmlref?.current?.changeVisibleState();
            setisWebview(false);
          }}
          title={'White Board'}
          role={user.roleName}
          isWebview={isWebview}
        />
      )}
    </_View>
  );
};
