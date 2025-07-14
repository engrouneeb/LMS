import { EndpointType } from 'interfaces';
import React, { FC, useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { whiteThemeColors } from 'utilities';
import { NoApprovels } from '../../../../../assets/Icons';
import ApiEndpoints from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import { _Image, _Text, _VectorIcons, _View } from '../../../../components';
import { _ActivityIndicator } from 'screens/Loader';
import { Appstate } from '../../../../reducers/Appstate';
import CommonStyles from 'screens/CommonStyles';
interface Props {
  modalVisible: boolean;
  headerTitle: string;
  chatFor: string;
  selectedID: number;
  instructorID: number;
  setModalVisible: () => void;
  getUserChat: (val: any) => void;
  resetSkip: () => void;
  userList: any[];
}

const _SelectUserModal: FC<Props> = ({
  modalVisible,
  headerTitle,
  chatFor,
  selectedID,
  instructorID,
  setModalVisible,
  getUserChat,
  resetSkip,
  userList,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [selected, setSelected] = useState(selectedID);
  const [studentList, setStudentList] = useState<any[]>([]);
  const { failed } = useSelector(
    (state: Appstate) => state.courseAssignStudentsReducer,
  );
  const { Get } = DataAccess();
  useEffect(() => {
    if (chatFor) getChatContacts();
  }, [chatFor]);

  const getChatContacts = async () => {
    setIsLoading(true);
    const Endpoint: EndpointType = ApiEndpoints.ViewChatContacts;
    Endpoint.params = `?chatFor=${chatFor}&userId=${instructorID}&skip=${0}&Take=${-1}`;
    Get(Endpoint).then((res: any) => {
      setIsLoading(false);
      setStudentList(res?.value);
      setFilteredList(res?.value);
    });
  };

  const Filtering = () => {
    const Array = [];
    setFilteredList([]);
    for (let i = 0; i < studentList?.length; i++) {
      if (studentList[i]?.fullName.indexOf(searchQuery) >= 0) {
        Array.push(studentList[i]);
        setFilteredList(Array);
      }
    }
  };

  useEffect(() => {
    Filtering();
  }, [searchQuery]);

  const reduceText = (word = '') => {
    return word.length > 17 ? word.substring(0, 17).concat('...') : word;
  };

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      style={{}}
    >
      <_View style={styles.centeredView}>
        <_View style={styles.modalView}>
          <_View style={styles.headerContainer}>
            <_Text style={styles.headText}>{headerTitle}</_Text>
            <TouchableOpacity
              onPress={() => setModalVisible()}
              style={styles.crossIcon}
            >
              <_VectorIcons
                type={'Entypo'}
                name='cross'
                size={15}
                color={whiteThemeColors.white}
                style={{ padding: 5 }}
              />
            </TouchableOpacity>
          </_View>
          <_View style={styles.searchContainer}>
            <_VectorIcons
              type={'Fontisto'}
              name='search'
              size={18}
              color={whiteThemeColors.lightBlack}
            />
            <TextInput
              placeholder='Search...'
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              style={styles.input}
            />
          </_View>
          <_View style={styles.container}>
            {isLoading ? (
              <_ActivityIndicator size='large' />
            ) : failed ? (
              <_View style={styles.failureContainer}>
                <_Text style={styles.failureMsgTxt}>
                  {'Failed to load data'}
                </_Text>
              </_View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredList}
                style={{ width: '100%', marginTop: 10, marginBottom: 15 }}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                ListEmptyComponent={() => (
                  <_View style={styles.noUserFoundContainer}>
                    <NoApprovels />
                    <_Text style={styles.noStdFoundTxt}>
                      {`No ${headerTitle} Found`}
                    </_Text>
                  </_View>
                )}
                renderItem={({ item, index }) => {
                  return (
                    <_View key={index} style={styles.itemContainer}>
                      <TouchableOpacity
                        disabled={selected === item?.userId}
                        onPress={() => {
                          resetSkip();
                          setSelected(item?.userId);
                          getUserChat(item);
                          setModalVisible();
                        }}
                        style={styles.itemBtn}
                      >
                        <_View style={styles.innerContainer}>
                          <_View style={styles.nameAvatarContainer}>
                            {item?.image !== '' ? (
                              <_Image uri={item?.image} style={styles.avatar} />
                            ) : (
                              <_Text style={styles.nameAvatarTxt}>
                                {item?.fullName.substring(0, 1).toUpperCase()}
                              </_Text>
                            )}
                          </_View>
                          <_Text numberOfLines={1} style={styles.nameTxt}>
                            {reduceText(item?.fullName)}
                          </_Text>
                        </_View>
                        <_View
                          style={[
                            styles.check,
                            {
                              backgroundColor:
                                selected === item?.userId
                                  ? whiteThemeColors.primary
                                  : whiteThemeColors.primary + 15,
                            },
                          ]}
                        >
                          {selected === item?.userId ? (
                            <_VectorIcons
                              type={'Feather'}
                              name='check'
                              size={15}
                              color={whiteThemeColors.white}
                            />
                          ) : null}
                        </_View>
                      </TouchableOpacity>
                    </_View>
                  );
                }}
                keyExtractor={(item) => item?.id}
              />
            )}
          </_View>
        </_View>
      </_View>
    </Modal>
  );
};
export const SelectUserModal = React.memo(_SelectUserModal);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.3)',
  },
  modalView: {
    height: '70%',
    backgroundColor: whiteThemeColors.background,
    width: '90%',
    borderRadius: 25,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerMain: {
    backgroundColor: whiteThemeColors.modalWhiteBG,
    width: '100%',
    height: '100%',
  },
  headText: {
    color: whiteThemeColors.primary,
    fontSize: 17,
    paddingLeft: 10,

    fontFamily: CommonStyles.fonts.semiBold,
  },
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 20,
    width: '90%',
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 10,
    zIndex: 10,
  },
  loadingTxt: {
    color: whiteThemeColors.primaryTextColor,
  },
  failureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  failureMsgTxt: {
    fontSize: 16,

    color: whiteThemeColors.primaryTextColor,
    textTransform: 'capitalize',
  },
  itemContainer: {
    backgroundColor: whiteThemeColors.white + 90,
    height: 75,
    borderColor: whiteThemeColors.primary,
    alignSelf: 'center',
    width: '90%',
    marginTop: 10,
    borderRadius: 15,
  },
  itemBtn: {
    height: 75,
    marginLeft: 0,
    borderBottomColor: whiteThemeColors.primary,
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '93%',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameAvatarContainer: {
    backgroundColor: whiteThemeColors.primary + 'c0',
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 25,
  },
  nameAvatarTxt: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: Platform.OS == 'ios' ? 1 : 0,
    fontFamily: CommonStyles.fonts.semiBold,
    color: 'white',
  },
  nameTxt: {
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.medium,
    color: whiteThemeColors.lightBlack,
    marginLeft: 15,
  },
  noStdFoundTxt: {
    alignSelf: 'center',
    marginTop: 200,
    fontSize: 20,
    fontWeight: '600',
    color: whiteThemeColors.primaryTextColor,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  searchContainer: {
    backgroundColor: whiteThemeColors.white,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 8,
    width: '90%',
    padding: 10,
    height: 40,
  },
  input: {
    backgroundColor: whiteThemeColors.white,
    paddingHorizontal: 5,
    marginLeft: 5,
    width: '90%',
    height: 40,
    fontFamily: CommonStyles.fonts.medium,
  },
  check: {
    borderColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    paddingTop: 2,
    height: 22,
    width: 22,
  },
  noUserFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foundText: {
    justifyContent: 'center',
    height: '50%',
  },
});
