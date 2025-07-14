import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { TimeSheetRequestInterfce } from 'interfaces';
import { FC, useEffect, useMemo, useReducer } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import {
  AdminInterface,
  CustomAlert,
  isAdmin,
  whiteThemeColors,
} from 'utilities';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import { adminScheduleFailed } from '../../../../../actions/ScheduleAdminAction';
import { endpoint, _Screen, _View } from '../../../../../components';
import { TopTabs } from '../../../../../components/TopTabs';
import { CoverRequestConstants } from '../../../../../constants';
import Header from '../../../../Headers';
import Loader from '../../../../Loader/loader';
import { TimeTrackerTabs } from '../../../../Strings/english';
import {
  ApprovalTypes,
  TimeTrackerAdminTabs,
  TimeTrackerRequestsTabs,
} from '../../../../values/english';
import { CoverCommentModal } from '../components/CoverCommentModal';
import { NoRequest } from '../components/NoRequest';
import { RequestCard } from '../components/RequestCard';
import { RejectedSwitch } from '../RejectedSwitch';
import {
  iniitialState_Constants,
  initialState,
  timeSheetReducer,
} from './states';

const TimeSheetRequest: FC<TimeSheetRequestInterfce> = ({ route }) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { roleName } = route.params;
  let tabs = isAdmin(roleName as AdminInterface)
    ? TimeTrackerAdminTabs
    : TimeTrackerRequestsTabs;
  const domainUrl: string = useSelector(
    (state: Appstate) => state.User.UserInfo?.companyUrl,
  );

  const computedInitialState = useMemo(
    () => ({
      ...initialState,
      activeTab: tabs[0],
    }),
    [tabs[0]],
  );

  const [state, _setState] = useReducer(timeSheetReducer, computedInitialState);
  const setState = (type: string, data: any) => _setState({ type, data });

  const dispatch = useDispatch();
  const { PostSecured, Get } = DataAccess();

  const onOpenModal = (item: any, Status: any) => {
    setState(iniitialState_Constants.showModal, true);
    setState(iniitialState_Constants.modalStatus, Status);
    setState(iniitialState_Constants.modalItem, item);
    Status == CoverRequestConstants.Approved
      ? setState(
          iniitialState_Constants.modalBtn,
          CoverRequestConstants.Approve,
        )
      : setState(
          iniitialState_Constants.modalBtn,
          CoverRequestConstants.Reject,
        );
  };

  useEffect(() => {
    getApprovelsList();
  }, [state.activeTab]);

  const getApprovelsList = () => {
    setState(iniitialState_Constants.loading, true);
    let url: endpoint = ApiEndpoints.GetApprovalsDetail;
    const isPersonal =
      state.activeTab.name == TimeTrackerTabs.Approvals ? false : true;
    url.params = `?approvaltype=${
      ApprovalTypes.TimeSheet
    }&isPersonal=${isPersonal}&Take=${10}&Skip=${0}`;

    Get(url)
      .then((res: any) =>
        setState(iniitialState_Constants.TimeSheetApprovals, res),
      )
      .catch(() => dispatch(adminScheduleFailed()))
      .finally(() => setState(iniitialState_Constants.loading, false));
  };
  const UpdateApprovalsDetails = async () => {
    setState(iniitialState_Constants.loading, true);
    let url = ApiEndpoints.SaveApprovalStatus;
    let Obj = {
      UserID: state.modalItem.userId,
      Status: state.modalStatus,
      Comments: state.modalComment,
      ItemID: state.modalItem.itemId,
      ItemType: 'Timesheet',
      DomainUrl: domainUrl,
    };
    try {
      let response = await PostSecured(url, [Obj]);
      setState(iniitialState_Constants.modalComment, '');

      setState(iniitialState_Constants.showModal, false);
      if (response.error) {
        setState(iniitialState_Constants.showAlert, true);
        setState(iniitialState_Constants.alertTitle, 'Error');
        setState(
          iniitialState_Constants.alertMessage,
          response.error_description,
        );
      } else getApprovelsList();
    } catch (error) {
      setState(iniitialState_Constants.modalComment, '');
      setState(iniitialState_Constants.showModal, false);
    } finally {
      setState(iniitialState_Constants.loading, false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
    return true;
  };

  return (
    <_Screen
      header={
        <Header
          isMenu={false}
          isBack={true}
          Screen={'Time Sheet Requests'}
          GoBack={() => navigation.goBack()}
        />
      }
      flex={1}
      backgroundColor={whiteThemeColors.background}
      bottomSafeAreaColor={whiteThemeColors.background}
      hideTopSafeArea
      onAndroidBack={handleGoBack}
    >
      <TopTabs
        showTabName
        showIcon={false}
        tabs={tabs}
        activeTab={state.activeTab}
        setActiveTab={(value: any) =>
          setState(iniitialState_Constants.activeTab, value)
        }
        setitem={(value: any) =>
          setState(iniitialState_Constants.TimeSheetApprovals, value)
        }
      />
      {state.activeTab.name == TimeTrackerTabs.Approvals && (
        <RejectedSwitch
          rejectVisible={state.rejectVisible}
          setRejectVisible={(value: boolean) =>
            setState(iniitialState_Constants.rejectVisible, value)
          }
        />
      )}
      {state.loading ? (
        <Loader />
      ) : (
        <FlatList
          data={
            state.activeTab.name == TimeTrackerTabs.Approvals
              ? state.rejectVisible
                ? state.TimeSheetApprovals?.filter(
                    (s: any) => s?.status === CoverRequestConstants.Rejected,
                  )
                : state.TimeSheetApprovals?.filter(
                    (s: any) => s?.status !== CoverRequestConstants.Rejected,
                  )
              : state.TimeSheetApprovals
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <NoRequest />}
          renderItem={({ item }) => (
            <RequestCard
              item={item}
              variant={'Timesheet'}
              rejectVisible={state.rejectVisible}
              onButtonAction={(item: any, Status: any) =>
                onOpenModal(item, Status)
              }
              showButtons={state.activeTab.name === TimeTrackerTabs.Approvals}
            />
          )}
        />
      )}
      {state.showAlert && (
        <CustomAlert
          visible={state.showAlert}
          title={state.alertTitle}
          msg={state.alertMessage}
          firstBtn={'Okay'}
          firstBtnFunc={() =>
            setState(iniitialState_Constants.showAlert, false)
          }
        />
      )}
      <CoverCommentModal
        modalVisible={state.showModal}
        setModalVisible={(value: boolean) =>
          setState(iniitialState_Constants.showModal, value)
        }
        modalComment={state.modalComment}
        setModalComment={(value: string) =>
          setState(iniitialState_Constants.modalComment, value)
        }
        commentFor={state.modalBtn}
        onCloseModalCallBack={UpdateApprovalsDetails}
      />
    </_Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.white,
    height: '100%',
  },
});
export { TimeSheetRequest };
