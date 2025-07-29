import { RequestModalInterface } from '../../../../../../interfaces';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../../../../../reducers/Appstate';
import { CustomAlert } from '../../../../../../Utilities';
import Endpoint from '../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../data/DAL';
import {
  coverUserFailed,
  coverUserLoading,
  coverUserSuccess,
} from '../../../../../../actions/CoverUserAction';
import { _View, endpoint } from '../../../../../../components';
import { _ActivityIndicator } from '../../../../../Loader';
import {
  CoverageCard,
  EditMessage,
  RenderUserList,
  RequestBtn,
  RequestModalHeader,
} from './components';
import { styles } from './styles';

const RequestModal: React.FC<RequestModalInterface> = ({
  showModal,
  checkIn,
  checkOut,
  date,
  day,
  dayID,
  domainURL,
  handleModalState,
  type,
  userID,
}) => {
  const [message, setMessage] = useState('');
  const [msgInputState, setMsgInputState] = useState(false);
  const [isSavingCover, setCoverSavingState] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const { loading, data }: any = useSelector(
    (state: Appstate) => state.coverUserReducer,
  );
  const [usersState, setUsersState] = useState<any>([]);
  const [assignToUsers, setAssignToUsers] = useState();
  const dispatch = useDispatch();
  const { Get, PostSecured } = DataAccess();

  useEffect(() => setUsersState(data), [data]);
  useEffect(() => fetchUserData(), [showModal]);

  function sort(a: any, b: any) {
    if (a.fName < b.fName) return -1;
    else if (a.fName > b.fName) return 1;
    return 0;
  }

  const fetchUserData = () => {
    let url: endpoint =
      type === 'cover' ? Endpoint.getCoverUsers : Endpoint.getTradeUsers;
    url.params = `?userId=${userID}&dayId=${dayID}&date=${new Date(
      date,
    ).toISOString()}`;

    dispatch(coverUserLoading());
    Get(url)
      .then((res: any) => {
        if (res.key !== '') {
          setShowAlert(true);
          setAlertMessage(res.key);
          setAlertTitle('warning');
        }

        let userList = res.value.usersList;
        let data = [];
        for (let i = 0; i < userList.length; i++) {
          if (userList[i].isCoverRequestSent) continue;
          const user = {
            fName:
              userList[i].userName.split(' ')[0]?.charAt(0).toUpperCase() +
              userList[i].userName.split(' ')[0]?.slice(1),
            lName:
              userList[i].userName.split(' ')[1]?.charAt(0).toUpperCase() +
              userList[i].userName.split(' ')[1]?.slice(1),
            isSelected: userList[i].isCoverRequestSent,
            userID: userList[i].userID,
            role: userList[i].role,
          };
          data.push(user);
        }
        data.sort(sort);

        return dispatch(coverUserSuccess(data));
      })
      .catch(() => {
        dispatch(coverUserFailed());
      });
  };

  const handleMsgInputState = (state: any) => {
    setMsgInputState(state);
  };

  const onSelectUser = (isSelected: any, i: any) => {
    let arr = [...data];
    arr[i].isSelected = !isSelected;
    setUsersState(arr);
  };
  const onCoverSubmit = () => {
    const selectedUsers = [];
    for (let i = 0; i < usersState.length; i++) {
      if (usersState[i].isSelected === true) {
        const user = {
          ScheduleID: 0,
          UserId: usersState[i].userID,
        };

        selectedUsers.push(user);
      }
    }
    if (selectedUsers[0]?.UserId) {
      setAssignToUsers(selectedUsers[0]?.UserId);

      const coverData = {
        UserId: userID,
        CoverType: type === 'cover' ? 1 : 2,
        DayId: dayID,
        Message: message,
        DomainUrl: domainURL,
        AssignToUsers: selectedUsers,
      };
      let url: endpoint = Endpoint.saveCover;
      url.params = `?userId=${userID}&dayId=${dayID}&date=${moment(
        date,
      ).toISOString()}`;
      setCoverSavingState(true);
      PostSecured(url, coverData)
        .then((res: any) => {
          console.log('on cover submit', res);
          setCoverSavingState(false);
          setShowAlert(true);
          setAlertMessage('Request has been sent');
          setAlertTitle('Success');
        })
        .catch(() => {
          setShowAlert(true);
          setAlertMessage('Something went wrong, please try again later');
          setAlertTitle('Error');
        });
    } else {
      setShowAlert(true);
      setAlertMessage('please select an instructor');
      setAlertTitle('Error');
    }
  };
  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={showModal}
      onRequestClose={() => handleModalState(false)}
      supportedOrientations={['portrait', 'landscape']}
    >
      <RequestModalHeader
        type={type}
        msgInputState={msgInputState}
        handleMsgInputState={handleMsgInputState}
        loading={loading}
      />

      <_View style={styles.listMainView}>
        {msgInputState ? (
          <EditMessage
            handleMsgInputState={handleMsgInputState}
            setMessage={setMessage}
            message={message}
            msgInputState={msgInputState}
            loading={loading}
          />
        ) : (
          <CoverageCard
            date={date}
            checkIn={checkIn}
            checkOut={checkOut}
            day={day}
            loading={loading}
          />
        )}
        {loading ? (
          <_View style={styles.modalLoading}>
            <_ActivityIndicator
              size='large'
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </_View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.flatListView}
            data={usersState}
            ListFooterComponent={<_View style={{ height: 160 }} />}
            renderItem={({ item, index }) => (
              <RenderUserList
                user={item}
                index={index}
                key={index}
                onSelectUser={onSelectUser}
              />
            )}
          />
        )}
      </_View>

      <RequestBtn
        handleModalState={handleModalState}
        onCoverSubmit={onCoverSubmit}
        isSavingCover={isSavingCover}
        loading={loading}
      />
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setShowAlert(false);
            if (assignToUsers) handleModalState(false);
          }}
        />
      )}
    </Modal>
  );
};

export default React.memo(RequestModal);
