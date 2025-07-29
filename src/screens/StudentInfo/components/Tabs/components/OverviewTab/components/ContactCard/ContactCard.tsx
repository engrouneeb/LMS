import {ContactCardInterface} from '../../../../../../../../interfaces';
import React, {FC, Fragment, useEffect, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import CommonStyles from '../../../../../../../../screens/CommonStyles';
import {
  collapsiableAnimation,
  whiteThemeColors,
} from '../../../../../../../../Utilities';
import {_Text, _VectorIcons, _View} from '../../../../../../../../components';
import {useAppModulePermission} from '../../../../../../../../customHooks';
import {UserImg} from '../../../../../../../ThumbNail';
import {EditAddModal} from './components';
import {DetailsRow} from './components/DetailsRow';

export const ContactCard: FC<ContactCardInterface> = ({
  item,
  index,
  submitNewUser,
  contactList,
}) => {
  const {
    contactFirstName,
    contactLastName,
    work,
    cell,
    contactEmail,
    contactUsername,
    contactPassword,
    contactConfirmPassword,
  } = item;
  const {filterMenuOptions} = useAppModulePermission();
  let isAddContact = filterMenuOptions('AddContact');
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [rePopulate, setRePopulate] = useState(false);
  let {roleName} = useSelector((state: any) => state.User.UserInfo);

  const [userData, setUserData] = useState({
    firstName: contactFirstName || '',
    lastName: contactLastName || '',
    email: contactEmail || '',
    work: work || '',
    phoneNumber: cell || '',
    password: contactPassword || '',
    confirmPassword: contactConfirmPassword || '',
    userName: contactUsername || '',
  });

  useEffect(() => {
    if (rePopulate) {
      setUserData({
        firstName: contactFirstName || '',
        lastName: contactLastName || '',
        email: contactEmail || '',
        work: work || '',
        phoneNumber: cell || '',
        password: contactPassword || '',
        confirmPassword: contactConfirmPassword || '',
        userName: contactUsername || '',
      });
    }
  }, [rePopulate]);

  return (
    <Fragment>
      <_View
        style={[
          {
            marginBottom: showInfo ? 0 : 10,
            borderEndStartRadius: showInfo ? 0 : 20,
            borderEndEndRadius: showInfo ? 0 : 20,
          },
          styles.container,
        ]}>
        <UserImg
          UserInfo={{
            FirstName: contactFirstName,
            LastName: contactLastName,
            UserImage: '',
            UserImageColor: whiteThemeColors.primary,
          }}
          size={50}
        />
        <_View style={styles.briefDetailContainer}>
          <_Text style={styles.userFullNameTxt}>
            {contactFirstName + ' ' + contactLastName}
          </_Text>

          <_Text style={styles.emailTxt}>{contactEmail || 'N/A'}</_Text>
        </_View>
        {isAddContact && (
          <Pressable
            onPress={() => {
              setShowModal(true);
            }}
            style={styles.editBtn}>
            <_VectorIcons
              type="FontAwesome"
              name="pencil-square-o"
              size={20}
              color={whiteThemeColors.primary}
            />
          </Pressable>
        )}

        <Pressable
          onPress={() => {
            showInfo
              ? (collapsiableAnimation(), setShowInfo(false))
              : (collapsiableAnimation(), setShowInfo(true));
          }}
          style={styles.collapserIconBtn}>
          <_VectorIcons
            type="Feather"
            name={showInfo ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={whiteThemeColors.primary}
          />
        </Pressable>
      </_View>
      {showInfo && (
        <Pressable
          onPress={() => (collapsiableAnimation(), setShowInfo(false))}
          style={styles.detailsContainer}>
          <_View style={styles.detailsSubContainer}>
            <DetailsRow title={'Work'} value={work || 'N/A'} />
            <DetailsRow title={'Phone'} value={cell || 'N/A'} />
            {/* <DetailsRow title={'Username'} value={contactUsername || 'N/A'} /> */}
            {/* <DetailsRow title={'Password'} value={contactPassword || 'N/A'} />
            <DetailsRow
              title={'Confirm Passowrd'}
              value={contactConfirmPassword || 'N/A'}
              hideBottomBorder
            /> */}
          </_View>
        </Pressable>
      )}
      {showModal && (
        <EditAddModal
          idAddNewUSer={false}
          index={index}
          visible={showModal}
          setVisible={setShowModal}
          userData={userData}
          setUserData={setUserData}
          setRePopulate={setRePopulate}
          submitNewUser={submitNewUser}
          contactList={contactList}
        />
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    marginHorizontal: 10,
    backgroundColor: whiteThemeColors.white + 90,

    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingVertical: 10,
    alignSelf: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  briefDetailContainer: {
    height: '100%',
    marginLeft: 10,
    justifyContent: 'center',
  },
  userFullNameTxt: {
    fontSize: 15,
    color: whiteThemeColors.primary,
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.semiBold,
  },
  emailTxt: {
    paddingLeft: 2,
    paddingRight: 10,
    fontSize: 12,
    color: whiteThemeColors.greyDark,
    marginBottom: 10,
    fontFamily: CommonStyles.fonts.medium,
  },
  editBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 20,
    height: 20,
  },
  collapserIconBtn: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 20,
    height: 20,
  },
  detailsContainer: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.white + 90,
    paddingHorizontal: 20,
    paddingBottom: 80,
    marginBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  detailsSubContainer: {
    width: '100%',
    height: 125,
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.white + 30,
    borderRadius: 10,
  },
});
