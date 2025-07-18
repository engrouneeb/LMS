import React, { FC, useEffect, useState, useMemo } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { _Text, _VectorIcons, _View } from '../../../components';
import { HtmlWebView } from '../../CoursePlayer/components/common/HtmlWebView';
import { AssesmentSvg, StudentIcon, StudentProgressSvg } from '../../../../assets/Icons';
import {
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from '../../../Utilities';

import DrawerScreens from '../../../navigation/Drawer/DrawerScreenNames';
import ScreensNames from '../../../screenNames';
import CommonStyles from '../../CommonStyles';
import { Appstate } from '../../../reducers/Appstate';
import { playStoreTestUser } from '../../../constants';
import { useDashboard } from '../Hooks';
import { useSideBarConfig } from '../../Sidebar/hooks';
import styles from '../style';

type Props = {
  selectedStudentId: number | string;
};

export const ParentQuickLink: FC<Props> = ({ selectedStudentId }) => {
  const [quickLinkConfig, setQuickLinkConfig] = useState<
    { name: string; labelName: string | null; status: boolean }[]
  >([]);
  const [viewPrograms, setViewPrograms] = useState<{
    programText: string;
    programURL: string;
  } | null>(null);
  const [isWebview, setIsWebview] = useState(false);
  const navigation = useNavigation<any>();

  const { getParentQuickLinkConfiguration, getViewProgramConfiguration } = useDashboard();
  const { sideBarConfig } = useSideBarConfig();
  const { dashboardScreen } = useSelector((state: Appstate) => state.language);
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);

  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>({});
  const homeWorkLabel = useMemo(() => {
    return sideBarConfig?.find(({ name }) => name === 'Homework/Assignments');
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
        const [quickLinksData, viewProgramsData] = await Promise.all([
          getParentQuickLinkConfiguration(),
          getViewProgramConfiguration(),
        ]);
        setQuickLinkConfig(quickLinksData?.filter((item: any) => item.status) || []);
        setViewPrograms(viewProgramsData || null);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };
    fetchAllData();
  }, []);

  const QuickLinkCard = ({
    icon,
    label,
    onPress,
    bgColor,
  }: {
    icon: React.ReactNode;
    label: string | undefined | null;
    onPress: () => void;
    bgColor: string;
  }) => (
    <_View style={styles.cardContainer}>
      <TouchableOpacity style={[styles.linksCard, { backgroundColor: bgColor }]} onPress={onPress}>
        {icon}
      </TouchableOpacity>
      <_Text style={styles.linkText}>{label}</_Text>
    </_View>
  );

  const renderQuickLink = (item: { name: string }) => {
    switch (item.name) {
      case 'Homework/Assignment':
        return (
          <QuickLinkCard
            icon={<_VectorIcons name="book-open" type="SimpleLineIcons" size={25} color="white" />}
            label={homeWorkLabel?.labelName}
            onPress={() =>
              navigation.navigate(ScreensNames.StudentListForHomework.name, {
                goBackScreen: DrawerScreens.dashboard.name,
                studentId: user.userID,
                studentName: user.fullName,
                isStudent: false,
                isMenu: true,
                header: homeWorkLabel?.labelName,
              })
            }
            bgColor={whiteThemeColors.QuickLinks.linkOne}
          />
        );

      case 'Assessments':
        return (
          <QuickLinkCard
            icon={<AssesmentSvg size={25} color="white" />}
            label={terminologies.Assessment?.label}
            onPress={() => navigation.navigate(ScreensNames.StudentListForAssessment.name)}
            bgColor={whiteThemeColors.QuickLinks.linkTwo}
          />
        );

      case 'Pending Payments':
        if (playStoreTestUser.includes(user.fullName)) return null;
        return (
          <QuickLinkCard
            icon={<_VectorIcons name="money" type="FontAwesome" size={25} color="white" />}
            label="Pending Payments"
            onPress={() => navigation.navigate(DrawerScreens.pendingpayments.name)}
            bgColor="#FF8382"
          />
        );

      case 'View Programs':
        return (
          <QuickLinkCard
            icon={<StudentProgressSvg size={25} color="white" />}
            label={viewPrograms?.programText || `View ${terminologies.Course?.pluralLabel}`}
            onPress={() =>
              navigation.navigate(DrawerScreens.programs.name, { url: viewPrograms?.programURL })
            }
            bgColor={whiteThemeColors.QuickLinks.linkThree}
          />
        );

      case 'Student Progress':
        return (
          <QuickLinkCard
            icon={<StudentProgressSvg size={25} color="white" />}
            label="Student Progress"
            onPress={() =>
              navigation.navigate(ScreensNames.StudentProgressList.name, {
                goBackScreen: DrawerScreens.dashboard.name,
                studentId: user.userID,
                studentName: user.fullName,
                header: 'Student Progress',
                isFromStudentProgress: true,
              })
            }
            bgColor={whiteThemeColors.QuickLinks.linkThree}
          />
        );

      case 'Billing Methods':
        if (playStoreTestUser.includes(user.fullName)) return null;
        return (
          <QuickLinkCard
            icon={<_VectorIcons name="creditcard" type="AntDesign" size={25} color="white" />}
            label="Billing Methods"
            onPress={() =>
              navigation.navigate(DrawerScreens.billingInfo.name, { selectedStudentId })
            }
            bgColor={whiteThemeColors.QuickLinks.linkTwo}
          />
        );

      case 'Connect to Social Media':
        return (
          <QuickLinkCard
            icon={<StudentIcon size={25} color="white" />}
            label="Connect to Social Media"
            onPress={() => navigation.navigate(DrawerScreens.SocailLogin.name)}
            bgColor={whiteThemeColors.QuickLinks.linkFour}
          />
        );
      case 'Profile':
        return (
          <QuickLinkCard
            icon={<StudentIcon size={25} color="white" />}
            label="Profile"
            onPress={() => navigation.navigate(DrawerScreens.profile.name)}
            bgColor={whiteThemeColors.QuickLinks.linkOne}
          />
        );
      case 'Kiosk PINs':
        return (
          <QuickLinkCard
            icon={<_VectorIcons name="lock" type="MaterialIcons" size={30} color="white" />}
            label="Kiosk PINs"
            onPress={() => navigation.navigate(DrawerScreens.StudentKioskPins.name)}
            bgColor={whiteThemeColors.QuickLinks.linkOne}
          />
        );

      default:
        return null;
    }
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
        {dashboardScreen.QuickLinks}
      </_Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 10 }}>
        <_View
          style={{
            width: '100%',
            height: 90,
            marginBottom: 20,
            marginHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          {quickLinkConfig.map((item) => renderQuickLink(item))}
        </_View>
      </ScrollView>

      {isWebview && (
        <HtmlWebView
          changeVisibleState={() => setIsWebview(false)}
          title="White Board"
          role={user.roleName}
          isWebview={isWebview}
        />
      )}
    </_View>
  );
};
