import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { TopMiniTabs } from '../../../components/TopMiniTabs';
import React, { FC, JSX, useCallback, useEffect, useState } from 'react';
import { BackHandler, Image, Pressable, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CommonStyles from '../../CommonStyles';
import GroupChatHome from '../../GroupChat/GroupChatHome';
import { whiteThemeColors } from '../../../Utilities';
import {
  AdminDiscSvg,
  ContactsSvg,
  FranchiseDiscSvg,
  InstructorDiscSvg,
  StaffDiscSvg,
  StuConsultingSvg,
} from '../../../../assets/Icons';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { setChatFor, setCurrentFocus } from '../../../actions/AsyncStorage';
import { setCategory } from '../../../actions/MessengerActions';
import { _Screen, _Text, _VectorIcons, _View, NoPermission } from '../../../components';
import { useAppModulePermission } from '../../../customHooks';
import { MessageScreenInterface } from '../../../interfaces';
import DrawerScreens from '../../../navigation/Drawer/DrawerScreenNames';
import { Appstate } from '../../../reducers/Appstate';
import Screens from '../../../screenNames';
import Header from '../../Headers';
import { BadgeComponent } from './MsgBadge';
import MsgScreenMeta from './MsgScreenMeta';
import styles from './style';
import { __metadata } from 'tslib';
const instructor_Std = require('../../../../assets/instructor-student.png');
const instructor_Parent = require('../../../../assets/ins-parent.png');
export const MsgScreen: FC = () => {
  const dispatch: any = useDispatch();
  const { filterMenuOptions } = useAppModulePermission();
  const UserData: any = useSelector((state: Appstate) => state.User.UserInfo);
  const { messageScreen } = useSelector((state: Appstate) => state.language);
  const [groupCounts, setGroupCounts] = useState<number>(0);
  const [showNoPermission,setNoPermission]= useState(false)
  const socketIO = useSelector((state: Appstate) => state.token.socketIO);
  const navigation: any = useNavigation();
  let _chatMeta=filterMenuOptions(messageScreen.Tabs);
  let isGroupsVisible=filterMenuOptions("GroupsMessages");
  const { Get } = DataAccess();
  useEffect(() => {
    const {userName} = UserData;
    getGroupCounts();
    dispatch(setCurrentFocus('MessageGroup'));

    socketIO?.emit('read-notification', {
      username: userName,
      clearNotificationsOf: 'Messages',
    });
  }, [socketIO]);

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBack,
      );

      return () => backHandler.remove();
    }, []),
  );

  useEffect(()=>{
      setNoPermission(!(_chatMeta.length>0));
    },[_chatMeta])
  

  const handleBack: () => boolean = () => {
    navigation.navigate(DrawerScreens.dashboard.name);
    return true; //disable back button
  };

  const _getSvg: (SvgId: number) => JSX.Element | null = (SvgId) => {
    switch (SvgId) {
      case MsgScreenMeta.Contacts:
        return <ContactsSvg size={25} color={whiteThemeColors.white} />;
      case MsgScreenMeta.Staff:
        return <StaffDiscSvg size={30} color={whiteThemeColors.white} />;
      case MsgScreenMeta.Students:
        return <StuConsultingSvg size={25} color={whiteThemeColors.white} />;
      case MsgScreenMeta.FranchiseOwners:
        return <FranchiseDiscSvg size={25} color={whiteThemeColors.white} />;
      case MsgScreenMeta.Admin:
        return <AdminDiscSvg size={25} color={whiteThemeColors.white} />;
      case MsgScreenMeta.Instructors:
        return (
          <_View
            style={{
              width: '100%',
              alignItems: 'center',
            }}
          >
            <InstructorDiscSvg size={30} color={whiteThemeColors.white} />
          </_View>
        );
      default:
        return null;
    }
  };
  const getGroupCounts = async () => {
    Get(ApiEndpoints.GetNotificationMsgCounts).then((res) => {
      setGroupCounts(res?.groupsCount);
    });
  };

  const _getChatMembers: (chatFor: number, TabName: string) => void = (
    chatFor,
    TabName,
  ) => {
    dispatch(setCategory(chatFor)).then(() => {
      navigation.navigate(Screens.chatUsers.name, {
        group: TabName,
        chatFor: chatFor,
      });
    });
  };
  const tabs = [
    { name: 'Chats', id: 0 },{ name: 'Groups', id: 1 },
  ];
  
  const [activeTab, setActiveTab] = useState({ name: 'Chats', id: 0 });
  return (
    <_Screen
      header={
        <Header
          isMenu
          OpenMenu={() => {
            navigation.toggleDrawer();
          }}
          Screen={messageScreen.Message}
        />
      }
      hideTopSafeArea
      onAndroidBack={() => handleBack()}
      backgroundColor={whiteThemeColors.background}
    >
      <TopMiniTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        groupsCount={groupCounts}
        isForGroupChat={true}
      />
      {activeTab.name == 'Groups' ? (
        <GroupChatHome activeTab={activeTab} />
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <_View
            style={{
              flex: 1,
              marginBottom: 40,
              backgroundColor: whiteThemeColors.background,
            }}
          >
            {showNoPermission?
                <NoPermission/>
                :_chatMeta.map((Obje: MessageScreenInterface) => {
                return (
                  <Pressable
                    style={{
                      backgroundColor: whiteThemeColors.white + 90,
                      width: '95%',
                      height: 90,
                      paddingHorizontal: 15,
                      marginTop: 10,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      borderRadius: 15,
                    }}
                    onPress={() => {
                      dispatch(setChatFor(Obje.Chatfor));
                      _getChatMembers(Obje.Chatfor, Obje.TabName);
                    }}
                  >
                    <_View style={styles.mainWrapper}>
                      <_View style={styles.instUserImage}>
                        {Obje.TabName.includes('Instructor-Student') ? (
                          <Image
                            source={instructor_Std}
                            style={styles.instUser}
                          />
                        ) : Obje.TabName.includes('Instructor-Parents') ? (
                          <Image
                            source={instructor_Parent}
                            style={[
                              styles.instUser,
                              {
                                tintColor: whiteThemeColors.white,
                              },
                            ]}
                          />
                        ) : (
                          _getSvg(Obje.Chatfor)
                        )}
                        <BadgeComponent chatFor={Obje.Chatfor} />
                      </_View>
                      <_View
                        style={{
                          borderBottomColor: whiteThemeColors.primary,
                          marginLeft: 10,
                        }}
                      >
                        <_Text
                          style={{ fontFamily: CommonStyles.fonts.medium }}
                        >
                          {Obje.TabName}
                        </_Text>
                        <_Text
                          numberOfLines={2}
                          style={{
                            fontFamily: CommonStyles.fonts.light,
                            color: 'gray',
                            fontSize: 10,
                            paddingRight: 90,
                            marginTop: 3,
                          }}
                        >
                          {Obje.TabName.includes('Instructor-Student')
                            ? 'Conversations between Instructor & Student'
                            : Obje.TabName.includes('Instructor-Parents')
                            ? 'Conversations between Instructor & Parent'
                            : `Conversations between You and ${Obje.TabName}`}
                        </_Text>
                      </_View>
                    </_View>
                    <_View
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: whiteThemeColors.primary,
                        borderRadius: 10,
                        position: 'absolute',
                        right: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <_VectorIcons
                        type={'AntDesign'}
                        name={'right'}
                        size={14}
                        color={whiteThemeColors.white}
                      />
                    </_View>
                  </Pressable>
                );
            })}
          </_View>
        </ScrollView>
      )}
    </_Screen>
  );
};
