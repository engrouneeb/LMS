export const ScheduleActions = {
  SCHEDULE_LOADING: '/admin/schedule/action/SCHEDULE_LOADING',
  SCHEDULE_SUCCESS: '/admin/schedule/action/SCHEDULE_SUCCESS',
  SCHEDULE_FAILED: '/admin/schedule/action/SCHEDULE_FAILED',
};

export function adminScheduleLoading() {
  return {
    type: ScheduleActions.SCHEDULE_LOADING,
  };
}

export function adminScheduleSuccess(payload: any) {
  return {
    type: ScheduleActions.SCHEDULE_SUCCESS,
    payload,
  };
}

export function adminScheduleFailed() {
  return {
    type: ScheduleActions.SCHEDULE_FAILED,
  };
}
