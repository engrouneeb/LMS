import { useDispatch } from 'react-redux';

import { endpoint } from 'components';
import Endpoint from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { setupFailed, setupSuccess } from '../../../actions/SetupActions';

export const useLoadSetupData = () => {
  const dispatch = useDispatch();
  const { Get } = DataAccess();
  const getSetupData = () => {
    let url: endpoint = Endpoint.getSetupAndApprovers;
    url.params = `?take=${100}&skip=${0}`;
    Get(url)
      .then((res: any) => {
        return dispatch(setupSuccess(res));
      })
      .catch(() => {
        dispatch(setupFailed());
      });
  };
  return { getSetupData };
};
