import { _VectorIcons, _View, endpoint } from '../../../components';
import { getAllUserFunctionType } from '../../../interfaces';
import React, { FC, useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../reducers/Appstate';
import CommonStyles from '../../CommonStyles';
import { isFranchiseAdmin, isInstructor, whiteThemeColors } from '../../../Utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { RoleList } from './RolesList';
import { UserList } from './UsersList';

interface Props {
  setShowModal: (val: boolean) => void;
  showModal: boolean;
  setSelectedMembers: (val: any) => void;
  selectedMembers: any;
}

export const SelectMembersModal: FC<Props> = ({
  showModal,
  setShowModal,
  setSelectedMembers,
  selectedMembers,
}) => {
  const [selectedRole, setRole] = useState<any>([]);
  const [users, setUsers] = useState<any>();
  const [filteredUsers, setFilteredUsers] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const role: any = useSelector(
    (state: Appstate) => state.User.UserInfo.roleName,
  );
  const { Get } = DataAccess();

  const _getAllUsers = async () => {
    setIsLoading(true);
    const Endpoint: endpoint = ApiEndpoints.Contacts;
    Endpoint.params = `?ChatFor=${
      selectedRole?.Chatfor == 11
        ? 4
        : selectedRole?.Chatfor == 12
        ? 5
        : selectedRole?.Chatfor
    }&skip=${0}&Take=${-1}`;
    Get(Endpoint).then((res: getAllUserFunctionType) => {
      setUsers(res?.value);
      setFilteredUsers(res?.value);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    selectedRole?.length !== 0 && _getAllUsers();
  }, [selectedRole]);

  const roles = [
    {
      Chatfor: 5,
      TabName: 'Parents',
    },
    {
      Chatfor: 6,
      TabName: 'Staff',
    },
    {
      Chatfor: 4,
      TabName: 'Students',
    },
    {
      Chatfor: 7,
      TabName: 'Franchise Owners',
    },
    {
      Chatfor: 9,
      TabName: 'Instructors',
    },
    {
      Chatfor: 8,
      TabName: 'Admin',
    },
  ];
  const ForFranchise = [
    {
      Chatfor: 5,
      TabName: 'Parents',
    },
    {
      Chatfor: 6,
      TabName: 'Staff',
    },
    {
      Chatfor: 4,
      TabName: 'Students',
    },
    {
      Chatfor: 8,
      TabName: 'Admin',
    },
    {
      Chatfor: 9,
      TabName: 'Instructors',
    },
  ];
  const rolesForInstructor = [
    {
      Chatfor: 5,
      TabName: 'Parents',
    },

    {
      Chatfor: 4,
      TabName: 'Students',
    },
  ];
  const onPressDone = () => {
    setShowModal(false);
    setRole([]);
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
          {selectedRole?.length !== 0 && (
            <_View style={styles.headerbackContainer}>
              <TouchableOpacity
                onPress={() => {
                  setRole([]);
                }}
                style={styles.crossIcon}
              >
                <_VectorIcons
                  type='AntDesign'
                  name='arrowleft'
                  size={15}
                  color={whiteThemeColors.black}
                  style={{ padding: 7 }}
                />
              </TouchableOpacity>
            </_View>
          )}
          <_View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                setRole([]);
              }}
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
          {selectedRole?.length == 0 ? (
            <RoleList
              roles={
                isInstructor(role)
                  ? rolesForInstructor
                  : isFranchiseAdmin(role)
                  ? ForFranchise
                  : roles
              }
              setRoles={setRole}
            />
          ) : (
            <UserList
              users={users}
              setFilteredUsers={setFilteredUsers}
              filteredUsers={filteredUsers}
              isLoading={isLoading}
              setSelectedMembers={setSelectedMembers}
              selectedMembers={selectedMembers}
              onPressDone={onPressDone}
              setRole={setRole}
            />
          )}
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
    backgroundColor: 'rgba(54,54,54,0.6)',
  },
  modalView: {
    position: 'absolute',
    width: '100%',
    backgroundColor: whiteThemeColors.background,
    paddingTop: 40,
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
    top: 25,
    right: 20,
    zIndex: 99,
  },
  headerbackContainer: {
    position: 'absolute',
    top: 25,
    left: 20,
    zIndex: 99,
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.primary + 30,

    borderRadius: 10,
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: 20,
  },

  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  profileHeaderContainer: {
    width: '90%',
    backgroundColor: whiteThemeColors.white + 90,
    height: '20%',
    marginTop: 60,
    borderRadius: 15,
    paddingLeft: 100,
  },
  userFullNameTxt: {
    marginTop: 15,
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 18,
    textTransform: 'capitalize',
    color: whiteThemeColors.primary,
  },
  userRoleTxt: {
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
    textTransform: 'capitalize',
    fontSize: 13,
  },
  dropDownSearchTxtInp: {
    borderRadius: 8,
    width: '100%',
    height: 35,
    backgroundColor: whiteThemeColors.primary + 30,
    paddingHorizontal: 10,
  },
  changePasswordBtn: {
    width: 155,
    height: 35,
    borderRadius: 10,
    backgroundColor: whiteThemeColors.primary,
    alignSelf: 'flex-end',
    marginTop: 35,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePasswordTxt: {
    fontSize: 13,
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  personalInfoContainer: {
    width: '90%',
    marginTop: 30,
    paddingHorizontal: 20,
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 15,
    paddingTop: 20,
  },
  personalInfoTxt: {
    fontSize: 18,
    fontFamily: CommonStyles.fonts.semiBold,
    textTransform: 'capitalize',
    color: whiteThemeColors.primary,
    textAlign: 'center',
    marginBotto: 20,
  },
});
