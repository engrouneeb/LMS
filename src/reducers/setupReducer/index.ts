import { ActionsName } from '../../actions/SetupActions';
export interface SetupInterface {
  readonly isLoading: boolean;
  readonly isSuccess: boolean;
  readonly isFailed: boolean;
  readonly data?: [];
}
const initialState: SetupInterface = {
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  data: [],
};

const SetupReducer = (
  state: SetupInterface = initialState,
  actions: any,
): SetupInterface => {
  switch (actions.type) {
    case ActionsName.SETUP_LOADING:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isFailed: false,
      };

    case ActionsName.SETUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFailed: false,
        data: actions.payload,
      };

    case ActionsName.SETUP_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFailed: true,
      };

    default:
      return state;
  }
};

export default SetupReducer;
