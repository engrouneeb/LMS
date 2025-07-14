import {
  getKioskCheckinList,
  getCompanyCoursClassesList,
} from '../../../actions/PinCodeActions';
import { useDispatch } from 'react-redux';
export const usePincode = () => {
  const dispatch: any = useDispatch();
  const getCompanyCheckInList = () => {
    dispatch(getKioskCheckinList());
  };
  const getCompanyCoursClassesCheckInList = async (userId: string | number) => {
    return await dispatch(getCompanyCoursClassesList(userId));
  };
  return { getCompanyCheckInList, getCompanyCoursClassesCheckInList };
};
