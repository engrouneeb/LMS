import { AdminWagesAction } from '../../actions/MS_AdminWagesActions';
export interface MS_AdminWagesInterface {
  readonly loading: boolean;
  readonly success: boolean;
  readonly failed: boolean;
  readonly data?: [];
}
const initialState: MS_AdminWagesInterface = {
  loading: false,
  success: false,
  failed: false,
  data: [],
};

const MS_AdminWagesReducer = (
  state: MS_AdminWagesInterface = initialState,
  actions: any,
): MS_AdminWagesInterface => {
  switch (actions.type) {
    case AdminWagesAction.ADMIN_WAGE_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        failed: false,
      };

    case AdminWagesAction.ADMIN_WAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        failed: false,
        data: actions.payload,
      };

    case AdminWagesAction.ADMIN_WAGE_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        failed: true,
      };

    default:
      return state;
  }
};

export default MS_AdminWagesReducer;
