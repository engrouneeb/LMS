import { ContactListModalInterface, ItemProps } from 'interfaces';
import { FC, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { isParent, whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../../components';
import { ContactCard } from '../ContactCard/ContactCard';
import { EditAddModal } from '../ContactCard/components';
import { useAppModulePermission } from '../../../../../../../../customHooks';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const NoDataFound = () => {
  return (
    <_View
      height={screenHeight - 200}
      width={screenWidth}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}
    >
      <_VectorIcons
        type='SimpleLineIcons'
        name='user-unfollow'
        size={50}
        color={whiteThemeColors.greyDark}
      />
      <_Text
        style={{
          fontSize: 18,
          color: whiteThemeColors.greyDark,
          marginTop: 10,
          fontWeight: '700',
        }}
      >
        No Contacts Found
      </_Text>
    </_View>
  );
};

export const ContactListModal: FC<ContactListModalInterface> = ({
  show,
  close,
  contacts,
  familyInfo,
}) => {
  const { filterMenuOptions } = useAppModulePermission();
  let isUpdateContact=filterMenuOptions("UpdateContact");
  const [addNewUser, setAddNewUser] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    work: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    userName: '',
  });
  const [rePopulate, setRePopulate] = useState(false);
  let { roleName } = useSelector((state: any) => state.User.UserInfo);
  const [contactList, setContactsList] = useState(contacts);

  useEffect(() => {
    if (rePopulate) {
      setUserData({
        firstName: '',
        lastName: '',
        email: '',
        work: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        userName: '',
      });
    }
  }, [rePopulate]);

  const submitNewUser = async (contactList: ItemProps[]) => {
    setContactsList(contactList);
  };

  return (
    <Modal visible={show} animationType={'fade'} onRequestClose={close}>
      <_View style={styles.container}>
        <_View style={styles.headerContainer}>
          <Pressable onPress={close} style={styles.backBtn}>
            <_VectorIcons
              type='Ionicons'
              name='ios-arrow-back'
              size={25}
              color={whiteThemeColors.white}
            />
          </Pressable>
          <_View style={styles.screenTitleContainer}>
            <_Text style={styles.screenTitleTxt}>Contacts</_Text>
          </_View>
        </_View>

        <FlatList
          data={contactList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <_View height={10} />}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item, index }) => (
            <ContactCard
              item={item}
              index={index}
              setAddNewUser={setAddNewUser}
              addNewUser={addNewUser}
              submitNewUser={submitNewUser}
              contactList={contacts}
            />
          )}
          // keyExtractor={(item) => item.contactId.toString()}
          ListEmptyComponent={() => <NoDataFound />}
        />
      </_View>
      {isUpdateContact && (
        <Pressable onPress={() => setAddNewUser(true)} style={styles.FAB}>
          <_VectorIcons
            type='AntDesign'
            name='adduser'
            size={25}
            color={whiteThemeColors.white}
          />
        </Pressable>
      )}
      {addNewUser && (
        <EditAddModal
          idAddNewUSer
          visible={addNewUser}
          setVisible={setAddNewUser}
          setUserData={setUserData}
          userData={userData}
          setRePopulate={setRePopulate}
          submitNewUser={submitNewUser}
          contactList={contactList}
          familyInfo={familyInfo}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: whiteThemeColors.background,
  },
  headerContainer: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: whiteThemeColors.primary,
  },
  backBtn: {
    marginLeft: 20,
    marginTop: 30,
    width: '30%',
  },
  screenTitleContainer: {
    width: '70%',
    marginTop: 30,
    marginLeft: 15,
  },
  screenTitleTxt: {
    fontSize: 20,
    color: whiteThemeColors.white,
    fontWeight: '700',
  },

  FAB: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 30,
    bottom: 50,
  },
});
