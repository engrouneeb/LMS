import { Pressable, StyleSheet } from 'react-native'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList } from 'react-native';
import { _Image, _Screen, _Text, _VectorIcons, _View, } from '../../components';
import { TiktokIcon } from "../../../assets/tiktokIcon";
import { styles } from "./styles";
import { getAuthUrl, startInAppBrowserLogin } from '../../customHooks';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../reducers/Appstate';
import Header from "../Headers"
import { CustomAlert, isParent, whiteThemeColors } from '../../Utilities';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import {
    fetchSocialPublicKeys,
    fetchUserSocialChannels,
    fetchParentStudents,
    ParentStudent, disconnectSocial,
} from '../../actions/WebAuthLogin';
import moment from 'moment';
import Loader from '../Loader/loader';
import { StudentIcon } from '../../../assets/Icons';

type SocialProvider = 'facebook' | 'instagram' | 'tiktok';

const baseChannels = [
  {
    id: '1',
    name: 'instagram',
    type: 'FontAwesome',
    icon: 'instagram',
    iconColor: '#E12F6C',
    connectedUser: null,
    connectedDate: null,
    lastSynced: null,
    status: 'Not Connected',
    profilePic: null,
  },
  {
    id: '2',
    name: 'facebook',
    type: 'FontAwesome',
    icon: 'facebook-square',
    iconColor: '#1977F2',
    connectedUser: null,
    connectedDate: null,
    lastSynced: null,
    status: 'Not Connected',
    profilePic: null,
  },
  {
    id: '3',
    name: 'tikTok',
    type: 'FontAwesome5Brands',
    icon: 'tiktok',
    iconColor: '#000000',
    connectedUser: null,
    connectedDate: null,
    lastSynced: null,
    status: 'Not Connected',
    profilePic: null,
  },
];

const getStatusColor = status => {
  return status === 'Connected'
    ? styles.statusConnected
    : styles.statusNotConnected;
};

