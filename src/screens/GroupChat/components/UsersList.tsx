import React, { FC } from 'react';
import { _View, _Text, _VectorIcons } from 'components';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';
import Search from 'screens/Search';
import { UserImg } from 'screens/ThumbNail';
import { NoApprovels } from '../../../../assets/Icons';

interface Props {
  setFilteredUsers: (val: any) => void;
  users: any;
  filteredUsers: any;
  isLoading: boolean;
  setSelectedMembers: (val: any) => void;
  selectedMembers: any;
  onPressDone: () => void;
  setRole: () => void;
}

export const UserList: FC<Props> = ({
  setFilteredUsers,
  users,
  filteredUsers,
  isLoading,
  setSelectedMembers,
  selectedMembers,
  onPressDone,
  setRole,
}) => {
  const onChangeText = (data: any) => {
    let array: any = [];
    data.forEach((element: any) => {
      array.push(element);
    });
    setFilteredUsers(array);
  };

  console.log('---selectedMembers', selectedMembers);
  return (
    <_View style={styles.webViewContainer}>
      <Search
        onInputChange={onChangeText}
        onClose={() => {}}
        animSpeed={100}
        data={users}
        searchKey='fullName'
        isVisible={true}
        showCross={false}
        outPos={-110}
        inPos={-10}
        height={60}
      />
      {isLoading ? (
        <ActivityIndicator
          style={{ marginTop: 200 }}
          color={whiteThemeColors.primary}
        />
      ) : (
        <FlatList
          data={filteredUsers}
          style={{ marginVertical: 70 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <_View style={styles.noDataWrapper}>
              <NoApprovels />
              <_Text style={styles.noDataText}>
                No users found in this group
              </_Text>
            </_View>
          )}
          renderItem={({ item }) => (
            <_View style={styles.card}>
              <UserImg
                UserInfo={{
                  FirstName: item?.fname,
                  LastName: item?.lname,
                  UserImage: item?.image ? item?.image : '',
                  UserImageColor: whiteThemeColors.thumbnailBGColor,
                }}
                size={30}
              />
              <_View style={{ marginLeft: 10 }}>
                <_Text style={{ fontFamily: CommonStyles.fonts.medium }}>
                  {item.fullName}
                </_Text>
                <_Text style={styles.role}>{item.role}</_Text>
              </_View>
              {selectedMembers?.some(
                (member) => member.userId === item?.userId,
              ) ? (
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
                  <_Text style={styles.add}>Remove</_Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setSelectedMembers([...selectedMembers, item])}
                  style={styles.container}
                >
                  <_Text style={styles.add}>Add</_Text>
                </TouchableOpacity>
              )}
            </_View>
          )}
        />
      )}
      {selectedMembers?.length > 0 && (
        <_View style={styles.addedList}>
          <_Text
            style={styles.text}
          >{`${selectedMembers.length} User(s) added`}</_Text>
          <TouchableOpacity onPress={onPressDone} style={styles.doneBtn}>
            <_Text style={styles.btnText}>Done</_Text>
          </TouchableOpacity>
        </_View>
      )}
    </_View>
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      android: {
        marginTop: 30,
      },
    }),
  },
  card: {
    width: '95%',
    height: 70,
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
  container: {
    backgroundColor: whiteThemeColors.primary,
    width: 50,
    height: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 30,
  },
  removeContainer: {
    backgroundColor: whiteThemeColors.red + 80,
    width: 60,
    height: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 30,
  },
  add: {
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 12,
    color: 'white',
  },
  addedList: {
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  doneBtn: {
    width: 70,
    height: 25,
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    fontFamily: CommonStyles.fonts.semiBold,
    color: 'white',
  },
  text: {
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 16,
  },
  noDataWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    alignSelf: 'center',
    marginTop: 200,
    fontSize: 18,
    fontWeight: '400',
    color: whiteThemeColors.primaryTextColor,
  },
});
