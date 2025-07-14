import { useNavigation } from '@react-navigation/native';
import { _Image, _Screen, _Text, _VectorIcons, _View, NoPermission } from 'components';
import React, { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import CommonStyles from 'screens/CommonStyles';
import { UserImg } from 'screens/ThumbNail';
import { isParent, isStudent, whiteThemeColors } from 'utilities';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import { CreateGroupModal } from './components/CreateGroupModal';
import { NoGroupComponents } from './components/NoGroupComponent';
import { useAppModulePermission } from '../../customHooks';

const GroupChatHome: FC = ({ activeTab }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showNoPermission, setNoPermission] = useState(false)
  const { filterMenuOptions } = useAppModulePermission();
  let isCreateGroupMessages = filterMenuOptions("CreateGroupMessages");
  let isGroupsVisible = filterMenuOptions("GroupsMessages");
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const UserInfo: any = useSelector((state: Appstate) => state.User.UserInfo);

  const { Get } = DataAccess();
  const navigation: any = useNavigation();

  useEffect(() => {
    getGroups();
  }, [activeTab.name]);
  useEffect(() => {
    setNoPermission(!isGroupsVisible);
  }, [isGroupsVisible])


  const getGroups = async () => {
    setIsLoading(true);
    Get(ApiEndpoints.GetGroups).then((res) => {
      if (res.length > 0) setGroups(res);
      setIsLoading(false);
    });
  };

  return (
    <_Screen
      flex={1}
      hideTopSafeArea
      hideBottomSafeArea
      backgroundColor={whiteThemeColors.background}
    >
      <_View style={{ padding: 10 }}>
        {!groups.length ? (
          <NoGroupComponents
            setShowModal={setShowModal}
            isLoading={isLoading}
            role={UserInfo.roleName}
          />
        ) : (
          showNoPermission ?
            <NoPermission /> :
            <>
              <_View style={{ padding: 10 }}>
                <>
                  <_Text style={styles.mygroupText}>My Groups</_Text>
                  <_Text style={styles.totalGroups}>{`You have ${groups.length} ${groups.length > 1 ? 'Groups' : 'Group'
                    }`}</_Text>

                  {isCreateGroupMessages && (
                    <TouchableOpacity
                      onPress={() => setShowModal(true)}
                      style={styles.button}
                    >
                      <_Text style={styles.buttonText}>Create New</_Text>
                    </TouchableOpacity>
                  )}
                </>
              </_View>
              {isLoading ? (
                <_View
                  style={{
                    height: 400,
                    justifyContent: 'center',
                  }}
                >
                  <ActivityIndicator color={whiteThemeColors.primary} />
                </_View>
              ) : (
                <FlatList
                  data={groups}
                  contentContainerStyle={{ paddingBottom: 80 }}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('GroupChatInterface', {
                          roomName: item,
                          getGroups: getGroups,
                        });
                      }}
                      style={styles.card}
                    >
                      <_View style={styles.imageCont}>
                        {item?.imageURL ? (
                          <_Image
                            style={styles.profile}
                            source={{ uri: item.imageURL }}
                          />
                        ) : (
                          <_VectorIcons
                            size={25}
                            type='FontAwesome'
                            name='group'
                          />
                        )}
                      </_View>
                      <_View style={styles.container2}>
                        <_Text style={{ fontFamily: CommonStyles.fonts.medium }}>
                          {item?.name}
                        </_Text>
                        <_Text style={styles.totalmember}>
                          {`${item?.chatGroupMembers.length} members`}
                        </_Text>
                        <FlatList
                          data={item?.chatGroupMembers.slice(0, 3)}
                          ListFooterComponent={() =>
                            item?.chatGroupMembers.length >= 4 ? (
                              <_View
                                marginLeft={6}
                                style={{
                                  alignContent: 'center',
                                  // backgroundColor: 'skyblue',
                                  height: 20,
                                  top: 2,
                                }}
                              >
                                <_Text
                                  style={{
                                    fontSize: 10,
                                    color: whiteThemeColors.primary,
                                  }}
                                >
                                  {'+ ' +
                                    (item?.chatGroupMembers.length - 3) +
                                    ' ' +
                                    'more'}
                                </_Text>
                              </_View>
                            ) : null
                          }
                          horizontal
                          style={{
                            // paddingLeft: 5,
                            marginTop: 3,
                          }}
                          renderItem={({ item, index }) => {
                            const fullName = item?.fullName?.split(' ');
                            return (
                              <_View
                                style={[
                                  styles.container3,
                                  { marginLeft: index > 0 ? -6 : 0 },
                                ]}
                              >
                                <UserImg
                                  UserInfo={{
                                    FirstName: fullName[0],
                                    LastName: fullName[1],
                                    UserImage: item.imageURL ? item.imageURL : '',
                                    UserImageColor: whiteThemeColors.primary,
                                  }}
                                  fontSize={7}
                                  size={30}
                                />
                              </_View>
                            );
                          }}
                        />
                      </_View>
                      {item?.notiCount > 0 && (
                        <_View style={styles.badge}>
                          <_Text
                            style={{
                              fontfamily: CommonStyles.fonts.bold,
                              fontSize: 14,
                              color: 'white',
                            }}
                          >
                            {item?.notiCount}
                          </_Text>
                        </_View>
                      )}
                    </TouchableOpacity>
                  )}
                />
              )}
            </>
        )}
        <CreateGroupModal
          isNewGroup={false}
          showModal={showModal}
          setShowModal={setShowModal}
          getGroups={getGroups}
        />
      </_View>
    </_Screen>
  );
};
const styles = StyleSheet.create({
  mygroupText: {
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 20,
  },
  totalGroups: {
    fontFamily: CommonStyles.fonts.medium,
    color: 'gray',
  },
  button: {
    width: 120,
    height: 30,
    backgroundColor: 'white',
    position: 'absolute',
    right: 10,
    top: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 13,
  },
  card: {
    width: '100%',
    height: 80,
    backgroundColor: whiteThemeColors.primary + 20,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  innerContainer: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: whiteThemeColors.white + 90,
    position: 'absolute',
    right: 7,
    top: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCont: {
    width: 46,
    height: 46,
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  container2: {
    justifyContent: 'center',
    height: '100%',
    marginTop: 25,
    paddingLeft: 20,
  },
  totalmember: {
    fontFamily: CommonStyles.fonts.regular,
    color: 'gray',
    fontSize: 10,
  },
  list: {
    width: 18,
    height: 18,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: 'white',
    marginLeft: -5,
    borderWidth: 2,
  },
  container3: {
    width: 18,
    height: 18,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    // marginLeft: -5,
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    width: 16,
    height: 16,
    borderRadius: 14,
  },
  badge: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    position: 'absolute',
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GroupChatHome;
