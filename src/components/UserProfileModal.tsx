import {
  EndpointType,
  UserDetailsProps,
  UserProfileInterfaces,
} from 'interfaces';
import React, { FC, useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '.';
import ApiEndpoints from '../../data/ApiEndpoints';
import { DataAccess } from '../../data/DAL';
import { _ActivityIndicator } from '../screens/Loader';
import { UserImg } from '../screens/ThumbNail';
export const UserProfileModal: FC<UserProfileInterfaces> = ({
  modalVisible,
  setModalVisible,
  user,
  isStudent,
}) => {
  const { Get } = DataAccess();
  const onCloseModal = () => {
    setModalVisible(false);
  };
  const [userDetail, setUserDetails] = useState<UserDetailsProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    setIsLoading(true);
    var EndPoint: EndpointType = ApiEndpoints.GetUserInfoDetail;
    EndPoint.params = `?usrId=${user?.userId}&isStudent=${isStudent}`;
    Get(EndPoint).then((res: any) => {
      if (!res?.error) {
        setUserDetails(res);
        setIsLoading(false);
      }
    });
  };
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      transparent={true}
      visible={modalVisible}
    >
      <_View style={styles.centeredView}>
        <_View style={styles.modalView}>
          <_View style={styles.headerContainer}>
            <_Text style={styles.headText}></_Text>
            <TouchableOpacity onPress={onCloseModal} style={styles.crossIcon}>
              <_VectorIcons
                type={'Entypo'}
                name='cross'
                size={15}
                color={whiteThemeColors.black}
                style={{ padding: 5 }}
              />
            </TouchableOpacity>
          </_View>
          <_View style={styles.innerContainer}>
            <_View style={styles.userImageContainer}>
              <UserImg
                UserInfo={{
                  FirstName: user?.fname,
                  LastName: user?.lname,
                  UserImage: user?.image ? user?.image : '',
                  UserImageColor: whiteThemeColors.thumbnailBGColor,
                }}
                size={95}
              />
            </_View>

            <_View style={styles.nameContainer}>
              <_Text style={styles.displayNameText}>{user?.fullName}</_Text>

              {userDetail?.email && (
                <_Text
                  style={styles.usernameText}
                >{`${userDetail?.email}`}</_Text>
              )}
              {userDetail?.phoneNo && userDetail?.phoneNo != '' ? (
                <_Text style={styles.usernameText}>{userDetail?.phoneNo}</_Text>
              ) : null}
            </_View>

            {isStudent && (
              <_View style={styles.parentDetailContainer}>
                {isLoading ? (
                  <_ActivityIndicator />
                ) : (
                  <>
                    <_Text style={styles.parentText}>{'Parent Details'}</_Text>
                    <_View style={{ flexDirection: 'row', marginTop: 3 }}>
                      <_Text style={styles.nameText}>{'Name : '}</_Text>
                      <_Text style={styles.valueText}>
                        {userDetail?.parentFullName}
                      </_Text>
                    </_View>
                    {userDetail?.parentPhoneNo && (
                      <_View style={{ flexDirection: 'row', marginTop: 3 }}>
                        <_Text style={styles.nameText}>{'Phone : '}</_Text>
                        <_Text style={styles.valueText}>
                          {userDetail?.parentPhoneNo}
                        </_Text>
                      </_View>
                    )}
                    {userDetail?.parentEmail && (
                      <_View style={{ flexDirection: 'row', marginTop: 3 }}>
                        <_Text style={styles.nameText}>{'Email : '}</_Text>
                        <_Text style={styles.valueText}>
                          {userDetail?.parentEmail}
                        </_Text>
                      </_View>
                    )}
                  </>
                )}
              </_View>
            )}
          </_View>
        </_View>
      </_View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.3)',
  },
  modalView: {
    // height: 360,
    backgroundColor: whiteThemeColors.primaryDark,
    width: '90%',
    borderRadius: 35,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headText: {
    color: whiteThemeColors.white,
    fontSize: 16,

    fontWeight: '600',
  },

  button: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: whiteThemeColors.white,
    fontSize: 14,

    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.white,
    borderRadius: 10,
    zIndex: 10,
    marginRight: 15,
    marginTop: 10,
  },
  inputText: {
    paddingLeft: 15,
    fontSize: 12,
  },
  card: {
    backgroundColor: whiteThemeColors.white,
    width: '90%',
    height: 120,
    alignSelf: 'center',

    marginTop: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
  },
  cardInner: {
    backgroundColor: whiteThemeColors.primary,
    height: '100%',
    width: '15%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redemCodeText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 60,
  },
  RedeemText: {
    width: '100%',
    color: whiteThemeColors.white,
    fontSize: 10,

    transform: [{ rotate: '-90deg' }],
  },
  emptyListText: {
    alignSelf: 'center',
  },
  codeText: {
    alignSelf: 'center',

    fontSize: 30,
  },
  userImageContainer: {
    padding: 8,
    backgroundColor: whiteThemeColors.white,
    position: 'absolute',
    alignSelf: 'center',
    top: -58,
    borderRadius: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  innerContainer: {
    backgroundColor: whiteThemeColors.white,
    marginTop: 25,
    width: '100%',
    // height: '78%',
    paddingBottom: 30,
    borderRadius: 35,
  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  usernameText: {
    fontSize: 11,
    color: 'gray',
  },
  displayNameText: {
    fontSize: 24,
  },
  parentText: {
    color: whiteThemeColors.primary,
    fontSize: 14,
    textAlign: 'center',
  },
  nameText: {
    fontSize: 12,
  },
  valueText: {
    fontSize: 12,
    color: 'gray',
  },
  backgroundIcon1: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    right: 10,
    top: -10,
  },
  icon1: {
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  backgroundIcon2: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    left: 20,
    top: 1,
  },
  icon2: {
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  parentDetailContainer: {
    alignSelf: 'center',
    width: '80%',
    height: 115,
    backgroundColor: '#f3f3f3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 10,
    marginTop: 30,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
