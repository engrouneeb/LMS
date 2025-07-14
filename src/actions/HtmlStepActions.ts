export const HtmlStepActions = {
  HTML_STEP_LOADING: '/actions/html/LOADING',
  HTML_STEP_SUCCESS: '/actions/html/SUCCESS',
  HTML_STEP_FAILED: '/actions/html/FAILED',
};

export function htmlStepLoading() {
  return {
    type: HtmlStepActions.HTML_STEP_LOADING,
  };
}

export function htmlStepSuccess(payload: any) {
  return {
    type: HtmlStepActions.HTML_STEP_SUCCESS,
    payload,
  };
}

export function htmlStepFailed() {
  return {
    type: HtmlStepActions.HTML_STEP_FAILED,
  };
}
