import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { CoverRequestInterface, DataInterface } from '../../../../../interfaces';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../../../../reducers/Appstate';
import { AdminInterface, isAdmin, whiteThemeColors } from '../../../../../Utilities';
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
import { NoRequest } from '../components/NoRequest';
import { RejectedSwitch } from '../RejectedSwitch';
import { AprovalCoverageTabs, CoverRequestCard } from './components';

export const CoverRequest: React.FC<CoverRequestInterface> = ({ route }) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { coverageCount, coverCount } = route?.params?.timeTrackerBadges;
  const { roleName } = route?.params;
  let tabs = isAdmin(roleName as AdminInterface)
    ? TimeTrackerAdminTabs
    : TimeTrackerRequestsTabs;
  const [coverApprovals, setCoverApprovals] = useState([]);
  const domainUrl: string = useSelector(
    (state: Appstate) => state.User.UserInfo!.companyUrl
  );
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [rejectVisible, setRejectVisible] = useState(false);
  const [isCoverageTabActive, setIsCoverageTabActive] = useState(false);
  const timeTrackerBadges: any = useSelector(
    (state: Appstate) => state.timetracker.timeTrackerBadges
  );
  const dispatch = useDispatch();
  const { Get, PostSecured } = DataAccess();
  useEffect(() => {
    getApprovelsList();
  }, [activeTab, isCoverageTabActive]);

  const getApprovelsList = () => {
    setLoading(true);
    let url: endpoint = ApiEndpoints.GetApprovalsDetail;
    const isPersonal =
      activeTab.name == TimeTrackerTabs.Approvals ? false : true;
    const isCoverage = isCoverageTabActive ? true : false;
    url.params = `?approvaltype=${
      ApprovalTypes.Cover
    }&isPersonal=${isPersonal}&Take=${10}&Skip=${0}&isCoverage=${
      activeTab.name == TimeTrackerTabs.MyRequests ? false : isCoverage
    }`;
    Get(url)
      .then((res: any) => setCoverApprovals(res))
      .catch(() => dispatch(adminScheduleFailed()))
      .finally(() => setLoading(false));
  };
  const UpdateCoverageStatus = async (
    itemKey: number,
    TradeShiftStatus: number,
    comment = ''
  ) => {
    setLoading(true);
    let url = ApiEndpoints.UpdateCoverageStatus;
    let Obj = {
      Key: itemKey,
      DomainUrl: domainUrl,
      TradeShiftStatus: TradeShiftStatus,
    };
    try {
      let response = await PostSecured(url, Obj);
      if (!response.error) {
        getApprovelsList();
        if (coverageCount !== 0) {
          let badges = timeTrackerBadges;
          badges.coverageCount = badges.coverageCount - 1;
        }
      }
    } catch (Error) {
      console.log({ Error });
    } finally {
      setLoading(false);
    }
  };
  const UpdateApprovalsDetails = async (
    item: DataInterface,
    Status: string,
    comment: string
  ) => {
    setLoading(true);
    let url = ApiEndpoints.SaveApprovalStatus;
    let Obj = {
      UserID: item.userId,
      Status: Status,
      Comments: comment,
      ItemID: item.itemId,
      ItemType: item.itemType,
      DomainUrl: domainUrl,
    };
    try {
      let response = await PostSecured(url, [Obj]);
      if (!response.error) {
        getApprovelsList();
        if (coverCount !== 0) {
          let badges = timeTrackerBadges;
          badges.coverCount = badges.coverCount - 1;
        }
      }
    } catch (Error) {
      console.log({ Error });
    } finally {
      setLoading(false);
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
          Screen={'Cover Requests'}
          GoBack={() => navigation.navigate('Requests')}
        />
      }
      flex={1}
      hideTopSafeArea
      bottomSafeAreaColor={whiteThemeColors.background}
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={handleOnAndroidBack}
    >
      <TopTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        showIcon={false}
        showTabName={true}
        setitem={setCoverApprovals}
      />
      <_View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AprovalCoverageTabs
            setIsCoverageTabActive={setIsCoverageTabActive}
            isCoverageTabActive={isCoverageTabActive}
            activeTab={activeTab}
            TimeTrackerTabs={TimeTrackerTabs}
            coverCount={coverCount}
            coverageCount={coverageCount}
          />
          {activeTab.name == TimeTrackerTabs.Approvals &&
            isCoverageTabActive == false && (
              <RejectedSwitch
                rejectVisible={rejectVisible}
                setRejectVisible={setRejectVisible}
              />
            )}
          {loading ? (
            <_View
              height={100}
              margins={{ marginTop: 200 }}
              style={{ backgroundColor: whiteThemeColors.background }}
            >
              <Loader bgColor={whiteThemeColors.background} />
            </_View>
          ) : (
            <FlatList
              data={
                activeTab.name == TimeTrackerTabs.Approvals
                  ? rejectVisible
                    ? coverApprovals?.filter(
                        (s: any) => s?.status === CoverRequestConstants.Rejected
                      )
                    : coverApprovals?.filter(
                        (s: any) => s?.status !== CoverRequestConstants.Rejected
                      )
                  : coverApprovals
              }
              renderItem={({ item }) => (
                <CoverRequestCard
                  activeTab={activeTab}
                  item={item}
                  UpdateCoverageStatus={UpdateCoverageStatus}
                  isCoverageTabActive={isCoverageTabActive}
                  UpdateApprovalsDetails={UpdateApprovalsDetails}
                  showButtons={activeTab.name != TimeTrackerTabs.MyRequests}
                />
              )}
              ListEmptyComponent={
                <_View margins={{ marginTop: 200 }}>{<NoRequest />}</_View>
              }
            />
          )}
        </ScrollView>
      </_View>
    </_Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
  },
  rejectText: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5,
    flexDirection: 'row',
  },
});
