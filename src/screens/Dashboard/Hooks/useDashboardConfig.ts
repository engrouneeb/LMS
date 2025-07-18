import { endpoint } from '../../../components';
import { useState, useEffect } from 'react';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';

export const useDashboardWidgets = () => {
  const { Get } = DataAccess();
  const [dashboardConfigs, setDashboardConfig] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi()
      .then((data) => setDashboardConfig(data))
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false));
  }, []);

  const fetchDataFromApi = async () => {
    const Endpoint: endpoint = ApiEndpoints.GetDashboardConfiguration;
    return await Get(Endpoint);
  };

  return { dashboardConfigs, isLoading };
};
