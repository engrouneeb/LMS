import { endpoint } from '../../../components';
import ApiEndPoint from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';

export const useLoadClasses = () => {
  const { Get } = DataAccess();
  const getClasses = async (month: any, userID: number | null) => {
    var EndPoint: endpoint = ApiEndPoint.getAssignClassesDates;
    EndPoint.params = `?UserId=${userID}&date=${month}`;
    const res = await Get(EndPoint);
    return res;
  };
  return { getClasses };
};
