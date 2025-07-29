import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons, _View, endpoint } from '../../../../components';
import { whiteThemeColors } from '../../../../Utilities';
import ApiEndpoints from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import { _ActivityIndicator } from '../../../Loader';
import CommonStyles from '../../../../screens/CommonStyles';

interface StudentListInterface {
  order: number;
  studentKey: number;
  studentName: string;
  studentFirstName: string;
  studentLastName: string;
  studentStatus: boolean;
  action: string;
}

interface props {
  staffId: number | undefined;
  item?: any;
  modalVisible: boolean;
  setModalVisible: (isvisivle: any) => void;
}
export const AssignedStudentsModal: React.FC<props> = ({
  modalVisible,
  setModalVisible,
  staffId,
  item,
}) => {
  const onCloseModal = () => {
    setModalVisible(false);
  };
  const { Get } = DataAccess();
  const [studentList, setStudentList] = useState<StudentListInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getStaffDetailsList();
  }, [modalVisible]);

  const getStaffDetailsList = () => {
    setIsLoading(true);
    var EndPoint: endpoint = ApiEndpoints.GetAssignedClassStudents;
    EndPoint.params = `?ItemId=${item?.classId}&StaffId=${staffId}`;
    Get(EndPoint)
      .then((res: any) => {
        if (res) {
          setStudentList(res);
        }
      })
      .catch((e: any) => console.log('Error: ', e))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='slide'
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
                color={whiteThemeColors.white}
                style={{ padding: 5 }}
              />
            </TouchableOpacity>
          </_View>

          <_View style={styles.innerContainer}>
            <_View style={styles.formContainer}>
              <_View
                style={{
                  marginLeft: 10,
                }}
              >
                <_Text
                  numberOfLines={2}
                  style={{
                    color: whiteThemeColors.greyDark,
                    fontFamily: CommonStyles.fonts.medium,
                  }}
                >
                  {'Enrolled Students in '}
                </_Text>
                <_Text
                  style={{
                    fontFamily: CommonStyles.fonts.semiBold,
                    fontSize: 18,
                    color: whiteThemeColors.primary,
                    textAlign: 'justify',
                  }}
                >
                  {item?.course}
                </_Text>
              </_View>
              {isLoading ? (
                <_ActivityIndicator
                  color={whiteThemeColors.primary}
                  size={'large'}
                />
              ) : (
                <FlatList
                  data={studentList}
                  style={{ paddingBottom: 80, marginTop: 10 }}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => (
                    <_Text
                      style={{
                        alignSelf: 'center',
                        marginTop: 20,
                        fontFamily: CommonStyles.fonts.regular,
                      }}
                    >
                      No Students Assigned!
                    </_Text>
                  )}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.cardItemContainer}
                    >
                      <_View style={styles.cardTopContainer}>
                        <_View>
                          <_Text style={styles.fullNameTxt}>
                            {`${item?.studentFirstName} ${item?.studentLastName}`}
                          </_Text>
                          <_Text style={styles.userNameTxt}>
                            @{item?.studentName}
                          </_Text>
                        </_View>
                        <_View
                          style={[
                            {
                              backgroundColor: item.studentStatus
                                ? whiteThemeColors.green
                                : whiteThemeColors.red,
                            },
                            styles.statusContainer,
                            styles.shadow,
                          ]}
                        >
                          <_Text style={styles.statusTxt}>
                            {item?.studentStatus ? 'Active' : 'Inactive'}
                          </_Text>
                        </_View>
                      </_View>
                    </TouchableOpacity>
                  )}
                />
              )}
            </_View>
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
    backgroundColor: 'rgba(54,54,54,0.5)',
  },
  modalView: {
    backgroundColor: whiteThemeColors.background,
    width: '100%',

    height: '65%',
    borderRadius: 35,
    position: 'absolute',
    bottom: 1,
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
    fontFamily: CommonStyles.fonts.semiBold,
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
    backgroundColor: whiteThemeColors.greyDark,
    borderRadius: 10,
    zIndex: 10,
    marginRight: 15,
    marginTop: 10,
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
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
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
    backgroundColor: whiteThemeColors.background,
    width: '100%',
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
  mainContainer: {
    flex: 1,
    backgroundColor: whiteThemeColors.primary,
  },
  topBar: {
    width: '100%',
    height: 150,
    backgroundColor: whiteThemeColors.primary,
  },
  bodyContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: whiteThemeColors.white,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  formContainer: {
    height: 480,
    width: '97%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  errorMsgContainer: {
    width: '100%',
    height: 30,
  },
  titleContainer: {
    height: 50,
    width: '95%',
    backgroundColor: whiteThemeColors.primary + 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    paddingLeft: 10,
  },
  titleTxt: {
    fontSize: 18,
    color: whiteThemeColors.primary,
    fontWeight: '600',
    marginLeft: 5,
  },
  detailsContainer: {
    width: '100%',
    height: 100,
    marginTop: 45,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  userImageView: {
    position: 'absolute',
    marginTop: 7,
    width: '100%',
  },
  roundImageView: {
    height: 150,
    width: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 75,
  },
  roundImage: {
    width: 150,
    height: 150,
    alignItems: 'flex-end',
  },
  userName: {
    marginTop: 20,

    fontSize: 22,
    textTransform: 'capitalize',
    color: whiteThemeColors.primary,
  },
  userRole: {
    color: whiteThemeColors.greyDark,

    textTransform: 'capitalize',
    fontSize: 13,
  },
  title: {
    marginTop: 20,

    fontWeight: '700',
    fontSize: 22,
    color: '#fff',
    marginBottom: 50,
  },
  form: {
    paddingTop: 30,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: whiteThemeColors.white,
  },
  textInpContainer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: whiteThemeColors.primary,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  errorMsg: {
    color: whiteThemeColors.red,
    fontSize: 12,
    marginLeft: 20,
  },
  inputTextErrorIndicator: {
    borderColor: whiteThemeColors.red,
    borderWidth: 1,
    borderRadius: 5,
  },
  inputText: {
    paddingLeft: 18,
    height: 45,
    borderColor: whiteThemeColors.greyDark,
  },
  iconContainer: {
    height: 36,
    width: 36,
    borderRadius: 10,
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  coverAreaContainer: {
    width: '100%',
    height: 100,
    backgroundColor: whiteThemeColors.primary,
  },
  image: {
    width: 110,
    height: 110,
    zIndex: 10,
    borderRadius: 20,
  },
  cameraIcon: {
    padding: 4,
    borderRadius: 20,
    top: -40,
    zIndex: 10,
    right: -70,
  },
  popupMenu: {
    top: -40,
    zIndex: 10,
    right: -70,
    padding: 4,
    height: 45,
    width: 45,
    borderRadius: 36,
    backgroundColor: whiteThemeColors.white,
  },
  keyboard: {
    flex: 1,
    zIndex: -9,
    backgroundColor: whiteThemeColors.white,
  },
  iosMenu: {
    backgroundColor: whiteThemeColors.list.listBg,
    shadowColor: whiteThemeColors.black,
    borderRadius: 10,
    zIndex: 10,
    width: 180,
    height: 80,
    top: -50,
    left: 60,
  },
  avatar: {
    backgroundColor: whiteThemeColors.greyDark,
    position: 'absolute',
    borderRadius: 20,
    height: 110,
    width: 110,
    zIndex: 10,
    top: 40,
  },
  cardItemContainer: {
    width: '95%',
    height: 70,
    backgroundColor: whiteThemeColors.white + 90,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 4,
    padding: 5,
    paddingVertical: 7,
  },
  cardTopContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  fullNameTxt: {
    color: whiteThemeColors.primaryDark,
    fontFamily: CommonStyles.fonts.medium,
  },
  userNameTxt: {
    fontSize: 10,
    color: whiteThemeColors.greyDark,
    textTransform: 'lowercase',
    fontFamily: CommonStyles.fonts.regular,
  },
  statusContainer: {
    width: 63,
    height: 16,
    position: 'absolute',
    right: 10,
    top: 5,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTxt: {
    fontSize: 10,
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
    textTransform: 'uppercase',
  },
  cardBottomContainer: {
    width: '100%',
    height: '60%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-around',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailTxt: {
    fontSize: 12,
    color: whiteThemeColors.black + 80,
    marginLeft: 5,
    fontFamily: CommonStyles.fonts.regular,
  },
  phoneContainer: {
    flexDirection: 'row',
    aligItem: 'center',
  },
  phoneTxt: {
    fontSize: 12,
    color: whiteThemeColors.black + 80,
    marginLeft: 5,
    fontFamily: CommonStyles.fonts.regular,
  },
  roleTagContainer: {
    width: 80,
    height: 30,
    backgroundColor: whiteThemeColors.primary + 40,
    position: 'absolute',
    right: 20,
    top: 19,
    borderRadius: 3,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  departmentTxt: {
    fontSize: 9,
    color: whiteThemeColors.primaryDark,
  },
  roleTxt: {
    fontSize: 8,
    color: whiteThemeColors.greyDark,
  },
  shadow: {
    shadowColor: whiteThemeColors.white + 40,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
