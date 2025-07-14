import { CoverUserActions } from '../../actions/CoverUserAction';
export interface CoverUserReducerInterface {
  readonly loading: boolean;
  readonly success: boolean;
  readonly failed: boolean;
  readonly data?: [];
}
const initialState: CoverUserReducerInterface = {
  loading: false,
  success: false,
  failed: false,
  data: [],
};

const CoverUserReducer = (
  state: CoverUserReducerInterface = initialState,
  actions: any,
): CoverUserReducerInterface => {
  switch (actions.type) {
    case CoverUserActions.COVER_USER_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        failed: false,
      };

    case CoverUserActions.COVER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        failed: false,
        data: actions.payload,
      };

    case CoverUserActions.COVER_USER_FAILED:
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

export default CoverUserReducer;
