import React, { FC, useEffect, useState } from 'react';
import { CustomAlert, isAdmin, whiteThemeColors } from '../../../Utilities';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  _Button,
  _VectorIcons,
  _View,
  _Text,
  _TextInput,
  _Image,
} from '../../../components';
import CommonStyles from '../../CommonStyles';
import { DropDown } from '../../UserProfile/components';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { DataAccess } from '../../../../data/DAL';
import { SelectMembersModal } from './SelectGroupMemberModal';
import { UserImg } from '../../ThumbNail';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { extractNameExtension } from '../../Chat/ChatInterfaceScreen/Functions';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loading';
import { loading } from '../../../actions/AsyncStorage';

interface Props {
  setShowModal: (val: boolean) => void;
  showModal: boolean;
  getGroups: () => void;
  groupInfo: {};
}

export const EditGroupModal: FC<Props> = ({
  showModal,
  setShowModal,
  getGroups,
  groupInfo,
}) => {
  const [groupImage, setGroupImage] = useState();
  const [isHow, setIsHow] = useState(false);
  const [showUserModal, setUserModal] = useState<boolean>(false);
  const [selectedMembers, setSelectedMembers] = useState<any>([]);
  const [groupName, setGroupName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLeaving, setIsLeaving] = useState<boolean>(false);
  const [isEditabe, setIsEditabe] = useState<boolean>(true);
  const [isNewImageSelected, setIsNewImageSelected] = useState<boolean>(false);
  let userInfo = useSelector((state: any) => state.User.UserInfo);
  const navigation = useNavigation();
  const { PostSecuredFormData, PostSecuredWithParams } = DataAccess();
  const dispatch = useDispatch();
  const requestCameraPermission = async () => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    setGroupName(groupInfo?.name);
    setGroupImage(groupInfo.imageURL);
    setIsEditabe(
      userInfo.userID == groupInfo.createdBy || isAdmin(userInfo?.roleName),
    );
    groupInfo?.chatGroupMembers.map((item: any) => {
      item.userId = item?.memberId;
    });

    setSelectedMembers(groupInfo?.chatGroupMembers);
  }, []);
  const showImagePicker = () => {
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
      } else if (response?.error) {
        return;
      } else {
        let imageData: any = response?.assets[0];
        setIsNewImageSelected(true);
        setGroupImage(imageData.uri);
      }
    });
  };
  const showCameraPicker = () => {
    requestCameraPermission();
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response: any) => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode) {
      } else {
        let fileData = response.assets[0];
        setIsNewImageSelected(true);
        setGroupImage(fileData?.uri);
      }
    });
  };
  const createGroup = async () => {
    if (!groupName.length) {
      Alert.alert('Please provide group name');
      return;
    }
    if (selectedMembers.length <= 0) {
      Alert.alert('Please select atleast 1 member');
      return;
    }
    setIsLoading(true);
    const [name, ext] = extractNameExtension(groupImage);
    let fullFile = {
      uri: groupImage,
      exten: ext,
      name: name,
      type: `image/${ext}`,
    };
    const members: number[] = [];
    const data = new FormData();
    selectedMembers.map((item: any) => {
      members.push(item.userId);
    });
    data.append('Uploadfile', isNewImageSelected ? fullFile : null);
    data.append('Name', groupName);
    data.append('MemberIds', members.join(','));
    data.append('Description', 'asdf');
    data.append('GroupId', groupInfo.groupId);
    PostSecuredFormData(ApiEndpoints.GroupUpdate, data)
      .then((res) => {
        setIsLoading(false);
        setSelectedMembers([]);
        getGroups();
        setShowModal(false);
        navigation.navigate('msgScr');
      })
      .catch((error) => {
        setIsLoading(false);
        setShowModal(false);
        // Handle the error here
        console.error('Error:', error);
        // Optionally, you can update the state or perform other actions based on the error
      });
  };
  const onDelete = async () => {
    dispatch(loading(true));
    setIsDeleting(true);
    var EndPoint = ApiEndpoints.GroupDelete;
    var params = `?groupId=${groupInfo.groupId}`;
    let response: any = await PostSecuredWithParams(EndPoint, params).then(
      (res) => {
        dispatch(loading(false));
        console.log('-----');
        try {
          getGroups();
          setIsDeleting(false);
          navigation.navigate('msgScr');
        } catch (e) {
          console.log('Error', e);
        }
        // getGroups();
      },
    );
  };
  const leaveGroup = async () => {
    setIsLeaving(true);
    var EndPoint = ApiEndpoints.DeleteGroupMember;
    var params = `?groupId=${groupInfo.groupId}&&memberId=${userInfo.userID}`;
    let response: any = await PostSecuredWithParams(EndPoint, params).then(
      (res) => {
        try {
          setIsLeaving(false);
          getGroups();
          navigation.navigate('msgScr');
        } catch (e) {}
      },
    );
  };
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      transparent={true}
      visible={showModal}
    >
      <_View style={styles.centeredView}>
        <_View style={{ ...styles.modalView, height: '100%' }}>
          <_View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.crossIcon}
            >
              <_VectorIcons
                type='Entypo'
                name='cross'
                size={15}
                color={whiteThemeColors.black}
                style={{ padding: 7 }}
              />
            </TouchableOpacity>
          </_View>
          <_View style={styles.webViewContainer}>
            <_View style={styles.modalInsideView}>
              <_Text style={styles.groupText}>Edit Group</_Text>
              <_View
                style={[styles.profilePicContainer, styles.profilePicShadow]}
              >
                <Pressable disabled={groupImage === '' || !isEditabe}>
                  <_Image
                    source={
                      groupImage === ''
                        ? require('../../../../assets/userGroup.png')
                        : { uri: groupImage }
                    }
                    style={styles.profilePic}
                  />
                </Pressable>
                <Pressable
                  disabled={!isEditabe}
                  style={styles.profilePicBtn}
                  onPress={() => {
                    setIsHow(!isHow);
                  }}
                >
                  <_View
                    style={[styles.profilePicIconContainer, styles.shadow]}
                  >
                    <_VectorIcons
                      type={'MaterialCommunityIcons'}
                      name='camera'
                      size={20}
                      color={whiteThemeColors.primary}
                    />
                  </_View>
                </Pressable>
              </_View>
              <_Text style={styles.addgroupText}>Group image</_Text>
            </_View>
            <_Text style={styles.addNameText}>Group name</_Text>
            <_TextInput
              autoFocus
              editable={isEditabe}
              autoCapitalize='none'
              placeholder='Group name'
              onChangeText={(text) => setGroupName(text)}
              value={groupName}
              style={styles.dropDownSearchTxtInp}
            />
            <_Text style={styles.addNameText}>Group members</_Text>
            <TouchableOpacity
              disabled={!isEditabe}
              style={styles.selectMembers}
              onPress={() => setUserModal(true)}
            >
              <_Text style={styles.members}>Select members</_Text>
              <_VectorIcons
                type='FontAwesome'
                name='caret-right'
                size={20}
                color={whiteThemeColors.white}
                style={{ padding: 7 }}
              />
            </TouchableOpacity>
            <_View style={{ height: '50%', marginBottom: 20 }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={selectedMembers}
                ListEmptyComponent={() => (
                  <_View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <_VectorIcons
                      size={50}
                      type='MaterialCommunityIcons'
                      name='account-multiple-remove'
                      color={whiteThemeColors.primary}
                    />
                    <_Text style={styles.noMembers}>No Members</_Text>
                  </_View>
                )}
                style={styles.flatlist}
                renderItem={({ item }) => {
                  const fullName = item?.fullName.split(' ');
                  return (
                    <_View style={styles.card}>
                      <UserImg
                        UserInfo={{
                          FirstName:
                            fullName?.length > 0 ? fullName[0] : 'First',
                          LastName: fullName?.length > 0 ? fullName[1] : 'Last',
                          UserImage: item?.imageURL ? item?.imageURL : '',
                          UserImageColor: whiteThemeColors.primary,
                        }}
                        size={30}
                      />
                      <_View style={{ marginLeft: 10 }}>
                        <_Text style={styles.name}>{item.fullName}</_Text>
                        <_Text style={styles.role}>{item.roleName}</_Text>
                      </_View>
                      {isEditabe && userInfo.fullName !== item.fullName && (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedMembers((prevSelectedMembers) =>
                              prevSelectedMembers.filter(
                                (member) => member.userId !== item.userId,
                              ),
                            );
                          }}
                          style={styles.removeContainer}
                        >
                          <_VectorIcons type='Entypo' name='cross' />
                        </TouchableOpacity>
                      )}
                    </_View>
                  );
                }}
              />
            </_View>
            {isHow && (
              <DropDown
                isVisible={isHow}
                setIsVisble={setIsHow}
                showCameraPicker={showCameraPicker}
                showImagePicker={showImagePicker}
              />
            )}
          </_View>

          {isEditabe && (
            <_Button
              submitting={!isLoading}
              width={'100%'}
              borderRadius={10}
              style={styles.btn}
              color={whiteThemeColors.primary}
              callback={() => {
                createGroup();
              }}
              BtnTxt={styles.btnText}
              btnText={'Update'}
            />
          )}
          {isEditabe ? (
            <_Button
              submitting={!isDeleting}
              width={'100%'}
              borderRadius={10}
              style={[styles.deleteBtn, { marginTop: 10 }]}
              color={whiteThemeColors.primary}
              callback={() => {
                setShowAlert(true);
              }}
              BtnTxt={styles.deleteBtnText}
              btnText={'Delete Group'}
            />
          ) : (
            <_Button
              submitting={!isLeaving}
              width={'100%'}
              borderRadius={10}
              style={[styles.deleteBtn, { marginTop: 50 }]}
              color={whiteThemeColors.primary}
              callback={() => {
                setShowAlert(true);
              }}
              BtnTxt={styles.deleteBtnText}
              btnText={'Exit Group'}
            />
          )}
        </_View>
      </_View>

      <SelectMembersModal
        showModal={showUserModal}
        setShowModal={setUserModal}
        setSelectedMembers={setSelectedMembers}
        selectedMembers={selectedMembers}
      />
      {isEditabe ? (
        <CustomAlert
          visible={showAlert}
          title={'Delete Group'}
          msg={'Are you sure to delete this group?'}
          firstBtn={'Okay'}
          secondBtn={'Cancel'}
          firstBtnFunc={onDelete}
          secondBtnFunc={() => setShowAlert(false)}
        />
      ) : (
        <CustomAlert
          visible={showAlert}
          title={'Leave Group'}
          msg={'Are you sure to leave this group?'}
          firstBtn={'Okay'}
          secondBtn={'Cancel'}
          firstBtnFunc={leaveGroup}
          secondBtnFunc={() => setShowAlert(false)}
        />
      )}
      <Loader />
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.6)',
  },
  modalView: {
    position: 'absolute',
    width: '100%',

    backgroundColor: whiteThemeColors.background,
    padding: 25,
    paddingTop: 60,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },

  headerContainer: {
    position: 'absolute',
    top: 35,
    right: 20,
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.primary + 30,

    borderRadius: 10,
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  modalInsideView: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: -10,
  },

  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  dropDownSearchTxtInp: {
    borderRadius: 8,
    width: '100%',
    height: 40,
    backgroundColor: whiteThemeColors.primary + 30,
    paddingHorizontal: 10,
  },

  profilePicContainer: {
    width: 80,
    height: 80,

    zIndex: 10,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  profilePicIconContainer: {
    height: 30,
    width: 30,
    borderRadius: 8,
    backgroundColor: whiteThemeColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: whiteThemeColors.white + 30,
  },
  profilePicBtn: {
    borderRadius: 10,
    position: 'absolute',
    bottom: -10,
    right: -5,
    zIndex: 100,
  },

  shadow: {
    shadowColor: whiteThemeColors.greyDark,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  profilePicShadow: {
    shadowColor: whiteThemeColors.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  card: {
    width: '95%',
    height: 60,
    backgroundColor: whiteThemeColors.primary + 20,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  role: {
    fontFamily: CommonStyles.fonts.regular,
    color: 'gray',
    fontSize: 12,
  },
  removeContainer: {
    backgroundColor: whiteThemeColors.red,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -4,
    top: -10,
  },

  groupText: {
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 16,
  },
  addgroupText: {
    marginTop: 20,
    fontFamily: CommonStyles.fonts.medium,
  },
  addNameText: {
    marginTop: 20,
    fontFamily: CommonStyles.fonts.medium,
    fontSize: 12,
    marginLeft: 2,
    marginBottom: 5,
  },
  selectMembers: {
    height: 40,
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  members: {
    fontFamily: CommonStyles.fonts.medium,
    color: 'white',
  },
  noMembers: {
    fontFamily: CommonStyles.fonts.regular,
    textAlign: 'center',
    fontSize: 12,
  },
  flatlist: {
    marginTop: 10,
    width: '100%',
    height: '100%',
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 12,
    fontFamily: CommonStyles.fonts.medium,
  },
  btn: {
    backgroundColor: whiteThemeColors.primary,
    width: 70,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    // marginTop: 10,
    marginTop: 55,
  },
  deleteBtn: {
    backgroundColor: whiteThemeColors.white,
    width: 70,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  deleteBtnText: {
    color: whiteThemeColors.red,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  btnText: {
    color: 'white',
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
