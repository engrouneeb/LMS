import { StyleSheet, FlatList } from 'react-native';
import { useState, useEffect, FC } from 'react';
import { _View, _Text, _Screen, endpoint } from '../../../../../components';
import Header from '../../../../Headers';
import { TopTabs } from '../../../../../components/TopTabs';
import { RequestCard } from '../components/RequestCard';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import Loader from '../../../../Loader/loader';
import { NoRequest } from '../components/NoRequest';
import { whiteThemeColors, isAdmin, AdminInterface } from 'utilities';
import {
  ApprovalTypes,
  TimeTrackerRequestsTabs,
  TimeTrackerAdminTabs,
} from '../../../../values/english';
import { TimeTrackerTabs } from '../../../../Strings/english';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { ExpenseRequestInterface } from 'interfaces';

const ExpenseRequest: FC<ExpenseRequestInterface> = ({ route }) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { roleName } = route.params;
  let tabs = isAdmin(roleName as AdminInterface)
    ? TimeTrackerAdminTabs
    : TimeTrackerRequestsTabs;
  const [ExpenseApprovals, setExpenseApprovals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { Get, PostSecured } = DataAccess();

  useEffect(() => {
    getApprovelsList();
  }, [activeTab]);
  const getApprovelsList = () => {
    setLoading(true);
    let url: endpoint = ApiEndpoints.GetApprovalsDetail;
    const isPersonal =
      activeTab.name == TimeTrackerTabs.Approvals ? false : true;
    url.params = `?approvaltype=${
      ApprovalTypes.ExpenseList
    }&isPersonal=${isPersonal}&Take=${10}&Skip=${0}`;
    Get(url)
      .then((res: any) => {
        setLoading(false);
        setExpenseApprovals(res);
      })
      .catch((err: any) => {
        console.log('Error : ', err);
      });
  };

  const UpdateApprovalsDetails = async (
    itemKey: any,
    TradeShiftStatus: any
  ) => {
    setLoading(true);
    let url = ApiEndpoints.UpdateApprovalsDetails;
    let Obj = {
      Key: itemKey,
      TradeShiftStatus: TradeShiftStatus,
    };
    try {
      let response = await PostSecured(url, Obj);
      if (response.error) {
        setLoading(false);
        return;
      } else {
        getApprovelsList();
      }
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  const handleAndroidBackBtn = () => {
    navigation.goBack();
    return true;
  };

  return (
    <_Screen
      header={
        <Header
          isBack
          Screen={'Expense Requests'}
          GoBack={() => navigation.goBack()}
        />
      }
      flex={1}
      hideTopSafeArea
      backgroundColor={whiteThemeColors.background}
      bottomSafeAreaColor={whiteThemeColors.background}
      onAndroidBack={handleAndroidBackBtn}
    >
      <TopTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        showIcon={false}
        showTabName={true}
        setitem={(value) => console.log(value)}
      />
      <_View style={styles.container}>
        {loading ? (
          <Loader />
        ) : ExpenseApprovals.length == 0 ? (
          <NoRequest />
        ) : (
          <FlatList
            data={ExpenseApprovals}
            renderItem={({ item }) => (
              <RequestCard
                item={item}
                variant={'Expense'}
                onButtonAction={UpdateApprovalsDetails}
              />
            )}
          />
        )}
      </_View>
    </_Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
  },
});
export { ExpenseRequest };
