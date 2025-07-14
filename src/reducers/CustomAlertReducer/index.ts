import { CustomAlertActions } from '../../actions/CustomAlert';
export interface CustomAlertReducerInterface {
  readonly show: boolean;
  readonly error?: string;
  readonly message?: string;
}
const initialState: CustomAlertReducerInterface = {
  show: false,
  error: '',
  message: '',
};

const CustomAlertReducer = (
  state: CustomAlertReducerInterface = initialState,
  actions: any,
): CustomAlertReducerInterface => {
  switch (actions.type) {
    case CustomAlertActions.ALERT_SHOW:
      return {
        ...state,
        show: true,
        error: 'Error',
        message: actions.payload,
      };

    case CustomAlertActions.ALERT_HIDE:
      return {
        ...state,
        show: false,
        error: undefined,
        message: undefined,
      };

    default:
      return state;
  }
};

export default CustomAlertReducer;
