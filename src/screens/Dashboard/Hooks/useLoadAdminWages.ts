import { useDispatch, useSelector } from 'react-redux';
import { endpoint } from 'components';
import { Appstate } from 'reducers/Appstate';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  adminWagesFailed,
  adminWagesSuccess,
} from '../../../actions/MS_AdminWagesActions';
export const useLoadAdminWages = () => {
  const dispatch = useDispatch();
  const { Get } = DataAccess();
  const UserData: any = useSelector((state: Appstate) => state.User.UserInfo);
  const getAdminWages = () => {
    var EndPoint: endpoint = ApiEndpoints.GetWagesDetails;
    EndPoint.params = `?UserID=${UserData?.userID}`;
    Get(EndPoint)
      .then((res: any) => {
        if (!res) {
          return dispatch(adminWagesFailed());
        }
        return dispatch(adminWagesSuccess(res));
      })
      .catch(() => {
        return dispatch(adminWagesFailed());
      });
  };
  return { getAdminWages };
};
