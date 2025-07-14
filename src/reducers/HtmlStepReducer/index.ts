import { HtmlStepActions } from '../../actions/HtmlStepActions';
export interface HtmlStepInterface {
  readonly loading: boolean;
  readonly success: boolean;
  readonly failed: boolean;
  readonly data?: [];
}
const initialState: HtmlStepInterface = {
  loading: false,
  success: false,
  failed: false,
  data: [],
};

const HtmlStepReducer = (
  state: HtmlStepInterface = initialState,
  actions: any,
): HtmlStepInterface => {
  switch (actions.type) {
    case HtmlStepActions.HTML_STEP_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        failed: false,
      };

    case HtmlStepActions.HTML_STEP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        failed: false,
        data: actions.payload,
      };

    case HtmlStepActions.HTML_STEP_FAILED:
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

export default HtmlStepReducer;
