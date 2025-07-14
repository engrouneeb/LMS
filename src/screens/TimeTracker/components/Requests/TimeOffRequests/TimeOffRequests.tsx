import { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import { AdminInterface, isAdmin, whiteThemeColors } from 'utilities';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import { setTimeTrackerBadges } from '../../../../../actions/TimeTrackerActions';
import { _Screen, _View, endpoint } from '../../../../../components';
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
import { RejectedSwitch } from '../RejectedSwitch';
import { CoverCommentModal } from '../components/CoverCommentModal';
import { NoRequest } from '../components/NoRequest';
import { RequestCard } from '../components/RequestCard';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { TimeOffRequestInterface } from 'interfaces';

export const TimeOffRequest: FC<TimeOffRequestInterface> = ({ route }) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch = useDispatch();
  const { roleName, timeTrackerBadges } = route.params;
  const tabs = isAdmin(roleName as AdminInterface)
    ? TimeTrackerAdminTabs
    : TimeTrackerRequestsTabs;
  const [showModal, setShowModal] = useState(false);
  const [modalComment, setModalComment] = useState('');
  const [modalStatus, setModalStatus] = useState('');
  const [modalItem, setModalItem] = useState<any>();
  const [modalBtn, setModalBtn] = useState('');
  const [rejectVisible, setRejectVisible] = useState(false);
  const [TimeOffApprovals, setTimeOffApprovals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { companyUrl: domainUrl }: any = useSelector(
    (state: Appstate) => state.User.UserInfo
  );

  const { Get, PostSecured } = DataAccess();

  useEffect(() => {
    getApprovelsList();
  }, [activeTab]);

  const renderModal = () => {
    setShowModal(true);
  };
  const onOpenModal = (item: any, Status: any) => {
    setModalStatus(Status);
    setModalItem(item);
    Status == CoverRequestConstants.Approved
      ? setModalBtn(CoverRequestConstants.Approve)
      : setModalBtn(CoverRequestConstants.Reject);
  };

  const getApprovelsList = () => {
    setLoading(true);
    let url: endpoint = ApiEndpoints.GetApprovalsDetail;
    const isPersonal =
      activeTab.name == TimeTrackerTabs.Approvals ? false : true;
    url.params = `?approvaltype=${
      ApprovalTypes.TimeOff
    }&isPersonal=${isPersonal}&Take=${10}&Skip=${0}`;
    Get(url)
      .then((res: any) => setTimeOffApprovals(res))
      .catch((Error: any) => console.log({ Error }))
      .finally(() => setLoading(false));
  };
  const UpdateApprovalsDetails = async () => {
    setLoading(true);

    let url = ApiEndpoints.SaveApprovalStatus;
    let Obj = {
      UserID: modalItem.userId,
      Status: modalStatus,
      Comments: modalComment,
      ItemID: modalItem.itemId,
      ItemType: modalItem.itemType,
      DomainUrl: domainUrl,
    };
    try {
      let response = await PostSecured(url, [Obj]);
      setLoading(false);
      setShowModal(false);
      setModalComment('');
      if (response.error) {
        console.log('Error: ', response);
      } else {
        getApprovelsList();
        let badges = timeTrackerBadges;
        if (badges.timeOffCount !== 0) {
          badges.timeOffCount = badges.timeOffCount - 1;
          dispatch(setTimeTrackerBadges(badges));
        }
      }
    } catch (Error) {
      console.log({ Error });
      setShowModal(false);
      setModalComment('');
    }
  };

  const handleOnAndroidBack = () => {
    navigation.navigate('Requests');
    return true;
  };
  return (
    <_Screen
      header={
        <Header
          isBack
          Screen={'Time Off Requests'}
          GoBack={() => navigation.navigate('Requests')}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleOnAndroidBack}
      backgroundColor={whiteThemeColors.background}
      bottomSafeAreaColor={whiteThemeColors.background}
    >
      <TopTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        showIcon={false}
        showTabName={true}
        setitem={setTimeOffApprovals}
      />
      {activeTab.name == TimeTrackerTabs.Approvals && (
        <RejectedSwitch
          rejectVisible={rejectVisible}
          setRejectVisible={setRejectVisible}
        />
      )}

      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={
            activeTab.name == TimeTrackerTabs.Approvals
              ? rejectVisible
                ? TimeOffApprovals?.filter(
                    (s: any) => s?.status === CoverRequestConstants.Rejected
                  )
                : TimeOffApprovals?.filter(
                    (s: any) => s?.status !== CoverRequestConstants.Rejected
                  )
              : TimeOffApprovals
          }
          ListEmptyComponent={() => <NoRequest />}
          // contentContainerStyle={{ flex: 1 }}
          renderItem={({ item }) => (
            <RequestCard
              item={item}
              variant={'Time Off'}
              rejectVisible={rejectVisible}
              showButtons={activeTab.name == TimeTrackerTabs.Approvals}
              onButtonAction={(item, Status) => {
                onOpenModal(item, Status);
                renderModal();
              }}
            />
          )}
        />
      )}
      {showModal && (
        <CoverCommentModal
          modalVisible={showModal}
          setModalVisible={setShowModal}
          modalComment={modalComment}
          setModalComment={setModalComment}
          commentFor={modalBtn}
          onCloseModalCallBack={UpdateApprovalsDetails}
        />
      )}
    </_Screen>
  );
};