export const SocailLogin = () => {
  const navigation = useNavigation();
  const dispatch: any = useDispatch();
  const {publicKeys, connectedSocials, parentStudents} = useSelector(
    (state: Appstate) => state.WebAuthReducer,
  );
  const {UserInfo} = useSelector((state: Appstate) => state.User);
  const [selectedStudent, setSelectedStudent] = useState<ParentStudent | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [socialChannelsLoading, setSocialChannelsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<SocialProvider | null>(null);
  
  const isLoading = initialLoading || socialChannelsLoading;

  useEffect(() => {
    const init = async () => {
      try {
        setInitialLoading(true);
        await dispatch(fetchSocialPublicKeys());
        if (isParent(UserInfo.roleName)) {
          await dispatch(fetchParentStudents());
        } else {
          await dispatch(fetchUserSocialChannels(UserInfo.userID));
        }
      } catch (error) {
        console.error("Error during initial data fetch:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    init();
  }, [dispatch, UserInfo]);

  useEffect(() => {
    if (isParent(UserInfo.roleName) && parentStudents.length > 0) {
      setSelectedStudent(parentStudents[0]);
    }
  }, [parentStudents, UserInfo.roleName]);

  useEffect(() => {
    const loadSocials = async () => {
      const userIdToFetch = isParent(UserInfo.roleName) ? selectedStudent?.id : UserInfo.userID;
      if (userIdToFetch) {
        try {
          setSocialChannelsLoading(true);
          await dispatch(fetchUserSocialChannels(userIdToFetch));
        } catch (error) {
          console.error("Error loading social channels:", error);
        } finally {
          setSocialChannelsLoading(false);
        }
      }
    };
    loadSocials();
  }, [selectedStudent, UserInfo.roleName, dispatch]);


  const socialChannels = useMemo(() => {
    return baseChannels.map(channel => {
      const matched = connectedSocials.find(
        item => item.channelName.toLowerCase() === channel.name.toLowerCase(),
      );
      return matched
        ? {
            ...channel,
            connectedUser: matched.connectedUser,
            connectedDate: matched.connectedDate
              ? moment(matched.connectedDate).format('MMM D, YYYY')
              : null,
            lastSynced: matched.lastSyncedDate
              ? moment(matched.lastSyncedDate).fromNow()
              : null,
            status: 'Connected',
            profilePic: matched.profilePic,
          }
        : channel;
    });
  }, [connectedSocials]);

  const {businessCompanyGuid, portalV3URL} = useSelector(
    (state: Appstate) => state?.User?.UserInfo,
  );

  const handleConnect = (provider: SocialProvider) => {
    const publicKey = publicKeys[provider];
    const userIdToConnect = isParent(UserInfo.roleName) ? selectedStudent?.id : UserInfo.userID;
    if (!userIdToConnect) {
        console.log("Please select a student first.");
        return;
    }
    const authUrl = getAuthUrl({
      provider,
      publicKey,
      companyGuid: businessCompanyGuid, 
      // companyUrl: companyUrl || 'https://portalv3.calibermatrix.com/',
      companyUrl: `${portalV3URL}/`,
      userId: userIdToConnect,
    });
    startInAppBrowserLogin({
      provider,
      authUrl,
      onSuccess: async () => {
        setSocialChannelsLoading(true);
        await dispatch(fetchUserSocialChannels(userIdToConnect));
        setSocialChannelsLoading(false);
      },
      onClose: () => {
        console.log(`${provider} login cancelled`);
      },
    });
  };

  const handleDisconnect = async (item: SocialProvider | null) => {
    const userIdToDisconnect = isParent(UserInfo.roleName) ? selectedStudent?.id : UserInfo.userID;
    if (!item || !userIdToDisconnect) return;
    setInitialLoading(true);
    await dispatch(disconnectSocial(item, userIdToDisconnect));
    await dispatch(fetchUserSocialChannels(userIdToDisconnect));
    setInitialLoading(false);
  };

  const SocialChannelItem = ({item}) => {
    return (
      <_View style={styles.card}>
        <_View style={styles.iconWrapper}>
          {item.icon == 'tiktok' ? (
            <TiktokIcon height={24} width={24} />
          ) : (
            <_VectorIcons
              name={item.icon}
              size={24}
              color={item.iconColor}
              type={item.type}
            />
          )}
          {item.profilePic && (
            <_View
              style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                padding: 1,
                borderWidth: 1,
                borderColor: whiteThemeColors.primary,
                marginTop: 10,
                overflow: 'hidden',
              }}>
              <_Image
                uri={item.profilePic}
                style={{
                  alignSelf: 'center',
                  width: 22,
                  height: 22,
                }}
              />
            </_View>
          )}
        </_View>
        <_View style={styles.infoWrapper}>
          <_Text style={styles.channelName}>{item.name}</_Text>
          {item.connectedUser && (
            <_Text style={styles.userText}>{item.connectedUser}</_Text>
          )}
          {item.connectedDate && (
            <_Text style={styles.metaText}>
              Connected: {item.connectedDate}
            </_Text>
          )}
          {item.lastSynced && (
            <_Text style={styles.metaText}>
              Last Synced: {item.lastSynced}
            </_Text>
          )}
        </_View>
        <_View style={styles.statusWrapper}>
          <_Text style={[styles.statusText, getStatusColor(item.status)]}>
            {item.status}
          </_Text>
          {item.status === 'Connected' ? (
            <Pressable
              hitSlop={20}
              onPress={() => {
                setShowAlert(true);
                setSelectedItem(item.name);
              }}>
              <_VectorIcons
                name="link-variant-off"
                size={24}
                color={whiteThemeColors.primary}
                style={{marginTop: 4}}
                type="MaterialCommunityIcons"
              />
            </Pressable>
          ) : (
            <Pressable
              style={{
                borderColor: '#1977F2',
                borderWidth: 0.5,
                borderRadius: 5,
                marginTop: 15,
                marginLeft: 45,
                height: 25,
                width: 110,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
              onPress={() => {
                handleConnect(item.name);
              }}>
              <_Text style={styles.linkText}>Connect Now</_Text>
            </Pressable>
          )}
        </_View>
      </_View>
    );
  };
  const backPress = () => {
    navigation.goBack();
    return true;
  };

  return (
    <_Screen
      header={<Header isBack goBack={backPress} Screen={'Social Accounts'} />}
      flex={1}
      hideTopSafeArea
      onAndroidBack={backPress}
      backgroundColor={whiteThemeColors.background}>
      <_View style={{flex: 1, padding: 10}}>
        {isParent(UserInfo.roleName) && (
          <_View flexDirection="row" style={{ alignItems: 'center', marginBottom: 16, justifyContent: 'space-between' }}>
            <_Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Selected Student
            </_Text>
            <_View style={{width: '50%'}}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={parentStudents.map(student => ({ label: student.name, value: student.id }))}
                labelField="label"
                valueField="value"
                placeholder={selectedStudent ? selectedStudent.name : 'Select Student'}
                value={selectedStudent?.id}
                onChange={item => {
                  const student = parentStudents.find(s => s.id === item.value);
                  setSelectedStudent(student || null);
                }}
              />
            </_View>
          </_View>
        )}
        <_Text style={styles.title}>Channels</_Text>
        <_View style={styles.container}>
          {isLoading ? (
            <_View style={{alignItems: 'center', marginTop: 50}}>
              <Loader size="large" color={whiteThemeColors.primary} />
            </_View>
          ) : isParent(UserInfo.roleName) && parentStudents.length === 0 ? (
            <_View style={{alignItems: 'center', marginTop: 50}}>
              <StudentIcon size={100} color={whiteThemeColors.primary + '80'} />
              <_Text
                style={{
                  marginTop: 16,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: whiteThemeColors.red,
                }}>
                No Student Available
              </_Text>
              <_Text style={{marginTop: 16, fontSize: 16, textAlign: 'center'}}>
                There are currently no active students available for configuring
                social accounts. Parents can only configure or connect social
                accounts for their children.
              </_Text>
            </_View>
          ) : (
            <FlatList
              data={socialChannels}
              keyExtractor={item => item.id}
              renderItem={({item}) => <SocialChannelItem item={item} />}
            />
          )}
        </_View>
      </_View>
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={'Are you sure?'}
          msg={`Disconnecting your ${selectedItem} account will stop monitoring your posts and prevent earning loyalty points.`}
          firstBtn={'Disconnect'}
          secondBtn={'Cancel'}
          firstBtnFunc={() => {
            handleDisconnect(selectedItem);
            setShowAlert(false);
          }}
          secondBtnFunc={() => {
            setShowAlert(false);
            setSelectedItem(null);
          }}
        />
      )}
    </_Screen>
  );
};
