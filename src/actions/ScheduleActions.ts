export const ScheduleActions = {
  SCHEDULE_LOADING: '/schedule/actions/SCHEDULE_LOADING_ACTION',
  SCHEDULE_SUCCESS: '/schedule/actions/SCHEDULE_SUCCESS_ACTION',
  SCHEDULE_FAILED: '/schedule/actions/SCHEDULE_FAIELD_ACTION',
};

export function scheduleLoading() {
  return {
    type: ScheduleActions.SCHEDULE_LOADING,
  };
}

export function scheduleSuccess(payload: any) {
  return {
    type: ScheduleActions.SCHEDULE_SUCCESS,
    payload,
  };
}

export function scheduleFailed() {
  return {
    type: ScheduleActions.SCHEDULE_FAILED,
  };
}
