import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../reducers/Appstate';
import { getTerminologyLabel } from '../../../Utilities';
import { playStoreTestUser } from '../../../constants';
import { useAppModulePermission } from '../../../customHooks';
import { Tabs, routesForStoreUser } from '../components/Routes';

export const useStudentInfoTabs = () => {
  const { filterMenuOptions } = useAppModulePermission();
  const UserData: any = useSelector((state: Appstate) => state.User.UserInfo);

  const [tabsLoading, setTabsLoading] = useState(true); // Initially loading
  const [terminologies, setTerminologies] = useState<any>({}); // Initialize as an object

  // Fetch terminologies only once
  useEffect(() => {
    const fetchTerminologies = async () => {
      try {
        const terms = await getTerminologyLabel();
        setTerminologies(terms);
      } catch (error) {
        console.error('Error fetching terminologies:', error);
      } finally {
        setTabsLoading(false); // Stop loading
      }
    };

    fetchTerminologies();
  }, []);

  // Memoize the routes array
  const routes = useMemo(() => {
    if (Object.keys(terminologies).length === 0) return [];

    const tabs = playStoreTestUser.includes(UserData.fullName)
      ? routesForStoreUser
      : Tabs;

    const filteredTabs = filterMenuOptions(tabs);

    return filteredTabs.map(tab => {
      const term = terminologies[tab.term];
      return {
        ...tab,
        title: term?.pluralLabel || tab.title, // Update title if pluralLabel exists
      };
    });
  }, [terminologies, filterMenuOptions, UserData.fullName]);

  return { routes, tabsLoading };
};
