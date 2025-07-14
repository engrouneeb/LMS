export const ActionsName = {
  SETUP_LOADING: 'approvers/actions/SETUP_LOADING',
  SETUP_SUCCESS: 'approvers/actions/SETUP_SUCCESS',
  SETUP_FAILED: 'approvers/actions/SETUP_FAILED',
};

export function setupLoading() {
  return {
    type: ActionsName.SETUP_LOADING,
  };
}

export function setupSuccess(payload: any) {
  return {
    type: ActionsName.SETUP_SUCCESS,
    payload: payload,
  };
}

export function setupFailed() {
  return {
    type: ActionsName.SETUP_FAILED,
  };
}
