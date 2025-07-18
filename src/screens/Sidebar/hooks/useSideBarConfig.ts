import { endpoint } from '../../../components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../reducers/Appstate';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import WhiteLabelConfig from '../../../WhiteLabelConfig';
import { menuForPlayStore, playStoreTestUser } from '../../../constants';

export const useSideBarConfig = () => {
  const UserData: any = useSelector((state: Appstate) => state.User.UserInfo);
  const variantName = WhiteLabelConfig.APP_VARIANT_NAME;
  const { Get } = DataAccess();
  const [sideBarConfig, setSidebarConfig] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi()
      .then((data) => {
        let _drawerMeta, drawerMenu;
        _drawerMeta = data.filter((item) => item.status === true);
        // hide menu for playstore users
        if (playStoreTestUser.includes(UserData.fullName)) {
          drawerMenu = _drawerMeta.filter(
            (item: any) =>
              !menuForPlayStore.some(
                (hiddenItem) => hiddenItem.Text === item.name,
              ),
          );
        } else drawerMenu = _drawerMeta;
        setSidebarConfig(drawerMenu);
      })
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false));
  }, [UserData]);

  const fetchDataFromApi = async () => {
    const Endpoint: endpoint = ApiEndpoints.GetDrawerConfiguration;
    Endpoint.params = `?variantName=${variantName}`;
    return await Get(Endpoint);
  };
  return { sideBarConfig, isLoading };
};
