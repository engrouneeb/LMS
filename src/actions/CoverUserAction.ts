export const CoverUserActions = {
  COVER_USER_LOADING: '/actions/coverUsers/COVER_USERS_LOADING',
  COVER_USER_SUCCESS: '/actions/coverUsers/COVER_USERS_SUCCESS',
  COVER_USER_FAILED: '/actions/coverUsers/COVER_USERS_FAILED',
};

export function coverUserLoading() {
  return {
    type: CoverUserActions.COVER_USER_LOADING,
  };
}

export function coverUserSuccess(payload: any) {
  return {
    type: CoverUserActions.COVER_USER_SUCCESS,
    payload,
  };
}

export function coverUserFailed() {
  return {
    type: CoverUserActions.COVER_USER_FAILED,
  };
}
