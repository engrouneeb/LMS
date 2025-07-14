import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { CustomAlert, whiteThemeColors } from 'utilities';
import { _Screen, _View } from '../../../../components';
import Header from '../../../Headers';
import Search from '../../../Search';
import { NoData, RenderList } from './components';
import { AddOrEditSetup } from './components/AddOrEdit';
import { Appstate } from 'reducers/Appstate';
import { useNavigation } from '@react-navigation/native';
import { useAppModulePermission } from '../../../../customHooks';

const SetupScreen = () => {
  const navigation = useNavigation();
  const AddOrEditRef: any = useRef();
  const searchRef: any = useRef();
  const { filterMenuOptions } = useAppModulePermission();
  const [isVisible, setisVisible] = useState(false);
  const { data }: any = useSelector((state: Appstate) => state.setupReducer);
  const { courseContentScreen } = useSelector(
    (state: Appstate) => state.language,
  );

  const [filterdUser, setFilterUser] = useState<any>(data);
  const [users, setUsers] = useState(data);
  const [selectedUser, setSelectedUser] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const isShowAddApproval=filterMenuOptions("AddApproval")

  useEffect(() => {
    setUsers(data);
    setFilterUser(data);
  }, []);

  const onChangeText = (_data: any) => {
    let array: any = [];
    _data.forEach((element: any) => {
      array.push(element);
    });
    setFilterUser(array);
  };
  const handleBack = () => {
    navigation.goBack();
    return true;
  };
  return (
    <_Screen
      header={
        <Header
          isBack
          isSearchBtn
          Screen={courseContentScreen.setup}
          OpenSearch={() => setisVisible(true)}
          GoBack={() => navigation.goBack()}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
      backgroundColor={whiteThemeColors.white}
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          onClose={() => {
            setisVisible(false);
          }}
          animSpeed={100}
          data={data && users}
          searchKey='firstName,lastName'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}

      <_View style={styles.container}>
        {filterdUser.length != 0 ? (
          <FlatList
            data={filterdUser}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <RenderList
                user={item}
                index={index}
                key={index.toString() + '0--'}
                setSelectedUser={setSelectedUser}
                AddOrEditRef={AddOrEditRef}
              />
            )}
            keyExtractor={(item, index) => index.toString() + '--0--00'}
          />
        ) : (
          <NoData />
        )}
      </_View>

      {isShowAddApproval&&<AddOrEditSetup
        assignmentId={data[selectedUser]?.assignmentId}
        users={users}
        selectedUserIndex={selectedUser}
        ref={AddOrEditRef}
        handleSaveApprovals={(title: any, msg: any) => {
          setShowAlert(true);
          setAlertTitle(title);
          setAlertMsg(msg);
        }}
      />}

      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMsg}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setShowAlert(false);
          }}
        />
      )}
    </_Screen>
  );
};

export { SetupScreen };

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteThemeColors.background,
    flex: 1,
    justifyContent: 'center',
  },
});
