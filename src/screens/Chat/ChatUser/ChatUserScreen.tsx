import { useNavigation } from '@react-navigation/native';
import { endpoint, _Screen, _Text, _VectorIcons, _View } from '../../../components';
import React, { FC, useEffect, useReducer, useRef, useState } from 'react';
import { VirtualizedList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { whiteThemeColors } from '../../../Utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { setCurrentFocus } from '../../../actions/AsyncStorage';
import {
  GetContacts,
  setAdminMessageCount,
  setContactMessagesCount,
  setFranchiseMessageCount,
  setInstructorMessagesCount,
  setStaffMessagesCount,
  setStudentMessagesCount,
} from '../../../actions/MessengerActions';
import { UserProfileModal } from '../../../components/UserProfileModal';
import {
  chatUserScreenInterface,
  getAllUserFunctionType,
  getChatMembersType,
  msgType,
  receiveMsgType,
} from '../../../interfaces';
import DrawerScreens from '../../../navigation/Drawer/DrawerScreenNames';
import { Appstate } from '../../../reducers/Appstate';
import CommonStyles from '../../CommonStyles';
import CstHeader from '../../Headers';
// import LoadingSc from '../../Loader/Loading';
import Loader from '../../Loader/loader';
import Search from '../../Search';
import MsgScreenMeta from '../MsgScreen/MsgScreenMeta';
import { RenderUserMeta } from './components';
import { intialState, reducer } from './States';
const Take = 20;
let allDataLoaded = false;
const ChatUserScreen: FC<chatUserScreenInterface> = ({ route }) => {
  const { Get } = DataAccess();
  const { chatFor, group } = route.params;
  const searchRef: any = useRef();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const token = useSelector((state: Appstate) => state.token);
  const { socketIO } = useSelector((state: Appstate) => state.token);
  const dispatch: any = useDispatch();
  const handleReceiveMessageRef: any = useRef();
  const [state, setState] = useReducer(reducer, intialState);
  const [isVisible, setisVisible] = useState(false);
  useEffect(() => {
    socketIO?.emit('online-users', {});
    if (
      ![
        'View Instructor-Student Chat',
        'View Instructor-Parents Chat',
      ].includes(group)
    ) {
      _getAllUsers(chatFor);
    }
    setState({ type: 'chatFor', data: chatFor });
    setState({ type: 'chatUsers', data: [] });
    // dispatch(loading(true));
    setLoading(true);
    let chat_for =
      chatFor == MsgScreenMeta.ViewInsStdChat ||
      chatFor == MsgScreenMeta.ViewInsParentChat
        ? MsgScreenMeta.Instructors
        : chatFor;
    dispatch(GetContacts(chat_for, 0, 20, true)).then((res: any) => {
      // dispatch(loading(false));
      setLoading(false);
      if (allDataLoaded) return;
      if (state.allUsersLoaded) return;
      setState({ type: 'chatUsers', data: res.value });
      setState({ type: 'hasMoreData', data: res.key });
      setState({ type: 'filteredData', data: res.value });

      dispatch(setCurrentFocus('Messages'));
    });
    socketIOListener();
  }, [chatFor]);

  const handleLoadMore = () => {
    if (state.allUsersLoaded) return;
    if (!state.hasMoreData) {
      return;
    }
    if (state.refreshing) {
      return;
    }
    let skiped = state.skip + 20;
    setState({ type: 'refreshing', data: true });
    setState({ type: 'skip', data: skiped });
    _getChatMembers(skiped);
  };

  const _getChatMembers = (Skip: number) => {
    if (state.allUsersLoaded) return;
    // dispatch(loading(true));
    setLoading(true);
    dispatch(GetContacts(chatFor, Skip, Take, false))
      .then((res: getChatMembersType) => {
        // dispatch(loading(false));
        setLoading(true);
        if (allDataLoaded) return;
        if (state.allUsersLoaded) return;
        setState({
          type: 'hasScrolled',
          data: false,
        });
        // dispatch(loading(false));
        setLoading(true);
        let chat_users = state.chatUsers.concat(res.value);
        setState({ type: 'refreshing', data: false });
        setState({ type: 'chatUsers', data: chat_users });
        setState({ type: 'filteredData', data: chat_users });
        setState({ type: 'hasMoreData', data: res.key });
      })
      .catch(() => {
        // dispatch(loading(false));
        setLoading(true);
      });
  };

  useEffect(() => {
    return () => {
      allDataLoaded = false;
      navigation.removeListener();
      resetState();
      socketIO?.removeListener('new-message');
      socketIO?.removeListener('online-users');
    };
  }, []);

  const socketIOListener = () => {
    socketIO?.on('new-message', (data: any) => {
      handleReceiveMessageRef.current(data);
    });
    socketIO?.on('online-users', (data: any) => {
      let onlineUsers = data.map((value: any) => {
        return value.split('^')[0];
      });
      setState({ type: 'onlineUsers', data: onlineUsers });
    });
  };

  const handleReceiveMessage = (data: receiveMsgType[]) => {
    let newChatIndex: number = -1;
    let body: msgType[] = state.chatUsers;
    body.forEach((el: msgType, _index: number) => {
      newChatIndex = el.userId === data[0]?.user._id ? _index : newChatIndex;
    });
    if (newChatIndex != -1) {
      if (token.currentFocus === 'Messages') {
        body[newChatIndex].unReadMsgCount = body[0]?.unReadMsgCount + 1;
      }
      body[newChatIndex].lastMessage = data[0]?.text;
      body[newChatIndex].lastMsgDateTime = data[0]?.createdAt;
      let latestElement = body[newChatIndex];
      body.splice(newChatIndex, 1);
      body.splice(0, 0, latestElement);
      setState({ type: 'chatUsers', data: body });
      setState({ type: 'filteredData', data: body });
      let sum = state.filteredData.reduce(function (
        accumulator: number,
        curValue: msgType,
      ) {
        return accumulator + curValue.unReadMsgCount;
      },
      0);
      if (group.includes('Students')) {
        dispatch(setStudentMessagesCount(sum));
      } else if (group.includes('Staff')) {
        dispatch(setStaffMessagesCount(sum));
      } else if (group.includes('Franchise')) {
        dispatch(setFranchiseMessageCount(sum));
      } else if (group.includes('Instructors')) {
        dispatch(setInstructorMessagesCount(sum));
      } else if (group.includes('Admin')) {
        dispatch(setAdminMessageCount(sum));
      } else if (group.includes('Parents')) {
        dispatch(setContactMessagesCount(sum));
      }
    }
  };
  handleReceiveMessageRef.current = handleReceiveMessage;

  const resetState = () => {
    setState({ type: 'resetIntial', data: {} });
  };

  const onChangeText: (data: string) => void = (data: string) => {
    data.length != state.chatUsers.length
      ? !state.allUsersLoaded &&
        setState({
          type: 'refreshing',
          data: true,
        })
      : setState({
          type: 'refreshing',
          data: false,
        });
    setState({ type: 'filteredData', data: data });
  };

  interface _renderUserMetaInterface {
    item: msgType;
    index: number;
  }

  const _getAllUsers = async (chatFor: number) => {
    const Endpoint: endpoint = ApiEndpoints.Contacts;
    Endpoint.params = `?ChatFor=${
      chatFor == 11 ? 4 : chatFor == 12 ? 5 : chatFor
    }&skip=${0}&Take=${-1}`;
    Get(Endpoint).then((res: getAllUserFunctionType) => {
      allDataLoaded = true;
      setState({ type: 'allUsersLoaded', data: true });
      setState({ type: 'refreshing', data: false });
      setState({ type: 'chatUsers', data: res.value });
      setState({ type: 'filteredData', data: res.value });
      setState({ type: 'hasMoreData', data: false });
    });
  };
  const handleBack = () => {
    navigation.goBack();
    return true;
  };

  return (
    <_Screen
      header={
        <CstHeader
          isBack={true}
          GoBack={() => {
            dispatch(setCurrentFocus('MessageGroup'));
            navigation.navigate(DrawerScreens.msgScr.name);
          }}
          Screen={group.includes('Chat') ? 'Instructors' : group}
          isLogout={false}
          isMenuRight={false}
          OpenMenu={() => {
            navigation.toggleDrawer();
          }}
          isSearchBtn={
            state.chatUsers != undefined && state.chatUsers.length > 0
              ? true
              : false
          }
          OpenSearch={() => {
            setisVisible(true);
          }}
        />
      }
      hideTopSafeArea
      onAndroidBack={handleBack}
      backgroundColor={whiteThemeColors.background}
    >
      {/* <LoadingSc /> */}
      {loading && <Loader />}

      {isVisible && (
        <Search
          onInputChange={onChangeText}
          onClose={() => {
            setisVisible(false);
            setState({
              type: 'refreshing',
              data: false,
            });
          }}
          animSpeed={100}
          data={state.chatUsers}
          searchKey='fullName'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}

      <_View justify={'center'} alignItems={'center'} style={{ flex: 1 }}>
        {state.filteredData.length <= 0 ? (
          <_View>
            <_VectorIcons
              name='users'
              type='FontAwesome5'
              size={100}
              color={whiteThemeColors.white}
            />
            <_Text
              style={[
               // CommonStyles.className,

                {
                  marginTop: 50,
                  color: whiteThemeColors.lightBlack,
                  fontFamily: CommonStyles.fonts.regular,
                },
              ]}
            >
              {`No ${
                chatFor == 11 || chatFor == 12
                  ? 'Instructors'
                  : Object.keys(MsgScreenMeta)[
                      Object.values(MsgScreenMeta).indexOf(chatFor)
                    ]
              } Found`}
            </_Text>
          </_View>
        ) : (
          <VirtualizedList
            removeClippedSubviews
            showsVerticalScrollIndicator={false}
            data={state.filteredData}
            renderItem={({ item, index }: _renderUserMetaInterface) => (
              <RenderUserMeta
                item={item}
                setState={setState}
                params={route?.params}
                state={state}
              />
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.8}
            keyExtractor={(item: msgType) => item.userId.toString()}
            // maxToRenderPerBatch={20}
            initialNumToRender={20}
            getItemCount={(data) => data.length}
            getItem={(data, index) => data[index]}
          />
        )}
        {state.showUserProfileModal && (
          <UserProfileModal
            modalVisible={state.showUserProfileModal}
            setModalVisible={(val) =>
              setState({ type: 'showUserProfileModal', data: val })
            }
            isStudent={group == 'Students' ? true : false}
            user={state.showUserProfile}
          />
        )}
      </_View>
    </_Screen>
  );
};
export const ChatUsers = React.memo(ChatUserScreen);
