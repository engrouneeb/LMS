export const AdminWagesAction = {
  ADMIN_WAGE_LOADING: '/actions/WAGE/LOADING',
  ADMIN_WAGE_SUCCESS: '/actions/WAGE/SUCCESS',
  ADMIN_WAGE_FAILED: '/actions/WAGE/FAILED',
};

export function adminWagesLoading() {
  return {
    type: AdminWagesAction.ADMIN_WAGE_LOADING,
  };
}

export function adminWagesSuccess(payload: any) {
  return {
    type: AdminWagesAction.ADMIN_WAGE_SUCCESS,
    payload,
  };
}

export function adminWagesFailed() {
  return {
    type: AdminWagesAction.ADMIN_WAGE_FAILED,
  };
}
